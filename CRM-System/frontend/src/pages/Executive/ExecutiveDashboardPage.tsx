import { useState, useEffect, useCallback } from 'react'
import {
  AlertCircle, RefreshCw, Download, TrendingUp, Users,
  Truck, DollarSign, Package, Wrench, BarChart2, PieChart,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePie, Pie, Cell, BarChart, Bar,
} from 'recharts'
import { getSummary, getLeadTrend, getCustomerTrend } from '@/api/dashboard'
import { getBillingSummary, getInvoices } from '@/api/billing'
import { getForklifts } from '@/api/forklift'
import { getRentalContracts } from '@/api/rental'
import { getDashboard as getInventoryDashboard } from '@/api/inventory'
import { downloadReport } from '@/api/reports'
import { toast } from '@/store/toastStore'
import type { DashboardSummary, TrendPoint } from '@/types/dashboard'
import type { BillingDashboardSummary, InvoiceOut } from '@/types/billing'
import type { Forklift } from '@/types/forklift'
import type { DashboardSummary as InventorySummary } from '@/types/inventory'
import '@/styles/shared.css'

const CHART_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#7c3aed', '#0891b2', '#ef4444', '#64748b']
const TOOLTIP_STYLE = { fontSize: 12, borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-surface)' }
const TICK = { fontSize: 11, fill: 'var(--color-text-muted)' }

function fmtK(n: number) { return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n) }
function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }
function fmtPct(n: number) { return `${n.toFixed(1)}%` }
function fmtMonth(m: string) { const [, mo] = m.split('-'); const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return months[parseInt(mo, 10) - 1] ?? m }

interface ExecData {
  summary: DashboardSummary | null
  billing: BillingDashboardSummary | null
  inventory: InventorySummary | null
  forklifts: Forklift[]
  invoices: InvoiceOut[]
  leadTrend: TrendPoint[]
  customerTrend: TrendPoint[]
}

export default function ExecutiveDashboardPage() {
  const [data, setData] = useState<ExecData>({ summary: null, billing: null, inventory: null, forklifts: [], invoices: [], leadTrend: [], customerTrend: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try {
      const [sumRes, billRes, invRes, flRes, , invDash, ltRes, ctRes] = await Promise.all([
        getSummary(),
        getBillingSummary().catch(() => ({ data: null })),
        getInvoices({ page_size: 100 }).catch(() => ({ data: { items: [] } })),
        getForklifts({ page_size: 200 }),
        getRentalContracts({ page_size: 200 }),
        getInventoryDashboard().catch(() => ({ data: null })),
        getLeadTrend(12),
        getCustomerTrend(12),
      ])
      setData({
        summary: sumRes.data,
        billing: billRes.data as BillingDashboardSummary | null,
        inventory: invDash.data as InventorySummary | null,
        forklifts: flRes.data.items,
        invoices: (invRes.data as { items: InvoiceOut[] }).items ?? [],
        leadTrend: ltRes.data,
        customerTrend: ctRes.data,
      })
    } catch { setError('Failed to load executive data.') }
    finally { setIsLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleExport = async (type: 'customers' | 'leads' | 'sales', format: 'csv' | 'excel') => {
    try {
      await downloadReport(type, { format }, data.summary)
      toast.success(`${type} report downloaded`)
    } catch (e) { toast.error((e as Error).message || 'Export failed') }
  }

  if (error) return <div className="page-error"><AlertCircle size={16} /> {error}</div>

  const { summary, billing, inventory, forklifts, invoices, leadTrend, customerTrend } = data
  const totalFleet = forklifts.length
  const rented = forklifts.filter(f => f.status === 'rented').length
  const utilization = totalFleet > 0 ? (rented / totalFleet) * 100 : 0

  const fleetByStatus = (() => {
    const counts: Record<string, number> = {}
    forklifts.forEach(f => { counts[f.status] = (counts[f.status] || 0) + 1 })
    return Object.entries(counts).map(([name, value], i) => ({ name: name.replace('_', ' '), value, color: CHART_COLORS[i % CHART_COLORS.length] }))
  })()

  const revenueByMonth = (() => {
    const buckets: Record<string, { invoiced: number; paid: number }> = {}
    invoices.forEach(inv => {
      const m = (inv.issue_date || inv.created_at)?.substring(0, 7) ?? 'Unknown'
      if (!buckets[m]) buckets[m] = { invoiced: 0, paid: 0 }
      buckets[m].invoiced += inv.total_amount ?? 0
      buckets[m].paid += (inv.total_amount ?? 0) - (inv.balance_due ?? 0)
    })
    return Object.entries(buckets).sort(([a],[b]) => a.localeCompare(b)).slice(-6).map(([month, d]) => ({ month: fmtMonth(month), ...d }))
  })()

  return (
    <div>
      <div className="mp-hero">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="mp-hero-title">Executive Dashboard</div>
            <div className="mp-hero-sub">Enterprise-wide performance metrics and analytics</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ background: 'var(--color-hero-btn-bg)', borderColor: 'var(--color-hero-btn-border)', color: 'var(--color-on-hero)' }} onClick={() => handleExport('sales', 'excel')}>
              <Download size={14} /> Export Excel
            </button>
            <button className="btn btn-ghost" style={{ background: 'var(--color-hero-btn-bg)', borderColor: 'var(--color-hero-btn-border)', color: 'var(--color-on-hero)' }} onClick={load} disabled={isLoading}>
              <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      {isLoading ? (
        <div className="mp-kpi-strip">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mp-kpi-widget" style={{ minHeight: 96 }}>
              <div className="skeleton-line" style={{ width: '50%', height: 10 }} />
              <div className="skeleton-line" style={{ width: '40%', height: 22, marginTop: 10 }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mp-kpi-strip">
          <KpiCard icon={DollarSign} label="Total Revenue" value={billing ? `฿${fmtAmt(billing.total_invoiced)}` : '—'} sub={billing ? `${fmtAmt(billing.invoice_count)} invoices` : ''} color="var(--color-success-600)" />
          <KpiCard icon={TrendingUp} label="Collection Rate" value={billing && billing.total_invoiced > 0 ? fmtPct((billing.total_paid / billing.total_invoiced) * 100) : '—'} sub={billing ? `฿${fmtAmt(billing.total_paid)} collected` : ''} color="var(--color-primary-600)" />
          <KpiCard icon={Truck} label="Fleet Utilization" value={fmtPct(utilization)} sub={`${rented} rented / ${totalFleet} total`} color="var(--color-info-600)" />
          <KpiCard icon={Users} label="Customers" value={summary ? fmtK(summary.total_customers) : '—'} sub={summary ? `${summary.active_customers} active` : ''} color="var(--color-purple-600)" />
          <KpiCard icon={Package} label="Inventory Value" value={inventory ? `฿${fmtAmt(inventory.total_stock_value)}` : '—'} sub={inventory ? `${inventory.total_parts} parts` : ''} color="var(--color-warning-600)" />
          <KpiCard icon={Wrench} label="Conversion Rate" value={summary ? fmtPct(summary.conversion_rate) : '—'} sub={`Win: ${summary ? fmtPct(summary.win_rate) : '—'}`} color="var(--color-danger-600)" />
        </div>
      )}

      {/* Charts Row 1: Revenue + Fleet */}
      <div className="mp-chart-grid" style={{ marginTop: 20 }}>
        <div className="mp-chart-panel">
          <div className="mp-chart-panel-header"><BarChart2 size={14} /> Revenue Trend</div>
          {revenueByMonth.length === 0 ? (
            <div className="mp-empty" style={{ minHeight: 200 }}>No revenue data</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueByMonth} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="execRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={TICK} />
                <YAxis tick={TICK} tickFormatter={fmtK} />
                <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`฿${fmtAmt(Number(v))}`, '']} />
                <Area type="monotone" dataKey="invoiced" name="Invoiced" stroke="#3b82f6" strokeWidth={2} fill="url(#execRevGrad)" />
                <Area type="monotone" dataKey="paid" name="Collected" stroke="#22c55e" strokeWidth={2} fill="none" strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mp-chart-panel">
          <div className="mp-chart-panel-header"><PieChart size={14} /> Fleet Status</div>
          {fleetByStatus.length === 0 ? (
            <div className="mp-empty" style={{ minHeight: 200 }}>No fleet data</div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <ResponsiveContainer width="60%" height={200}>
                <RePie>
                  <Pie data={fleetByStatus} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" stroke="none">
                    {fleetByStatus.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                </RePie>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {fleetByStatus.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    <span style={{ color: 'var(--color-text)', textTransform: 'capitalize' }}>{d.name}</span>
                    <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--color-text)' }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts Row 2: Lead & Customer Trends */}
      <div className="mp-chart-grid" style={{ marginTop: 16 }}>
        <div className="mp-chart-panel">
          <div className="mp-chart-panel-header"><TrendingUp size={14} /> Lead Pipeline (12 mo)</div>
          {leadTrend.length === 0 ? (
            <div className="mp-empty" style={{ minHeight: 180 }}>No lead data</div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={leadTrend.map(d => ({ ...d, month: fmtMonth(d.month) }))} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={TICK} />
                <YAxis tick={TICK} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" name="New Leads" fill="#7c3aed" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="mp-chart-panel">
          <div className="mp-chart-panel-header"><Users size={14} /> Customer Growth (12 mo)</div>
          {customerTrend.length === 0 ? (
            <div className="mp-empty" style={{ minHeight: 180 }}>No customer data</div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={customerTrend.map(d => ({ ...d, month: fmtMonth(d.month) }))} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={TICK} />
                <YAxis tick={TICK} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" name="New Customers" fill="#0891b2" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Export Section */}
      <div className="mp-card" style={{ marginTop: 20, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', marginBottom: 12 }}>Export Reports</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" onClick={() => handleExport('customers', 'excel')}><Download size={14} /> Customers (Excel)</button>
          <button className="btn btn-ghost" onClick={() => handleExport('leads', 'excel')}><Download size={14} /> Leads (Excel)</button>
          <button className="btn btn-ghost" onClick={() => handleExport('sales', 'excel')}><Download size={14} /> Sales (Excel)</button>
          <button className="btn btn-ghost" onClick={() => handleExport('customers', 'csv')}><Download size={14} /> Customers (CSV)</button>
          <button className="btn btn-ghost" onClick={() => handleExport('leads', 'csv')}><Download size={14} /> Leads (CSV)</button>
          <button className="btn btn-ghost" onClick={() => handleExport('sales', 'csv')}><Download size={14} /> Sales (CSV)</button>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="mp-kpi-widget" style={{ '--kpi-color': color, '--kpi-bg': `color-mix(in srgb, ${color} 10%, transparent)` } as React.CSSProperties}>
      <div className="mp-kpi-header">
        <span className="mp-kpi-label">{label}</span>
        <div className="mp-kpi-icon"><Icon size={16} /></div>
      </div>
      <div className="mp-kpi-value">{value}</div>
      {sub && <div className="mp-kpi-change neutral">{sub}</div>}
    </div>
  )
}
