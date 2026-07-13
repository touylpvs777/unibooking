import { useState, useEffect, useCallback } from 'react'
import { getActivity } from '@/api/activity'
import type { ActivityLog } from '@/types/activity'

export interface ActivityFilters {
  action?: string
  entity_type?: string
  from_date?: string
  to_date?: string
}

export function useActivity(filters: ActivityFilters) {
  const [logs, setLogs]         = useState<ActivityLog[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getActivity({
        limit: 200,
        ...(filters.action      && { action:      filters.action }),
        ...(filters.entity_type && { entity_type: filters.entity_type }),
        ...(filters.from_date   && { from_date:   filters.from_date }),
        ...(filters.to_date     && { to_date:      filters.to_date }),
      })
      setLogs(data)
    } catch {
      setError('Failed to load activity log.')
    } finally {
      setLoading(false)
    }
  }, [filters.action, filters.entity_type, filters.from_date, filters.to_date])

  useEffect(() => { load() }, [load])

  return { logs, isLoading, error, refetch: load }
}
