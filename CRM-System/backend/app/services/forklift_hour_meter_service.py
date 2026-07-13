import logging

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.forklift import ForkliftStatus
from app.models.forklift_hour_meter_log import ForkliftHourMeterLog
from app.repositories.forklift_hour_meter_repository import ForkliftHourMeterRepository
from app.repositories.forklift_repository import ForkliftRepository
from app.schemas.forklift import HourMeterLogCreate

logger = logging.getLogger(__name__)

_BLOCKED_STATUSES = {ForkliftStatus.DECOMMISSIONED.value, ForkliftStatus.SOLD.value}


class ForkliftHourMeterService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db
        self._repo = ForkliftHourMeterRepository(db)
        self._forklift_repo = ForkliftRepository(db)

    async def list_logs(
        self,
        forklift_id: int,
        skip: int = 0,
        limit: int = 50,
    ) -> list[ForkliftHourMeterLog]:
        await self._require_forklift(forklift_id)
        return await self._repo.get_by_forklift(forklift_id, skip=skip, limit=limit)

    async def create_log(
        self,
        forklift_id: int,
        data: HourMeterLogCreate,
        recorded_by: int,
    ) -> tuple[ForkliftHourMeterLog, bool]:
        """Returns (log_entry, has_warning). Warning = reading < previous."""
        forklift = await self._require_forklift(forklift_id)

        if forklift.status in _BLOCKED_STATUSES:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Cannot log hours for {forklift.status} forklift.",
            )

        warning = False
        previous = await self._repo.get_latest(forklift_id)
        if previous is not None and data.reading < previous.reading:
            warning = True
            logger.warning(
                "Hour meter decrease: forklift=%s previous=%.1f new=%.1f (meter reset?)",
                forklift_id, previous.reading, data.reading,
            )

        log = ForkliftHourMeterLog(
            forklift_id=forklift_id,
            reading=data.reading,
            source=data.source,
            notes=data.notes,
            recorded_by=recorded_by,
        )
        if data.recorded_at is not None:
            log.recorded_at = data.recorded_at

        log = await self._repo.create(log)

        await self._forklift_repo.update(forklift, {"current_hour_meter": data.reading})

        await self.db.commit()
        return log, warning

    async def _require_forklift(self, forklift_id: int):
        forklift = await self._forklift_repo.get_by_id(forklift_id)
        if forklift is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Forklift not found",
            )
        return forklift
