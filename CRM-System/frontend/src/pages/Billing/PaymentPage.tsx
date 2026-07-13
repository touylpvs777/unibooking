import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, RefreshCw, ChevronLeft, ChevronRight, CreditCard, Search, CheckCircle, XCircle } from 'lucide-react'
import { getPayments, confirmPayment, rejectPayment } from '@/api/billing'
import PaymentStatusBadge from '@/components/billing/PaymentStatusBadge'
import { toast } from '@/store/toastStore'
import type { PaymentOut } from '@/types/billing'
import '@/styles/shared.css'

function fmtDate(iso: string) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

const METHOD_LABELS: Record<string, string> = {
  cash: 'Cash', bank_transfer: 'Bank Transfer', check: 'Check',
  credit_card: 'Credit Card', mobile_payment: 'Mobile', other: 'Other',
}
const STATUS_OPTS = [
  { value: '', label: 'All Statuses' }, { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' }, { value: 'rejected', label: 'Rejected' },
  { value: 'refunded', label: 'Refunded' },
]
const METHOD_OPTS = [
  { value: '', label: 'All Methods' }, { value: 'cash', label: 'Cash' },
  { value: 'bank_transfer', label: 'Bank Transfer' }, { value: 'check', label: 'Check' },
  { value: 'credit_card', label: 'Credit Card' }, { value: 'mobile_payment', label: 'Mobile' },
]

export default function PaymentPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<PaymentOut[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [methodFilter, setMethodFilter] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [busy, setBusy] = useState<number | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try {
      const { data } = await getPayments({
        payment_status: statusFilter || undefined, payment_method: methodFilter || undefined,
        q: search || undefined, page, page_size: 20,
      })
      setItems(data.items); setTotal(data.total); setPages(data.pages)
    } catch { setError('Failed to load payments.') }
    finally { setIsLoading(false) }
  }, [statusFilter, methodFilter, search, page])

  useEffect(() => { load() }, [load])

  const quickAction = async (id: number, label: string, fn: () => Promise<unknown>) => {
    setBusy(id)
    try { await fn(); toast.success(label); await load() }
    catch { toast.error(`Failed: ${label}`) }
    finally { setBusy(null) }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Payments</h1>
          <p className="page-header-sub">{total.toLocaleString()} payments</p>
        </div>
        <button className="btn btn-ghost" onClick={load} disabled={isLoading}>
          <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={15} className="search-icon" />
          <input className="search-input" placeholder="Search payment / reference..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}>
          {STATUS_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select className="filter-select" value={methodFilter} onChange={(e) => { setMethodFilter(e.target.value); setPage(1) }}>
          {METHOD_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
      </div>

      <div className="table-card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Payment #</th>
                <th>Customer</th>
                <th className="col-hide-sm">Method</th>
                <th>Status</th>
                <th>Amount</th>
                <th className="col-hide-sm">Date</th>
                <th className="col-hide-sm">Reference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="skeleton-row">
                  {Array.from({ length: 8 }).map((__, j) => <td key={j} className={j > 4 ? 'col-hide-sm' : ''}><div className="skeleton-cell" style={{ width: j === 0 ? '80%' : 70 }} /></td>)}
                </tr>
              )) : items.length === 0 ? (
                <tr><td colSpan={8}><div className="table-empty"><CreditCard size={40} /><p>No payments found</p></div></td></tr>
              ) : items.map((p) => (
                <tr key={p.id}>
                  <td className="cell-desc" style={{ cursor: 'pointer', color: 'var(--color-primary-600)' }} onClick={() => navigate(`/billing/payments/${p.id}`)}>{p.payment_number}</td>
                  <td>
                    <div className="cell-desc">{p.customer.first_name} {p.customer.last_name}</div>
                    {p.customer.company && <div className="cell-sub cell-muted">{p.customer.company}</div>}
                  </td>
                  <td className="cell-muted cell-type col-hide-sm">{METHOD_LABELS[p.payment_method] || p.payment_method}</td>
                  <td><PaymentStatusBadge status={p.payment_status} /></td>
                  <td className="cell-mono cell-total">{fmtAmt(p.amount)} {p.currency}</td>
                  <td className="cell-muted col-hide-sm">{fmtDate(p.payment_date)}</td>
                  <td className="cell-muted col-hide-sm">{p.reference_number || '—'}</td>
                  <td>
                    {p.payment_status === 'pending' && (
                      <div className="row-actions">
                        <button className="action-btn" title="Confirm" disabled={busy === p.id} onClick={() => quickAction(p.id, 'Payment confirmed', () => confirmPayment(p.id))}>
                          <CheckCircle size={15} />
                        </button>
                        <button className="action-btn danger" title="Reject" disabled={busy === p.id} onClick={() => quickAction(p.id, 'Payment rejected', () => rejectPayment(p.id))}>
                          <XCircle size={15} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && pages > 1 && (
          <div className="pagination">
            <span className="pagination-info">Page {page} of {pages} ({total} total)</span>
            <div className="pagination-controls">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={14} /></button>
              <button className="page-btn" disabled={page === pages} onClick={() => setPage(page + 1)}><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
