import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Users, ClipboardList, Truck, DollarSign, Wrench, FileText,
  CalendarClock, Gauge, Activity, TrendingUp,
  AlertTriangle,
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts'
import { ChartCard, HorizontalBarChart } from '@/components/charts'
import type { LucideIcon } from 'lucide-react'
import type { Forklift } from '@/types/forklift'
import type { RentalContract } from '@/types/rental'
import type { Quotation } from '@/types/quotation'
import type { ActivityLog } from '@/types/activity'
import type { BarItem } from '@/components/charts/DistributionBarChart'
import './DashboardWidgets.css'

/* ================================================================
   KPI Card
   ================================================================ */

interface KpiCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  accent: string
  iconBg: string
  href: string
  sub?: string
  alert?: { text: string; variant: 'warning' | 'danger' }
}

export function KpiCard({ label, value, icon: Icon, accent, iconBg, href, sub, alert }: KpiCardProps) {
  return (
    <Link to={href} className="kpi-card" style={{ '--kpi-accent': accent, '--kpi-icon-bg': iconBg } as React.CSSProperties}>
      <div className="kpi-card-header">
        <span className="kpi-card-label">{label}</span>
        <div className="kpi-card-icon"><Icon size={18} /></div>
      </div>
      <div className="kpi-card-value">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      {sub && <div className="kpi-card-sub">{sub}</div>}
      {alert && (
        <div className={`kpi-card-alert ${alert.variant}`}>
          <AlertTriangle size={11} /> {alert.text}
        </div>
      )}
    </Link>
  )
}

export function KpiCardSkeleton() {
  return (
    <div className="kpi-card kpi-card-skeleton">
      <div className="kpi-card-header">
        <div className="skeleton-cell" style={{ height: 12, width: '60%' }} />
        <div className="skeleton-cell" style={{ height: 36, width: 36, borderRadius: 'var(--radius-md)' }} />
      </div>
      <div className="skeleton-cell" style={{ height: 26, width: '45%' }} />
    </div>
  )
}

/* ================================================================
   KPI Strip (8 cards)
   ================================================================ */

interface KpiStripProps {
  kpis: {
    totalCustomers: number; activeRentals: number; overdueRentals: number
    availableForklifts: number; totalFleet: number; activeRevenue: number
    upcomingPm: number; criticalPm: number; openQuotations: number
    pipelineValue: number; upcomingReturns: number; urgentReturns: number
    fleetUtilization: number; rentedCount: number
  }
  loading: boolean
}

export function KpiStrip({ kpis, loading }: KpiStripProps) {
  if (loading) return <div className="kpi-strip">{Array.from({ length: 8 }).map((_, i) => <KpiCardSkeleton key={i} />)}</div>

  const fmtCurrency = (n: number) => {
    if (n >= 1_000_000) return `฿${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `฿${(n / 1_000).toFixed(0)}K`
    return `฿${n.toLocaleString()}`
  }

  return (
    <div className="kpi-strip">
      <KpiCard label="Total Customers" value={kpis.totalCustomers} icon={Users} accent="#2563eb" iconBg="#eff6ff" href="/customers" sub={`${kpis.totalCustomers} in system`} />
      <KpiCard label="Active Rentals" value={kpis.activeRentals} icon={ClipboardList} accent="#7c3aed" iconBg="#f5f3ff" href="/rental-contracts"
        alert={kpis.overdueRentals > 0 ? { text: `${kpis.overdueRentals} overdue`, variant: 'danger' } : undefined} />
      <KpiCard label="Available Forklifts" value={kpis.availableForklifts} icon={Truck} accent="#0d9488" iconBg="#f0fdfa" href="/equipment" sub={`${kpis.totalFleet} total fleet`}
        alert={kpis.upcomingPm > 0 ? { text: `${kpis.upcomingPm} PM due`, variant: 'warning' } : undefined} />
      <KpiCard label="Revenue (Active)" value={fmtCurrency(kpis.activeRevenue)} icon={DollarSign} accent="#16a34a" iconBg="#f0fdf4" href="/rental-contracts" />
      <KpiCard label="Upcoming PM" value={kpis.upcomingPm} icon={Wrench} accent="#d97706" iconBg="#fffbeb" href="/equipment"
        alert={kpis.criticalPm > 0 ? { text: `${kpis.criticalPm} critical`, variant: 'danger' } : undefined} />
      <KpiCard label="Open Quotations" value={kpis.openQuotations} icon={FileText} accent="#2563eb" iconBg="#eff6ff" href="/quotations" sub={`${fmtCurrency(kpis.pipelineValue)} pipeline`} />
      <KpiCard label="Upcoming Returns" value={kpis.upcomingReturns} icon={CalendarClock} accent="#0891b2" iconBg="#ecfeff" href="/rental-contracts"
        alert={kpis.urgentReturns > 0 ? { text: `${kpis.urgentReturns} this week`, variant: 'danger' } : undefined} />
      <KpiCard label="Fleet Utilization" value={`${kpis.fleetUtilization}%`} icon={Gauge} accent="#7c3aed" iconBg="#f5f3ff" href="/equipment" sub={`${kpis.rentedCount} of ${kpis.totalFleet} rented`} />
    </div>
  )
}

/* ================================================================
   Revenue Chart
   ================================================================ */

const TICK_STYLE = { fontSize: 11, fill: '#94a3b8' } as const
const TOOLTIP_STYLE = { fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' } as const

function fmtMonth(m: string) {
  const [y, mo] = m.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(mo, 10) - 1]} '${y.slice(2)}`
}

export function RevenueChart({ data, loading }: { data: { month: string; revenue: number }[]; loading: boolean }) {
  const total = data.reduce((s, d) => s + d.revenue, 0)
  const formatted = data.map((d) => ({ ...d, month: fmtMonth(d.month) }))

  return (
    <ChartCard title="Monthly Rental Revenue" sub={`Total: ฿${total.toLocaleString()}`} loading={loading} isEmpty={data.length === 0} emptyMessage="No revenue data yet" height={240}>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={formatted} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={TICK_STYLE} />
          <YAxis tick={TICK_STYLE} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`฿${Number(v).toLocaleString()}`, 'Revenue']} labelStyle={{ fontWeight: 600, color: 'var(--color-chart-label)' }} />
          <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revGrad)" dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

/* ================================================================
   Fleet Status Donut
   ================================================================ */

export function FleetStatusDonut({ data, loading }: { data: { name: string; value: number; color: string }[]; loading: boolean }) {
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <ChartCard title="Fleet Status" loading={loading} isEmpty={data.length === 0} emptyMessage="No fleet data" height={240}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 180, height: 180, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                {data.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <div className="donut-center-value">{total}</div>
            <div className="donut-center-label">total</div>
          </div>
        </div>
        <div className="donut-legend">
          {data.map((d) => (
            <div key={d.name} className="donut-legend-item">
              <span className="donut-legend-dot" style={{ background: d.color }} />
              <span className="donut-legend-label">{d.name}</span>
              <span className="donut-legend-value">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

/* ================================================================
   Fleet Breakdown Charts (reuse existing HorizontalBarChart)
   ================================================================ */

const FUEL_COLORS: Record<string, string> = { diesel: '#f59e0b', electric: '#22c55e', lpg: '#3b82f6', dual_fuel: '#7c3aed', unknown: '#94a3b8' }

export function FleetByFuelChart({ data, loading }: { data: BarItem[]; loading: boolean }) {
  const { t } = useTranslation()
  return (
    <ChartCard title={t('dashboard.chart.fleetByFuelType')} loading={loading} isEmpty={data.length === 0} height={200}>
      <HorizontalBarChart data={data} colorMap={FUEL_COLORS} label={t('dashboard.chart.units')} height={200} />
    </ChartCard>
  )
}

export function FleetByBrandChart({ data, loading }: { data: BarItem[]; loading: boolean }) {
  return (
    <ChartCard title="Fleet by Brand" loading={loading} isEmpty={data.length === 0} height={200}>
      <HorizontalBarChart data={data} defaultColor="#3b82f6" label="Units" height={200} labelWidth={90} />
    </ChartCard>
  )
}

/* ================================================================
   Recent Activity Feed
   ================================================================ */

const ENTITY_ICONS: Record<string, LucideIcon> = {
  customer: Users, lead: TrendingUp, user: Users,
}

function relativeTime(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function actionLabel(action: string): string {
  return action.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function RecentActivityFeed({ activities, loading }: { activities: ActivityLog[]; loading: boolean }) {
  if (loading) return <div className="activity-feed-card"><div className="activity-empty">Loading activity...</div></div>

  return (
    <div className="activity-feed-card">
      <div className="activity-feed-header">
        <span className="activity-feed-header-title"><Activity size={16} /> Recent Activity</span>
        <Link to="/activity" className="activity-feed-link">View All →</Link>
      </div>
      {activities.length === 0 ? (
        <div className="activity-empty">No recent activity</div>
      ) : (
        activities.map((a) => {
          const Icon = ENTITY_ICONS[a.entity_type ?? ''] ?? Activity
          return (
            <div key={a.id} className="activity-item">
              <div className="activity-item-icon"><Icon size={14} /></div>
              <div className="activity-item-content">
                <div className="activity-item-text">{actionLabel(a.action)}</div>
                <div className="activity-item-meta">
                  {a.user?.full_name ?? a.user?.username ?? 'System'} · {relativeTime(a.created_at)}
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

/* ================================================================
   Expiring Contracts Card
   ================================================================ */

function daysUntil(d: string) { return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000) }
function urgencyClass(days: number) { return days <= 7 ? 'urgent' : days <= 14 ? 'warning' : 'normal' }

export function ExpiringContractsCard({ contracts, loading }: { contracts: RentalContract[]; loading: boolean }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (loading) return <div className="task-card"><div className="task-empty">{t('dashboard.task.loading')}</div></div>

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-card-title"><ClipboardList size={14} /> {t('dashboard.task.contractsExpiring')}</span>
        <span className="task-card-count">{t('dashboard.task.countInDays', { count: contracts.length, days: 30 })}</span>
      </div>
      <div className="task-card-body">
        {contracts.length === 0 ? (
          <div className="task-empty">{t('dashboard.task.noContractsExpiring')}</div>
        ) : (
          contracts.map((c) => {
            const days = daysUntil(c.end_date)
            return (
              <div key={c.id} className="task-item" onClick={() => navigate(`/rental-contracts/${c.id}`)}>
                <div className="task-item-left">
                  <div className="task-item-id">{c.contract_number}</div>
                  <div className="task-item-sub">{c.customer.first_name} {c.customer.last_name}{c.customer.company ? ` (${c.customer.company})` : ''}</div>
                </div>
                <div className="task-item-right">
                  <div className={`task-item-days ${urgencyClass(days)}`}>{days}d</div>
                  <div className="task-item-amount">{c.total_value.toLocaleString()} {c.currency}</div>
                </div>
              </div>
            )
          })
        )}
      </div>
      <div className="task-card-footer"><Link to="/rental-contracts">{t('dashboard.task.viewAllContracts')}</Link></div>
    </div>
  )
}

/* ================================================================
   Expiring Quotations Card
   ================================================================ */

export function ExpiringQuotationsCard({ quotations, loading }: { quotations: Quotation[]; loading: boolean }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (loading) return <div className="task-card"><div className="task-empty">{t('dashboard.task.loading')}</div></div>

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-card-title"><FileText size={14} /> {t('dashboard.task.quotationsExpiring')}</span>
        <span className="task-card-count">{t('dashboard.task.countInDays', { count: quotations.length, days: 14 })}</span>
      </div>
      <div className="task-card-body">
        {quotations.length === 0 ? (
          <div className="task-empty">{t('dashboard.task.noQuotationsExpiring')}</div>
        ) : (
          quotations.map((q) => {
            const days = q.valid_until ? daysUntil(q.valid_until) : 99
            return (
              <div key={q.id} className="task-item" onClick={() => navigate(`/quotations/${q.id}`)}>
                <div className="task-item-left">
                  <div className="task-item-id">{q.quotation_number}</div>
                  <div className="task-item-sub">{q.title}</div>
                </div>
                <div className="task-item-right">
                  <div className={`task-item-days ${urgencyClass(days)}`}>{days}d</div>
                  <div className="task-item-amount">{q.total_amount.toLocaleString()} {q.currency}</div>
                </div>
              </div>
            )
          })
        )}
      </div>
      <div className="task-card-footer"><Link to="/quotations">{t('dashboard.task.viewAllQuotations')}</Link></div>
    </div>
  )
}

/* ================================================================
   PM Due Card
   ================================================================ */

export function PmDueCard({ forklifts, loading }: { forklifts: Forklift[]; loading: boolean }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const threshold = 5000
  if (loading) return <div className="task-card"><div className="task-empty">{t('dashboard.task.loading')}</div></div>

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-card-title"><Wrench size={14} /> {t('dashboard.task.pmServiceDue')}</span>
        <span className="task-card-count">{t('dashboard.task.approaching', { count: forklifts.length })}</span>
      </div>
      <div className="task-card-body">
        {forklifts.length === 0 ? (
          <div className="task-empty">{t('dashboard.task.allWithinServiceRange')}</div>
        ) : (
          forklifts.map((f) => {
            const pct = Math.min((f.current_hour_meter / threshold) * 100, 100)
            const color = pct < 80 ? '#22c55e' : pct < 92 ? '#f59e0b' : '#ef4444'
            return (
              <div key={f.id} className="task-item" onClick={() => navigate(`/equipment/${f.id}`)}>
                <div className="task-item-left">
                  <div className="task-item-id">{f.serial_number}</div>
                  <div className="task-item-sub">{f.name_en}</div>
                  <div className="pm-bar">
                    <div className="pm-bar-track"><div className="pm-bar-fill" style={{ width: `${pct}%`, background: color }} /></div>
                    <div className="pm-bar-label">
                      <span>{t('dashboard.task.hoursMeter', { hours: f.current_hour_meter.toLocaleString() })}</span>
                      <span>{Math.round(pct)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
      <div className="task-card-footer"><Link to="/equipment">{t('dashboard.task.viewAllEquipment')}</Link></div>
    </div>
  )
}
