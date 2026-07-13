from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.permissions import PermissionName, require_permission
from app.database.session import get_db
from app.models.user import User
from app.schemas.dashboard import DashboardSummary, LeadMetrics, TrendPoint
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=DashboardSummary)
async def get_summary(
    db: AsyncSession = Depends(get_db),
    _: User = require_permission(PermissionName.VIEW_DASHBOARD),
):
    return await DashboardService(db).get_summary()


@router.get(
    "/lead-trend",
    response_model=list[TrendPoint],
    summary="Monthly lead creation trend",
)
async def get_lead_trend(
    months: int = Query(default=12, ge=1, le=24, description="Number of months to look back"),
    db: AsyncSession = Depends(get_db),
    _: User = require_permission(PermissionName.VIEW_DASHBOARD),
):
    return await DashboardService(db).get_lead_trend(months=months)


@router.get(
    "/customer-trend",
    response_model=list[TrendPoint],
    summary="Monthly customer creation trend",
)
async def get_customer_trend(
    months: int = Query(default=12, ge=1, le=24, description="Number of months to look back"),
    db: AsyncSession = Depends(get_db),
    _: User = require_permission(PermissionName.VIEW_DASHBOARD),
):
    return await DashboardService(db).get_customer_trend(months=months)


@router.get(
    "/lead-metrics",
    response_model=LeadMetrics,
    summary="Lead conversion, win rate, lost rate and breakdowns",
)
async def get_lead_metrics(
    db: AsyncSession = Depends(get_db),
    _: User = require_permission(PermissionName.VIEW_DASHBOARD),
):
    return await DashboardService(db).get_lead_metrics()
