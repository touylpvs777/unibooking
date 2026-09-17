import asyncio

from sqlalchemy import select

from app.core.security import hash_password
from app.database.session import AsyncSessionLocal
from app.models.user import User


async def reset_admin_password() -> None:
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(User).where(User.email == "admin@dkservice.com")
        )
        user = result.scalar_one_or_none()

        if user is None:
            raise RuntimeError("Admin user with email admin@dkservice.com was not found.")

        user.hashed_password = hash_password("admin123")
        await db.commit()
        print("Success: admin password reset to admin123")


if __name__ == "__main__":
    asyncio.run(reset_admin_password())
