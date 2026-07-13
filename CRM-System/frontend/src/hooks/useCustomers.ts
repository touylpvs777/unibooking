import { useState, useEffect, useCallback } from 'react'
import {
  getCustomers,
  createCustomer as apiCreate,
  updateCustomer as apiUpdate,
  deleteCustomer as apiDelete,
} from '@/api/customers'
import { toast } from '@/store/toastStore'
import type { Customer, CustomerCreate, CustomerUpdate } from '@/types/customer'

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getCustomers({ limit: 500 })
      setCustomers(data)
    } catch {
      setError('Failed to load customers.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const create = async (data: CustomerCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load()
      toast.success('Customer created successfully.')
      return true
    } catch {
      toast.error('Failed to create customer.')
      return false
    }
  }

  const update = async (id: number, data: CustomerUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load()
      toast.success('Customer updated successfully.')
      return true
    } catch {
      toast.error('Failed to update customer.')
      return false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      await load()
      toast.success('Customer deleted.')
      return true
    } catch {
      toast.error('Failed to delete customer.')
      return false
    }
  }

  return { customers, isLoading, error, refetch: load, create, update, remove }
}
