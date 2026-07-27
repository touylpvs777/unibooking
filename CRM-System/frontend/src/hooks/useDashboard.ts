import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { AxiosError } from 'axios'
import { getSummary, getLeadTrend, getCustomerTrend, getLeadMetrics } from '@/api/dashboard'
import type { DashboardSummary, TrendPoint, LeadMetrics } from '@/types/dashboard'
import { withMockFallback, generateMockTrend } from '@/utils/mockAdapter'

// ── Summary ─────────────────────────────────────────────────
export function useDashboardSummary() {
  const { t } = useTranslation()
  const [data, setData]         = useState<DashboardSummary | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: summary } = await getSummary()
      setData(summary)
    } catch {
      setError(t('dashboard.loadError'))
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => { load() }, [load])
  return { data, isLoading, error, refetch: load }
}

// ── Lead Trend ───────────────────────────────────────────────
export function useLeadTrend(months = 12) {
  const { t } = useTranslation()
  const [data, setData]         = useState<TrendPoint[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [isMock, setIsMock]     = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const MOCK = generateMockTrend(24, months)
      const { data: trend } = await withMockFallback(() => getLeadTrend(months), MOCK)
      // Detect mock: mock data has the same month labels as generated
      setIsMock(trend === MOCK)
      setData(trend)
    } catch (err) {
      const status = (err as AxiosError).response?.status
      if (status !== 401 && status !== 403) {
        setData([])           // non-auth errors → show empty state, not crash
        setError(null)
      } else {
        setError(t('dashboard.errors.leadTrend'))
      }
    } finally {
      setLoading(false)
    }
  }, [months, t])

  useEffect(() => { load() }, [load])
  return { data, isLoading, error, isMock, refetch: load }
}

// ── Customer Trend ───────────────────────────────────────────
export function useCustomerTrend(months = 12) {
  const { t } = useTranslation()
  const [data, setData]         = useState<TrendPoint[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [isMock, setIsMock]     = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const MOCK = generateMockTrend(12, months)
      const { data: trend } = await withMockFallback(() => getCustomerTrend(months), MOCK)
      setIsMock(trend === MOCK)
      setData(trend)
    } catch (err) {
      const status = (err as AxiosError).response?.status
      if (status !== 401 && status !== 403) {
        setData([])
        setError(null)
      } else {
        setError(t('dashboard.errors.customerTrend'))
      }
    } finally {
      setLoading(false)
    }
  }, [months, t])

  useEffect(() => { load() }, [load])
  return { data, isLoading, error, isMock, refetch: load }
}

// ── Lead Metrics ─────────────────────────────────────────────
export function useLeadMetrics() {
  const { t } = useTranslation()
  const [data, setData]         = useState<LeadMetrics | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)

  const MOCK_METRICS: LeadMetrics = {
    total: 0,
    conversion_rate: 0,
    win_rate: 0,
    lost_rate: 0,
    by_status: {},
    by_source: {},
  }

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data: metrics } = await withMockFallback(() => getLeadMetrics(), MOCK_METRICS)
      setData(metrics)
    } catch (err) {
      const status = (err as AxiosError).response?.status
      if (status !== 401 && status !== 403) {
        setData(MOCK_METRICS)
        setError(null)
      } else {
        setError(t('dashboard.errors.leadMetrics'))
      }
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  useEffect(() => { load() }, [load])
  return { data, isLoading, error, refetch: load }
}
