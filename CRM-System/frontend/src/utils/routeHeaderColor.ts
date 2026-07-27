/**
 * Maps a route path to its module-category header color, per the sidebar's
 * grouping. Checked as ordered path prefixes — first match wins.
 */
const CATEGORY_RULES: Array<{ prefix: string; className: string }> = [
  // Sales & CRM (customers, sales, quotes)
  { prefix: '/customers', className: 'bg-emerald-700' },
  { prefix: '/leads', className: 'bg-emerald-700' },
  { prefix: '/quotations', className: 'bg-emerald-700' },

  // Inventory & Assets (warehouse, inventory, transfers, assets)
  { prefix: '/catalog', className: 'bg-amber-700' },
  { prefix: '/equipment', className: 'bg-amber-700' },
  { prefix: '/inventory', className: 'bg-amber-700' },
  { prefix: '/movements', className: 'bg-amber-700' },
  { prefix: '/iot-management', className: 'bg-amber-700' },

  // Services (services, contracts, activities)
  { prefix: '/maintenance', className: 'bg-blue-800' },
  { prefix: '/activities', className: 'bg-blue-800' },
  { prefix: '/activity', className: 'bg-blue-800' },
  { prefix: '/rental-contracts', className: 'bg-blue-800' },
  { prefix: '/rental-mvp', className: 'bg-blue-800' },
  { prefix: '/projects', className: 'bg-blue-800' },

  // Finance & Billing (invoices, payments, deposits, billing)
  { prefix: '/billing', className: 'bg-teal-700' },

  // Reports & Analytics (reports, market)
  { prefix: '/reports', className: 'bg-purple-700' },
  { prefix: '/executive', className: 'bg-purple-700' },
]

const DEFAULT_CLASS = 'bg-slate-800'

export function getHeaderColorClass(pathname: string): string {
  const rule = CATEGORY_RULES.find((r) => pathname.startsWith(r.prefix))
  return rule ? rule.className : DEFAULT_CLASS
}
