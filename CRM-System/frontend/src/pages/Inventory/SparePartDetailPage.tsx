import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, AlertCircle, Package } from 'lucide-react'
import { getPart, getBalances, getTransactions } from '@/api/inventory'
import { PartCategoryBadge, StockLevelBadge } from '@/components/inventory/StockBadge'
import type { SparePart, InventoryBalance, InventoryTransaction } from '@/types/inventory'
import '@/pages/Catalog/ProductDetailPage.css'
import '@/styles/detail.css'
import '@/styles/shared.css'

function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }
function fmtDateTime(iso: string) { return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }

export default function SparePartDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [part, setPart] = useState<SparePart | null>(null)
  const [balances, setBalances] = useState<InventoryBalance[]>([])
  const [txns, setTxns] = useState<InventoryTransaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!id) return; setIsLoading(true); setError(null)
    try {
      const pid = Number(id)
      const [pRes, bRes, tRes] = await Promise.all([getPart(pid), getBalances({ spare_part_id: pid }), getTransactions({ spare_part_id: pid })])
      setPart(pRes.data); setBalances(bRes.data); setTxns(tRes.data)
    } catch { setError('Part not found.') } finally { setIsLoading(false) }
  }, [id])
  useEffect(() => { load() }, [load])

  if (isLoading) return <div className="product-detail"><div className="detail-skeleton"><div className="skeleton-cell" style={{ height: 24, width: '60%' }} /></div></div>
  if (error || !part) return <div className="product-detail"><button className="detail-back" onClick={() => navigate('/inventory/parts')}><ChevronLeft size={16} /> Back</button><div className="page-error" style={{ marginTop: 24 }}><AlertCircle size={16} /> {error ?? 'Not found.'}</div></div>

  const totalStock = balances.reduce((s, b) => s + b.quantity_on_hand, 0)

  return (
    <div className="product-detail">
      <button className="detail-back" onClick={() => navigate('/inventory/parts')}><ChevronLeft size={16} /> Back to Spare Parts</button>

      <div className="detail-header">
        <div>
          <div className="detail-title-row"><h1 className="detail-name">{part.part_number}</h1></div>
          <div className="detail-subtitle">{part.name}</div>
          <div className="detail-badges">
            <PartCategoryBadge category={part.part_category} />
            <StockLevelBadge available={totalStock} minLevel={part.min_stock_level} />
          </div>
        </div>
      </div>

      <div className="detail-summary-grid">
        <div className="detail-summary-card"><div className="detail-summary-label">Unit Price</div><div className="detail-summary-value">{fmtAmt(part.unit_price)} {part.currency}</div></div>
        <div className="detail-summary-card"><div className="detail-summary-label">Total Stock</div><div className="detail-summary-value">{totalStock} {part.unit}</div></div>
        <div className="detail-summary-card"><div className="detail-summary-label">Min Level</div><div className="detail-summary-value">{part.min_stock_level}</div></div>
        <div className="detail-summary-card"><div className="detail-summary-label">Reorder Qty</div><div className="detail-summary-value">{part.reorder_quantity}</div></div>
      </div>

      <div className="detail-info-grid">
        <div><dl className="detail-meta">
          {part.brand && <><dt>Brand</dt><dd>{part.brand.name}</dd></>}
          <dt>Unit</dt><dd>{part.unit}</dd>
          <dt>Lead Time</dt><dd>{part.lead_time_days} days</dd>
        </dl></div>
        <div><dl className="detail-meta">
          <dt>Created</dt><dd>{new Date(part.created_at).toLocaleDateString()}</dd>
          <dt>Active</dt><dd>{part.is_active ? 'Yes' : 'No'}</dd>
        </dl></div>
      </div>

      {part.description && <div className="detail-description" style={{ marginTop: 16 }}><div className="detail-section-title">Description</div><p>{part.description}</p></div>}

      {balances.length > 0 && (
        <div className="detail-specs-section" style={{ marginTop: 24 }}>
          <h2 className="detail-section-title"><Package size={16} style={{ verticalAlign: -2, marginRight: 6 }} />Stock by Warehouse</h2>
          <div className="table-card" style={{ marginTop: 10 }}><table className="data-table">
            <thead><tr><th>Warehouse</th><th>On Hand</th><th>Reserved</th><th>Available</th></tr></thead>
            <tbody>{balances.map((b) => (
              <tr key={b.id}><td className="cell-desc">{b.warehouse.code} — {b.warehouse.name}</td>
                <td className="cell-mono">{b.quantity_on_hand}</td><td className="cell-mono">{b.quantity_reserved}</td><td className="cell-mono cell-total">{b.quantity_available}</td></tr>
            ))}</tbody>
          </table></div>
        </div>
      )}

      {txns.length > 0 && (
        <div className="detail-specs-section">
          <h2 className="detail-section-title">Recent Transactions</h2>
          <div className="table-card" style={{ marginTop: 10 }}><table className="data-table">
            <thead><tr><th>Number</th><th>Type</th><th>Qty</th><th className="col-hide-sm">Cost</th><th className="col-hide-sm">Date</th></tr></thead>
            <tbody>{txns.slice(0, 20).map((t) => (
              <tr key={t.id}><td className="cell-desc">{t.transaction_number}</td>
                <td className="cell-type">{t.transaction_type}</td>
                <td className="cell-mono">{t.quantity}</td>
                <td className="cell-muted col-hide-sm cell-mono">{fmtAmt(t.total_cost)}</td>
                <td className="cell-muted col-hide-sm">{fmtDateTime(t.created_at)}</td></tr>
            ))}</tbody>
          </table></div>
        </div>
      )}
    </div>
  )
}
