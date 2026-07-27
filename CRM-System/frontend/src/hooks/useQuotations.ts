import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getQuotations,
  createQuotation as apiCreate,
  deleteQuotation as apiDelete,
} from '@/api/quotation'
import { toast } from '@/store/toastStore'
import type { QuotationCreate, QuotationListParams, QuotationListResponse } from '@/types/quotation'

const DEFAULT_PARAMS: QuotationListParams = {
  page: 1,
  page_size: 20,
  sort: 'created_at',
  order: 'desc',
}

export function useQuotations(initialParams: QuotationListParams = DEFAULT_PARAMS) {
  const { t } = useTranslation()
  const [response, setResponse]   = useState<QuotationListResponse | null>(null)
  const [params, setParams]       = useState<QuotationListParams>(initialParams)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async (p: QuotationListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getQuotations(p)
      setResponse(data)
    } catch {
      setError(t('quotations.list.toast.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<QuotationListParams>) =>
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))

  const create = async (data: QuotationCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load(params)
      toast.success(t('quotations.list.toast.createSuccess'))
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? t('quotations.list.toast.createError'))
      return false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      const newPage = response && response.items.length === 1 && params.page! > 1
        ? params.page! - 1
        : params.page
      await load({ ...params, page: newPage })
      toast.success(t('quotations.list.toast.deleteSuccess'))
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? t('quotations.list.toast.deleteError'))
      return false
    }
  }

  return {
    quotations: response?.items ?? [],
    total:      response?.total ?? 0,
    pages:      response?.pages ?? 1,
    page:       response?.page  ?? 1,
    params,
    isLoading,
    error,
    applyParams,
    refetch: () => load(params),
    create,
    remove,
  }
}
