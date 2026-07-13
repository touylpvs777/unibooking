from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.notification import NotificationCreate, NotificationOut
from app.services.notification_service import NotificationService

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.post("/", response_model=NotificationOut, status_code=status.HTTP_201_CREATED)
async def send_notification(
    data: NotificationCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return await NotificationService(db).send(data)


@router.get("/", response_model=list[NotificationOut])
async def list_notifications(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return await NotificationService(db).get_all(skip=skip, limit=limit)


@router.get("/{notification_id}", response_model=NotificationOut)
async def get_notification(
    notification_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    notification = await NotificationService(db).get_by_id(notification_id)
    if not notification:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
    return notification
