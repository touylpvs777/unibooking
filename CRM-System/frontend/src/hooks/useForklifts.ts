import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getForklifts,
  createForklift as apiCreate,
  updateForklift as apiUpdate,
  deleteForklift as apiDelete,
} from '@/api/forklift'
import { toast } from '@/store/toastStore'
import type { ForkliftCreate, ForkliftUpdate, ForkliftListParams, ForkliftListResponse } from '@/types/forklift'

const DEFAULT_PARAMS: ForkliftListParams = {
  page: 1,
  page_size: 20,
  is_active: undefined,
  sort: 'created_at',
  order: 'desc',
}

export function useForklifts(initialParams: ForkliftListParams = DEFAULT_PARAMS) {
  const { t } = useTranslation()
  const [response, setResponse]   = useState<ForkliftListResponse | null>(null)
  const [params, setParams]       = useState<ForkliftListParams>(initialParams)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async (p: ForkliftListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getForklifts(p)
      setResponse(data)
    } catch {
      setError(t('equipment.registry.toast.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<ForkliftListParams>) =>
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))

  const create = async (data: ForkliftCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load(params)
      toast.success(t('equipment.registry.toast.createSuccess'))
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? t('equipment.registry.toast.createError'))
      return false
    }
  }

  const update = async (id: number, data: ForkliftUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load(params)
      toast.success(t('equipment.registry.toast.updateSuccess'))
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? t('equipment.registry.toast.updateError'))
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
      toast.success(t('equipment.registry.toast.deleteSuccess'))
      return true
    } catch {
      toast.error(t('equipment.registry.toast.deleteError'))
      return false
    }
  }

  return {
    forklifts: response?.items ?? [],
    total:     response?.total ?? 0,
    pages:     response?.pages ?? 1,
    page:      response?.page  ?? 1,
    params,
    isLoading,
    error,
    applyParams,
    refetch: () => load(params),
    create,
    update,
    remove,
  }
}

export type UseForkliftsReturn = ReturnType<typeof useForklifts>
