import logging
import uuid
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.core.config import settings
from app.core.middleware import RequestIdMiddleware, SecurityHeadersMiddleware

logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(asctime)s %(levelname)-8s [%(name)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)
from app.database.base import Base
from app.database.session import AsyncSessionLocal, engine

# Import all models so Base.metadata knows about every table before create_all runs.
import app.models as _models  # noqa: F401, E402

from app.routes import activity, auth, billing, customers, dashboard, forklifts, inventory, leads, maintenance, movements, quotations, rentals, reports, roles, users, uploads
from app.routes.catalog import router as catalog_router
from app.services.rbac_service import RBACService


async def _apply_sqlite_migrations(conn) -> None:
    """
    Non-destructive schema migrations for SQLite.
    Each block is idempotent — safe to run on every startup.
    """
    # ── leads.source ───────────────────────────────────────────────────────
    try:
        await conn.execute(text("ALTER TABLE leads ADD COLUMN source VARCHAR(50)"))
    except OperationalError:
        pass  # column already exists

    # ── activity_logs: rebuild to drop Enum CHECK constraints + add details ─
    # The original table used Enum(ActionType) which creates a CHECK constraint.
    # New ActionType values violate that constraint, so we rebuild as plain VARCHAR.
    result = await conn.execute(text("PRAGMA table_info(activity_logs)"))
    col_names = {row[1] for row in result.fetchall()}
    if "details" not in col_names:
        await conn.execute(text("""
            CREATE TABLE activity_logs_v2 (
                id       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                user_id  INTEGER REFERENCES users (id) ON DELETE SET NULL,
                action   VARCHAR(50) NOT NULL,
                entity_type VARCHAR(50),
                entity_id   INTEGER,
                details  TEXT,
                created_at DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP)
            )
        """))
        await conn.execute(text("""
            INSERT INTO activity_logs_v2 (id, user_id, action, entity_type, entity_id, created_at)
            SELECT id, user_id, action, entity_type, entity_id, created_at
            FROM activity_logs
        """))
        await conn.execute(text("DROP TABLE activity_logs"))
        await conn.execute(text(
            "ALTER TABLE activity_logs_v2 RENAME TO activity_logs"
        ))
        await conn.execute(text(
            "CREATE INDEX ix_activity_logs_user_id ON activity_logs (user_id)"
        ))
        await conn.execute(text(
            "CREATE INDEX ix_activity_logs_entity ON activity_logs (entity_type, entity_id)"
        ))
        await conn.execute(text(
            "CREATE INDEX ix_activity_logs_created_at ON activity_logs (created_at)"
        ))
        # Normalize values stored as enum NAME ("USER_LOGIN") → enum value ("user_login").
        # SQLAlchemy's Enum type stores .name by default for non-native enums.
        from app.models.activity_log import ActionType, EntityType
        for member in ActionType:
            await conn.execute(
                text("UPDATE activity_logs SET action = :val WHERE action = :name"),
                {"val": member.value, "name": member.name},
            )
        for member in EntityType:
            await conn.execute(
                text("UPDATE activity_logs SET entity_type = :val WHERE entity_type = :name"),
                {"val": member.value, "name": member.name},
            )
    else:
        # details column already exists: still run normalization in case legacy rows
        # with uppercase NAME values (USER_LOGIN) were loaded before the first migration.
        from app.models.activity_log import ActionType, EntityType
        for member in ActionType:
            await conn.execute(
                text("UPDATE activity_logs SET action = :val WHERE action = :name"),
                {"val": member.value, "name": member.name},
            )
        for member in EntityType:
            await conn.execute(
                text("UPDATE activity_logs SET entity_type = :val WHERE entity_type = :name"),
                {"val": member.value, "name": member.name},
            )


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        if settings.DATABASE_URL.startswith("sqlite"):
            await _apply_sqlite_migrations(conn)
    async with AsyncSessionLocal() as db:
        await RBACService(db).seed_roles()
    yield
    await engine.dispose()


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(customers.router, prefix="/api/v1")
app.include_router(leads.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(activity.router, prefix="/api/v1")
app.include_router(roles.router, prefix="/api/v1")
app.include_router(reports.router, prefix="/api/v1")
app.include_router(catalog_router, prefix="/api/v1/catalog")
app.include_router(forklifts.router, prefix="/api/v1")
app.include_router(quotations.router, prefix="/api/v1")
app.include_router(rentals.router, prefix="/api/v1")
app.include_router(movements.router, prefix="/api/v1")
app.include_router(maintenance.router, prefix="/api/v1")
app.include_router(inventory.router, prefix="/api/v1")
app.include_router(billing.router, prefix="/api/v1")
app.include_router(uploads.router, prefix="/api/v1")

_uploads_dir = Path(settings.UPLOAD_DIR)
_uploads_dir.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(_uploads_dir.parent)), name="uploads")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    error_id = uuid.uuid4().hex[:12]
    logger.warning(
        "Validation error [%s] %s %s — %s",
        error_id,
        request.method,
        request.url.path,
        exc.errors(),
    )
    return JSONResponse(
        status_code=422,
        content={
            "detail": exc.errors(),
            "error_id": error_id,
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    error_id = uuid.uuid4().hex[:12]
    logger.exception(
        "Unhandled error [%s] %s %s",
        error_id,
        request.method,
        request.url.path,
    )
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal error occurred. Please try again.",
            "error_id": error_id,
        },
    )


@app.get("/health", tags=["Health"])
async def health_check():
    db_ok = False
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        db_ok = True
    except Exception:
        logger.warning("Health check: database unreachable")
    return {
        "status": "healthy" if db_ok else "degraded",
        "version": settings.APP_VERSION,
        "database": "ok" if db_ok else "unreachable",
    }
