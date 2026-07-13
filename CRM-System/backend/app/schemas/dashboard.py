from pydantic import BaseModel


class TrendPoint(BaseModel):
    month: str  # "YYYY-MM"
    count: int


class LeadMetrics(BaseModel):
    total: int
    # conversion_rate: won leads out of all leads ever entered
    conversion_rate: float
    # win_rate / lost_rate: of concluded (won + lost) leads
    win_rate: float
    lost_rate: float
    by_status: dict[str, int]
    by_source: dict[str, int]


class DashboardSummary(BaseModel):
    # ── Customers ──────────────────────────────────────────────────────────
    total_customers: int
    active_customers: int
    prospect_customers: int

    # ── Leads (counts) ─────────────────────────────────────────────────────
    total_leads: int
    new_leads: int
    contacted_leads: int
    qualified_leads: int
    proposal_leads: int
    won_leads: int
    lost_leads: int
    leads_by_source: dict[str, int]

    # ── Lead rates (%) ─────────────────────────────────────────────────────
    conversion_rate: float  # won / total_leads × 100
    win_rate: float         # won / (won + lost) × 100
    lost_rate: float        # lost / (won + lost) × 100
