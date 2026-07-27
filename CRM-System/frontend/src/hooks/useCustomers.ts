import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getCustomers,
  createCustomer as apiCreate,
  updateCustomer as apiUpdate,
  deleteCustomer as apiDelete,
} from '@/api/customers'
import { toast } from '@/store/toastStore'
import type { Customer, CustomerCreate, CustomerUpdate } from '@/types/customer'

export function useCustomers() {
  const { t } = useTranslation()
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
      setError(t('customers.list.toast.loadError'))
    } finally {
      setIsLoading(false)
    }
  }, [t])

  useEffect(() => { load() }, [load])

  const create = async (data: CustomerCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load()
      toast.success(t('customers.list.toast.createSuccess'))
      return true
    } catch {
      toast.error(t('customers.list.toast.createError'))
      return false
    }
  }

  const update = async (id: number, data: CustomerUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load()
      toast.success(t('customers.list.toast.updateSuccess'))
      return true
    } catch {
      toast.error(t('customers.list.toast.updateError'))
      return false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      await load()
      toast.success(t('customers.list.toast.deleteSuccess'))
      return true
    } catch {
      toast.error(t('customers.list.toast.deleteError'))
      return false
    }
  }

  return { customers, isLoading, error, refetch: load, create, update, remove }
}
