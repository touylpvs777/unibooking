import { useState, useEffect, useCallback } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { getPurchaseOrders } from '@/api/inventory'
import { PurchaseOrderTable } from '@/modules/inventory'
import type { POListItem } from '@/types/inventory'
import '@/styles/shared.css'

const STATUS_OPTS = [
  { value: '', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'ordered', label: 'Ordered' },
  { value: 'partially_received', label: 'Partial' },
  { value: 'received', label: 'Received' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function PurchaseOrderPage() {
  const [items, setItems] = useState<POListItem[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try {
      const { data } = await getPurchaseOrders({ status: statusFilter || undefined, page, page_size: 20 })
      setItems(data.items); setTotal(data.total); setPages(data.pages)
    } catch { setError('Failed to load purchase orders.') }
    finally { setIsLoading(false) }
  }, [statusFilter, page])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Purchase Orders</h1>
          <p className="page-header-sub">{total.toLocaleString()} orders</p>
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
        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
      </div>

      <PurchaseOrderTable
        items={items}
        total={total}
        page={page}
        pages={pages}
        isLoading={isLoading}
        onPageChange={setPage}
      />
    </div>
  )
}
