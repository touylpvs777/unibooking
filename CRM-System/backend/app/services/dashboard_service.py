from datetime import date, datetime
from sqlalchemy import case, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.customer import Customer, CustomerStatus
from app.models.lead import Lead, LeadStatus
from app.schemas.dashboard import DashboardSummary, LeadMetrics, TrendPoint


# ── Helpers ────────────────────────────────────────────────────────────────────


def _month_range(months: int) -> list[str]:
    """Return a list of 'YYYY-MM' strings for the last N months, oldest first."""
    today = date.today()
    result: list[str] = []
    for i in range(months - 1, -1, -1):
        m = today.month - i
        y = today.year
        while m <= 0:
            m += 12
            y -= 1
        result.append(f"{y:04d}-{m:02d}")
    return result


def _cutoff_from_months(months: int) -> datetime:
    """Return the datetime of the first day of the earliest month in _month_range(months)."""
    first = _month_range(months)[0]
    y, m = map(int, first.split("-"))
    return datetime(y, m, 1)


def _month_expr(column):
    """Database-agnostic 'YYYY-MM' expression for grouping by month."""
    if settings.DATABASE_URL.startswith("sqlite"):
        return func.strftime("%Y-%m", column)
    # PostgreSQL
    return func.to_char(func.date_trunc("month", column), "YYYY-MM")


def _rate(numerator: int, denominator: int) -> float:
    return round(numerator / denominator * 100, 1) if denominator else 0.0


# ── Service ────────────────────────────────────────────────────────────────────


class DashboardService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    # ── Summary ────────────────────────────────────────────────────────────

    async def get_summary(self) -> DashboardSummary:
        customer_row = (
            await self.db.execute(
                select(
                    func.count(Customer.id).label("total"),
                    func.count(
                        case((Customer.status == CustomerStatus.ACTIVE, 1))
                    ).label("active"),
                    func.count(
                        case((Customer.status == CustomerStatus.PROSPECT, 1))
                    ).label("prospect"),
                )
            )
        ).one()

        lead_row = (
            await self.db.execute(
                select(
                    func.count(Lead.id).label("total"),
                    func.count(case((Lead.status == LeadStatus.NEW, 1))).label("new"),
                    func.count(case((Lead.status == LeadStatus.CONTACTED, 1))).label("contacted"),
                    func.count(case((Lead.status == LeadStatus.QUALIFIED, 1))).label("qualified"),
                    func.count(case((Lead.status == LeadStatus.PROPOSAL, 1))).label("proposal"),
                    func.count(case((Lead.status == LeadStatus.WON, 1))).label("won"),
                    func.count(case((Lead.status == LeadStatus.LOST, 1))).label("lost"),
                )
            )
        ).one()

        source_rows = (
            await self.db.execute(
                select(Lead.source, func.count(Lead.id).label("cnt"))
                .group_by(Lead.source)
            )
        ).all()
        leads_by_source: dict[str, int] = {
            (row.source or "unknown"): row.cnt for row in source_rows
        }

        total: int = lead_row.total or 0
        won: int = lead_row.won or 0
        lost: int = lead_row.lost or 0
        concluded = won + lost

        return DashboardSummary(
            total_customers=customer_row.total,
            active_customers=customer_row.active,
            prospect_customers=customer_row.prospect,
            total_leads=total,
            new_leads=lead_row.new,
            contacted_leads=lead_row.contacted,
            qualified_leads=lead_row.qualified,
            proposal_leads=lead_row.proposal,
            won_leads=won,
            lost_leads=lost,
            leads_by_source=leads_by_source,
            conversion_rate=_rate(won, total),
            win_rate=_rate(won, concluded),
            lost_rate=_rate(lost, concluded),
        )

    # ── Trend charts ───────────────────────────────────────────────────────

    async def get_lead_trend(self, months: int = 12) -> list[TrendPoint]:
        cutoff = _cutoff_from_months(months)
        month_col = _month_expr(Lead.created_at)
        rows = (
            await self.db.execute(
                select(month_col.label("month"), func.count(Lead.id).label("count"))
                .where(Lead.created_at >= cutoff)
                .group_by(month_col)
                .order_by(month_col)
            )
        ).all()
        data = {row.month: row.count for row in rows}
        return [TrendPoint(month=m, count=data.get(m, 0)) for m in _month_range(months)]

    async def get_customer_trend(self, months: int = 12) -> list[TrendPoint]:
        cutoff = _cutoff_from_months(months)
        month_col = _month_expr(Customer.created_at)
        rows = (
            await self.db.execute(
                select(month_col.label("month"), func.count(Customer.id).label("count"))
                .where(Customer.created_at >= cutoff)
                .group_by(month_col)
                .order_by(month_col)
            )
        ).all()
        data = {row.month: row.count for row in rows}
        return [TrendPoint(month=m, count=data.get(m, 0)) for m in _month_range(months)]

    # ── Lead metrics ───────────────────────────────────────────────────────

    async def get_lead_metrics(self) -> LeadMetrics:
        lead_row = (
            await self.db.execute(
                select(
                    func.count(Lead.id).label("total"),
                    func.count(case((Lead.status == LeadStatus.NEW, 1))).label("new"),
                    func.count(case((Lead.status == LeadStatus.CONTACTED, 1))).label("contacted"),
                    func.count(case((Lead.status == LeadStatus.QUALIFIED, 1))).label("qualified"),
                    func.count(case((Lead.status == LeadStatus.PROPOSAL, 1))).label("proposal"),
                    func.count(case((Lead.status == LeadStatus.WON, 1))).label("won"),
                    func.count(case((Lead.status == LeadStatus.LOST, 1))).label("lost"),
                )
            )
        ).one()

        source_rows = (
            await self.db.execute(
                select(Lead.source, func.count(Lead.id).label("cnt"))
                .group_by(Lead.source)
            )
        ).all()

        total: int = lead_row.total or 0
        won: int = lead_row.won or 0
        lost: int = lead_row.lost or 0
        concluded = won + lost

        return LeadMetrics(
            total=total,
            conversion_rate=_rate(won, total),
            win_rate=_rate(won, concluded),
            lost_rate=_rate(lost, concluded),
            by_status={
                "new": lead_row.new,
                "contacted": lead_row.contacted,
                "qualified": lead_row.qualified,
                "proposal": lead_row.proposal,
                "won": won,
                "lost": lost,
            },
            by_source={(row.source or "unknown"): row.cnt for row in source_rows},
        )
