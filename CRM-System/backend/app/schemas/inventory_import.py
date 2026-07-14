from pydantic import BaseModel


class InventoryImportRowError(BaseModel):
    row_number: int
    error_message: str


class InventoryImportResult(BaseModel):
    total_rows: int
    created_count: int
    updated_count: int
    error_count: int
    errors: list[InventoryImportRowError] = []
