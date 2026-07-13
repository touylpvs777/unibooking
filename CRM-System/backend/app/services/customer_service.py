from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate


class CustomerService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, customer_id: int) -> Customer | None:
        result = await self.db.execute(select(Customer).where(Customer.id == customer_id))
        return result.scalar_one_or_none()

    async def get_all(self, skip: int = 0, limit: int = 100) -> list[Customer]:
        result = await self.db.execute(select(Customer).offset(skip).limit(limit))
        return list(result.scalars().all())

    async def create(self, data: CustomerCreate, created_by: int) -> Customer:
        customer = Customer(**data.model_dump(), created_by=created_by)
        self.db.add(customer)
        try:
            await self.db.commit()
            await self.db.refresh(customer)
            return customer
        except IntegrityError:
            await self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A customer with this email address already exists.",
            )

    async def update(self, customer: Customer, data: CustomerUpdate) -> Customer:
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(customer, field, value)
        try:
            await self.db.commit()
            await self.db.refresh(customer)
            return customer
        except IntegrityError:
            await self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A customer with this email address already exists.",
            )

    async def delete(self, customer: Customer) -> None:
        await self.db.delete(customer)
        await self.db.commit()
