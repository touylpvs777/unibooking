import { create } from 'zustand'
import client from '@/api/client'

export interface CompanyProfile {
  company_name: string
  address?: string
  phone?: string
  logo_url?: string
}

interface SettingRecord {
  key: string
  value: unknown
}

interface CompanyState {
  profile: CompanyProfile | null
  isLoading: boolean
  fetch: () => Promise<void>
  setProfile: (profile: CompanyProfile) => void
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
  profile: null,
  isLoading: false,

  setProfile: (profile) => set({ profile }),

  fetch: async () => {
    if (get().profile || get().isLoading) return
    set({ isLoading: true })
    try {
      const { data } = await client.get<SettingRecord[]>('/settings')
      const record = data.find((s) => s.key === 'company_profile')
      if (record && typeof record.value === 'object' && record.value !== null) {
        set({ profile: record.value as CompanyProfile })
      }
    } catch {
      // Print header / branding just won't render — never block the app on this.
    } finally {
      set({ isLoading: false })
    }
  },
}))
