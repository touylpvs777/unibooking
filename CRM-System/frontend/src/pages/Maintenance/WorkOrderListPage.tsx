import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react'
import { getWorkOrders } from '@/api/maintenance'
import { WOStatusBadge, WOTypeBadge, WOPriorityBadge } from '@/components/maintenance/MaintenanceStatusBadge'
import WorkOrderCard from '@/components/maintenance/WorkOrderCard'
import type { WorkOrder, WOListParams, WOStatus } from '@/types/maintenance'
import '@/styles/shared.css'
import '@/styles/detail.css'

function fmtDate(iso: string) { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

const STATUS_OPTS = [
  { value: '', label: 'All Statuses' }, { value: 'scheduled', label: 'Scheduled' },
  { value: 'due', label: 'Due' }, { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }, { value: 'verified', label: 'Verified' },
  { value: 'cancelled', label: 'Cancelled' },
]
const TYPE_OPTS = [
  { value: '', label: 'All Types' }, { value: 'preventive', label: 'Preventive' },
  { value: 'corrective', label: 'Corrective' }, { value: 'emergency', label: 'Emergency' },
  { value: 'inspection', label: 'Inspection' },
]

export default function WorkOrderListPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<WorkOrder[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [params, setParams] = useState<WOListParams>({ page: 1, page_size: 20 })

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try { const { data } = await getWorkOrders(params); setItems(data.items); setTotal(data.total); setPages(data.pages) }
    catch { setError('Failed to load work orders.') }
    finally { setIsLoading(false) }
  }, [params])

  useEffect(() => { load() }, [load])

  const apply = (p: Partial<WOListParams>) => setParams((prev) => ({ ...prev, ...p }))
  const cp = params.page ?? 1

  return (
    <div>
      <div className="page-header">
        <div><h1>Work Orders</h1><p className="page-header-sub">{total.toLocaleString()} work orders</p></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={load} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh</button>
          <button className="btn btn-primary" onClick={() => navigate('/maintenance/work-orders/new')}><Plus size={15} /> New Work Order</button>
        </div>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      <div className="toolbar">
        <div className="search-wrap"><Search size={14} /><input className="search-input" placeholder="Search number, title..." value={params.q ?? ''} onChange={(e) => apply({ q: e.target.value || undefined, page: 1 })} /></div>
        <select className="filter-select" value={params.status ?? ''} onChange={(e) => apply({ status: (e.target.value || undefined) as WOStatus, page: 1 })}>{STATUS_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        <select className="filter-select" value={params.order_type ?? ''} onChange={(e) => apply({ order_type: e.target.value || undefined, page: 1 })}>{TYPE_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
        <div className="view-toggle">
          <button className={`view-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}><List size={14} /></button>
          <button className={`view-btn${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')}><Grid3X3 size={14} /></button>
        </div>
      </div>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12, marginTop: 12 }}>
          {isLoading ? Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ height: 130, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }} />) : items.map((wo) => <WorkOrderCard key={wo.id} wo={wo} onClick={() => navigate(`/maintenance/work-orders/${wo.id}`)} />)}
        </div>
      ) : (
        <div className="table-card">
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Work Order</th><th>Type</th><th>Status</th><th className="col-hide-sm">Equipment</th><th className="col-hide-sm">Scheduled</th><th className="col-hide-sm">Priority</th></tr></thead>
              <tbody>
                {isLoading ? Array.from({ length: 8 }).map((_, i) => <tr key={i} className="skeleton-row"><td><div className="skeleton-cell" style={{ width: '80%' }} /></td><td><div className="skeleton-cell" style={{ width: 60 }} /></td><td><div className="skeleton-cell" style={{ width: 70 }} /></td><td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '60%' }} /></td><td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 80 }} /></td><td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 50 }} /></td></tr>) : items.length === 0 ? <tr><td colSpan={6}><div className="table-empty"><p>No work orders found</p></div></td></tr> : items.map((wo) => (
                  <tr key={wo.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/maintenance/work-orders/${wo.id}`)}>
                    <td><div className="cell-desc">{wo.work_order_number}</div><div className="cell-muted cell-sub">{wo.title}</div></td>
                    <td><WOTypeBadge type={wo.order_type} /></td>
                    <td><WOStatusBadge status={wo.status} /></td>
                    <td className="cell-muted col-hide-sm cell-sub">{wo.forklift.serial_number}</td>
                    <td className="cell-muted col-hide-sm">{fmtDate(wo.scheduled_date)}</td>
                    <td className="col-hide-sm"><WOPriorityBadge priority={wo.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isLoading && pages > 1 && (
            <div className="pagination">
              <span className="pagination-info">Page {cp} of {pages} ({total} total)</span>
              <div className="pagination-controls">
                <button className="page-btn" disabled={cp === 1} onClick={() => apply({ page: cp - 1 })}><ChevronLeft size={14} /></button>
                <button className="page-btn" disabled={cp === pages} onClick={() => apply({ page: cp + 1 })}><ChevronRight size={14} /></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
