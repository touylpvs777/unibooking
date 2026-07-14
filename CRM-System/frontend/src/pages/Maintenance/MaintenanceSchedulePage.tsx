import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { getSchedules } from '@/api/maintenance'
import PMCalendar from '@/components/maintenance/PMCalendar'
import type { MaintenanceSchedule } from '@/types/maintenance'
import '@/styles/shared.css'

export default function MaintenanceSchedulePage() {
  const { t } = useTranslation()
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setIsLoading(true); setError(null)
    try { setSchedules((await getSchedules()).data) }
    catch { setError(t('maintenance.schedule.loadError')) }
    finally { setIsLoading(false) }
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>{t('maintenance.schedule.title')}</h1>
          <p className="page-header-sub">{t('maintenance.schedule.activeSchedules', { count: schedules.length })}</p>
        </div>
        <button className="btn btn-ghost" onClick={load} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> {t('maintenance.actions.refresh')}
        </button>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      {isLoading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12, marginTop: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ height: 110, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }} />
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 16 }}>
          <PMCalendar schedules={schedules} />
        </div>
      )}
    </div>
  )
}
