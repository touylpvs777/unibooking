"""
One-time script: create the initial admin user in the configured database.
Reads credentials from the environment (.env) — never hardcode them here.
Run from: CRM-System/backend/
Command:  ..\\venv\\Scripts\\python seed_admin.py
"""
import asyncio
import os
import sys
from datetime import datetime, UTC

from dotenv import load_dotenv
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

load_dotenv()  # populate os.environ from .env before os.getenv() calls below

from app.database.session import AsyncSessionLocal
from app.database.base import Base
from app.database.session import engine
import app.models as _models  # noqa: F401 — registers all models with Base
from app.models.role import Role, RoleName
from app.models.user import User
from app.core.security import hash_password, verify_password


def load_admin_config() -> dict:
    email = os.getenv("DEFAULT_ADMIN_EMAIL")
    password = os.getenv("DEFAULT_ADMIN_PASSWORD")
    missing = [
        name
        for name, value in (("DEFAULT_ADMIN_EMAIL", email), ("DEFAULT_ADMIN_PASSWORD", password))
        if not value
    ]
    if missing:
        sys.exit(
            "[FAIL] Missing required environment variable(s): "
            f"{', '.join(missing)}. Set them in .env (see .env.example) before running this script."
        )

    return {
        "email": email,
        "username": os.getenv("DEFAULT_ADMIN_USERNAME", "admin"),
        "full_name": os.getenv("DEFAULT_ADMIN_FULL_NAME", "System Administrator"),
        "password": password,
    }


async def main() -> None:
    admin = load_admin_config()

    # Ensure tables exist (safe to run multiple times)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        existing = (
            await session.execute(
                select(User).where(
                    (User.email == admin["email"]) | (User.username == admin["username"])
                )
            )
        ).scalar_one_or_none()

        if existing:
            print(f"[SKIP] User already exists: {existing.email} (id={existing.id})")
        else:
            role = (
                await session.execute(
                    select(Role).where(Role.name == RoleName.SUPER_ADMIN.value)
                )
            ).scalar_one_or_none()
            if not role:
                role = Role(name=RoleName.SUPER_ADMIN.value, description="Super Administrator")
                session.add(role)
                await session.flush()

            hashed = hash_password(admin["password"])
            user = User(
                email=admin["email"],
                username=admin["username"],
                full_name=admin["full_name"],
                hashed_password=hashed,
                is_active=True,
                is_superuser=True,
                role_id=role.id,
                created_at=datetime.now(UTC),
                updated_at=datetime.now(UTC),
            )
            session.add(user)
            await session.commit()
            await session.refresh(user)
            print(f"[CREATED] id={user.id} | email={user.email} | superuser={user.is_superuser}")

        # Verify password hash is correct
        target = existing or user  # type: ignore[possibly-undefined]
        ok = verify_password(admin["password"], target.hashed_password)
        print(f"[VERIFY]  password check -> {'PASS' if ok else 'FAIL'}")


asyncio.run(main())
