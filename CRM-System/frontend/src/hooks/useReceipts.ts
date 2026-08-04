import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getReceipts,
  deleteReceipt as apiDelete,
} from '@/api/receipt'
import type { ReceiptListParams, ReceiptListResponse } from '@/types/receipt'

const DEFAULT_PARAMS: ReceiptListParams = {
  page: 1,
  page_size: 20,
  sort: 'created_at',
  order: 'desc',
}

export function useReceipts(initialParams: ReceiptListParams = DEFAULT_PARAMS) {
  const { t } = useTranslation()
  const [response, setResponse]   = useState<ReceiptListResponse | null>(null)
  const [params, setParams]       = useState<ReceiptListParams>(initialParams)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async (p: ReceiptListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getReceipts(p)
      setResponse(data)
    } catch {
      setError(t('receipts.list.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<ReceiptListParams>) =>
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
    receipts:    response?.items ?? [],
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
