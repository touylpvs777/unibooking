import { useState, useEffect, useCallback } from 'react'
import {
  getLeads,
  createLead  as apiCreate,
  updateLead  as apiUpdate,
  deleteLead  as apiDelete,
} from '@/api/leads'
import { toast } from '@/store/toastStore'
import type { Lead, LeadCreate, LeadUpdate } from '@/types/lead'

export function useLeads() {
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
      setError('Failed to load leads.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const create = async (data: LeadCreate): Promise<boolean> => {
    try {
      await apiCreate(data)
      await load()
      toast.success('Lead created.')
      return true
    } catch {
      toast.error('Failed to create lead.')
      return false
    }
  }

  const update = async (id: number, data: LeadUpdate): Promise<boolean> => {
    try {
      await apiUpdate(id, data)
      await load()
      toast.success('Lead updated.')
      return true
    } catch (err: unknown) {
      // Surface backend validation message (e.g. invalid status transition)
      const detail =
        (err as { response?: { data?: { detail?: string } } })
          ?.response?.data?.detail
      toast.error(detail ?? 'Failed to update lead.')
      return false
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await apiDelete(id)
      await load()
      toast.success('Lead deleted.')
      return true
    } catch {
      toast.error('Failed to delete lead.')
      return false
    }
  }

  return { leads, isLoading, error, refetch: load, create, update, remove }
}
