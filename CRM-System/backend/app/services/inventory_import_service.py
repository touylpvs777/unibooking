"""
Bulk CSV/Excel import for spare-part inventory items.

Accepts a single flat sheet/CSV with a header row. Column names are matched
case-insensitively against a small alias table so common variants (e.g.
"SKU", "Part Number", "part_number") all resolve to the same field. Rows are
upserted by `part_number`: an existing part is updated in place, a new
`part_number` creates a new SparePart. Parsing/validation errors on one row
never abort the rest of the file — they're collected and returned alongside
the created/updated counts.
"""
from __future__ import annotations

import csv
import io
import logging
from typing import Any

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.spare_part import PartCategory, SparePart
from app.repositories.inventory_repository import InventoryRepository
from app.schemas.inventory_import import InventoryImportResult, InventoryImportRowError

logger = logging.getLogger(__name__)

# canonical field -> accepted header aliases (lowercased, spaces/dashes -> underscore)
_HEADER_ALIASES: dict[str, str] = {
    "part_number": "part_number", "partnumber": "part_number", "sku": "part_number",
    "part_no": "part_number", "code": "part_number",
    "name": "name", "part_name": "name", "item_name": "name", "product_name": "name",
    "description": "description", "desc": "description",
    "part_category": "part_category", "category": "part_category",
    "brand_id": "brand_id", "brand": "brand_id",
    "unit": "unit", "uom": "unit",
    "unit_price": "unit_price", "price": "unit_price",
    "currency": "currency",
    "min_stock_level": "min_stock_level", "min_stock": "min_stock_level", "min_qty": "min_stock_level",
    "reorder_quantity": "reorder_quantity", "reorder_qty": "reorder_quantity",
    "lead_time_days": "lead_time_days", "lead_time": "lead_time_days",
}

_ALLOWED_EXTENSIONS = {".csv", ".xlsx", ".xls"}
_MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def _normalize_header(raw: str) -> str | None:
    key = raw.strip().lower().replace(" ", "_").replace("-", "_")
    return _HEADER_ALIASES.get(key)


class InventoryImportService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db
        self._repo = InventoryRepository(db)

    async def import_file(self, content: bytes, filename: str) -> InventoryImportResult:
        if len(content) > _MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File exceeds the 10 MB limit.",
            )

        ext = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
        if ext not in _ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Only .csv, .xlsx, or .xls files are accepted.",
            )

        rows = self._parse_csv(content) if ext == ".csv" else self._parse_excel(content)

        created_count = 0
        updated_count = 0
        errors: list[InventoryImportRowError] = []

        for row_number, row in rows:
            try:
                created = await self._upsert_row(row)
                await self.db.commit()
                if created:
                    created_count += 1
                else:
                    updated_count += 1
            except ValueError as exc:
                await self.db.rollback()
                errors.append(InventoryImportRowError(row_number=row_number, error_message=str(exc)))
            except Exception as exc:  # defensive — one bad row must not abort the batch
                logger.exception("Unexpected error importing inventory row %s", row_number)
                await self.db.rollback()
                errors.append(InventoryImportRowError(row_number=row_number, error_message=str(exc)))

        return InventoryImportResult(
            total_rows=created_count + updated_count + len(errors),
            created_count=created_count,
            updated_count=updated_count,
            error_count=len(errors),
            errors=errors,
        )

    # ── Parsing ──────────────────────────────────────────────────────────────

    def _parse_csv(self, content: bytes) -> list[tuple[int, dict[str, str]]]:
        text = content.decode("utf-8-sig")
        reader = csv.reader(io.StringIO(text))
        try:
            header = next(reader)
        except StopIteration:
            return []
        field_map = self._build_field_map(header)

        rows: list[tuple[int, dict[str, str]]] = []
        for row_number, raw_row in enumerate(reader, start=2):  # row 1 is the header
            if not any(cell.strip() for cell in raw_row):
                continue
            row = {
                field: raw_row[idx].strip()
                for field, idx in field_map.items()
                if idx < len(raw_row) and raw_row[idx].strip()
            }
            if row:
                rows.append((row_number, row))
        return rows

    def _parse_excel(self, content: bytes) -> list[tuple[int, dict[str, str]]]:
        try:
            import openpyxl
            wb = openpyxl.load_workbook(io.BytesIO(content), read_only=True, data_only=True)
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Cannot open workbook: {exc}",
            )

        ws = wb[wb.sheetnames[0]]
        rows_iter = ws.iter_rows(values_only=True)
        try:
            header = [str(c) if c is not None else "" for c in next(rows_iter)]
        except StopIteration:
            wb.close()
            return []
        field_map = self._build_field_map(header)

        rows: list[tuple[int, dict[str, str]]] = []
        for row_number, raw_row in enumerate(rows_iter, start=2):
            if raw_row is None or not any(c is not None and str(c).strip() for c in raw_row):
                continue
            row = {
                field: str(raw_row[idx]).strip()
                for field, idx in field_map.items()
                if idx < len(raw_row) and raw_row[idx] is not None and str(raw_row[idx]).strip()
            }
            if row:
                rows.append((row_number, row))
        wb.close()
        return rows

    @staticmethod
    def _build_field_map(header: list[str]) -> dict[str, int]:
        field_map: dict[str, int] = {}
        for idx, raw in enumerate(header):
            field = _normalize_header(raw or "")
            if field and field not in field_map:
                field_map[field] = idx
        return field_map

    # ── Row upsert ───────────────────────────────────────────────────────────

    async def _upsert_row(self, row: dict[str, str]) -> bool:
        """Returns True if a new SparePart was created, False if updated."""
        part_number = row.get("part_number", "").strip()
        name = row.get("name", "").strip()
        if not part_number:
            raise ValueError("Missing required column 'part_number'")
        if not name:
            raise ValueError("Missing required column 'name'")

        fields = self._coerce_fields(row)
        existing = await self._repo.get_part_by_number(part_number)

        if existing:
            fields.pop("part_number", None)  # never move an existing row to a different key
            await self._repo.update_part(existing, fields)
            return False

        part = SparePart(part_number=part_number, name=name, **{k: v for k, v in fields.items() if k != "name"})
        await self._repo.create_part(part)
        return True

    @staticmethod
    def _coerce_fields(row: dict[str, str]) -> dict[str, Any]:
        fields: dict[str, Any] = {}
        if "name" in row:
            fields["name"] = row["name"].strip()
        if "description" in row:
            fields["description"] = row["description"].strip()
        if "unit" in row:
            fields["unit"] = row["unit"].strip()
        if "currency" in row:
            fields["currency"] = row["currency"].strip().upper()

        if "part_category" in row:
            raw_cat = row["part_category"].strip().lower()
            try:
                fields["part_category"] = PartCategory(raw_cat).value
            except ValueError:
                fields["part_category"] = PartCategory.GENERAL.value

        for key in ("brand_id", "min_stock_level", "reorder_quantity", "lead_time_days"):
            if key in row:
                try:
                    fields[key] = int(float(row[key]))
                except ValueError:
                    raise ValueError(f"Invalid integer value for '{key}': {row[key]!r}")

        if "unit_price" in row:
            try:
                fields["unit_price"] = float(row["unit_price"])
            except ValueError:
                raise ValueError(f"Invalid numeric value for 'unit_price': {row['unit_price']!r}")

        return fields
