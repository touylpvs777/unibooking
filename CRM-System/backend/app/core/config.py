from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )

    APP_NAME: str = "DK CRM API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    DATABASE_URL: str = "sqlite+aiosqlite:///./crm.db"

    SECRET_KEY: str = "changeme-use-a-strong-secret-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    UPLOAD_DIR: str = "uploads/images"
    MAX_UPLOAD_SIZE_MB: int = 5

    # ── Notifications: WhatsApp Business API (primary channel) ──────────────
    WHATSAPP_TOKEN: str = ""
    WHATSAPP_PHONE_NUMBER_ID: str = ""
    WHATSAPP_API_BASE_URL: str = "https://graph.facebook.com"
    WHATSAPP_API_VERSION: str = "v20.0"

    # ── Notifications: SMTP email (fallback channel) ─────────────────────────
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "no-reply@dkservice.com"
    SMTP_USE_TLS: bool = True

    # ── IoT Telemetry (forklift GPS/hour-meter device webhook) ───────────────
    IOT_WEBHOOK_API_KEY: str = ""

    # ── Initial admin user (seed_admin.py / scripts/rotate_admin_password.py) ─
    # Not used by the running app itself — only read by the seed/rotation
    # scripts, which fail loudly if email/password are unset.
    DEFAULT_ADMIN_EMAIL: str = ""
    DEFAULT_ADMIN_PASSWORD: str = ""
    DEFAULT_ADMIN_USERNAME: str = "admin"
    DEFAULT_ADMIN_FULL_NAME: str = "System Administrator"

    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ]

settings = Settings()

