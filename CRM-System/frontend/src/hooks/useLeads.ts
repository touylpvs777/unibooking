import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getLeads,
  createLead  as apiCreate,
  updateLead  as apiUpdate,
  deleteLead  as apiDelete,
} from '@/api/leads'
import { toast } from '@/store/toastStore'
import type { Lead, LeadCreate, LeadUpdate } from '@/types/lead'

export function useLeads() {
  const { t } = useTranslation()
  const [leads, setLeads]       = useState<Lead[]>([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError]       = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getLeads({ limit: 500 })
      setLeads(data)
    } catch {
      setError(t('leads.list.toast.loadError'))
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => { load() }, [load])

  const create = async (data: LeadCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load()
      toast.success(t('leads.list.toast.createSuccess'))
      return true
    } catch {
      toast.error(t('leads.list.toast.createError'))
      return false
    }
  }

  const update = async (id: number, data: LeadUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load()
      toast.success(t('leads.list.toast.updateSuccess'))
      return true
    } catch (err: unknown) {
      // Surface backend validation message (e.g. invalid status transition)
      const detail =
        (err as { response?: { data?: { detail?: string } } })
          ?.response?.data?.detail
      toast.error(detail ?? t('leads.list.toast.updateError'))
      return false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      await load()
      toast.success(t('leads.list.toast.deleteSuccess'))
      return true
    } catch {
      toast.error(t('leads.list.toast.deleteError'))
      return false
    }
  }

  return { leads, isLoading, error, refetch: load, create, update, remove }
}
