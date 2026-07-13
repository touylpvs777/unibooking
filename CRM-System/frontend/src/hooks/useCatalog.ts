import { useState, useEffect, useCallback } from 'react'
import {
  getProducts,
  createProduct as apiCreate,
  updateProduct as apiUpdate,
  deleteProduct as apiDelete,
} from '@/api/catalog'
import { toast } from '@/store/toastStore'
import type { ProductCreate, ProductUpdate, ProductListParams, ProductListResponse } from '@/types/catalog'

const DEFAULT_PARAMS: ProductListParams = {
  page: 1,
  page_size: 20,
  is_active: undefined,
}

export function useCatalog(initialParams: ProductListParams = DEFAULT_PARAMS) {
  const [response, setResponse]   = useState<ProductListResponse | null>(null)
  const [params, setParams]       = useState<ProductListParams>(initialParams)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async (p: ProductListParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getProducts(p)
      setResponse(data)
    } catch {
      setError('Failed to load products.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<ProductListParams>) =>
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))

  const create = async (data: ProductCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load(params)
      toast.success('Product created successfully.')
      return true
    } catch {
      toast.error('Failed to create product.')
      return false
    }
  }

  const update = async (id: number, data: ProductUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load(params)
      toast.success('Product updated successfully.')
      return true
    } catch {
      toast.error('Failed to update product.')
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
      toast.success('Product deleted.')
      return true
    } catch {
      toast.error('Failed to delete product.')
      return false
    }
  }

  return {
    products: response?.items ?? [],
    total:    response?.total ?? 0,
    pages:    response?.pages ?? 1,
    page:     response?.page  ?? 1,
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

export type UseCatalogReturn = ReturnType<typeof useCatalog>
