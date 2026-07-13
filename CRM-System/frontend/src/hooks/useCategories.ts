import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  getCategoryTree,
  getCategoriesFlat,
  createCategory as apiCreate,
  updateCategory as apiUpdate,
  deleteCategory as apiDelete,
} from '@/api/catalog'
import { toast } from '@/store/toastStore'
import type { ProductCategory, CategoryCreate, CategoryUpdate } from '@/types/catalog'

function flattenTree(nodes: ProductCategory[], depth = 0): ProductCategory[] {
  const result: ProductCategory[] = []
  for (const n of nodes) {
    result.push({ ...n, _depth: depth } as ProductCategory & { _depth: number })
    if (n.children?.length) result.push(...flattenTree(n.children, depth + 1))
  }
  return result
}

export function useCategories() {
  const [tree, setTree]           = useState<ProductCategory[]>([])
  const [flat, setFlat]           = useState<ProductCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [treeRes, flatRes] = await Promise.all([getCategoryTree(), getCategoriesFlat()])
      setTree(treeRes.data)
      setFlat(flatRes.data)
    } catch {
      setError('Failed to load categories.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const treeFlattened = useMemo(() => flattenTree(tree), [tree])

  const create = async (data: CategoryCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load()
      toast.success('Category created successfully.')
      return true
    } catch {
      toast.error('Failed to create category.')
      return false
    }
  }

  const update = async (id: number, data: CategoryUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load()
      toast.success('Category updated successfully.')
      return true
    } catch {
      toast.error('Failed to update category.')
      return false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      await load()
      toast.success('Category deleted.')
      return true
    } catch {
      toast.error('Failed to delete category.')
      return false
    }
  }

  return { tree, flat, treeFlattened, isLoading, error, refetch: load, create, update, remove }
}
