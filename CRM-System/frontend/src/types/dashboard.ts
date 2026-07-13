export interface TrendPoint {
  month: string
  count: number
}

export interface LeadMetrics {
  total: number
  conversion_rate: number
  win_rate: number
  lost_rate: number
  by_status: Record<string, number>
  by_source: Record<string, number>
}

export interface DashboardSummary {
  total_customers: number
  active_customers: number
  prospect_customers: number
  total_leads: number
  new_leads: number
  contacted_leads: number
  qualified_leads: number
  proposal_leads: number
  won_leads: number
  lost_leads: number
  leads_by_source: Record<string, number>
  conversion_rate: number
  win_rate: number
  lost_rate: number
}
