import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getSalesOrders,
  deleteSalesOrder as apiDelete,
} from '@/api/salesOrder'
import type { SalesOrderListParams, SalesOrderListResponse } from '@/types/salesOrder'

const DEFAULT_PARAMS: SalesOrderListParams = {
  page: 1,
  page_size: 20,
  sort: 'created_at',
  order: 'desc',
}

export function useSalesOrders(initialParams: SalesOrderListParams = DEFAULT_PARAMS) {
  const { t } = useTranslation()
  const [response, setResponse]   = useState<SalesOrderListResponse | null>(null)
  const [params, setParams]       = useState<SalesOrderListParams>(initialParams)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async (p: SalesOrderListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getSalesOrders(p)
      setResponse(data)
    } catch {
      setError(t('salesOrders.list.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<SalesOrderListParams>) =>
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      const newPage = response && response.items.length === 1 && params.page! > 1
        ? params.page! - 1
        : params.page
      await load({ ...params, page: newPage })
      return true
    } catch {
      return false
    }
  }

  return {
    salesOrders: response?.items ?? [],
    total:       response?.total ?? 0,
    pages:       response?.pages ?? 1,
    page:        response?.page  ?? 1,
    params,
    isLoading,
    error,
    applyParams,
    refetch: () => load(params),
    remove,
  }
}
