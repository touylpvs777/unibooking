import client from './client'
import type { DashboardSummary, TrendPoint, LeadMetrics } from '@/types/dashboard'

export const getSummary = () =>
  client.get<DashboardSummary>('/dashboard/summary')

export const getLeadTrend = (months = 12) =>
  client.get<TrendPoint[]>('/dashboard/lead-trend', { params: { months } })

export const getCustomerTrend = (months = 12) =>
  client.get<TrendPoint[]>('/dashboard/customer-trend', { params: { months } })

export const getLeadMetrics = () =>
  client.get<LeadMetrics>('/dashboard/lead-metrics')
