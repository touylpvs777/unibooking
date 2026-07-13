export interface RouteConfig {
  path: string
  label: string
  parent?: string
}

export const ROUTE_CONFIG: RouteConfig[] = [
  { path: '/dashboard',             label: 'Dashboard' },
  { path: '/customers',             label: 'Customers' },
  { path: '/leads',                 label: 'Leads' },
  { path: '/activity',              label: 'Activity' },
  { path: '/reports',               label: 'Reports' },
  { path: '/settings',              label: 'Settings' },
  { path: '/catalog',               label: 'Products' },
  { path: '/catalog/products/:id',  label: 'Product Detail',     parent: '/catalog' },
  { path: '/catalog/brands',        label: 'Brands',             parent: '/catalog' },
  { path: '/catalog/categories',    label: 'Categories',         parent: '/catalog' },
  { path: '/catalog/import',        label: 'Import',             parent: '/catalog' },
  { path: '/equipment',             label: 'Equipment Registry' },
  { path: '/equipment/:id',         label: 'Equipment Detail',   parent: '/equipment' },
  { path: '/quotations',            label: 'Quotations' },
  { path: '/quotations/new',        label: 'New Quotation',      parent: '/quotations' },
  { path: '/quotations/:id',        label: 'Quotation Detail',   parent: '/quotations' },
  { path: '/rental-contracts',      label: 'Rental Contracts' },
  { path: '/rental-contracts/new',  label: 'New Contract',       parent: '/rental-contracts' },
  { path: '/rental-contracts/:id',  label: 'Contract Detail',    parent: '/rental-contracts' },
  { path: '/movements',             label: 'Movement Control' },
  { path: '/movements/new',         label: 'New Movement',       parent: '/movements' },
  { path: '/movements/:id',         label: 'Movement Detail',    parent: '/movements' },
  { path: '/billing',                          label: 'Billing' },
  { path: '/billing/invoices',                 label: 'Invoices',             parent: '/billing' },
  { path: '/billing/invoices/:id',             label: 'Invoice Detail',       parent: '/billing/invoices' },
  { path: '/billing/payments',                 label: 'Payments',             parent: '/billing' },
  { path: '/billing/payments/:id',             label: 'Payment Detail',       parent: '/billing/payments' },
  { path: '/billing/deposits',                 label: 'Deposits',             parent: '/billing' },
  { path: '/billing/deposits/:id',             label: 'Deposit Detail',       parent: '/billing/deposits' },
  { path: '/billing/revenue-recognitions',     label: 'Revenue Recognition',  parent: '/billing' },
  { path: '/billing/finance',                label: 'Finance Dashboard',    parent: '/billing' },
  { path: '/billing/statements',             label: 'Statements',           parent: '/billing' },
  { path: '/billing/payments-unified',       label: 'Payment Manager',      parent: '/billing' },
  { path: '/billing/deposits-unified',       label: 'Deposit Manager',      parent: '/billing' },
  { path: '/maintenance',                   label: 'Maintenance & PM' },
  { path: '/maintenance/work-orders',       label: 'Work Orders',        parent: '/maintenance' },
  { path: '/maintenance/work-orders/new',   label: 'New Work Order',     parent: '/maintenance/work-orders' },
  { path: '/maintenance/work-orders/:id',   label: 'Work Order Detail',  parent: '/maintenance/work-orders' },
  { path: '/maintenance/schedules',         label: 'PM Schedules',       parent: '/maintenance' },
  { path: '/inventory',                     label: 'Inventory' },
  { path: '/inventory/parts',               label: 'Spare Parts',        parent: '/inventory' },
  { path: '/inventory/parts/new',           label: 'New Part',           parent: '/inventory/parts' },
  { path: '/inventory/parts/:id',           label: 'Part Detail',        parent: '/inventory/parts' },
  { path: '/inventory/warehouses',          label: 'Warehouses',         parent: '/inventory' },
  { path: '/inventory/purchase-orders',     label: 'Purchase Orders',    parent: '/inventory' },
  { path: '/executive',                    label: 'Executive Dashboard' },
]

export function matchRoute(pathname: string): RouteConfig | undefined {
  return ROUTE_CONFIG.find((r) => {
    const pattern = r.path.replace(/:[\w]+/g, '[^/]+')
    return new RegExp(`^${pattern}$`).test(pathname)
  })
}

export function buildBreadcrumbs(pathname: string): { label: string; path: string }[] {
  const current = matchRoute(pathname)
  if (!current) return [{ label: 'DK Service', path: '/' }]

  const crumbs: { label: string; path: string }[] = []

  let cfg: RouteConfig | undefined = current
  while (cfg) {
    crumbs.unshift({ label: cfg.label, path: cfg.parent ? pathname : pathname })
    if (cfg.parent) {
      cfg = ROUTE_CONFIG.find((r) => r.path === cfg!.parent)
      if (cfg) crumbs[0].path = pathname
      crumbs.unshift({ label: cfg?.label ?? '', path: cfg?.path ?? '' })
      break
    } else {
      break
    }
  }

  return crumbs
}

export function getPageTitle(pathname: string): string {
  return matchRoute(pathname)?.label ?? 'DK Service'
}
