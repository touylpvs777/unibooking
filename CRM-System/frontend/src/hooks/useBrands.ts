import { useState, useEffect, useCallback } from 'react'
import {
  getBrands,
  createBrand as apiCreate,
  updateBrand as apiUpdate,
  deleteBrand as apiDelete,
} from '@/api/catalog'
import { toast } from '@/store/toastStore'
import type { Brand, BrandCreate, BrandUpdate } from '@/types/catalog'

export function useBrands(activeOnly = false) {
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
      setError('Failed to load brands.')
    } finally {
      setIsLoading(false)
    }
  }, [activeOnly])

  useEffect(() => { load() }, [load])

  const create = async (data: BrandCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load()
      toast.success('Brand created successfully.')
      return true
    } catch {
      toast.error('Failed to create brand.')
      return false
    }
  }

  const update = async (id: number, data: BrandUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load()
      toast.success('Brand updated successfully.')
      return true
    } catch {
      toast.error('Failed to update brand.')
      return false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      await load()
      toast.success('Brand deleted.')
      return true
    } catch {
      toast.error('Failed to delete brand.')
      return false
    }
  }

  return { brands, isLoading, error, refetch: load, create, update, remove }
}
