import { useState, useEffect } from 'react'
import { AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import { getBillingSummary, markOverdueInvoices } from '@/api/billing'
import { FinanceKpiStrip, FinanceKpiStripSkeleton, FinanceQuickNav } from '@/modules/finance'
import { toast } from '@/store/toastStore'
import type { BillingDashboardSummary } from '@/types/billing'
import '@/styles/shared.css'

export default function BillingDashboardPage() {
  const [data, setData] = useState<BillingDashboardSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setIsLoading(true); setError(null)
    try { setData((await getBillingSummary()).data) }
    catch { setError('Failed to load billing summary.') }
    finally { setIsLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleMarkOverdue = async () => {
    try {
      const { data: res } = await markOverdueInvoices()
      toast.success(`Marked ${res.marked_overdue} invoice(s) as overdue`)
      await load()
    } catch { toast.error('Failed to mark overdue invoices') }
  }

  if (error) return <div className="page-error"><AlertCircle size={16} /> {error}</div>

  return (
    <div>
      {/* Hero */}
      <div className="mp-hero">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="mp-hero-title">Billing & Payments</div>
            <div className="mp-hero-sub">Financial overview and quick actions</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ background: 'var(--color-hero-btn-bg)', borderColor: 'var(--color-hero-btn-border)', color: 'var(--color-on-hero)' }} onClick={handleMarkOverdue}>
              <AlertTriangle size={14} /> Mark Overdue
            </button>
            <button className="btn btn-ghost" style={{ background: 'var(--color-hero-btn-bg)', borderColor: 'var(--color-hero-btn-border)', color: 'var(--color-on-hero)' }} onClick={load} disabled={isLoading}>
              <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      {isLoading ? <FinanceKpiStripSkeleton /> : data ? <FinanceKpiStrip data={data} /> : null}

      {/* Quick Navigation */}
      <div className="mp-section">
        <div className="mp-section-header">
          <span className="mp-section-title">Quick Access</span>
        </div>
        <FinanceQuickNav />
      </div>
    </div>
  )
}
