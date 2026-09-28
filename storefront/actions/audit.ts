'use server'

import { fetchAPI } from '@/lib/api'

export async function getAuditLogs() {
  try {
    const logs = await fetchAPI('/audit/logs')
    return { success: true, logs: logs || [] }
  } catch (error: any) {
    console.error('Failed to fetch audit logs:', error)
    return { success: false, logs: [], error: error.message }
  }
}
