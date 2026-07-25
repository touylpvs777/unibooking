import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard, Users, TrendingUp, Activity, BarChart2, Settings,
  Package, Truck, FileText, ClipboardList,
  Building2, ArrowRightLeft, Wrench, Radio,
  Box, Receipt, CreditCard, Landmark, FileSpreadsheet, Warehouse, LogOut,
  UserCircle, KeyRound, PanelLeftClose, PanelLeftOpen, Pencil, Check,
} from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useAuthStore } from '@/store/authStore'
import { useSidebarStore } from '@/store/sidebarStore'
import './Sidebar.css'

interface NavGroup {
  id: string
  labelKey: string
  items: { to: string; labelKey: string; icon: React.ElementType; adminOnly?: boolean }[]
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
    id: 'projects',
    labelKey: 'nav.groups.projects',
    items: [
      { to: '/projects', labelKey: 'nav.items.warehouseProjects', icon: Warehouse },
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
      { to: '/activities', labelKey: 'nav.items.activity', icon: Activity, adminOnly: true },
      { to: '/reports', labelKey: 'nav.items.reports', icon: BarChart2 },
      { to: '/iot-management', labelKey: 'nav.items.iotTelemetry', icon: Radio, adminOnly: true },
      // '/executive' (Analytics) removed for the MVP presentation — redundant with
      // the new /dashboard executive overview, and the endpoint isn't wired up yet.
    ],
  },
]

export default function Sidebar() {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const sidebarState = useSidebarStore((s) => s.state)
  const setState = useSidebarStore((s) => s.setState)
  const toggle = useSidebarStore((s) => s.toggle)
  const isExpanded = sidebarState === 'expanded'

  const initials = user
    ? (user.full_name ?? user.username).split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'
  const displayName = user?.full_name ?? user?.username ?? '—'
  const role = user?.is_superuser ? t('header.roleAdmin') : t('header.roleUser')

  const closeMobile = () => {
    if (window.innerWidth <= 768) setState('hidden')
  }

  const [isUserMenuOpen, setUserMenuOpen] = useState(false)
  const [menuPos, setMenuPos] = useState<{ left: number; bottom: number } | null>(null)
  const userTriggerRef = useRef<HTMLButtonElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const toggleUserMenu = () => {
    if (!isUserMenuOpen) {
      const rect = userTriggerRef.current?.getBoundingClientRect()
      if (rect) setMenuPos({ left: rect.left, bottom: window.innerHeight - rect.top + 8 })
    }
    setUserMenuOpen((v) => !v)
  }

  useEffect(() => {
    if (!isUserMenuOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        userTriggerRef.current && !userTriggerRef.current.contains(target) &&
        userMenuRef.current && !userMenuRef.current.contains(target)
      ) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isUserMenuOpen])

  const handleLogout = () => {
    setUserMenuOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  const [logoSrc, setLogoSrc] = useState<string | null>(() => localStorage.getItem('sidebarLogo'))
  const logoInputRef = useRef<HTMLInputElement>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result !== 'string') return
      setLogoSrc(result)
      try {
        localStorage.setItem('sidebarLogo', result)
      } catch {
        // localStorage quota exceeded (e.g. very large image) — keep the logo in memory for this session only
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const [companyName, setCompanyName] = useState<string>(() => localStorage.getItem('companyName') || 'DK Service')
  const [nameDraft, setNameDraft] = useState(companyName)

  const saveCompanyName = () => {
    const trimmed = nameDraft.trim() || 'DK Service'
    setCompanyName(trimmed)
    setNameDraft(trimmed)
    localStorage.setItem('companyName', trimmed)
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      saveCompanyName()
      e.currentTarget.blur()
    }
  }

  return (
    <>
      <div
        className={`sidebar-overlay${sidebarState === 'expanded' && window.innerWidth <= 768 ? ' visible' : ''}`}
        onClick={() => setState('hidden')}
        aria-hidden="true"
      />

      <aside className="sidebar transition-all duration-300" data-state={sidebarState} aria-label="Main navigation">
        {/* Brand */}
        <div className="sidebar-brand">
          <NavLink to="/dashboard" className="sidebar-brand-icon-link" onClick={closeMobile} title={companyName}>
            <div className="sidebar-brand-icon-wrap">
              <div className="sidebar-brand-icon">
                {logoSrc
                  ? <img src={logoSrc} alt="" className="sidebar-brand-logo-img" />
                  : <Building2 size={18} />}
              </div>
              <button
                type="button"
                className="sidebar-logo-edit-btn"
                title={t('common.changeLogo', 'Change logo')}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); logoInputRef.current?.click() }}
              >
                <Pencil size={10} />
              </button>
            </div>
          </NavLink>

          {isExpanded && (
            <div className="sidebar-brand-name-edit">
              <input
                type="text"
                className="sidebar-brand-name-input"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onKeyDown={handleNameKeyDown}
                placeholder={t('common.brandName')}
                aria-label={t('common.companyName', 'Company name')}
              />
              <button
                type="button"
                className="sidebar-brand-name-save"
                title={t('common.save', 'Save')}
                onClick={saveCompanyName}
              >
                <Check size={13} />
              </button>
            </div>
          )}
        </div>
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleLogoChange}
        />

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_GROUPS.map((group) => (
            <div key={group.id} className="sidebar-group">
              <div className="sidebar-group-items">
                {group.items
                  .filter((item) => !item.adminOnly || user?.is_superuser)
                  .map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/catalog' || item.to === '/billing'}
                    className={({ isActive }) =>
                      `sidebar-nav-item${isActive ? ' active' : ''}`
                    }
                    onClick={closeMobile}
                    title={t(item.labelKey)}
                  >
                    <item.icon className="sidebar-nav-icon" size={16} />
                    {isExpanded && <span className="sidebar-nav-label">{t(item.labelKey)}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          <div className="sidebar-divider" />
          {user?.is_superuser && (
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `sidebar-nav-item${isActive ? ' active' : ''}`
              }
              onClick={closeMobile}
              title={t('nav.items.settings')}
            >
              <Settings className="sidebar-nav-icon" size={16} />
              {isExpanded && <span className="sidebar-nav-label">{t('nav.items.settings')}</span>}
            </NavLink>
          )}
        </nav>

        {/* Expand / collapse toggle */}
        <button
          type="button"
          className="sidebar-toggle-btn"
          onClick={toggle}
          title={isExpanded ? t('common.collapseSidebar', 'Collapse') : t('common.expandSidebar', 'Expand')}
        >
          {isExpanded ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          {isExpanded && <span className="sidebar-nav-label">{t('common.collapseSidebar', 'Collapse')}</span>}
        </button>

        {/* Footer */}
        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-user"
            ref={userTriggerRef}
            onClick={toggleUserMenu}
            aria-haspopup="true"
            aria-expanded={isUserMenuOpen}
            title={displayName}
          >
            <div className="sidebar-avatar">{initials}</div>
            {isExpanded && (
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{displayName}</div>
                <div className="sidebar-user-role">{role}</div>
              </div>
            )}
          </button>

          {isUserMenuOpen && menuPos && createPortal(
            <div
              ref={userMenuRef}
              className="sidebar-user-menu"
              style={{ position: 'fixed', left: menuPos.left, bottom: menuPos.bottom }}
              role="menu"
            >
              <div className="sidebar-user-menu-header">
                <div className="sidebar-avatar" style={{ width: 38, height: 38, fontSize: 13 }}>{initials}</div>
                <div className="sidebar-user-menu-header-info">
                  <div className="sidebar-user-menu-name">{displayName}</div>
                  {user?.email && <div className="sidebar-user-menu-email">{user.email}</div>}
                  <div className="sidebar-user-menu-role">{role}</div>
                </div>
              </div>

              <div className="sidebar-user-menu-section">
                <div className="sidebar-user-menu-section-label">{t('header.appearance')}</div>
                <ThemeToggle />
              </div>

              <div className="sidebar-user-menu-divider" />

              <button
                type="button"
                className="sidebar-user-menu-item"
                role="menuitem"
                onClick={() => { setUserMenuOpen(false); closeMobile(); navigate('/settings') }}
              >
                <Settings size={14} /> {t('header.settings')}
              </button>

              <div className="sidebar-user-menu-divider" />

              <button
                type="button"
                className="sidebar-user-menu-item"
                role="menuitem"
                onClick={() => { setUserMenuOpen(false); closeMobile(); navigate('/profile') }}
              >
                <UserCircle size={14} /> {t('header.myProfile')}
              </button>
              <button
                type="button"
                className="sidebar-user-menu-item"
                role="menuitem"
                onClick={() => { setUserMenuOpen(false); closeMobile(); navigate('/change-password') }}
              >
                <KeyRound size={14} /> {t('header.changePassword')}
              </button>

              <div className="sidebar-user-menu-divider" />

              <button type="button" className="sidebar-user-menu-item danger" role="menuitem" onClick={handleLogout}>
                <LogOut size={14} /> {t('header.logout')}
              </button>
            </div>,
            document.body
          )}
        </div>
      </aside>
    </>
  )
}
