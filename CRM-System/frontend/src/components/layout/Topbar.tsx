import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import './Topbar.css'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/customers': 'Customers',
  '/leads': 'Leads',
  '/activity': 'Activity',
  '/reports': 'Reports',
  '/settings': 'Settings',
  '/equipment': 'Equipment Registry',
  '/quotations': 'Quotations',
  '/rental-contracts': 'Rental Contracts',
}

interface TopbarProps {
  sidebarOpen: boolean
  onMenuClick: () => void
}

export default function Topbar({ sidebarOpen, onMenuClick }: TopbarProps) {
  const { user, logout: clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const title =
    PAGE_TITLES[pathname] ??
    PAGE_TITLES[`/${pathname.split('/')[1]}`] ??
    'DK Service'

  const initials = user
    ? (user.full_name ?? user.username)
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  const handleLogout = () => {
    clearAuth()
    navigate('/login', { replace: true })
  }

  return (
    <header className={`topbar${sidebarOpen ? '' : ' sidebar-closed'}`}>
      <button
        className="topbar-menu-btn"
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        <Menu size={18} />
      </button>

      <span className="topbar-title">{title}</span>

      <div className="topbar-right">
        <div className="topbar-user">
          <div className="topbar-avatar">{initials}</div>
          <span className="topbar-username">
            {user?.full_name ?? user?.username ?? '—'}
          </span>
        </div>

        <button className="topbar-logout" onClick={handleLogout}>
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  )
}
