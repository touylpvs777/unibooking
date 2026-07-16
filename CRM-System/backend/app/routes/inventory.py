import logging

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.permissions import PermissionName, require_permission
from app.database.session import get_db
from app.models.activity_log import ActionType, EntityType
from app.models.user import User
from app.schemas.inventory import (
    BalanceOut, ConsumeAction, ConsumptionOut, InventoryDashboardSummary,
    POCreate, POListResponse, POOut, ReceiveItemAction,
    SparePartCreate, SparePartListResponse, SparePartOut, SparePartUpdate,
    TransactionCreate, TransactionOut, WarehouseCreate, WarehouseOut,
)
from app.schemas.inventory_import import InventoryImportResult
from app.services.activity_log_service import ActivityLogService
from app.services.inventory_import_service import InventoryImportService
from app.services.inventory_service import InventoryService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/inventory", tags=["Inventory & Spare Parts"])


# ── Dashboard ────────────────────────────────────────────────────────────────

@router.get("/dashboard", response_model=InventoryDashboardSummary)
async def dashboard(db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    return await InventoryService(db).get_dashboard()


# ── Spare Parts ──────────────────────────────────────────────────────────────

@router.get("/parts", response_model=SparePartListResponse)
async def list_parts(
    q: str | None = None, part_category: str | None = None, brand_id: int | None = None,
    is_active: bool | None = True,
    page: int = Query(default=1, ge=1), page_size: int = Query(default=20, ge=1, le=100),
    sort: str = Query(default="name", pattern="^(name|part_number|created_at|unit_price)$"),
    order: str = Query(default="asc", pattern="^(asc|desc)$"),
    db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG),
):
    return await InventoryService(db).list_parts(q=q, part_category=part_category, brand_id=brand_id, is_active=is_active, page=page, page_size=page_size, sort=sort, order=order)

@router.get("/parts/{part_id}", response_model=SparePartOut)
async def get_part(part_id: int, db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    part = await InventoryService(db).get_part(part_id)
    return SparePartOut.model_validate(part)

@router.post("/parts", response_model=SparePartOut, status_code=status.HTTP_201_CREATED)
async def create_part(data: SparePartCreate, db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    part = await InventoryService(db).create_part(data)
    return SparePartOut.model_validate(part)

@router.put("/parts/{part_id}", response_model=SparePartOut)
async def update_part(part_id: int, data: SparePartUpdate, db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    part = await InventoryService(db).update_part(part_id, data)
    return SparePartOut.model_validate(part)


@router.post("/import", response_model=InventoryImportResult, status_code=status.HTTP_200_OK)
async def import_inventory(
    file: UploadFile = File(..., description="CSV or Excel (.csv, .xlsx) spare-part list"),
    db: AsyncSession = Depends(get_db),
    current_user: User = require_permission(PermissionName.MANAGE_CATALOG),
):
    """
    Bulk insert/update spare parts from a CSV or Excel file (read with pandas).

    Expected columns (case-insensitive; common aliases accepted): SKU/part_number,
    Name, Category, Quantity, Unit Price — plus description, brand_id, unit,
    currency, min_stock_level, reorder_quantity, lead_time_days. Rows are
    upserted by part_number/SKU — an existing part is updated, a new one created,
    never duplicated. Quantity, if present, is treated as a Goods Receipt: it is
    ADDED to the default warehouse's existing on-hand stock (not an absolute
    overwrite) via an auditable RECEIVE inventory transaction.
    """
    content = await file.read()
    # Captured before the import runs: a row-level rollback inside import_file()
    # expires every ORM object tracked by this session, including current_user —
    # reading .id off it afterward could try to lazily reload it mid-sync-context.
    actor_id = current_user.id
    try:
        result = await InventoryImportService(db).import_file(content, file.filename or "upload", user_id=actor_id)
    except HTTPException:
        raise
    except Exception as exc:  # final safety net — the endpoint must never 500
        logger.exception("Unhandled failure during inventory import")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Import failed: {exc}")
    await ActivityLogService(db).log(
        user_id=actor_id,
        action=ActionType.INVENTORY_IMPORT_EXECUTED,
        entity_type=EntityType.INVENTORY_IMPORT,
        details={
            "filename": file.filename,
            "rows_imported": result.rows_imported,
            "rows_updated": result.rows_updated,
            "error_count": len(result.errors),
            "message": f"Imported {result.rows_imported}, updated {result.rows_updated} items via {file.filename}",
        },
    )
    return result


# ── Warehouses ───────────────────────────────────────────────────────────────

@router.get("/warehouses", response_model=list[WarehouseOut])
async def list_warehouses(db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    whs = await InventoryService(db).list_warehouses()
    return [WarehouseOut.model_validate(w) for w in whs]

@router.get("/warehouses/{warehouse_id}", response_model=WarehouseOut)
async def get_warehouse(warehouse_id: int, db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    wh = await InventoryService(db).get_warehouse(warehouse_id)
    return WarehouseOut.model_validate(wh)

@router.post("/warehouses", response_model=WarehouseOut, status_code=status.HTTP_201_CREATED)
async def create_warehouse(data: WarehouseCreate, db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    wh = await InventoryService(db).create_warehouse(data)
    return WarehouseOut.model_validate(wh)


# ── Balances ─────────────────────────────────────────────────────────────────

@router.get("/balances", response_model=list[BalanceOut])
async def get_balances(
    spare_part_id: int | None = None, warehouse_id: int | None = None,
    db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG),
):
    bals = await InventoryService(db).get_balances(part_id=spare_part_id, warehouse_id=warehouse_id)
    return [BalanceOut.model_validate(b) for b in bals]


# ── Transactions ─────────────────────────────────────────────────────────────

@router.get("/transactions", response_model=list[TransactionOut])
async def list_transactions(
    spare_part_id: int | None = None, warehouse_id: int | None = None,
    db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG),
):
    txns = await InventoryService(db).get_transactions(part_id=spare_part_id, warehouse_id=warehouse_id)
    return [TransactionOut.model_validate(t) for t in txns]

@router.post("/transactions", response_model=TransactionOut, status_code=status.HTTP_201_CREATED)
async def create_transaction(
    data: TransactionCreate, db: AsyncSession = Depends(get_db),
    current_user: User = require_permission(PermissionName.MANAGE_CATALOG),
):
    txn = await InventoryService(db).create_transaction(data, user_id=current_user.id)
    return TransactionOut.model_validate(txn)


# ── Purchase Orders ──────────────────────────────────────────────────────────

@router.get("/purchase-orders", response_model=POListResponse)
async def list_pos(
    status_filter: str | None = Query(default=None, alias="status"),
    page: int = Query(default=1, ge=1), page_size: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG),
):
    return await InventoryService(db).list_pos(status_filter=status_filter, page=page, page_size=page_size)

@router.get("/purchase-orders/{po_id}", response_model=POOut)
async def get_po(po_id: int, db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    po = await InventoryService(db).get_po(po_id)
    return POOut.model_validate(po)

@router.post("/purchase-orders", response_model=POOut, status_code=status.HTTP_201_CREATED)
async def create_po(data: POCreate, db: AsyncSession = Depends(get_db), current_user: User = require_permission(PermissionName.MANAGE_CATALOG)):
    po = await InventoryService(db).create_po(data, user_id=current_user.id)
    return POOut.model_validate(po)

@router.post("/purchase-orders/{po_id}/submit", response_model=POOut)
async def submit_po(po_id: int, db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG)):
    po = await InventoryService(db).submit_po(po_id)
    return POOut.model_validate(po)

@router.post("/purchase-orders/{po_id}/receive", response_model=POOut)
async def receive_po(po_id: int, items: list[ReceiveItemAction], db: AsyncSession = Depends(get_db), current_user: User = require_permission(PermissionName.MANAGE_CATALOG)):
    po = await InventoryService(db).receive_po_items(po_id, items, user_id=current_user.id)
    return POOut.model_validate(po)


# ── Consumption ──────────────────────────────────────────────────────────────

@router.post("/consume", response_model=ConsumptionOut, status_code=status.HTTP_201_CREATED)
async def consume_part(data: ConsumeAction, db: AsyncSession = Depends(get_db), current_user: User = require_permission(PermissionName.MANAGE_CATALOG)):
    c = await InventoryService(db).consume_part(data, user_id=current_user.id)
    return ConsumptionOut.model_validate(c)

@router.get("/consumptions", response_model=list[ConsumptionOut])
async def list_consumptions(
    spare_part_id: int | None = None, work_order_id: int | None = None,
    db: AsyncSession = Depends(get_db), _: User = require_permission(PermissionName.MANAGE_CATALOG),
):
    cs = await InventoryService(db).get_consumptions(part_id=spare_part_id, work_order_id=work_order_id)
    return [ConsumptionOut.model_validate(c) for c in cs]
