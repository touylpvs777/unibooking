from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

from app.models.customer import CustomerStatus


class CustomerBase(BaseModel):
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    email: EmailStr | None = None
    phone: str | None = None
    company: str | None = None
    status: CustomerStatus = CustomerStatus.PROSPECT
    notes: str | None = None
    assigned_to: int | None = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    company: str | None = None
    status: CustomerStatus | None = None
    notes: str | None = None
    assigned_to: int | None = None


class CustomerOut(CustomerBase):
    model_config = {"from_attributes": True}

    id: int
    created_by: int | None = None
    created_at: datetime
    updated_at: datetime | None = None
