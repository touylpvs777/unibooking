import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, RefreshCw, FileSpreadsheet, Search } from 'lucide-react'
import { getInvoices } from '@/api/billing'
import StatementTable from '@/components/billing/StatementTable'
import { fmtAmt } from '@/modules/finance'
import type { InvoiceOut } from '@/types/billing'
import '@/styles/shared.css'

export default function StatementPage() {
  const navigate = useNavigate()
  const [invoices, setInvoices] = useState<InvoiceOut[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try {
      const { data } = await getInvoices({ page_size: 100, sort: 'issue_date', order: 'asc', q: search || undefined })
      setInvoices(data.items)
    } catch { setError('Failed to load statement data.') }
    finally { setIsLoading(false) }
  }, [search])

  useEffect(() => { load() }, [load])

  const totalCharges = invoices.reduce((s, i) => s + i.total_amount, 0)
  const totalPayments = invoices.reduce((s, i) => s + i.amount_paid, 0)
  const totalBalance = invoices.reduce((s, i) => s + i.balance_due, 0)
  const currency = invoices[0]?.currency ?? 'LAK'

  return (
    <div>
      {/* Hero */}
      <div className="mp-hero" style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="mp-hero-title">Account Statement</div>
            <div className="mp-hero-sub">All invoice activity with running balance</div>
          </div>
          <button className="btn btn-ghost" style={{ background: 'var(--color-hero-btn-bg)', borderColor: 'var(--color-hero-btn-border)', color: 'var(--color-on-hero)' }} onClick={load} disabled={isLoading}>
            <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      {/* Summary Strip */}
      <div className="mp-kpi-strip" style={{ marginBottom: 16 }}>
        <div className="mp-kpi-widget" style={{ '--kpi-color': 'var(--color-primary-600)' } as React.CSSProperties}>
          <div className="mp-kpi-label">Total Charges</div>
          <div className="mp-kpi-value">{fmtAmt(totalCharges, 2)} {currency}</div>
        </div>
        <div className="mp-kpi-widget" style={{ '--kpi-color': 'var(--color-success-600)' } as React.CSSProperties}>
          <div className="mp-kpi-label">Total Payments</div>
          <div className="mp-kpi-value">{fmtAmt(totalPayments, 2)} {currency}</div>
        </div>
        <div className="mp-kpi-widget" style={{ '--kpi-color': totalBalance > 0 ? 'var(--color-danger-600)' : 'var(--color-success-600)' } as React.CSSProperties}>
          <div className="mp-kpi-label">Outstanding Balance</div>
          <div className="mp-kpi-value" style={{ color: totalBalance > 0 ? 'var(--color-danger-600)' : 'var(--color-success-600)' }}>
            {fmtAmt(totalBalance, 2)} {currency}
          </div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={15} className="search-icon" />
          <input className="search-input" placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <span className="toolbar-count">{invoices.length} entries</span>
      </div>

      {isLoading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading statement...</div>
      ) : invoices.length === 0 ? (
        <div className="mp-empty">
          <div className="mp-empty-icon"><FileSpreadsheet size={28} /></div>
          <div className="mp-empty-title">No statement entries</div>
          <div className="mp-empty-sub">No invoices found matching your search</div>
        </div>
      ) : (
        <StatementTable invoices={invoices} onRowClick={(id) => navigate(`/billing/invoices/${id}`)} />
      )}
    </div>
  )
}
