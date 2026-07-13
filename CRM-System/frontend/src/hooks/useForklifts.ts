import { useState, useEffect, useCallback } from 'react'
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
      setError('Failed to load forklifts.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<ForkliftListParams>) =>
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))

  const create = async (data: ForkliftCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load(params)
      toast.success('Forklift registered successfully.')
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? 'Failed to register forklift.')
      return false
    }
  }

  const update = async (id: number, data: ForkliftUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load(params)
      toast.success('Forklift updated successfully.')
      return true
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? 'Failed to update forklift.')
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
      toast.success('Forklift deleted.')
      return true
    } catch {
      toast.error('Failed to delete forklift.')
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
