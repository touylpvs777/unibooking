import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  RefreshCw, AlertCircle,
  Users, UserCheck, UserPlus, TrendingUp, Sparkles,
  Phone, ClipboardCheck, FileText, Trophy, XCircle,
  Percent, Award, TrendingDown,
} from 'lucide-react'
import KpiWidget, { KpiWidgetSkeleton } from '@/components/ui/KpiWidget'
import { useDashboardSummary } from '@/hooks/useDashboard'
import { useDashboardData } from '@/hooks/useDashboardData'
import CatalogDashboardWidget from '@/components/catalog/CatalogDashboardWidget'
import {
  FleetByFuelChart,
  ExpiringContractsCard, ExpiringQuotationsCard, PmDueCard,
} from '@/components/dashboard/DashboardWidgets'
import {
  EnterpriseKpiStrip, EnterpriseKpiStripSkeleton,
  QuickActions,
  EnterpriseActivityFeed, EnterpriseActivityFeedSkeleton,
  RevenueAreaChart, FleetUtilizationDonut,
  buildKpiCards,
} from '@/modules/dashboard'
import { getBillingSummary } from '@/api/billing'
import { getDashboard as getInventoryDashboard } from '@/api/inventory'
import type { BillingDashboardSummary } from '@/types/billing'
import type { DashboardSummary as InventorySummary } from '@/types/inventory'
import './DashboardPage.css'

const fmt = (n: number) => n.toLocaleString()
const rate = (n: number) => `${n.toFixed(1)}%`

function KpiSkeleton({ count }: { count: number }) {
  return (
    <div className="mp-kpi-strip">
      {Array.from({ length: count }).map((_, i) => <KpiWidgetSkeleton key={i} />)}
    </div>
  )
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const { data, isLoading: summaryLoading, error: summaryError, refetch: refetchSummary } = useDashboardSummary()
  const dd = useDashboardData()
  const [billing, setBilling] = useState<BillingDashboardSummary | null>(null)
  const [inventory, setInventory] = useState<InventorySummary | null>(null)

  useEffect(() => {
    getBillingSummary().then((r) => setBilling(r.data)).catch(() => {})
    getInventoryDashboard().then((r) => setInventory(r.data)).catch(() => {})
  }, [])

  const now = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  const refetchAll = () => {
    refetchSummary(); dd.refetch()
    getBillingSummary().then((r) => setBilling(r.data)).catch(() => {})
    getInventoryDashboard().then((r) => setInventory(r.data)).catch(() => {})
  }
  const isLoading = summaryLoading || dd.isLoading

  const kpiCards = buildKpiCards(dd.kpis, billing, inventory ? { low_stock_count: inventory.low_stock_count } : null)

  const revenueChartData = dd.revenueByMonth.map((d) => ({ month: d.month, amount: d.revenue }))

  return (
    <div className="dashboard-page">
      {/* Hero Banner */}
      <div className="mp-hero">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="mp-hero-title">{t('dashboard.title')}</div>
            <div className="mp-hero-sub">{t('dashboard.updated', { date: now })}</div>
          </div>
          <button
            className="btn btn-ghost"
            style={{ background: 'var(--color-hero-btn-bg)', borderColor: 'var(--color-hero-btn-border)', color: 'var(--color-on-hero)' }}
            onClick={refetchAll}
            disabled={isLoading}
          >
            <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> {t('dashboard.refresh')}
          </button>
        </div>
      </div>

      {/* Errors */}
      {(summaryError || dd.error) && (
        <div className="dashboard-error">
          <AlertCircle size={18} />
          {summaryError || dd.error}
          <button onClick={refetchAll}>{t('dashboard.retry')}</button>
        </div>
      )}

      {/* Enterprise KPI Strip */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">{t('dashboard.keyMetrics')}</h2>
        {dd.isLoading ? <EnterpriseKpiStripSkeleton /> : <EnterpriseKpiStrip kpis={kpiCards} />}
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">{t('dashboard.quickActions')}</h2>
        <QuickActions />
      </section>

      {/* Revenue & Fleet Charts */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">{t('dashboard.revenueFleet')}</h2>
        <div className="mp-chart-grid">
          <RevenueAreaChart data={revenueChartData} loading={dd.isLoading} />
          <FleetUtilizationDonut data={dd.fleetByStatus} loading={dd.isLoading} />
        </div>
      </section>

      {/* Activity Feed + Fleet Breakdown */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">{t('dashboard.activityFleet')}</h2>
        <div className="mp-chart-grid">
          {dd.isLoading ? <EnterpriseActivityFeedSkeleton /> : <EnterpriseActivityFeed activities={dd.activities} />}
          <div className="mp-chart-panel">
            <div className="mp-chart-title">{t('dashboard.fleetByFuelType')}</div>
            <FleetByFuelChart data={dd.fleetByFuel} loading={dd.isLoading} />
          </div>
        </div>
      </section>

      {/* Upcoming Tasks */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">{t('dashboard.upcomingTasks')}</h2>
        <div className="dash-tasks-row">
          <ExpiringContractsCard contracts={dd.expiringContracts} loading={dd.isLoading} />
          <ExpiringQuotationsCard quotations={dd.expiringQuotations} loading={dd.isLoading} />
          <PmDueCard forklifts={dd.pmDueForklifts} loading={dd.isLoading} />
        </div>
      </section>

      {/* Customer Overview */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">{t('dashboard.customerOverview')}</h2>
        {summaryLoading ? <KpiSkeleton count={3} /> : data ? (
          <div className="mp-kpi-strip">
            <KpiWidget label="Total Customers" value={fmt(data.total_customers)} icon={<Users size={16} />} color="#2563eb" bg="#eff6ff" />
            <KpiWidget label="Active" value={fmt(data.active_customers)} icon={<UserCheck size={16} />} color="#16a34a" bg="#f0fdf4" sub={`${rate(data.total_customers ? data.active_customers / data.total_customers * 100 : 0)} of total`} />
            <KpiWidget label="Prospects" value={fmt(data.prospect_customers)} icon={<UserPlus size={16} />} color="#d97706" bg="#fffbeb" />
          </div>
        ) : null}
      </section>

      {/* Lead Pipeline */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">{t('dashboard.leadPipeline')}</h2>
        {summaryLoading ? <KpiSkeleton count={5} /> : data ? (
          <div className="mp-kpi-strip">
            <KpiWidget label="Total Leads" value={fmt(data.total_leads)} icon={<TrendingUp size={16} />} color="#2563eb" bg="#eff6ff" />
            <KpiWidget label="New" value={fmt(data.new_leads)} icon={<Sparkles size={16} />} color="#7c3aed" bg="#f5f3ff" />
            <KpiWidget label="Contacted" value={fmt(data.contacted_leads)} icon={<Phone size={16} />} color="#0891b2" bg="#ecfeff" />
            <KpiWidget label="Qualified" value={fmt(data.qualified_leads)} icon={<ClipboardCheck size={16} />} color="#d97706" bg="#fffbeb" />
            <KpiWidget label="Proposal" value={fmt(data.proposal_leads)} icon={<FileText size={16} />} color="#ea580c" bg="#fff7ed" />
          </div>
        ) : null}
      </section>

      {/* Results & Conversion */}
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">{t('dashboard.resultsConversion')}</h2>
        {summaryLoading ? <KpiSkeleton count={5} /> : data ? (
          <div className="mp-kpi-strip">
            <KpiWidget label="Won" value={fmt(data.won_leads)} icon={<Trophy size={16} />} color="#16a34a" bg="#f0fdf4" />
            <KpiWidget label="Lost" value={fmt(data.lost_leads)} icon={<XCircle size={16} />} color="#dc2626" bg="#fef2f2" />
            <KpiWidget label="Conversion" value={rate(data.conversion_rate)} icon={<Percent size={16} />} color="#2563eb" bg="#eff6ff" sub="Won / Total" />
            <KpiWidget label="Win Rate" value={rate(data.win_rate)} icon={<Award size={16} />} color="#16a34a" bg="#f0fdf4" sub="Won / (Won+Lost)" />
            <KpiWidget label="Lost Rate" value={rate(data.lost_rate)} icon={<TrendingDown size={16} />} color="#dc2626" bg="#fef2f2" sub="Lost / (Won+Lost)" />
          </div>
        ) : null}
      </section>

      {/* Product Catalog */}
      <CatalogDashboardWidget />
    </div>
  )
}
