import { NavLink } from 'react-router-dom'
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
  label: string
  items: { to: string; label: string; icon: React.ElementType }[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    items: [
      { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    ],
  },
  {
    id: 'crm',
    label: 'CRM',
    items: [
      { to: '/customers', label: 'Customers', icon: Users },
      { to: '/leads', label: 'Leads', icon: TrendingUp },
      { to: '/quotations', label: 'Quotations', icon: FileText },
    ],
  },
  {
    id: 'equipment',
    label: 'Equipment',
    items: [
      { to: '/equipment', label: 'Registry', icon: Truck },
      { to: '/movements', label: 'Movements', icon: ArrowRightLeft },
    ],
  },
  {
    id: 'rental',
    label: 'Rental',
    items: [
      { to: '/rental-contracts', label: 'Contracts', icon: ClipboardList },
    ],
  },
  {
    id: 'maintenance',
    label: 'Maintenance',
    items: [
      { to: '/maintenance', label: 'Dashboard', icon: Wrench },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    items: [
      { to: '/inventory', label: 'Dashboard', icon: Box },
      { to: '/catalog', label: 'Products', icon: Package },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    items: [
      { to: '/billing', label: 'Dashboard', icon: Receipt },
      { to: '/billing/invoices', label: 'Invoices', icon: FileText },
      { to: '/billing/payments', label: 'Payments', icon: CreditCard },
      { to: '/billing/deposits', label: 'Deposits', icon: Landmark },
      { to: '/billing/statements', label: 'Statements', icon: FileSpreadsheet },
    ],
  },
  {
    id: 'executive',
    label: 'Executive BI',
    items: [
      { to: '/activity', label: 'Activity', icon: Activity },
      { to: '/reports', label: 'Reports', icon: BarChart2 },
      { to: '/executive', label: 'Analytics', icon: PieChart },
    ],
  },
]

export default function Sidebar() {
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
  const role = user?.is_superuser ? 'Administrator' : 'User'

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
              <span className="sidebar-brand-name">DK Service</span>
              <span className="sidebar-brand-sub">Enterprise Platform</span>
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
                    <span>{group.label}</span>
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
                        title={isCollapsed ? item.label : undefined}
                      >
                        <item.icon className="sidebar-nav-icon" size={16} />
                        {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
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
            title={isCollapsed ? 'Settings' : undefined}
          >
            <Settings className="sidebar-nav-icon" size={16} />
            {!isCollapsed && <span className="sidebar-label">Settings</span>}
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
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
