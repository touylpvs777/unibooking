import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Wrench, ClipboardList, AlertTriangle, CheckCircle, DollarSign, Clock } from 'lucide-react'
import { getDashboard } from '@/api/maintenance'
import type { DashboardSummary } from '@/types/maintenance'
import '@/styles/shared.css'

function fmtAmount(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

export default function MaintenanceDashboardPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<DashboardSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      try {
        setData((await getDashboard()).data)
      } catch { setError('Failed to load dashboard.') }
      finally { setIsLoading(false) }
    })()
  }, [])

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</div>
  if (error) return <div className="page-error"><AlertCircle size={16} /> {error}</div>
  if (!data) return null

  const cards = [
    { label: 'PM Plans', value: data.total_plans, icon: ClipboardList, color: 'var(--color-primary-500)', onClick: () => navigate('/maintenance/schedules') },
    { label: 'Active Schedules', value: data.active_schedules, icon: Clock, color: 'var(--color-info-500)', onClick: () => navigate('/maintenance/schedules') },
    { label: 'Overdue', value: data.overdue_count, icon: AlertTriangle, color: 'var(--color-danger-500)', onClick: () => navigate('/maintenance/work-orders?status=due') },
    { label: 'In Progress', value: data.in_progress_count, icon: Wrench, color: 'var(--color-warning-500)', onClick: () => navigate('/maintenance/work-orders?status=in_progress') },
    { label: 'Completed (Month)', value: data.completed_this_month, icon: CheckCircle, color: 'var(--color-success-500)', onClick: () => navigate('/maintenance/work-orders?status=completed') },
    { label: 'Cost (Month)', value: `${fmtAmount(data.total_cost_this_month)} ${data.currency}`, icon: DollarSign, color: 'var(--color-purple-500)', onClick: undefined },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Maintenance & PM</h1>
          <p className="page-header-sub">Preventive maintenance dashboard</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => navigate('/maintenance/schedules')}>PM Schedules</button>
          <button className="btn btn-primary" onClick={() => navigate('/maintenance/work-orders')}>Work Orders</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 16 }}>
        {cards.map((c) => (
          <div
            key={c.label}
            onClick={c.onClick}
            style={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)', padding: '16px 18px',
              cursor: c.onClick ? 'pointer' : 'default',
              borderLeft: `3px solid ${c.color}`,
              transition: 'box-shadow var(--duration-fast)',
            }}
            onMouseEnter={(e) => { if (c.onClick) e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <c.icon size={18} style={{ color: c.color }} />
              <span style={{ fontSize: 11.5, color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{c.label}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)', marginTop: 8, fontVariantNumeric: 'tabular-nums' }}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
