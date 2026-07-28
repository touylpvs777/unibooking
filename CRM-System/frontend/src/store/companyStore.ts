import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import client from '@/api/client'

export interface CompanyProfile {
  company_name: string
  address?: string
  phone?: string
  logo_url?: string
  bank_name?: string
  bank_account_name?: string
  bank_account_number?: string
  bank_swift?: string
}

interface SettingRecord {
  key: string
  value: unknown
}

interface CompanyState {
  // Org-wide company profile (backend-persisted, shared across users — invoices/print headers)
  profile: CompanyProfile | null
  isLoading: boolean
  fetch: () => Promise<void>
  setProfile: (profile: CompanyProfile) => void

  // Sidebar branding (this browser only — persisted to localStorage, edited in Settings)
  companyName: string | null
  logoUrl: string | null
  setBranding: (companyName: string, logoUrl: string | null) => void
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
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

      companyName: null,
      logoUrl: null,
      setBranding: (companyName, logoUrl) => set({ companyName, logoUrl }),
    }),
    {
      name: 'dk-company-branding',
      // Only the local sidebar-branding fields persist — `profile` is always re-fetched
      // from the backend so it never goes stale in localStorage.
      partialize: (state) => ({ companyName: state.companyName, logoUrl: state.logoUrl }),
    }
  )
)
