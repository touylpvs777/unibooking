import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getDeliveryNotes,
  deleteDeliveryNote as apiDelete,
} from '@/api/deliveryNote'
import type { DeliveryNoteListParams, DeliveryNoteListResponse } from '@/types/deliveryNote'

const DEFAULT_PARAMS: DeliveryNoteListParams = {
  page: 1,
  page_size: 20,
  sort: 'created_at',
  order: 'desc',
}

export function useDeliveryNotes(initialParams: DeliveryNoteListParams = DEFAULT_PARAMS) {
  const { t } = useTranslation()
  const [response, setResponse]   = useState<DeliveryNoteListResponse | null>(null)
  const [params, setParams]       = useState<DeliveryNoteListParams>(initialParams)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async (p: DeliveryNoteListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getDeliveryNotes(p)
      setResponse(data)
    } catch {
      setError(t('deliveryNotes.list.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<DeliveryNoteListParams>) =>
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
    deliveryNotes: response?.items ?? [],
    total:         response?.total ?? 0,
    pages:         response?.pages ?? 1,
    page:          response?.page  ?? 1,
    params,
    isLoading,
    error,
    applyParams,
    refetch: () => load(params),
    remove,
  }
}
