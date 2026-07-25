import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Forklift, Truck, Percent, TrendingUp, TrendingDown, Wrench, Banknote, PackageX } from 'lucide-react'
import { useCustomUI, type FontSizeTier } from '@/config/customLanguageStore'
import UICustomizerBar from '@/components/ui/UICustomizerBar'
import { MOCK_CONTRACTS, MOCK_CUSTOMERS, MOCK_FORKLIFTS, MOCK_MAINTENANCE_JOBS } from '@/mock/rentalMvpData'
import { MOCK_LOW_STOCK_PARTS, MOCK_TOTAL_STOCK_VALUE_LAK } from '@/mock/inventoryMvpData'
import type { RentalContract, RentalContractStatus } from '@/types/rentalMvp'
import DashboardCharts from './DashboardCharts'
import BrandShowcaseBanner from '@/modules/dashboard/components/BrandShowcaseBanner'

const lakFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const formatLak = (v: number) => `₭ ${lakFormatter.format(v)}`

const customerById = (id: string) => MOCK_CUSTOMERS.find((c) => c.id === id)
const forkliftById = (id: string) => MOCK_FORKLIFTS.find((f) => f.id === id)

// Maps the font-size store's 3 tiers onto the exact Tailwind classes requested.
const FONT_SIZE_CLASS: Record<FontSizeTier, string> = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
}

const STATUS_STYLES: Record<RentalContractStatus, string> = {
  Booked: 'bg-sky-500/20 text-sky-400',
  'On Rent': 'bg-green-500/20 text-green-400',
  'Expiring Soon': 'bg-amber-500/20 text-amber-400',
  Overdue: 'bg-red-500/20 text-red-400',
  Returned: 'bg-white/10 text-gray-300',
  Cancelled: 'bg-white/10 text-gray-400',
}

const STATUS_KEYS: Record<RentalContractStatus, string> = {
  Booked: 'dashboard.exec.status.booked',
  'On Rent': 'dashboard.exec.status.onRent',
  'Expiring Soon': 'dashboard.exec.status.expiringSoon',
  Overdue: 'dashboard.exec.status.overdue',
  Returned: 'dashboard.exec.status.returned',
  Cancelled: 'dashboard.exec.status.cancelled',
}

function StatusBadge({ status }: { status: RentalContractStatus }) {
  const { t } = useTranslation()
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {t(STATUS_KEYS[status])}
    </span>
  )
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

interface KpiCardProps {
  labelKey: string
  value: string
  sublabel: string
  icon: LucideIcon
  accent: string
  trend?: 'up' | 'down'
  onClick?: () => void
}

function KpiCard({ labelKey, value, sublabel, icon: Icon, accent, trend, onClick }: KpiCardProps) {
  const { t } = useTranslation()
  const fontSize = useCustomUI((s) => s.fontSize)
  const sizeClass = FONT_SIZE_CLASS[fontSize]

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
      className={`rounded-2xl border border-white/8 bg-[#1c1c1e] p-5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition-all duration-200 ${onClick ? 'cursor-pointer hover:scale-[1.015] hover:border-white/20 hover:bg-gray-800/50' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`${sizeClass} text-gray-400`}>{t(labelKey)}</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
            {trend && (
              trend === 'up'
                ? <TrendingUp size={15} className="text-emerald-400" />
                : <TrendingDown size={15} className="text-red-400" />
            )}
          </div>
          <p className={`mt-1 ${sizeClass} text-gray-400`}>{sublabel}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon size={20} className="text-white" strokeWidth={2} />
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const fontSize = useCustomUI((s) => s.fontSize)
  const sizeClass = FONT_SIZE_CLASS[fontSize]

  const totalFleet = MOCK_FORKLIFTS.length
  const activeRented = MOCK_FORKLIFTS.filter((f) => f.status === 'On Rent').length
  const utilizationRate = Math.round((activeRented / totalFleet) * 100)
  const pendingMaintenance = MOCK_MAINTENANCE_JOBS.filter((j) => j.status !== 'Completed').length
  const criticalMaintenance = MOCK_MAINTENANCE_JOBS.filter((j) => j.status === 'In Progress').length

  const maintenanceAccent = criticalMaintenance > 0
    ? 'bg-gradient-to-br from-red-500 to-red-700'
    : pendingMaintenance > 0
      ? 'bg-gradient-to-br from-amber-500 to-amber-700'
      : 'bg-gradient-to-br from-slate-500 to-slate-700'

  const lowStockCount = MOCK_LOW_STOCK_PARTS.length
  const criticalLowStock = MOCK_LOW_STOCK_PARTS.filter((p) => p.quantityAvailable <= p.minStockLevel / 2).length
  const lowStockAccent = criticalLowStock > 0
    ? 'bg-gradient-to-br from-red-500 to-red-700'
    : lowStockCount > 0
      ? 'bg-gradient-to-br from-amber-500 to-amber-700'
      : 'bg-gradient-to-br from-slate-500 to-slate-700'

  const contracts: RentalContract[] = MOCK_CONTRACTS
  const totalMonthlyRevenueLak = MOCK_CONTRACTS.reduce((sum, c) => sum + c.monthlyRateLak, 0)
  const totalMaintenanceCostLak = MOCK_MAINTENANCE_JOBS.reduce((sum, j) => sum + (j.estimatedCostLak ?? 0), 0)

  return (
    <div className="min-h-full bg-[#151515] px-6 py-8 text-white lg:px-10">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className={`${sizeClass} font-semibold uppercase tracking-wider text-gray-400`}>{t('dashboard.exec.eyebrow')}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-100">{t('dashboard.exec.title')}</h1>
        </div>
        <UICustomizerBar />
      </header>

      {/* KPI Cards (drill-down) */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          labelKey="dashboard.exec.kpi.totalFleet"
          value={String(totalFleet)}
          sublabel={t('dashboard.exec.kpi.totalFleetSub')}
          icon={Forklift}
          accent="bg-gradient-to-br from-blue-500 to-blue-700"
          onClick={() => navigate('/equipment')}
        />
        <KpiCard
          labelKey="dashboard.exec.kpi.activeRented"
          value={String(activeRented)}
          sublabel={t('dashboard.exec.kpi.activeRentedSub')}
          icon={Truck}
          accent="bg-gradient-to-br from-emerald-500 to-emerald-700"
          onClick={() => navigate('/rental-contracts')}
        />
        <KpiCard
          labelKey="dashboard.exec.kpi.utilizationRate"
          value={`${utilizationRate}%`}
          sublabel={t('dashboard.exec.kpi.utilizationRateSub')}
          icon={Percent}
          accent="bg-gradient-to-br from-violet-500 to-violet-700"
          trend={utilizationRate >= 50 ? 'up' : 'down'}
          onClick={() => navigate('/equipment')}
        />
        <KpiCard
          labelKey="dashboard.exec.kpi.pendingMaintenance"
          value={String(pendingMaintenance)}
          sublabel={criticalMaintenance > 0 ? t('dashboard.exec.kpi.pendingMaintenanceCritical', { count: criticalMaintenance }) : t('dashboard.exec.kpi.pendingMaintenanceSub')}
          icon={Wrench}
          accent={maintenanceAccent}
          onClick={() => navigate('/maintenance')}
        />
        <KpiCard
          labelKey="dashboard.exec.kpi.totalStockValue"
          value={formatLak(MOCK_TOTAL_STOCK_VALUE_LAK)}
          sublabel={t('dashboard.exec.kpi.totalStockValueSub')}
          icon={Banknote}
          accent="bg-gradient-to-br from-cyan-500 to-cyan-700"
          onClick={() => navigate('/inventory')}
        />
        <KpiCard
          labelKey="dashboard.exec.kpi.lowStockAlerts"
          value={t('dashboard.exec.kpi.lowStockAlertsItems', { count: lowStockCount })}
          sublabel={criticalLowStock > 0 ? t('dashboard.exec.kpi.lowStockAlertsCritical', { count: criticalLowStock }) : t('dashboard.exec.kpi.lowStockAlertsSub')}
          icon={PackageX}
          accent={lowStockAccent}
          onClick={() => navigate('/inventory/parts')}
        />
      </section>

      {/* Fleet Utilization Trend / Revenue vs. Maintenance Cost */}
      <DashboardCharts
        utilizationRate={utilizationRate}
        currentRevenueLak={totalMonthlyRevenueLak}
        currentMaintenanceCostLak={totalMaintenanceCostLak}
      />

      {/* Active Rental Contracts + Critical Low Stock */}
      <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr] lg:items-start">
        <div className="rounded-2xl border border-white/8 bg-[#1c1c1e] p-5">
          <h2 className="mb-4 text-base font-semibold text-gray-100">{t('dashboard.exec.contracts.title')}</h2>

          <div className="overflow-x-auto">
            <table className={`w-full min-w-[640px] border-collapse ${sizeClass}`}>
              <thead>
                <tr className="border-b border-white/8 text-left text-xs uppercase tracking-wide text-gray-400">
                  <th className="py-2.5 pr-4 font-medium">{t('dashboard.exec.contracts.columnContractId')}</th>
                  <th className="py-2.5 pr-4 font-medium">{t('dashboard.exec.contracts.columnCustomerName')}</th>
                  <th className="py-2.5 pr-4 font-medium">{t('dashboard.exec.contracts.columnForkliftModel')}</th>
                  <th className="py-2.5 pr-4 font-medium">{t('dashboard.exec.contracts.columnEndDate')}</th>
                  <th className="py-2.5 pr-4 font-medium">{t('dashboard.exec.contracts.columnStatus')}</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => {
                  const customer = customerById(contract.customerId)
                  const forklift = forkliftById(contract.forkliftAssetId)
                  return (
                    <tr
                      key={contract.id}
                      onClick={() => navigate('/rental-contracts')}
                      className="cursor-pointer border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.06]"
                    >
                      <td className="py-3 pr-4 font-medium text-gray-100">{contract.contractNumber}</td>
                      <td className="py-3 pr-4 text-gray-100">{customer?.companyName ?? '—'}</td>
                      <td className="py-3 pr-4 text-gray-100">
                        {forklift ? `${forklift.brand} ${forklift.model}` : '—'}
                        <span className="ml-1.5 text-xs text-gray-400">{forklift?.assetCode}</span>
                      </td>
                      <td className="py-3 pr-4 text-gray-100">{formatDate(contract.endDate)}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={contract.status} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#1c1c1e] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-100">{t('dashboard.exec.lowStock.title')}</h2>
            <span className="inline-flex items-center rounded-full bg-red-500/20 px-2 py-0.5 text-[11px] font-semibold text-red-400">
              {t('dashboard.exec.kpi.lowStockAlertsItems', { count: lowStockCount })}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {MOCK_LOW_STOCK_PARTS.slice(0, 3).map((part) => {
              const ratio = Math.min(100, Math.round((part.quantityAvailable / part.minStockLevel) * 100))
              const isCritical = part.quantityAvailable <= part.minStockLevel / 2
              return (
                <div
                  key={part.id}
                  onClick={() => navigate('/inventory/parts')}
                  className="cursor-pointer rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-white/15 hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`truncate ${sizeClass} font-medium text-gray-100`}>{part.name}</p>
                      <p className="text-xs text-gray-400">{part.partNumber}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isCritical ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {part.quantityAvailable} / {part.minStockLevel} {t('dashboard.exec.lowStock.minSuffix')}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${isCritical ? 'bg-red-500' : 'bg-amber-500'}`}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <BrandShowcaseBanner />
    </div>
  )
}
