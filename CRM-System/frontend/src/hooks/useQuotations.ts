import { useState, useEffect, useCallback } from 'react'
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
      setError('Failed to load quotations.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<QuotationListParams>) =>
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))

  const create = async (data: QuotationCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load(params)
      toast.success('Quotation created.')
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? 'Failed to create quotation.')
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
      toast.success('Quotation deleted.')
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? 'Failed to delete quotation.')
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
