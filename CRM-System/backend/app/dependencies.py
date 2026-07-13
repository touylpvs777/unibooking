from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import decode_token
from app.database.session import get_db
from app.models.revoked_token import RevokedToken
from app.models.user import User
from app.services.user_service import UserService

bearer_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(credentials.credentials)
        user_id: str | None = payload.get("sub")
        if user_id is None or payload.get("type") != "access":
            raise credentials_exception
        jti: str | None = payload.get("jti")
    except ValueError:
        raise credentials_exception

    if jti:
        result = await db.execute(select(RevokedToken).where(RevokedToken.jti == jti))
        if result.scalar_one_or_none() is not None:
            raise credentials_exception

    user = await UserService(db).get_by_id(int(user_id))
    if user is None or not user.is_active:
        raise credentials_exception
    return user


async def get_current_superuser(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
    return current_user
