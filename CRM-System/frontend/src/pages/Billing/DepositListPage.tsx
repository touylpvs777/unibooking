import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, RefreshCw, ChevronLeft, ChevronRight, Landmark } from 'lucide-react'
import { getDeposits } from '@/api/billing'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import type { DepositOut } from '@/types/billing'
import '@/styles/shared.css'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

const DEP_STATUS: Record<string, { variant: BadgeVariant; label: string }> = {
  pending: { variant: 'amber', label: 'Pending' }, received: { variant: 'blue', label: 'Received' },
  partially_refunded: { variant: 'purple', label: 'Partial Refund' }, refunded: { variant: 'green', label: 'Refunded' },
  forfeited: { variant: 'red', label: 'Forfeited' }, applied: { variant: 'cyan', label: 'Applied' },
}

const STATUS_OPTS = [
  { value: '', label: 'All Statuses' }, { value: 'pending', label: 'Pending' },
  { value: 'received', label: 'Received' }, { value: 'partially_refunded', label: 'Partial Refund' },
  { value: 'refunded', label: 'Refunded' }, { value: 'forfeited', label: 'Forfeited' },
  { value: 'applied', label: 'Applied' },
]
const TYPE_OPTS = [
  { value: '', label: 'All Types' }, { value: 'security', label: 'Security' },
  { value: 'advance', label: 'Advance' }, { value: 'guarantee', label: 'Guarantee' },
]

export default function DepositListPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<DepositOut[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [page, setPage] = useState(1)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try {
      const { data } = await getDeposits({ deposit_status: statusFilter || undefined, deposit_type: typeFilter || undefined, page, page_size: 20 })
      setItems(data.items); setTotal(data.total); setPages(data.pages)
    } catch { setError('Failed to load deposits.') }
    finally { setIsLoading(false) }
  }, [statusFilter, typeFilter, page])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Deposits</h1>
          <p className="page-header-sub">{total.toLocaleString()} deposits</p>
        </div>
        <button className="btn btn-ghost" onClick={load} disabled={isLoading}>
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
                <th>Deposit #</th>
                <th>Customer</th>
                <th className="col-hide-sm">Contract</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                <th className="col-hide-sm">Received</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="skeleton-row">
                  <td><div className="skeleton-cell" style={{ width: '80%' }} /></td>
                  <td><div className="skeleton-cell" style={{ width: '60%' }} /></td>
                  <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '50%' }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 65 }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 72 }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 70 }} /></td>
                  <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 80 }} /></td>
                </tr>
              )) : items.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="table-empty"><Landmark size={40} /><p>No deposits found</p></div>
                </td></tr>
              ) : items.map((d) => {
                const cfg = DEP_STATUS[d.deposit_status] ?? { variant: 'gray' as BadgeVariant, label: d.deposit_status }
                return (
                  <tr key={d.id} onClick={() => navigate(`/billing/deposits/${d.id}`)} style={{ cursor: 'pointer' }}>
                    <td className="cell-desc">{d.deposit_number}</td>
                    <td>
                      <div className="cell-desc">{d.customer.first_name} {d.customer.last_name}</div>
                      {d.customer.company && <div className="cell-sub cell-muted">{d.customer.company}</div>}
                    </td>
                    <td className="cell-muted col-hide-sm">{d.contract.contract_number}</td>
                    <td className="cell-muted cell-type">{d.deposit_type}</td>
                    <td><Badge variant={cfg.variant}>{cfg.label}</Badge></td>
                    <td className="cell-mono cell-total">{fmtAmt(d.amount)} {d.currency}</td>
                    <td className="cell-muted col-hide-sm">{fmtDate(d.received_date)}</td>
                  </tr>
                )
              })}
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
