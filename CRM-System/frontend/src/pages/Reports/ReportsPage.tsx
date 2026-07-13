import { useState, useCallback } from 'react'
import {
  Trophy, Users, Percent, Award,
  Download, FileText, TrendingUp as TrendingUpIcon,
  FileSpreadsheet, RefreshCw, Clock, AlertCircle,
} from 'lucide-react'
import { StatCard, StatCardSkeleton } from '@/components/ui/StatCard'
import {
  ChartCard,
  TrendLineChart,
  DistributionBarChart,
  HorizontalBarChart,
} from '@/components/charts'
import { useDashboardSummary, useLeadTrend, useCustomerTrend, useLeadMetrics } from '@/hooks/useDashboard'
import { downloadReport, type ReportFormat } from '@/api/reports'
import { recordToBarData } from '@/utils/mockAdapter'
import { PLANNED_MODULES } from '@/modules/registry'
import { toast } from '@/store/toastStore'
import './ReportsPage.css'

// ── Color maps ────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  new:       '#7c3aed',
  contacted: '#0891b2',
  qualified: '#d97706',
  proposal:  '#2563eb',
  won:       '#16a34a',
  lost:      '#dc2626',
}
const SOURCE_COLORS: Record<string, string> = {
  website:      '#2563eb',
  referral:     '#16a34a',
  cold_call:    '#d97706',
  email:        '#0891b2',
  social_media: '#7c3aed',
  other:        '#94a3b8',
}
const SOURCE_LABELS: Record<string, string> = {
  website:      'Website',
  referral:     'Referral',
  cold_call:    'Cold Call',
  email:        'Email',
  social_media: 'Social Media',
  other:        'Other',
}
const STATUS_ORDER = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']

// ── Helpers ───────────────────────────────────────────────────
function fmtMonth(m: string) {
  const [y, mo] = m.split('-')
  return `${new Date(+y, +mo - 1, 1).toLocaleDateString('en-US', { month: 'short' })} '${y.slice(2)}`
}
const rate = (n: number) => `${n.toFixed(1)}%`

// ── Section title ─────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <div className="rp-section-heading">{children}</div>
}

// ── Metric row in the conversion table ────────────────────────
interface MetricRowProps {
  label: string
  value: string
  color: string
  filled: number    // 0-100
  detail: string
  description: string
}
function MetricRow({ label, value, color, filled, detail, description }: MetricRowProps) {
  return (
    <tr>
      <td><strong>{label}</strong></td>
      <td><span className="metric-value" style={{ color }}>{value}</span></td>
      <td style={{ minWidth: 160 }}>
        <div className="metric-bar-wrap">
          <div className="metric-bar-track">
            <div className="metric-bar-fill" style={{ width: `${Math.min(filled, 100)}%`, background: color }} />
          </div>
          <span className="metric-bar-detail">{detail}</span>
        </div>
      </td>
      <td className="cell-muted rp-hide-sm">{description}</td>
    </tr>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function ReportsPage() {
  const summary   = useDashboardSummary()
  const leadTrend = useLeadTrend(12)
  const custTrend = useCustomerTrend(12)
  const metrics   = useLeadMetrics()

  const [exportFormat, setExportFormat] = useState<ReportFormat>('csv')
  const [fromDate, setFromDate]         = useState('')
  const [toDate, setToDate]             = useState('')
  const [downloading, setDownloading]   = useState<string | null>(null)

  const s = summary.data

  // Refresh all data sources
  const refetchAll = useCallback(() => {
    summary.refetch()
    leadTrend.refetch()
    custTrend.refetch()
    metrics.refetch()
  }, [summary, leadTrend, custTrend, metrics])

  // Download with client-side fallback
  const handleDownload = async (type: 'customers' | 'leads' | 'sales') => {
    setDownloading(type)
    try {
      await downloadReport(
        type,
        { format: exportFormat, from_date: fromDate || undefined, to_date: toDate || undefined },
        s,                    // pass summary for CSV fallback
      )
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report downloaded.`)
    } catch (err) {
      const msg = (err as Error).message ?? `Failed to download ${type} report.`
      toast.error(msg)
    } finally {
      setDownloading(null)
    }
  }

  // Prepare chart data
  const leadTrendData = leadTrend.data.map(p => ({ ...p, month: fmtMonth(p.month) }))
  const custTrendData = custTrend.data.map(p => ({ ...p, month: fmtMonth(p.month) }))

  const statusChartData = metrics.data
    ? recordToBarData(metrics.data.by_status, {}, STATUS_ORDER)
    : []
  const sourceChartData = metrics.data
    ? recordToBarData(metrics.data.by_source, SOURCE_LABELS)
    : []

  const anyLoading = summary.isLoading || leadTrend.isLoading || custTrend.isLoading || metrics.isLoading

  return (
    <div className="rp-page">

      {/* ── Header ────────────────────────────────────── */}
      <div className="page-header" style={{ marginBottom: 28 }}>
        <div>
          <h1>Reports</h1>
          <p className="page-header-sub">Analytics, conversion metrics, and data exports</p>
        </div>
        <button
          className="btn btn-ghost"
          onClick={refetchAll}
          disabled={anyLoading}
          style={{ gap: 6 }}
        >
          <RefreshCw size={14} className={anyLoading ? 'spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Global error */}
      {summary.error && (
        <div className="page-error" style={{ marginBottom: 24 }}>
          <AlertCircle size={16} />
          {summary.error}
          <button className="clear-btn" onClick={summary.refetch} style={{ marginLeft: 'auto' }}>Retry</button>
        </div>
      )}

      {/* ── 1. Key Metrics ─────────────────────────── */}
      <div className="rp-section">
        <SectionHeading>Key Metrics</SectionHeading>
        <div className="rp-stat-grid">
          {summary.isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatCard
                label="Won Leads"
                value={s?.won_leads ?? 0}
                icon={Trophy}
                accent="#16a34a" iconBg="#f0fdf4"
              />
              <StatCard
                label="Total Customers"
                value={s?.total_customers ?? 0}
                icon={Users}
                accent="#2563eb" iconBg="#eff6ff"
              />
              <StatCard
                label="Conversion Rate"
                value={rate(s?.conversion_rate ?? 0)}
                icon={Percent}
                accent="#7c3aed" iconBg="#f5f3ff"
                sublabel="Won ÷ Total Leads"
                isRate
              />
              <StatCard
                label="Win Rate"
                value={rate(s?.win_rate ?? 0)}
                icon={Award}
                accent="#16a34a" iconBg="#f0fdf4"
                sublabel="Won ÷ (Won + Lost)"
                isRate
              />
            </>
          )}
        </div>
      </div>

      {/* ── 2. Export ──────────────────────────────── */}
      <div className="rp-section">
        <SectionHeading>Export Data</SectionHeading>
        <div className="export-card">
          <div className="export-card-title">Download Reports</div>

          <div className="export-controls">
            <div className="export-field">
              <label>Format</label>
              <select
                className="filter-select"
                value={exportFormat}
                onChange={e => setExportFormat(e.target.value as ReportFormat)}
              >
                <option value="csv">CSV (.csv)</option>
                <option value="excel">Excel (.xlsx)</option>
              </select>
            </div>

            <div className="export-field">
              <label>From Date</label>
              <input
                type="date" className="date-input"
                value={fromDate} onChange={e => setFromDate(e.target.value)}
              />
            </div>

            <div className="export-field">
              <label>To Date</label>
              <input
                type="date" className="date-input"
                value={toDate} onChange={e => setToDate(e.target.value)}
              />
            </div>

            {(fromDate || toDate) && (
              <button className="clear-btn" onClick={() => { setFromDate(''); setToDate('') }}>
                Clear dates
              </button>
            )}
          </div>

          <div className="export-buttons">
            {([
              { type: 'customers', label: 'Customers', iconBg: '#eff6ff', iconColor: '#2563eb', Icon: Users },
              { type: 'leads',     label: 'Leads',     iconBg: '#f0fdf4', iconColor: '#16a34a', Icon: TrendingUpIcon },
              { type: 'sales',     label: 'Sales',     iconBg: '#fffbeb', iconColor: '#d97706', Icon: exportFormat === 'excel' ? FileSpreadsheet : FileText },
            ] as const).map(({ type, label, iconBg, iconColor, Icon }) => (
              <button
                key={type}
                className="export-btn"
                onClick={() => handleDownload(type)}
                disabled={!!downloading}
                style={{ '--btn-icon-bg': iconBg, '--btn-icon-color': iconColor } as React.CSSProperties}
              >
                <span className="export-btn-icon"><Icon size={13} /></span>
                {downloading === type ? 'Downloading…' : `${label} ${exportFormat.toUpperCase()}`}
                <Download size={12} />
              </button>
            ))}
          </div>

          <p className="export-note">
            If a report endpoint is unavailable, a summary CSV is generated client-side.
          </p>
        </div>
      </div>

      {/* ── 3. Trends ──────────────────────────────── */}
      <div className="rp-section">
        <SectionHeading>
          Trends — Last 12 Months
          {(leadTrend.isMock || custTrend.isMock) && (
            <span className="rp-mock-badge">Synthetic preview data</span>
          )}
        </SectionHeading>
        <div className="rp-chart-grid">
          <ChartCard
            title="Lead Volume"
            sub="Monthly new leads created"
            loading={leadTrend.isLoading}
            isEmpty={!leadTrend.isLoading && leadTrendData.length === 0}
            emptyMessage="No lead trend data"
            emptySubMessage="Lead trend will appear once the endpoint is connected"
          >
            <TrendLineChart
              data={leadTrendData}
              color="#2563eb"
              name="Leads"
            />
          </ChartCard>

          <ChartCard
            title="Customer Growth"
            sub="Monthly new customers added"
            loading={custTrend.isLoading}
            isEmpty={!custTrend.isLoading && custTrendData.length === 0}
            emptyMessage="No customer trend data"
            emptySubMessage="Customer trend will appear once the endpoint is connected"
          >
            <TrendLineChart
              data={custTrendData}
              color="#16a34a"
              name="Customers"
            />
          </ChartCard>
        </div>
      </div>

      {/* ── 4. Lead Analysis ───────────────────────── */}
      <div className="rp-section">
        <SectionHeading>Lead Analysis</SectionHeading>
        <div className="rp-chart-grid">
          <ChartCard
            title="Status Distribution"
            sub="Leads by current pipeline stage"
            loading={metrics.isLoading}
            isEmpty={!metrics.isLoading && statusChartData.length === 0}
            emptyMessage="No lead status data"
            emptySubMessage="Create leads to see the distribution"
          >
            <DistributionBarChart
              data={statusChartData}
              colorMap={STATUS_COLORS}
              label="Leads"
            />
          </ChartCard>

          <ChartCard
            title="Source Breakdown"
            sub="Where leads are coming from"
            loading={metrics.isLoading}
            isEmpty={!metrics.isLoading && sourceChartData.length === 0}
            emptyMessage="No source data"
            emptySubMessage="Add a source when creating leads"
          >
            <HorizontalBarChart
              data={sourceChartData}
              colorMap={SOURCE_COLORS}
              label="Leads"
              labelWidth={88}
            />
          </ChartCard>
        </div>
      </div>

      {/* ── 5. Conversion Metrics ──────────────────── */}
      <div className="rp-section">
        <SectionHeading>Conversion Metrics</SectionHeading>
        <div className="rp-table-card">
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Rate</th>
                <th>Breakdown</th>
                <th className="rp-hide-sm">Formula</th>
              </tr>
            </thead>
            <tbody>
              {summary.isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="skeleton-row">
                    <td><div className="skeleton-cell" style={{ width: '55%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: 52, height: 22 }} /></td>
                    <td><div className="skeleton-cell" style={{ height: 6, borderRadius: 3 }} /></td>
                    <td className="rp-hide-sm"><div className="skeleton-cell" style={{ width: '75%' }} /></td>
                  </tr>
                ))
              ) : (
                <>
                  <MetricRow
                    label="Conversion Rate"
                    value={rate(s?.conversion_rate ?? 0)}
                    color="#7c3aed"
                    filled={s?.conversion_rate ?? 0}
                    detail={`${s?.won_leads ?? 0} / ${s?.total_leads ?? 0}`}
                    description="Won ÷ Total Leads × 100"
                  />
                  <MetricRow
                    label="Win Rate"
                    value={rate(s?.win_rate ?? 0)}
                    color="#16a34a"
                    filled={s?.win_rate ?? 0}
                    detail={`${s?.won_leads ?? 0} / ${(s?.won_leads ?? 0) + (s?.lost_leads ?? 0)}`}
                    description="Won ÷ (Won + Lost) × 100"
                  />
                  <MetricRow
                    label="Lost Rate"
                    value={rate(s?.lost_rate ?? 0)}
                    color="#dc2626"
                    filled={s?.lost_rate ?? 0}
                    detail={`${s?.lost_leads ?? 0} / ${(s?.won_leads ?? 0) + (s?.lost_leads ?? 0)}`}
                    description="Lost ÷ (Won + Lost) × 100"
                  />
                  <MetricRow
                    label="Active Customers"
                    value={String(s?.active_customers ?? 0)}
                    color="#2563eb"
                    filled={s?.total_customers ? (s.active_customers / s.total_customers) * 100 : 0}
                    detail={`${s?.active_customers ?? 0} / ${s?.total_customers ?? 0}`}
                    description="Active ÷ Total Customers × 100"
                  />
                  <MetricRow
                    label="Leads in Pipeline"
                    value={String((s?.new_leads ?? 0) + (s?.contacted_leads ?? 0) + (s?.qualified_leads ?? 0) + (s?.proposal_leads ?? 0))}
                    color="#d97706"
                    filled={s?.total_leads
                      ? (((s.new_leads + s.contacted_leads + s.qualified_leads + s.proposal_leads) / s.total_leads) * 100)
                      : 0}
                    detail={`of ${s?.total_leads ?? 0} total`}
                    description="New + Contacted + Qualified + Proposal"
                  />
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 6. Roadmap ─────────────────────────────── */}
      <div className="rp-section">
        <SectionHeading>Module Roadmap</SectionHeading>
        <div className="rp-roadmap-grid">
          {PLANNED_MODULES.map(mod => (
            <div key={mod.id} className="rp-roadmap-card">
              <div className="rp-roadmap-card-top">
                <div
                  className="rp-roadmap-dot"
                  style={{ background: mod.color + '22', borderColor: mod.color + '55' }}
                >
                  <Clock size={14} style={{ color: mod.color }} />
                </div>
                <span className="rp-roadmap-version">{mod.plannedVersion}</span>
              </div>
              <div className="rp-roadmap-label">{mod.label}</div>
              <div className="rp-roadmap-desc">{mod.description}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
