import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AlertCircle, ChevronLeft, Send, PackageCheck, FileDown } from 'lucide-react'
import { getPurchaseOrder, submitPO, receivePO } from '@/api/inventory'
import { POStatusBadge } from '@/components/inventory/StockBadge'
import Modal from '@/components/ui/Modal'
import PrintButton from '@/components/ui/PrintButton'
import DocumentPreview from '@/components/DocumentPreview'
import { toast } from '@/store/toastStore'
import { useCompanyStore } from '@/store/companyStore'
import type { PurchaseOrder } from '@/types/inventory'
import { getHeaderColorClass } from '@/utils/routeHeaderColor'
import '@/styles/shared.css'
import '@/styles/detail.css'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number, cur = '') { return `${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${cur ? ' ' + cur : ''}` }

export default function PurchaseOrderDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const headerColorClass = getHeaderColorClass(useLocation().pathname)
  const [po, setPo] = useState<PurchaseOrder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [receiveOpen, setReceiveOpen] = useState(false)
  const [receiveQty, setReceiveQty] = useState<Record<number, string>>({})

  const companyProfile = useCompanyStore((s) => s.profile)
  const fetchCompanyProfile = useCompanyStore((s) => s.fetch)
  useEffect(() => { fetchCompanyProfile() }, [fetchCompanyProfile])

  const load = async () => {
    setIsLoading(true)
    try { setPo((await getPurchaseOrder(Number(id))).data) }
    catch { setError(t('inventory.purchaseOrder.detail.loadError')) }
    finally { setIsLoading(false) }
  }
  useEffect(() => { load() }, [id])

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(true)
    try { await fn(); toast.success(label); await load() }
    catch { toast.error(t('inventory.purchaseOrder.detail.actionFailed', { action: label })) }
    finally { setBusy(false) }
  }

  const openReceiveModal = () => {
    if (!po) return
    const init: Record<number, string> = {}
    po.items.forEach((it) => { init[it.id] = String(it.quantity_ordered - it.quantity_received) })
    setReceiveQty(init)
    setReceiveOpen(true)
  }

  const submitReceive = async () => {
    if (!po) return
    const items = Object.entries(receiveQty)
      .map(([item_id, qty]) => ({ item_id: Number(item_id), quantity_received: Number(qty) || 0 }))
      .filter((r) => r.quantity_received > 0)
    if (items.length === 0) { setReceiveOpen(false); return }
    setReceiveOpen(false)
    await run(t('inventory.purchaseOrder.detail.received'), () => receivePO(po.id, items))
  }

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>{t('common.loading')}</div>
  if (error || !po) return <div className="page-error"><AlertCircle size={16} /> {error || t('inventory.purchaseOrder.detail.notFound')}</div>

  const s = po.status
  const canReceive = s === 'ordered' || s === 'partially_received'

  return (
    <div>
    <div className="doc-preview-hide-on-print">
      <div className={`page-header page-header-banner ${headerColorClass}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-ghost" onClick={() => navigate('/inventory/purchase-orders')} style={{ padding: '6px 8px' }}>
            <ChevronLeft size={16} />
          </button>
          <div>
            <div className="detail-title-row">
              <h1 className="detail-name" style={{ fontSize: 20 }}>{po.po_number}</h1>
              <POStatusBadge status={s} />
            </div>
            <div className="detail-subtitle">{po.vendor}</div>
          </div>
        </div>
        <div className="detail-actions">
          <PrintButton />
          <button className="btn btn-primary" onClick={() => window.print()}>
            <FileDown size={14} /> {t('common.exportPdf')}
          </button>
          {s === 'draft' && <button className="btn btn-primary" disabled={busy} onClick={() => run(t('inventory.purchaseOrder.detail.submitted'), () => submitPO(po.id))}><Send size={14} /> {t('inventory.purchaseOrder.detail.submit')}</button>}
          {canReceive && <button className="btn btn-primary" disabled={busy} onClick={openReceiveModal}><PackageCheck size={14} /> {t('inventory.purchaseOrder.detail.receiveItems')}</button>}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="detail-summary-grid">
        {[
          { label: t('common.subtotal'), value: fmtAmt(po.subtotal, po.currency) },
          { label: t('billing.invoice.summary.tax', { rate: po.tax_rate }), value: fmtAmt(po.tax_amount, po.currency) },
          { label: t('common.total'), value: fmtAmt(po.total_amount, po.currency) },
        ].map((c) => (
          <div key={c.label} className="detail-summary-card">
            <div className="detail-summary-label">{c.label}</div>
            <div className="detail-summary-value">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div className="detail-info-grid">
        <dl className="detail-meta">
          <dt>{t('inventory.purchaseOrder.form.orderDate')}</dt><dd>{fmtDate(po.order_date)}</dd>
          <dt>{t('inventory.purchaseOrder.form.expectedDate')}</dt><dd>{fmtDate(po.expected_date)}</dd>
          <dt>{t('inventory.purchaseOrder.detail.receivedDate')}</dt><dd>{fmtDate(po.received_date)}</dd>
          <dt>{t('common.createdAt')}</dt><dd>{fmtDate(po.created_at)}</dd>
        </dl>
        <dl className="detail-meta">
          <dt>{t('inventory.purchaseOrderTable.warehouse')}</dt><dd>{po.warehouse.code} — {po.warehouse.name}</dd>
          {po.vendor_address && <><dt>{t('inventory.purchaseOrder.form.vendorAddress')}</dt><dd>{po.vendor_address}</dd></>}
          {po.vendor_contact && <><dt>{t('inventory.purchaseOrder.form.vendorContact')}</dt><dd>{po.vendor_contact}</dd></>}
        </dl>
      </div>

      {po.notes && (
        <div className="detail-internal-note" style={{ marginTop: 20, background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <strong style={{ color: 'var(--color-text-muted)' }}>{t('common.notes')}</strong>
          <p style={{ margin: '4px 0 0', color: 'var(--color-text)' }}>{po.notes}</p>
        </div>
      )}

      {/* Line Items */}
      <div className="detail-section-bar" style={{ marginTop: 28 }}>
        <h3 className="detail-section-title">{t('inventory.purchaseOrder.form.lineItems')}</h3>
      </div>
      <div className="table-card" style={{ marginTop: 8 }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('inventory.purchaseOrder.form.itemCode')}</th>
                <th>{t('inventory.purchaseOrder.form.description')}</th>
                <th>{t('inventory.purchaseOrder.form.unit')}</th>
                <th>{t('inventory.purchaseOrder.detail.qtyOrdered')}</th>
                <th>{t('inventory.purchaseOrder.detail.qtyReceived')}</th>
                <th>{t('inventory.purchaseOrder.form.unitCost')}</th>
                <th>{t('common.total')}</th>
              </tr>
            </thead>
            <tbody>
              {po.items.length === 0 ? (
                <tr><td colSpan={7}><div className="detail-empty-state">{t('inventory.purchaseOrderTable.empty')}</div></td></tr>
              ) : po.items.map((it) => (
                <tr key={it.id}>
                  <td className="cell-muted">{it.item_code ?? '—'}</td>
                  <td className="cell-desc">{it.description ?? '—'}</td>
                  <td className="cell-muted">{it.unit ?? '—'}</td>
                  <td className="cell-mono">{it.quantity_ordered}</td>
                  <td className="cell-mono">{it.quantity_received}</td>
                  <td className="cell-mono">{fmtAmt(it.unit_cost)}</td>
                  <td className="cell-mono cell-total">{fmtAmt(it.line_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receive Modal */}
      <Modal isOpen={receiveOpen} onClose={() => setReceiveOpen(false)} title={t('inventory.purchaseOrder.detail.receiveModalTitle')} footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => setReceiveOpen(false)}>{t('common.close')}</button>
          <button className="btn btn-primary" disabled={busy} onClick={submitReceive}>{t('inventory.purchaseOrder.detail.receiveItems')}</button>
        </div>
      }>
        <div className="form-grid">
          {po.items.filter((it) => it.quantity_received < it.quantity_ordered).map((it) => (
            <div key={it.id} className="form-group">
              <label>{it.item_code ?? it.description ?? `#${it.id}`} ({t('inventory.purchaseOrder.detail.qtyOrdered')}: {it.quantity_ordered}, {t('inventory.purchaseOrder.detail.qtyReceived')}: {it.quantity_received})</label>
              <input
                type="number" min="0" max={it.quantity_ordered - it.quantity_received} step="0.01"
                value={receiveQty[it.id] ?? '0'}
                onChange={(e) => setReceiveQty((prev) => ({ ...prev, [it.id]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </Modal>
    </div>

      <div className="doc-preview">
        <DocumentPreview
          docType="purchase_order"
          documentNumber={po.po_number}
          date={fmtDate(po.order_date)}
          companyName={companyProfile?.company_name}
          companyAddress={companyProfile?.address}
          companyPhone={companyProfile?.phone}
          partyLabel={t('documentPreview.vendorDetails')}
          partyName={po.vendor}
          partyAddress={po.vendor_address ?? undefined}
          partyContact={po.vendor_contact ?? undefined}
          items={po.items.map((it) => ({
            itemCode: it.item_code ?? undefined, description: it.description ?? it.spare_part?.name ?? '', unit: it.unit ?? undefined,
            qty: it.quantity_ordered, unitPrice: it.unit_cost, total: it.line_total,
          }))}
          subtotal={po.subtotal}
          taxRate={po.tax_rate}
          taxAmount={po.tax_amount}
          grandTotal={po.total_amount}
          currency={po.currency}
        />
      </div>
    </div>
  )
}
