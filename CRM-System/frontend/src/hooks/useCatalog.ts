import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getProducts,
  createProduct as apiCreate,
  updateProduct as apiUpdate,
  deleteProduct as apiDelete,
} from '@/api/catalog'
import { toast } from '@/store/toastStore'
import type { Product, ProductCreate, ProductUpdate, ProductListParams, ProductListResponse } from '@/types/catalog'

const DEFAULT_PARAMS: ProductListParams = {
  page: 1,
  page_size: 20,
  is_active: undefined,
}

export function useCatalog(initialParams: ProductListParams = DEFAULT_PARAMS) {
  const { t } = useTranslation()
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
      setError(t('catalog.products.toast.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => { load(params) }, [load, params])

  const applyParams = (next: Partial<ProductListParams>) =>
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))

  const create = async (data: ProductCreate): Promise<Product | null> => {
    try {
      const { data: created } = await apiCreate(data)
      await load(params)
      toast.success(t('catalog.products.toast.createSuccess'))
      return created
    } catch {
      toast.error(t('catalog.products.toast.createError'))
      return null
    }
  }

  const update = async (id: number, data: ProductUpdate): Promise<Product | null> => {
    try {
      const { data: updated } = await apiUpdate(id, data)
      await load(params)
      toast.success(t('catalog.products.toast.updateSuccess'))
      return updated
    } catch {
      toast.error(t('catalog.products.toast.updateError'))
      return null
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      const newPage = response && response.items.length === 1 && params.page! > 1
        ? params.page! - 1
        : params.page
      await load({ ...params, page: newPage })
      toast.success(t('catalog.products.toast.deleteSuccess'))
      return true
    } catch {
      toast.error(t('catalog.products.toast.deleteError'))
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
