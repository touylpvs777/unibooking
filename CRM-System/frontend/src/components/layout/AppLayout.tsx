import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSidebarStore } from '@/store/sidebarStore'
import Sidebar from './Sidebar'
import Header from './Header'
import './AppLayout.css'

export default function AppLayout() {
  const sidebarState = useSidebarStore((s) => s.state)
  const setState = useSidebarStore((s) => s.setState)

  useEffect(() => {
    let lastDesktopState: 'expanded' | 'collapsed' = 'expanded'

    const handler = () => {
      const w = window.innerWidth
      if (w <= 768) {
        setState('hidden')
      } else if (w <= 1024) {
        setState('collapsed')
      } else {
        const saved = localStorage.getItem('dk-sidebar') as 'expanded' | 'collapsed' | null
        setState(saved === 'collapsed' ? 'collapsed' : lastDesktopState)
      }
    }

    const current = useSidebarStore.getState().state
    if (current !== 'hidden') lastDesktopState = current as 'expanded' | 'collapsed'

    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [setState])

  const sidebarWidth =
    sidebarState === 'expanded' ? 'var(--sidebar-width-expanded)' :
    sidebarState === 'collapsed' ? 'var(--sidebar-width-collapsed)' :
    '0px'

  return (
    <div
      className="app-shell"
      style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}
    >
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
