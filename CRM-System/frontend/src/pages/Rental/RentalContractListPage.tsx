import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Plus, AlertCircle, ChevronLeft, ChevronRight,
  FileText, RefreshCw, Trash2,
} from 'lucide-react'
import { useRentalContracts } from '@/hooks/useRentals'
import { RentalStatusBadge, RentalContractTypeBadge } from '@/components/rental/RentalStatusBadge'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import type { RentalContract } from '@/types/rental'
import '@/styles/shared.css'

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtAmount(n: number, currency: string) {
  return `${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${currency}`
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'reservation', label: 'Reservation' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending_approval', label: 'Pending Approval' },
  { value: 'approved', label: 'Approved' },
  { value: 'revision', label: 'Revision' },
  { value: 'delivering', label: 'Delivering' },
  { value: 'active', label: 'Active' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'returning', label: 'Returning' },
  { value: 'inspecting', label: 'Inspecting' },
  { value: 'settling', label: 'Settling' },
  { value: 'closed', label: 'Closed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'short_term', label: 'Short Term' },
  { value: 'long_term', label: 'Long Term' },
  { value: 'project', label: 'Project' },
]

export default function RentalContractListPage() {
  const {
    contracts, total, pages, page: currentPage,
    params, isLoading, error,
    applyParams, refetch, remove,
  } = useRentalContracts({ page: 1, page_size: 20 })

  const navigate = useNavigate()

  const [deleteTarget, setDeleteTarget] = useState<RentalContract | null>(null)
  const [isDeleting, setIsDeleting]     = useState(false)

  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    await remove(deleteTarget.id)
    setIsDeleting(false)
    setDeleteTarget(null)
  }

  const hasFilters = params.q || params.status || params.contract_type

  const pageNumbers = (() => {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '…', pages]
    if (currentPage >= pages - 3) return [1, '…', ...Array.from({ length: 5 }, (_, i) => pages - 4 + i)]
    return [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', pages]
  })()

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Rental Contracts</h1>
          <p className="page-header-sub">{total.toLocaleString()} contracts</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={refetch} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/rental-contracts/new')}>
            <Plus size={15} /> New Contract
          </button>
        </div>
      </div>

      {error && (
        <div className="page-error">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={14} />
          <input
            className="search-input"
            placeholder="Search number, customer..."
            value={params.q ?? ''}
            onChange={(e) => applyParams({ q: e.target.value || undefined, page: 1 })}
          />
        </div>

        <select
          className="filter-select"
          value={params.status ?? ''}
          onChange={(e) => applyParams({ status: (e.target.value || undefined) as never, page: 1 })}
        >
          {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        <select
          className="filter-select"
          value={params.contract_type ?? ''}
          onChange={(e) => applyParams({ contract_type: (e.target.value || undefined) as never, page: 1 })}
        >
          {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {hasFilters && (
          <button
            className="clear-btn"
            onClick={() => applyParams({ q: undefined, status: undefined, contract_type: undefined, page: 1 })}
          >
            Clear
          </button>
        )}

        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
      </div>

      <div className="table-card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Contract</th>
                <th>Type</th>
                <th>Status</th>
                <th className="col-hide-sm">Customer</th>
                <th className="col-hide-sm">Total Value</th>
                <th className="col-hide-sm">Start Date</th>
                <th className="col-hide-sm">End Date</th>
                <th style={{ width: 50 }}></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="skeleton-row">
                    <td><div className="skeleton-cell" style={{ width: '80%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '60px' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '70px' }} /></td>
                    <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '60%' }} /></td>
                    <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '50%' }} /></td>
                    <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '80px' }} /></td>
                    <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '80px' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '20px' }} /></td>
                  </tr>
                ))
              ) : contracts.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="table-empty">
                      <FileText size={36} />
                      <p>No rental contracts found</p>
                      <small>Create a new contract or adjust your filters.</small>
                    </div>
                  </td>
                </tr>
              ) : (
                contracts.map((rc) => (
                  <tr
                    key={rc.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/rental-contracts/${rc.id}`)}
                  >
                    <td>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{rc.contract_number}</div>
                        <div className="cell-muted" style={{ fontSize: 12 }}>
                          {rc.customer.first_name} {rc.customer.last_name}
                        </div>
                      </div>
                    </td>
                    <td><RentalContractTypeBadge type={rc.contract_type} /></td>
                    <td><RentalStatusBadge status={rc.status} /></td>
                    <td className="cell-muted col-hide-sm">
                      {rc.customer.first_name} {rc.customer.last_name}
                      {rc.customer.company ? ` (${rc.customer.company})` : ''}
                    </td>
                    <td className="cell-muted col-hide-sm cell-mono">
                      {fmtAmount(rc.total_value, rc.currency)}
                    </td>
                    <td className="cell-muted col-hide-sm">{fmtDate(rc.start_date)}</td>
                    <td className="cell-muted col-hide-sm">{fmtDate(rc.end_date)}</td>
                    <td>
                      {(rc.status === 'draft' || rc.status === 'reservation') && (
                        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                          <button
                            className="action-btn danger"
                            title="Delete"
                            onClick={() => setDeleteTarget(rc)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && pages > 1 && (
          <div className="pagination">
            <span className="pagination-info">
              Page {currentPage} of {pages} ({total} total)
            </span>
            <div className="pagination-controls">
              <button className="page-btn" disabled={currentPage === 1} onClick={() => applyParams({ page: currentPage - 1 })}>
                <ChevronLeft size={14} />
              </button>
              {pageNumbers.map((p, i) =>
                p === '…' ? (
                  <span key={`e-${i}`} className="page-btn" style={{ cursor: 'default', border: 'none' }}>…</span>
                ) : (
                  <button key={p} className={`page-btn${currentPage === p ? ' active' : ''}`} onClick={() => applyParams({ page: p as number })}>
                    {p}
                  </button>
                )
              )}
              <button className="page-btn" disabled={currentPage === pages} onClick={() => applyParams({ page: currentPage + 1 })}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Rental Contract"
        message={deleteTarget ? `Delete "${deleteTarget.contract_number}"? This cannot be undone.` : ''}
      />
    </div>
  )
}
