import asyncio
from datetime import datetime, timedelta

from sqlalchemy import func, select

from app.database.session import AsyncSessionLocal
from app.models.inventory_balance import InventoryBalance
from app.models.inventory_transaction import InventoryTransaction, TransactionType
from app.models.spare_part import SparePart
from app.models.user import User
from app.models.warehouse import Warehouse

SEED_WAREHOUSES = [
    {"code": "WH-001", "name": "Main Yard", "address": "DK Rental HQ, Vientiane"},
    {"code": "WH-002", "name": "Service Bay", "address": "Service Center, Pakse"},
]

SEED_PARTS = [
    {
        "part_number": "DK-HY-1001",
        "name": "Hydraulic Hose Kit",
        "description": "Heavy-duty hydraulic hose assembly for forklift loader arms.",
        "part_category": "hydraulic",
        "unit": "set",
        "unit_price": 320.0,
        "currency": "LAK",
        "quantity": 6,
        "unit_cost": 280.0,
        "notes": "Received from approved OEM supplier for rental fleet maintenance.",
    },
    {
        "part_number": "DK-BR-1002",
        "name": "Brake Pad Set",
        "description": "Front brake pad set for compact forklift units.",
        "part_category": "brake",
        "unit": "set",
        "unit_price": 190.0,
        "currency": "LAK",
        "quantity": 8,
        "unit_cost": 165.0,
        "notes": "Safety-critical maintenance stock for quick replacement.",
    },
    {
        "part_number": "DK-FI-1003",
        "name": "Air Filter Cartridge",
        "description": "Industrial air filter for engine intake system.",
        "part_category": "filter",
        "unit": "piece",
        "unit_price": 85.0,
        "currency": "LAK",
        "quantity": 12,
        "unit_cost": 72.0,
        "notes": "Routine fleet service receipt for preventive maintenance.",
    },
    {
        "part_number": "DK-EL-1004",
        "name": "Battery Cable Assembly",
        "description": "Forklift battery power cable with insulated terminals.",
        "part_category": "electrical",
        "unit": "piece",
        "unit_price": 240.0,
        "currency": "LAK",
        "quantity": 5,
        "unit_cost": 215.0,
        "notes": "Electrical repair stock for battery swap operations.",
    },
    {
        "part_number": "DK-CH-1005",
        "name": "Drive Chain Link",
        "description": "Replacement oversize drive chain segment for mast drive unit.",
        "part_category": "chain",
        "unit": "piece",
        "unit_price": 150.0,
        "currency": "LAK",
        "quantity": 7,
        "unit_cost": 128.0,
        "notes": "Goods receipt captured during scheduled seasonal inventory review.",
    },
]


async def ensure_admin_user(db) -> User:
    result = await db.execute(select(User).where(User.username == "admin"))
    user = result.scalar_one_or_none()
    if user is not None:
        return user

    result = await db.execute(select(User).where(User.email == "admin@dkservice.com"))
    user = result.scalar_one_or_none()
    if user is not None:
        return user

    raise RuntimeError("Admin user was not found in the active database. Seed cannot continue.")


async def ensure_warehouse(db, code: str, name: str, address: str | None) -> Warehouse:
    result = await db.execute(select(Warehouse).where(Warehouse.code == code))
    warehouse = result.scalar_one_or_none()
    if warehouse is None:
        warehouse = Warehouse(code=code, name=name, address=address, is_active=True)
        db.add(warehouse)
        await db.flush()
    return warehouse


async def ensure_part(db, item: dict) -> SparePart:
    result = await db.execute(select(SparePart).where(SparePart.part_number == item["part_number"]))
    part = result.scalar_one_or_none()
    if part is None:
        part = SparePart(
            part_number=item["part_number"],
            name=item["name"],
            description=item["description"],
            part_category=item["part_category"],
            unit=item["unit"],
            unit_price=item["unit_price"],
            currency=item["currency"],
            min_stock_level=3,
            reorder_quantity=5,
            lead_time_days=7,
            image_url=None,
            is_active=True,
        )
        db.add(part)
        await db.flush()
    return part


async def ensure_transaction(db, warehouse_id: int, part_id: int, user_id: int, item: dict, index: int) -> None:
    transaction_count = await db.scalar(
        select(func.count(InventoryTransaction.id)).where(
            InventoryTransaction.spare_part_id == part_id,
            InventoryTransaction.warehouse_id == warehouse_id,
            InventoryTransaction.transaction_type == TransactionType.RECEIVE.value,
        )
    )
    if transaction_count and transaction_count > 0:
        return

    timestamp = datetime.utcnow() - timedelta(days=index)
    txn = InventoryTransaction(
        transaction_number=f"GR-{datetime.utcnow().strftime('%y%m%d')}-{index + 1:03d}",
        transaction_type=TransactionType.RECEIVE.value,
        spare_part_id=part_id,
        warehouse_id=warehouse_id,
        quantity=float(item["quantity"]),
        unit_cost=float(item["unit_cost"]),
        total_cost=float(item["quantity"]) * float(item["unit_cost"]),
        reference_type="purchase_order",
        reference_id=1000 + index,
        notes=item["notes"],
        created_by=user_id,
        created_at=timestamp,
    )
    db.add(txn)
    await db.flush()

    balance = await db.scalar(
        select(InventoryBalance).where(
            InventoryBalance.spare_part_id == part_id,
            InventoryBalance.warehouse_id == warehouse_id,
        )
    )
    if balance is None:
        balance = InventoryBalance(
            spare_part_id=part_id,
            warehouse_id=warehouse_id,
            quantity_on_hand=0.0,
            quantity_reserved=0.0,
            quantity_available=0.0,
            last_count_date=timestamp,
        )
        db.add(balance)
        await db.flush()

    balance.quantity_on_hand += float(item["quantity"])
    balance.quantity_available = balance.quantity_on_hand - balance.quantity_reserved
    balance.last_count_date = timestamp


async def seed_inventory() -> None:
    async with AsyncSessionLocal() as db:
        admin = await ensure_admin_user(db)

        warehouses = {}
        for row in SEED_WAREHOUSES:
            warehouse = await ensure_warehouse(db, row["code"], row["name"], row["address"])
            warehouses[row["code"]] = warehouse.id

        for idx, item in enumerate(SEED_PARTS):
            part = await ensure_part(db, item)
            warehouse_id = warehouses[SEED_WAREHOUSES[idx % len(SEED_WAREHOUSES)]["code"]]
            await ensure_transaction(db, warehouse_id, part.id, admin.id, item, idx)

        await db.commit()

        summary = await db.execute(
            select(func.count(InventoryTransaction.id)).where(InventoryTransaction.transaction_type == TransactionType.RECEIVE.value)
        )
        print(f"Seed complete: {summary.scalar_one()} goods-receive transactions inserted.")
        print("Warehouse IDs:", warehouses)


asyncio.run(seed_inventory())
