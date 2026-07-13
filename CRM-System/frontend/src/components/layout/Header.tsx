import { Menu } from 'lucide-react'
import { useSidebarStore } from '@/store/sidebarStore'
import Breadcrumb from './Breadcrumb'
import SearchBar from '@/components/ui/SearchBar'
import NotificationCenter from '@/components/ui/NotificationCenter'
import UserProfileDropdown from '@/components/ui/UserProfileDropdown'
import './Header.css'

export default function Header() {
  const toggle = useSidebarStore((s) => s.toggle)

  return (
    <header className="header" role="banner">
      <div className="header-left">
        <button
          className="header-menu-btn"
          onClick={toggle}
          aria-label="Toggle sidebar"
          aria-expanded={useSidebarStore.getState().state === 'expanded'}
        >
          <Menu size={18} />
        </button>
        <Breadcrumb />
      </div>

      <div className="header-center">
        <SearchBar />
      </div>

      <nav className="header-right" aria-label="User actions">
        <NotificationCenter />
        <UserProfileDropdown />
      </nav>
    </header>
  )
}
