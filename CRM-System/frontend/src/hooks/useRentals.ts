import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getRentalContracts,
  createRentalContract as apiCreate,
  deleteRentalContract as apiDelete,
} from '@/api/rental'
import { toast } from '@/store/toastStore'
import type { RentalContractCreate, RentalContractListParams, RentalContractListResponse } from '@/types/rental'

const DEFAULT_PARAMS: RentalContractListParams = {
  page: 1,
  page_size: 20,
  sort: 'created_at',
  order: 'desc',
}

export function useRentalContracts(initialParams: RentalContractListParams = DEFAULT_PARAMS) {
  const { t } = useTranslation()
  const [response, setResponse]   = useState<RentalContractListResponse | null>(null)
  const [params, setParams]       = useState<RentalContractListParams>(initialParams)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async (p: RentalContractListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getRentalContracts(p)
      setResponse(data)
    } catch {
      setError(t('rental.list.toast.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<RentalContractListParams>) =>
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))

  const create = async (data: RentalContractCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load(params)
      toast.success(t('rental.list.toast.createSuccess'))
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? t('rental.list.toast.createError'))
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
      toast.success(t('rental.list.toast.deleteSuccess'))
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? t('rental.list.toast.deleteError'))
      return false
    }
  }

  return {
    contracts: response?.items ?? [],
    total:     response?.total ?? 0,
    pages:     response?.pages ?? 1,
    page:      response?.page  ?? 1,
    params,
    isLoading,
    error,
    applyParams,
    refetch: () => load(params),
    create,
    remove,
  }
}
