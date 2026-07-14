import asyncio
import logging
import smtplib
import uuid
from datetime import UTC, datetime
from email.message import EmailMessage

import httpx
from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.notification import Notification, NotificationChannel, NotificationStatus
from app.schemas.notification import NotificationCreate

logger = logging.getLogger("app.notifications")


class NotificationDeliveryError(Exception):
    """Raised by an adapter when a message cannot be delivered on its channel."""


class WhatsAppAdapter:
    """Sends text messages via the WhatsApp Business (Cloud API) platform."""

    async def send(self, recipient: str, message: str, subject: str | None = None) -> str:
        if not settings.WHATSAPP_TOKEN or not settings.WHATSAPP_PHONE_NUMBER_ID:
            raise NotificationDeliveryError(
                "WhatsApp is not configured (WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID missing)"
            )

        url = (
            f"{settings.WHATSAPP_API_BASE_URL}/{settings.WHATSAPP_API_VERSION}"
            f"/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
        )
        payload = {
            "messaging_product": "whatsapp",
            "to": recipient,
            "type": "text",
            "text": {"body": message},
        }
        headers = {"Authorization": f"Bearer {settings.WHATSAPP_TOKEN}"}

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(url, json=payload, headers=headers)
            response.raise_for_status()
        except httpx.HTTPError as exc:
            raise NotificationDeliveryError(f"WhatsApp API request failed: {exc}") from exc

        data = response.json()
        try:
            return data["messages"][0]["id"]
        except (KeyError, IndexError) as exc:
            raise NotificationDeliveryError(f"Unexpected WhatsApp API response: {data}") from exc


class EmailAdapter:
    """Sends messages via SMTP — the fallback channel when WhatsApp is unavailable."""

    async def send(self, recipient: str, message: str, subject: str | None = None) -> str:
        if not settings.SMTP_HOST:
            raise NotificationDeliveryError("Email is not configured (SMTP_HOST missing)")

        def _send_sync() -> None:
            msg = EmailMessage()
            msg["Subject"] = subject or "Notification"
            msg["From"] = settings.SMTP_FROM_EMAIL
            msg["To"] = recipient
            msg.set_content(message)

            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as smtp:
                if settings.SMTP_USE_TLS:
                    smtp.starttls()
                if settings.SMTP_USERNAME:
                    smtp.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                smtp.send_message(msg)

        try:
            await asyncio.to_thread(_send_sync)
        except (smtplib.SMTPException, OSError) as exc:
            raise NotificationDeliveryError(f"SMTP send failed: {exc}") from exc

        return f"smtp-{uuid.uuid4()}"


class NotificationService:
    def __init__(
        self,
        db: AsyncSession,
        whatsapp: WhatsAppAdapter | None = None,
        email: EmailAdapter | None = None,
    ) -> None:
        self.db = db
        self.whatsapp = whatsapp or WhatsAppAdapter()
        self.email = email or EmailAdapter()

    async def send(self, data: NotificationCreate) -> Notification:
        """
        Attempts delivery on `data.channel` first, falling back to the other
        channel if a recipient is available for it. Always persists a record,
        whether delivery succeeded or every attempted channel failed.
        """
        if data.channel == NotificationChannel.WHATSAPP:
            attempts = [
                (NotificationChannel.WHATSAPP.value, self.whatsapp, data.recipient_phone),
                (NotificationChannel.EMAIL.value, self.email, data.recipient_email),
            ]
        else:
            attempts = [
                (NotificationChannel.EMAIL.value, self.email, data.recipient_email),
                (NotificationChannel.WHATSAPP.value, self.whatsapp, data.recipient_phone),
            ]

        status_value = NotificationStatus.FAILED.value
        channel_used = data.channel.value
        recipient_used = data.recipient_phone or data.recipient_email or ""
        provider_message_id: str | None = None
        errors: list[str] = []

        for channel_name, adapter, recipient in attempts:
            if not recipient:
                continue
            try:
                provider_message_id = await adapter.send(recipient, data.message, data.subject)
                channel_used, recipient_used, status_value = channel_name, recipient, NotificationStatus.SENT.value
                break
            except NotificationDeliveryError as exc:
                errors.append(f"{channel_name}: {exc}")
                logger.warning("Notification delivery failed via %s: %s", channel_name, exc)

        notification = Notification(
            channel=channel_used,
            status=status_value,
            recipient=recipient_used,
            subject=data.subject,
            message=data.message,
            provider_message_id=provider_message_id,
            error_message=" | ".join(errors) if status_value != NotificationStatus.SENT.value else None,
            event_type=data.event_type,
            entity_type=data.entity_type,
            entity_id=data.entity_id,
            recipient_user_id=data.recipient_user_id,
            sent_at=datetime.now(UTC) if status_value == NotificationStatus.SENT.value else None,
        )
        self.db.add(notification)
        await self.db.commit()
        await self.db.refresh(notification)
        return notification

    async def get_by_id(self, notification_id: int) -> Notification | None:
        result = await self.db.execute(select(Notification).where(Notification.id == notification_id))
        return result.scalar_one_or_none()

    async def get_all(self, skip: int = 0, limit: int = 100) -> list[Notification]:
        result = await self.db.execute(
            select(Notification).order_by(Notification.created_at.desc()).offset(skip).limit(limit)
        )
        return list(result.scalars().all())

    # ── Staff-facing "my alerts" (Smart Audit bell) ────────────────────────

    async def get_for_user(
        self, user_id: int, skip: int = 0, limit: int = 50, unread_only: bool = False
    ) -> list[Notification]:
        stmt = (
            select(Notification)
            .where(Notification.recipient_user_id == user_id)
            .order_by(Notification.created_at.desc())
        )
        if unread_only:
            stmt = stmt.where(Notification.is_read.is_(False))
        stmt = stmt.offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_unread_count(self, user_id: int) -> int:
        result = await self.db.execute(
            select(func.count())
            .select_from(Notification)
            .where(Notification.recipient_user_id == user_id, Notification.is_read.is_(False))
        )
        return int(result.scalar_one())

    async def mark_read(self, notification_id: int, user_id: int) -> Notification | None:
        notification = await self.get_by_id(notification_id)
        if notification is None or notification.recipient_user_id != user_id:
            return None
        notification.is_read = True
        await self.db.commit()
        await self.db.refresh(notification)
        return notification

    async def mark_all_read(self, user_id: int) -> int:
        result = await self.db.execute(
            update(Notification)
            .where(Notification.recipient_user_id == user_id, Notification.is_read.is_(False))
            .values(is_read=True)
        )
        await self.db.commit()
        return result.rowcount or 0
