"""
One-off script: rotate the password of an already-existing admin user to the
value currently set in DEFAULT_ADMIN_PASSWORD (.env).

seed_admin.py intentionally never touches an existing user's password, so
this script exists to handle the one case it doesn't: an admin account that
was already created (e.g. with an old hardcoded credential) before this
project switched to env-var-driven seeding.

Run from: CRM-System/backend/
Command:  ..\\venv\\Scripts\\python scripts/rotate_admin_password.py
"""
import asyncio
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv

load_dotenv()

from sqlalchemy import select

from app.database.session import AsyncSessionLocal
from app.models.user import User
from app.core.security import hash_password, verify_password


async def main() -> None:
    email = os.getenv("DEFAULT_ADMIN_EMAIL")
    password = os.getenv("DEFAULT_ADMIN_PASSWORD")
    missing = [
        name
        for name, value in (("DEFAULT_ADMIN_EMAIL", email), ("DEFAULT_ADMIN_PASSWORD", password))
        if not value
    ]
    if missing:
        sys.exit(f"[FAIL] Missing required environment variable(s): {', '.join(missing)}")

    async with AsyncSessionLocal() as session:
        user = (
            await session.execute(select(User).where(User.email == email))
        ).scalar_one_or_none()

        if user is None:
            sys.exit(f"[FAIL] No user found with email {email} — nothing to rotate.")

        user.hashed_password = hash_password(password)
        await session.commit()
        await session.refresh(user)

        ok = verify_password(password, user.hashed_password)
        print(f"[ROTATED] id={user.id} | email={user.email}")
        print(f"[VERIFY]  password check -> {'PASS' if ok else 'FAIL'}")


asyncio.run(main())
