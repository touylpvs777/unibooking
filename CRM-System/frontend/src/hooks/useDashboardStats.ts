import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { getErpSummary, getProfitTrend } from '@/api/dashboard'

export function useDashboardStats() {
  const { t } = useTranslation()

  const query = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const [summaryRes, trendRes] = await Promise.all([getErpSummary(), getProfitTrend(6)])
      return { data: summaryRes.data, trend: trendRes.data }
    },
  })

  return {
    data: query.data?.data ?? null,
    trend: query.data?.trend ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.isError ? t('dashboard.erp.loadError') : null,
    refetch: query.refetch,
  }
}
