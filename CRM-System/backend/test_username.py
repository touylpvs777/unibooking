import asyncio
from app.database.session import AsyncSessionLocal
from app.models.user import User
from sqlalchemy import select
async def run():
    db = AsyncSessionLocal()
    result = await db.execute(select(User).where(User.email=='admin@dkservice.com'))
    user = result.scalar_one_or_none()
    print('USERNAME:', user.username if user else 'Not found')
    await db.close()
asyncio.run(run())
