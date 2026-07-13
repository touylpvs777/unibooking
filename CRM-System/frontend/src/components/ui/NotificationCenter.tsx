import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Users, TrendingUp, FileText, ClipboardList, Truck, Activity as ActivityIcon } from 'lucide-react'
import { getActivity } from '@/api/activity'
import type { ActivityLog } from '@/types/activity'
import './NotificationCenter.css'

const ENTITY_ICONS: Record<string, React.ElementType> = {
  customer: Users, lead: TrendingUp, quotation: FileText,
  rental_contract: ClipboardList, forklift: Truck,
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function actionLabel(action: string): string {
  return action.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getActivity({ limit: 10 })
      .then(({ data }) => {
        setActivities(data)
        const lastRead = localStorage.getItem('dk-last-notification-read')
        if (lastRead) {
          setUnreadCount(data.filter((a) => new Date(a.created_at) > new Date(lastRead)).length)
        } else {
          setUnreadCount(data.length)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
  }, [])

  const handleOpen = () => {
    setIsOpen((v) => !v)
    if (!isOpen) {
      localStorage.setItem('dk-last-notification-read', new Date().toISOString())
      setUnreadCount(0)
    }
  }

  return (
    <div className="notification-center" ref={ref} onKeyDown={handleKeyDown}>
      <button
        className="notification-trigger"
        onClick={handleOpen}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell size={18} />
        {unreadCount > 0 && <span className="notification-badge" aria-hidden="true">{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notification-dropdown" role="menu" aria-label="Notifications">
          <div className="notification-header">
            <span className="notification-header-title">Notifications</span>
          </div>
          <div className="notification-list" role="group">
            {activities.length === 0 ? (
              <div className="notification-empty" role="status">No recent activity</div>
            ) : (
              activities.map((a) => {
                const Icon = ENTITY_ICONS[a.entity_type ?? ''] ?? ActivityIcon
                return (
                  <button
                    key={a.id}
                    className="notification-item"
                    role="menuitem"
                    onClick={() => { setIsOpen(false); navigate('/activity') }}
                  >
                    <div className="notification-item-icon"><Icon size={14} /></div>
                    <div className="notification-item-content">
                      <div className="notification-item-text">{actionLabel(a.action)}</div>
                      <div className="notification-item-meta">
                        {a.user?.full_name ?? a.user?.username ?? 'System'} · {relativeTime(a.created_at)}
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
          <button className="notification-footer" role="menuitem" onClick={() => { setIsOpen(false); navigate('/activity') }}>
            View all activity →
          </button>
        </div>
      )}
    </div>
  )
}
