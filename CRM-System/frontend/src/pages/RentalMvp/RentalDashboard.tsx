import { Forklift, Percent, Wrench, TrendingUp, TrendingDown } from 'lucide-react'
import { MOCK_CONTRACTS, MOCK_CUSTOMERS, MOCK_FORKLIFTS, MOCK_MAINTENANCE_JOBS } from '@/mock/rentalMvpData'
import type { RentalContract, RentalContractStatus } from '@/types/rentalMvp'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

const customerById = (id: string) => MOCK_CUSTOMERS.find((c) => c.id === id)
const forkliftById = (id: string) => MOCK_FORKLIFTS.find((f) => f.id === id)

const STATUS_STYLES: Record<RentalContractStatus, string> = {
  Booked: 'bg-sky-500/20 text-sky-400',
  'On Rent': 'bg-green-500/20 text-green-400',
  'Expiring Soon': 'bg-amber-500/20 text-amber-400',
  Overdue: 'bg-red-500/20 text-red-400',
  Returned: 'bg-white/10 text-gray-300',
  Cancelled: 'bg-white/10 text-gray-400',
}

function StatusBadge({ status }: { status: RentalContractStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  )
}

interface KpiCardProps {
  label: string
  value: string
  sublabel: string
  icon: React.ElementType
  accent: string
  trend?: 'up' | 'down'
}

function KpiCard({ label, value, sublabel, icon: Icon, accent, trend }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#1c1c1e] p-5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-300">{label}</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
            {trend && (
              trend === 'up'
                ? <TrendingUp size={15} className="text-emerald-400" />
                : <TrendingDown size={15} className="text-red-400" />
            )}
          </div>
          <p className="mt-1 text-xs text-gray-400">{sublabel}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon size={20} className="text-white" strokeWidth={2} />
        </div>
      </div>
    </div>
  )
}

export default function RentalDashboard() {
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

  const contracts: RentalContract[] = MOCK_CONTRACTS

  return (
    <div className="min-h-full bg-[#151515] px-6 py-8 text-white lg:px-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">DK Rental · Executive Overview</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Fleet & Rental Dashboard</h1>
      </header>

      {/* Top Row: Executive KPI Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Fleet"
          value={String(totalFleet)}
          sublabel="Forklift units registered"
          icon={Forklift}
          accent="bg-gradient-to-br from-blue-500 to-blue-700"
        />
        <KpiCard
          label="Active Rented"
          value={String(activeRented)}
          sublabel="Units currently on rent"
          icon={TrendingUp}
          accent="bg-gradient-to-br from-emerald-500 to-emerald-700"
        />
        <KpiCard
          label="Utilization Rate"
          value={`${utilizationRate}%`}
          sublabel="Rented vs. total fleet"
          icon={Percent}
          accent="bg-gradient-to-br from-violet-500 to-violet-700"
          trend={utilizationRate >= 50 ? 'up' : 'down'}
        />
        <KpiCard
          label="Pending Maintenance"
          value={String(pendingMaintenance)}
          sublabel={criticalMaintenance > 0 ? `${criticalMaintenance} in progress` : 'Open PM / inspection jobs'}
          icon={Wrench}
          accent={maintenanceAccent}
        />
      </section>

      {/* Active Rental Contracts (Table View) */}
      <section className="mt-8 rounded-2xl border border-white/8 bg-[#1c1c1e] p-5">
        <h2 className="mb-4 text-base font-semibold text-white">Active Rental Contracts</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="py-2.5 pr-4 font-medium">Contract ID</th>
                <th className="py-2.5 pr-4 font-medium">Customer Name</th>
                <th className="py-2.5 pr-4 font-medium">Forklift Model</th>
                <th className="py-2.5 pr-4 font-medium">End Date</th>
                <th className="py-2.5 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => {
                const customer = customerById(contract.customerId)
                const forklift = forkliftById(contract.forkliftAssetId)
                return (
                  <tr key={contract.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
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
      </section>
    </div>
  )
}
