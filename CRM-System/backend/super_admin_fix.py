import asyncio

from sqlalchemy import select

from app.core.security import hash_password as get_password_hash, verify_password
from app.database.session import AsyncSessionLocal
from app.models.user import User


async def super_admin_fix() -> None:
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(User).where(User.email == "admin@dkservice.com"))
        user = result.scalar_one_or_none()

        if user is None:
            raise RuntimeError("Admin user with email admin@dkservice.com was not found.")

        user.is_active = True
        user.hashed_password = get_password_hash("admin123")
        await db.commit()
        await db.refresh(user)

        is_valid = verify_password("admin123", user.hashed_password)
        if is_valid:
            print("VERIFICATION SUCCESS")
        else:
            print("VERIFICATION FAILED")

        print(f"Updated user: {user.email}")
        print(f"Active: {user.is_active}")
        print(f"Password hash: {user.hashed_password}")


if __name__ == "__main__":
    asyncio.run(super_admin_fix())
