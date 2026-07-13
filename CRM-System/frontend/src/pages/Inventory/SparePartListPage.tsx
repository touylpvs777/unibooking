import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { getParts } from '@/api/inventory'
import { PartCategoryBadge } from '@/components/inventory/StockBadge'
import type { SparePart, PartListParams } from '@/types/inventory'
import '@/styles/shared.css'
import '@/styles/detail.css'

function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

const CAT_OPTS = [
  { value: '', label: 'All Categories' }, { value: 'filter', label: 'Filter' }, { value: 'belt', label: 'Belt' },
  { value: 'brake', label: 'Brake' }, { value: 'hydraulic', label: 'Hydraulic' }, { value: 'electrical', label: 'Electrical' },
  { value: 'engine', label: 'Engine' }, { value: 'tire', label: 'Tire' }, { value: 'battery', label: 'Battery' },
  { value: 'lubricant', label: 'Lubricant' }, { value: 'general', label: 'General' },
]

export default function SparePartListPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<SparePart[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [params, setParams] = useState<PartListParams>({ page: 1, page_size: 20 })

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try { const { data } = await getParts(params); setItems(data.items); setTotal(data.total); setPages(data.pages) }
    catch { setError('Failed to load parts.') } finally { setIsLoading(false) }
  }, [params])
  useEffect(() => { load() }, [load])

  const apply = (p: Partial<PartListParams>) => setParams((prev) => ({ ...prev, ...p }))
  const cp = params.page ?? 1

  return (
    <div>
      <div className="page-header">
        <div><h1>Spare Parts</h1><p className="page-header-sub">{total.toLocaleString()} parts</p></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={load} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh</button>
          <button className="btn btn-primary" onClick={() => navigate('/inventory/parts/new')}><Plus size={15} /> Add Part</button>
        </div>
      </div>
      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}
      <div className="toolbar">
        <div className="search-wrap"><Search size={14} /><input className="search-input" placeholder="Search part number, name..." value={params.q ?? ''} onChange={(e) => apply({ q: e.target.value || undefined, page: 1 })} /></div>
        <select className="filter-select" value={params.part_category ?? ''} onChange={(e) => apply({ part_category: e.target.value || undefined, page: 1 })}>{CAT_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
      </div>
      <div className="table-card">
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Part #</th><th>Name</th><th>Category</th><th className="col-hide-sm">Unit Price</th><th className="col-hide-sm">Min Stock</th><th className="col-hide-sm">Unit</th></tr></thead>
            <tbody>
              {isLoading ? Array.from({ length: 8 }).map((_, i) => <tr key={i} className="skeleton-row"><td><div className="skeleton-cell" style={{ width: '80%' }} /></td><td><div className="skeleton-cell" style={{ width: '60%' }} /></td><td><div className="skeleton-cell" style={{ width: 60 }} /></td><td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 60 }} /></td><td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 40 }} /></td><td className="col-hide-sm"><div className="skeleton-cell" style={{ width: 40 }} /></td></tr>) : items.length === 0 ? <tr><td colSpan={6}><div className="table-empty"><p>No spare parts found</p></div></td></tr> : items.map((p) => (
                <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/inventory/parts/${p.id}`)}>
                  <td className="cell-desc">{p.part_number}</td>
                  <td><div className="cell-desc">{p.name}</div>{p.brand && <div className="cell-muted cell-sub">{p.brand.name}</div>}</td>
                  <td><PartCategoryBadge category={p.part_category} /></td>
                  <td className="cell-muted col-hide-sm cell-mono">{fmtAmt(p.unit_price)} {p.currency}</td>
                  <td className="cell-muted col-hide-sm">{p.min_stock_level}</td>
                  <td className="cell-muted col-hide-sm">{p.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isLoading && pages > 1 && <div className="pagination"><span className="pagination-info">Page {cp} of {pages}</span><div className="pagination-controls"><button className="page-btn" disabled={cp === 1} onClick={() => apply({ page: cp - 1 })}><ChevronLeft size={14} /></button><button className="page-btn" disabled={cp === pages} onClick={() => apply({ page: cp + 1 })}><ChevronRight size={14} /></button></div></div>}
      </div>
    </div>
  )
}
