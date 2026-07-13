import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard, Users, TrendingUp, Activity, BarChart2, Settings,
  Package, Truck, FileText, ClipboardList,
  Building2, ChevronDown, PanelLeftClose, PanelLeftOpen, ArrowRightLeft, Wrench,
  Box, Receipt, CreditCard, Landmark, FileSpreadsheet, PieChart,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useSidebarStore } from '@/store/sidebarStore'
import './Sidebar.css'

interface NavGroup {
  id: string
  labelKey: string
  items: { to: string; labelKey: string; icon: React.ElementType }[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'dashboard',
    labelKey: 'nav.groups.dashboard',
    items: [
      { to: '/dashboard', labelKey: 'nav.items.overview', icon: LayoutDashboard },
    ],
  },
  {
    id: 'crm',
    labelKey: 'nav.groups.crm',
    items: [
      { to: '/customers', labelKey: 'nav.items.customers', icon: Users },
      { to: '/leads', labelKey: 'nav.items.leads', icon: TrendingUp },
      { to: '/quotations', labelKey: 'nav.items.quotations', icon: FileText },
    ],
  },
  {
    id: 'equipment',
    labelKey: 'nav.groups.equipment',
    items: [
      { to: '/equipment', labelKey: 'nav.items.registry', icon: Truck },
      { to: '/movements', labelKey: 'nav.items.movements', icon: ArrowRightLeft },
    ],
  },
  {
    id: 'rental',
    labelKey: 'nav.groups.rental',
    items: [
      { to: '/rental-contracts', labelKey: 'nav.items.contracts', icon: ClipboardList },
    ],
  },
  {
    id: 'maintenance',
    labelKey: 'nav.groups.maintenance',
    items: [
      { to: '/maintenance', labelKey: 'nav.items.dashboard', icon: Wrench },
    ],
  },
  {
    id: 'inventory',
    labelKey: 'nav.groups.inventory',
    items: [
      { to: '/inventory', labelKey: 'nav.items.dashboard', icon: Box },
      { to: '/catalog', labelKey: 'nav.items.products', icon: Package },
    ],
  },
  {
    id: 'finance',
    labelKey: 'nav.groups.finance',
    items: [
      { to: '/billing', labelKey: 'nav.items.dashboard', icon: Receipt },
      { to: '/billing/invoices', labelKey: 'nav.items.invoices', icon: FileText },
      { to: '/billing/payments', labelKey: 'nav.items.payments', icon: CreditCard },
      { to: '/billing/deposits', labelKey: 'nav.items.deposits', icon: Landmark },
      { to: '/billing/statements', labelKey: 'nav.items.statements', icon: FileSpreadsheet },
    ],
  },
  {
    id: 'executive',
    labelKey: 'nav.groups.executive',
    items: [
      { to: '/activity', labelKey: 'nav.items.activity', icon: Activity },
      { to: '/reports', labelKey: 'nav.items.reports', icon: BarChart2 },
      { to: '/executive', labelKey: 'nav.items.analytics', icon: PieChart },
    ],
  },
]

export default function Sidebar() {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)
  const sidebarState = useSidebarStore((s) => s.state)
  const collapsedGroups = useSidebarStore((s) => s.collapsedGroups)
  const toggleGroup = useSidebarStore((s) => s.toggleGroup)
  const toggle = useSidebarStore((s) => s.toggle)
  const setState = useSidebarStore((s) => s.setState)

  const isCollapsed = sidebarState === 'collapsed'
  const isHidden = sidebarState === 'hidden'

  const initials = user
    ? (user.full_name ?? user.username).split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'
  const displayName = user?.full_name ?? user?.username ?? '—'
  const role = user?.is_superuser ? t('header.roleAdmin') : t('header.roleUser')

  const closeMobile = () => {
    if (window.innerWidth <= 768) setState('hidden')
  }

  return (
    <>
      <div
        className={`sidebar-overlay${sidebarState === 'expanded' && window.innerWidth <= 768 ? ' visible' : ''}`}
        onClick={() => setState('hidden')}
        aria-hidden="true"
      />

      <aside className="sidebar" data-state={sidebarState} aria-label="Main navigation">
        {/* Brand */}
        <NavLink to="/dashboard" className="sidebar-brand" onClick={closeMobile}>
          <div className="sidebar-brand-icon">
            <Building2 size={18} />
          </div>
          {!isCollapsed && (
            <div className="sidebar-brand-text">
              <span className="sidebar-brand-name">{t('common.brandName')}</span>
              <span className="sidebar-brand-sub">{t('common.brandTagline')}</span>
            </div>
          )}
        </NavLink>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_GROUPS.map((group) => {
            const isGroupCollapsed = collapsedGroups.includes(group.id)
            return (
              <div key={group.id} className="sidebar-group">
                {!isCollapsed && (
                  <button
                    className="sidebar-group-header"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={!isGroupCollapsed}
                  >
                    <span>{t(group.labelKey)}</span>
                    <ChevronDown
                      size={12}
                      className={`sidebar-group-arrow${isGroupCollapsed ? ' collapsed' : ''}`}
                    />
                  </button>
                )}

                {(isCollapsed || !isGroupCollapsed) && (
                  <div className="sidebar-group-items">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/catalog' || item.to === '/billing'}
                        className={({ isActive }) =>
                          `sidebar-nav-item${isActive ? ' active' : ''}`
                        }
                        onClick={closeMobile}
                        title={isCollapsed ? t(item.labelKey) : undefined}
                      >
                        <item.icon className="sidebar-nav-icon" size={16} />
                        {!isCollapsed && <span className="sidebar-label">{t(item.labelKey)}</span>}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <div className="sidebar-divider" />
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `sidebar-nav-item${isActive ? ' active' : ''}`
            }
            onClick={closeMobile}
            title={isCollapsed ? t('nav.items.settings') : undefined}
          >
            <Settings className="sidebar-nav-icon" size={16} />
            {!isCollapsed && <span className="sidebar-label">{t('nav.items.settings')}</span>}
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials}</div>
            {!isCollapsed && (
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{displayName}</div>
                <div className="sidebar-user-role">{role}</div>
              </div>
            )}
          </div>
          {!isHidden && (
            <button
              className="sidebar-collapse-btn"
              onClick={toggle}
              title={isCollapsed ? t('nav.expandSidebar') : t('nav.collapseSidebar')}
              aria-label={isCollapsed ? t('nav.expandSidebar') : t('nav.collapseSidebar')}
            >
              {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
