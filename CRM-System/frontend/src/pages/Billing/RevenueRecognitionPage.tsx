import { useState, useEffect, useCallback } from 'react'
import { AlertCircle, RefreshCw, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { getRecognitions, recognizeRevenue, reverseRevenue } from '@/api/billing'
import type { RevenueRecognitionOut } from '@/types/billing'
import '@/styles/shared.css'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

const STATUS_COLORS: Record<string, string> = { scheduled: '#f59e0b', recognized: '#10b981', reversed: '#ef4444' }
const TYPE_LABELS: Record<string, string> = { rental_income: 'Rental Income', service_fee: 'Service Fee', penalty_fee: 'Penalty', damage_recovery: 'Damage Recovery', deposit_forfeiture: 'Deposit Forfeiture' }

function StatusBadge({ status }: { status: string }) {
  return <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 9999, background: `${STATUS_COLORS[status] || '#6b7280'}18`, color: STATUS_COLORS[status] || '#6b7280' }}>{status}</span>
}

const STATUS_OPTS = [
  { value: '', label: 'All Statuses' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'recognized', label: 'Recognized' },
  { value: 'reversed', label: 'Reversed' },
]

const TYPE_OPTS = [
  { value: '', label: 'All Types' },
  { value: 'rental_income', label: 'Rental Income' },
  { value: 'service_fee', label: 'Service Fee' },
  { value: 'penalty_fee', label: 'Penalty Fee' },
  { value: 'damage_recovery', label: 'Damage Recovery' },
  { value: 'deposit_forfeiture', label: 'Deposit Forfeiture' },
]

export default function RevenueRecognitionPage() {
  const [items, setItems] = useState<RevenueRecognitionOut[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [page, setPage] = useState(1)
  const [busy, setBusy] = useState<number | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try {
      const { data } = await getRecognitions({ recognition_status: statusFilter || undefined, recognition_type: typeFilter || undefined, page, page_size: 20 })
      setItems(data.items); setTotal(data.total); setPages(data.pages)
    } catch { setError('Failed to load revenue recognitions.') }
    finally { setIsLoading(false) }
  }, [statusFilter, typeFilter, page])

  useEffect(() => { load() }, [load])

  const handleAction = async (id: number, fn: (id: number) => Promise<unknown>) => {
    setBusy(id)
    try { await fn(id); await load() }
    catch { alert('Action failed.') }
    finally { setBusy(null) }
  }

  return (
    <div>
      <div className="page-header">
        <div><h1>Revenue Recognition</h1><p className="page-header-sub">{total.toLocaleString()} entries</p></div>
        <button className="btn btn-ghost" onClick={load} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      <div className="toolbar">
        <select className="filter-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}>
          {STATUS_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select className="filter-select" value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1) }}>
          {TYPE_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
      </div>

      <div className="table-card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>REV #</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
                <th className="col-hide-sm">Period</th>
                <th className="col-hide-sm">Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="skeleton-row">
                  <td><div className="skeleton-cell" style={{ width: '80%' }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 80 }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 70 }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 80 }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 60 }} /></td>
                  <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 100 }} /></td>
                  <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '60%' }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 60 }} /></td>
                </tr>
              )) : items.length === 0 ? (
                <tr><td colSpan={8}>
                  <div className="table-empty"><TrendingUp size={36} style={{ opacity: 0.3, marginBottom: 8 }} /><p>No revenue recognition entries</p></div>
                </td></tr>
              ) : items.map((r) => (
                <tr key={r.id}>
                  <td className="cell-desc">{r.recognition_number}</td>
                  <td className="cell-muted">{TYPE_LABELS[r.recognition_type] || r.recognition_type}</td>
                  <td><StatusBadge status={r.recognition_status} /></td>
                  <td className="cell-muted">{fmtDate(r.recognition_date)}</td>
                  <td className="cell-mono cell-total">{fmtAmt(r.amount)} {r.currency}</td>
                  <td className="cell-muted col-hide-sm">{r.period_start ? `${fmtDate(r.period_start)} — ${fmtDate(r.period_end)}` : '—'}</td>
                  <td className="cell-muted col-hide-sm" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.description || '—'}</td>
                  <td>
                    {r.recognition_status === 'scheduled' && (
                      <button className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px' }} disabled={busy === r.id} onClick={() => handleAction(r.id, recognizeRevenue)}>Recognize</button>
                    )}
                    {r.recognition_status === 'recognized' && (
                      <button className="btn btn-secondary" style={{ fontSize: 11, padding: '2px 8px', color: 'var(--color-danger-500)' }} disabled={busy === r.id} onClick={() => handleAction(r.id, reverseRevenue)}>Reverse</button>
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
