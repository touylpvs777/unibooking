import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getBrands,
  createBrand as apiCreate,
  updateBrand as apiUpdate,
  deleteBrand as apiDelete,
} from '@/api/catalog'
import { toast } from '@/store/toastStore'
import type { Brand, BrandCreate, BrandUpdate } from '@/types/catalog'

export function useBrands(activeOnly = false) {
  const { t } = useTranslation()
  const [brands, setBrands]       = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getBrands(activeOnly ? { is_active: true, limit: 500 } : { limit: 500 })
      setBrands(data)
    } catch {
      setError(t('catalog.brands.toast.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [activeOnly, t])

  useEffect(() => { load() }, [load])

  const create = async (data: BrandCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load()
      toast.success(t('catalog.brands.toast.createSuccess'))
      return true
    } catch {
      toast.error(t('catalog.brands.toast.createError'))
      return false
    }
  }

  const update = async (id: number, data: BrandUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load()
      toast.success(t('catalog.brands.toast.updateSuccess'))
      return true
    } catch {
      toast.error(t('catalog.brands.toast.updateError'))
      return false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      await load()
      toast.success(t('catalog.brands.toast.deleteSuccess'))
      return true
    } catch {
      toast.error(t('catalog.brands.toast.deleteError'))
      return false
    }
  }

  return { brands, isLoading, error, refetch: load, create, update, remove }
}
