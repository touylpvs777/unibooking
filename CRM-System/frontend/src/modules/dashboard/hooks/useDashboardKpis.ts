import type { KpiCardData } from '../types'

interface DashboardKpis {
  totalCustomers: number
  activeRentals: number
  overdueRentals: number
  availableForklifts: number
  totalFleet: number
  activeRevenue: number
  upcomingPm: number
  criticalPm: number
  openQuotations: number
  fleetUtilization: number
  rentedCount: number
}

interface BillingSummary {
  total_invoiced: number
  total_outstanding: number
  total_overdue: number
  invoice_count: number
  currency: string
}

interface InventorySummary {
  low_stock_count: number
}

export function buildKpiCards(
  kpis: DashboardKpis,
  billing: BillingSummary | null,
  inventory: InventorySummary | null,
): KpiCardData[] {
  const fmt = (n: number) => n.toLocaleString()
  const fmtAmt = (n: number, c: string) => `${n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : fmt(n)} ${c}`

  return [
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: billing ? fmtAmt(billing.total_invoiced, billing.currency) : '—',
      icon: 'DollarSign',
      color: 'var(--color-success-600)',
      bg: 'var(--color-success-50)',
      href: '/billing/invoices',
    },
    {
      id: 'active-rentals',
      label: 'Active Rentals',
      value: fmt(kpis.activeRentals),
      icon: 'ClipboardList',
      color: 'var(--color-primary-600)',
      bg: 'var(--color-primary-50)',
      href: '/rental-contracts',
      alert: kpis.overdueRentals > 0 ? { text: `${kpis.overdueRentals} overdue`, variant: 'danger' } : undefined,
    },
    {
      id: 'fleet-util',
      label: 'Fleet Utilization',
      value: `${kpis.fleetUtilization.toFixed(0)}%`,
      icon: 'Truck',
      color: 'var(--color-info-600)',
      bg: 'var(--color-info-50)',
      href: '/equipment',
      change: { value: `${kpis.rentedCount} of ${kpis.totalFleet} rented`, direction: 'neutral' },
    },
    {
      id: 'maintenance',
      label: 'Maintenance Due',
      value: fmt(kpis.upcomingPm),
      icon: 'Wrench',
      color: 'var(--color-warning-600)',
      bg: 'var(--color-warning-50)',
      href: '/maintenance',
      alert: kpis.criticalPm > 0 ? { text: `${kpis.criticalPm} critical`, variant: 'danger' } : undefined,
    },
    {
      id: 'low-stock',
      label: 'Low Stock',
      value: inventory ? fmt(inventory.low_stock_count) : '—',
      icon: 'AlertTriangle',
      color: inventory && inventory.low_stock_count > 0 ? 'var(--color-danger-600)' : 'var(--color-gray-500)',
      bg: inventory && inventory.low_stock_count > 0 ? 'var(--color-danger-50)' : 'var(--color-gray-50)',
      href: '/inventory',
    },
    {
      id: 'outstanding',
      label: 'Outstanding Invoices',
      value: billing ? fmtAmt(billing.total_outstanding, billing.currency) : '—',
      icon: 'FileText',
      color: billing && billing.total_overdue > 0 ? 'var(--color-danger-600)' : 'var(--color-purple-600)',
      bg: billing && billing.total_overdue > 0 ? 'var(--color-danger-50)' : 'var(--color-purple-50)',
      href: '/billing/invoices',
      alert: billing && billing.total_overdue > 0 ? { text: `${fmtAmt(billing.total_overdue, billing.currency)} overdue`, variant: 'danger' } : undefined,
    },
  ]
}
