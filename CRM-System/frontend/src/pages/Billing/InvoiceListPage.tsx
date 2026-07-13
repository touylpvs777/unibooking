import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, RefreshCw, ChevronLeft, ChevronRight, FileText, Search } from 'lucide-react'
import { getInvoices } from '@/api/billing'
import { Badge } from '@/components/ui/Badge'
import type { BadgeVariant } from '@/components/ui/Badge'
import type { InvoiceOut } from '@/types/billing'
import '@/styles/shared.css'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

const INVOICE_STATUS_MAP: Record<string, { variant: BadgeVariant; label: string }> = {
  draft:          { variant: 'gray',   label: 'Draft' },
  issued:         { variant: 'blue',   label: 'Issued' },
  sent:           { variant: 'purple', label: 'Sent' },
  partially_paid: { variant: 'amber',  label: 'Partial' },
  paid:           { variant: 'green',  label: 'Paid' },
  overdue:        { variant: 'red',    label: 'Overdue' },
  cancelled:      { variant: 'gray',   label: 'Cancelled' },
  voided:         { variant: 'gray',   label: 'Voided' },
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const cfg = INVOICE_STATUS_MAP[status] ?? { variant: 'gray' as BadgeVariant, label: status }
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>
}

const STATUS_OPTS = [
  { value: '', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' }, { value: 'issued', label: 'Issued' },
  { value: 'sent', label: 'Sent' }, { value: 'partially_paid', label: 'Partially Paid' },
  { value: 'paid', label: 'Paid' }, { value: 'overdue', label: 'Overdue' },
  { value: 'cancelled', label: 'Cancelled' }, { value: 'voided', label: 'Voided' },
]

export default function InvoiceListPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<InvoiceOut[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try {
      const { data } = await getInvoices({ status: statusFilter || undefined, q: search || undefined, page, page_size: 20 })
      setItems(data.items); setTotal(data.total); setPages(data.pages)
    } catch { setError('Failed to load invoices.') }
    finally { setIsLoading(false) }
  }, [statusFilter, search, page])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Invoices</h1>
          <p className="page-header-sub">{total.toLocaleString()} invoices</p>
        </div>
        <button className="btn btn-ghost" onClick={load} disabled={isLoading}>
          <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={15} className="search-icon" />
          <input className="search-input" placeholder="Search invoice #..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}>
          {STATUS_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
      </div>

      <div className="table-card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Status</th>
                <th className="col-hide-sm">Issue Date</th>
                <th className="col-hide-sm">Due Date</th>
                <th>Total</th>
                <th className="col-hide-sm">Balance</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="skeleton-row">
                  <td><div className="skeleton-cell" style={{ width: '80%' }} /></td>
                  <td><div className="skeleton-cell" style={{ width: '60%' }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 72 }} /></td>
                  <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 80 }} /></td>
                  <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 80 }} /></td>
                  <td><div className="skeleton-cell" style={{ width: 70 }} /></td>
                  <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 70 }} /></td>
                </tr>
              )) : items.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="table-empty"><FileText size={40} /><p>No invoices found</p></div>
                </td></tr>
              ) : items.map((inv) => (
                <tr key={inv.id} onClick={() => navigate(`/billing/invoices/${inv.id}`)} style={{ cursor: 'pointer' }}>
                  <td className="cell-desc">{inv.invoice_number}</td>
                  <td>
                    <div className="cell-desc">{inv.customer.first_name} {inv.customer.last_name}</div>
                    {inv.customer.company && <div className="cell-sub cell-muted">{inv.customer.company}</div>}
                  </td>
                  <td><InvoiceStatusBadge status={inv.status} /></td>
                  <td className="cell-muted col-hide-sm">{fmtDate(inv.issue_date)}</td>
                  <td className="cell-muted col-hide-sm">{fmtDate(inv.due_date)}</td>
                  <td className="cell-mono cell-total">{fmtAmt(inv.total_amount)} {inv.currency}</td>
                  <td className="cell-mono col-hide-sm" style={{ color: inv.balance_due > 0 ? 'var(--color-danger-600)' : 'var(--color-success-600)' }}>
                    {fmtAmt(inv.balance_due)}
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
              {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
                const p = page <= 3 ? i + 1 : page - 2 + i
                if (p < 1 || p > pages) return null
                return <button key={p} className={`page-btn${p === page ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
              })}
              <button className="page-btn" disabled={page === pages} onClick={() => setPage(page + 1)}><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
