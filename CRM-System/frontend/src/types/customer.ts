export type CustomerStatus = 'prospect' | 'active' | 'inactive' | 'churned'

export interface Customer {
  id: number
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  company: string | null
  status: CustomerStatus
  notes: string | null
  assigned_to: number | null
  created_by: number | null
  created_at: string
  updated_at: string | null
}

export interface CustomerCreate {
  first_name: string
  last_name: string
  email?: string
  phone?: string
  company?: string
  status?: CustomerStatus
  notes?: string
}

export interface CustomerUpdate {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  company?: string
  status?: CustomerStatus
  notes?: string
}
