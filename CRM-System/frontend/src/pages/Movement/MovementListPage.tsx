import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Plus, AlertCircle, RefreshCw, Grid3X3, List,
  ChevronLeft, ChevronRight, ArrowRightLeft,
} from 'lucide-react'
import { getMovements } from '@/api/movement'
import { MovementStatusBadge, MovementTypeBadge, MovementPriorityBadge } from '@/components/movement/MovementStatusBadge'
import MovementCard from '@/components/movement/MovementCard'
import type { Movement, MovementListParams, MovementStatus, MovementType as MType } from '@/types/movement'
import '@/styles/shared.css'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'warehouse_transfer', label: 'Transfer' },
  { value: 'customer_deployment', label: 'Deployment' },
  { value: 'customer_return', label: 'Return' },
  { value: 'internal_relocation', label: 'Relocation' },
]

export default function MovementListPage() {
  const navigate = useNavigate()
  const [movements, setMovements] = useState<Movement[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [params, setParams] = useState<MovementListParams>({ page: 1, page_size: 20 })

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getMovements(params)
      setMovements(data.items)
      setTotal(data.total)
      setPages(data.pages)
    } catch {
      setError('Failed to load movements.')
    } finally {
      setIsLoading(false)
    }
  }, [params])

  useEffect(() => { load() }, [load])

  const apply = (patch: Partial<MovementListParams>) =>
    setParams((p) => ({ ...p, ...patch }))

  const currentPage = params.page ?? 1
  const hasFilters = params.q || params.status || params.movement_type

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Movement Control</h1>
          <p className="page-header-sub">{total.toLocaleString()} movements</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={load} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/movements/new')}>
            <Plus size={15} /> New Movement
          </button>
        </div>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={14} />
          <input
            className="search-input"
            placeholder="Search number, location, code..."
            value={params.q ?? ''}
            onChange={(e) => apply({ q: e.target.value || undefined, page: 1 })}
          />
        </div>
        <select className="filter-select" value={params.status ?? ''} onChange={(e) => apply({ status: (e.target.value || undefined) as MovementStatus, page: 1 })}>
          {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select className="filter-select" value={params.movement_type ?? ''} onChange={(e) => apply({ movement_type: (e.target.value || undefined) as MType, page: 1 })}>
          {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {hasFilters && (
          <button className="clear-btn" onClick={() => apply({ q: undefined, status: undefined, movement_type: undefined, page: 1 })}>Clear</button>
        )}
        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
        <div className="view-toggle">
          <button className={`view-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}><List size={14} /></button>
          <button className={`view-btn${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')}><Grid3X3 size={14} /></button>
        </div>
      </div>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12, marginTop: 12 }}>
          {isLoading ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 140, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }} />
          )) : movements.map((m) => (
            <MovementCard key={m.id} movement={m} onClick={() => navigate(`/movements/${m.id}`)} />
          ))}
        </div>
      ) : (
        <div className="table-card">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Movement</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th className="col-hide-sm">Equipment</th>
                  <th className="col-hide-sm">From → To</th>
                  <th className="col-hide-sm">Scheduled</th>
                  <th className="col-hide-sm">Priority</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="skeleton-row">
                    <td><div className="skeleton-cell" style={{ width: '80%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: 60 }} /></td>
                    <td><div className="skeleton-cell" style={{ width: 70 }} /></td>
                    <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '60%' }} /></td>
                    <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '80%' }} /></td>
                    <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 80 }} /></td>
                    <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 50 }} /></td>
                  </tr>
                )) : movements.length === 0 ? (
                  <tr><td colSpan={7}>
                    <div className="table-empty"><ArrowRightLeft size={36} /><p>No movements found</p></div>
                  </td></tr>
                ) : movements.map((m) => (
                  <tr key={m.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/movements/${m.id}`)}>
                    <td>
                      <div className="cell-desc">{m.movement_number}</div>
                      {m.customer && <div className="cell-muted cell-sub">{m.customer.first_name} {m.customer.last_name}</div>}
                    </td>
                    <td><MovementTypeBadge type={m.movement_type} /></td>
                    <td><MovementStatusBadge status={m.status} /></td>
                    <td className="cell-muted col-hide-sm cell-sub">{m.forklift.serial_number}</td>
                    <td className="cell-muted col-hide-sm cell-sub">{m.from_location} → {m.to_location}</td>
                    <td className="cell-muted col-hide-sm">{fmtDate(m.scheduled_date)}</td>
                    <td className="col-hide-sm"><MovementPriorityBadge priority={m.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isLoading && pages > 1 && (
            <div className="pagination">
              <span className="pagination-info">Page {currentPage} of {pages} ({total} total)</span>
              <div className="pagination-controls">
                <button className="page-btn" disabled={currentPage === 1} onClick={() => apply({ page: currentPage - 1 })}><ChevronLeft size={14} /></button>
                <button className="page-btn" disabled={currentPage === pages} onClick={() => apply({ page: currentPage + 1 })}><ChevronRight size={14} /></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
