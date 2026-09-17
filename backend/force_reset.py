import asyncio

from sqlalchemy import select

from app.core.security import hash_password
from app.database.session import AsyncSessionLocal
from app.models.user import User


async def force_reset_admin() -> None:
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(User).where(User.email == "admin@dkservice.com")
        )
        user = result.scalar_one_or_none()

        if user is None:
            raise RuntimeError("Admin user with email admin@dkservice.com was not found.")

        new_hash = hash_password("admin123")
        user.hashed_password = new_hash
        await db.commit()

        print("Success: admin password reset to admin123")
        print(f"New hash: {new_hash}")


if __name__ == "__main__":
    asyncio.run(force_reset_admin())
