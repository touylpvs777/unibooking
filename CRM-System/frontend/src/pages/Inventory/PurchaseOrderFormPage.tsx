import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, AlertCircle, Plus, Trash2 } from 'lucide-react'
import { createPurchaseOrder, getWarehouses } from '@/api/inventory'
import SparePartSelect from '@/components/inventory/SparePartSelect'
import { toast } from '@/store/toastStore'
import type { Warehouse, SparePart } from '@/types/inventory'
import PageHeader from '@/components/layout/PageHeader'
import '@/styles/shared.css'

interface LineItemRow {
  key: number
  item_code: string
  description: string
  unit: string
  quantity_ordered: string
  unit_cost: string
  spare_part_id: number | null
}

let nextKey = 1
const emptyRow = (): LineItemRow => ({ key: nextKey++, item_code: '', description: '', unit: 'piece', quantity_ordered: '1', unit_cost: '0', spare_part_id: null })

function fmtAmt(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function PurchaseOrderFormPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [warehouseId, setWarehouseId] = useState<number | ''>('')
  const [vendor, setVendor] = useState('')
  const [vendorAddress, setVendorAddress] = useState('')
  const [vendorContact, setVendorContact] = useState('')
  const [orderDate, setOrderDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [expectedDate, setExpectedDate] = useState('')
  const [taxRate, setTaxRate] = useState('10')
  const [notes, setNotes] = useState('')
  const [rows, setRows] = useState<LineItemRow[]>([emptyRow()])

  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    getWarehouses().then(({ data }) => {
      setWarehouses(data)
      if (data.length > 0) setWarehouseId(data[0].id)
    }).catch(() => {})
  }, [])

  const setRow = (key: number, field: keyof Omit<LineItemRow, 'key'>, value: string | number | null) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)))

  const addRow = () => setRows((prev) => [...prev, emptyRow()])
  const removeRow = (key: number) => setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.key !== key) : prev))

  const applyCatalogPart = (key: number, part: SparePart) => {
    setRows((prev) => prev.map((r) => (r.key === key ? {
      ...r,
      spare_part_id: part.id,
      item_code: part.part_number,
      description: part.name,
      unit: part.unit,
      unit_cost: String(part.unit_price),
    } : r)))
  }

  const lineTotals = useMemo(
    () => rows.map((r) => (Number(r.quantity_ordered) || 0) * (Number(r.unit_cost) || 0)),
    [rows],
  )
  const subtotal = useMemo(() => lineTotals.reduce((s, v) => s + v, 0), [lineTotals])
  const taxAmount = useMemo(() => subtotal * ((Number(taxRate) || 0) / 100), [subtotal, taxRate])
  const grandTotal = subtotal + taxAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vendor.trim()) { setErr(t('inventory.purchaseOrder.form.vendorRequired')); return }
    if (!warehouseId) { setErr(t('inventory.purchaseOrder.form.warehouseRequired')); return }
    const validRows = rows.filter((r) => r.description.trim() || r.spare_part_id)
    if (validRows.length === 0) { setErr(t('inventory.purchaseOrder.form.itemRequired')); return }

    setIsSaving(true); setErr(null)
    try {
      const { data } = await createPurchaseOrder({
        vendor: vendor.trim(),
        vendor_address: vendorAddress.trim() || undefined,
        vendor_contact: vendorContact.trim() || undefined,
        warehouse_id: Number(warehouseId),
        order_date: orderDate,
        expected_date: expectedDate || undefined,
        tax_rate: Number(taxRate) || 0,
        notes: notes.trim() || undefined,
        items: validRows.map((r) => ({
          spare_part_id: r.spare_part_id ?? undefined,
          item_code: r.item_code.trim() || undefined,
          description: r.description.trim() || undefined,
          unit: r.unit.trim() || undefined,
          quantity_ordered: Number(r.quantity_ordered) || 1,
          unit_cost: Number(r.unit_cost) || 0,
        })),
      })
      toast.success(t('inventory.purchaseOrder.form.created', { number: data.po_number }))
      navigate(`/inventory/purchase-orders/${data.id}`)
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('inventory.purchaseOrder.form.createFailed'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <button
        className="detail-back"
        onClick={() => navigate('/inventory/purchase-orders')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 13.5, marginBottom: 20 }}
      >
        <ChevronLeft size={16} /> {t('inventory.purchaseOrder.form.backToList')}
      </button>

      <PageHeader title={t('inventory.purchaseOrder.form.title')} style={{ marginBottom: 24 }} />

      <div style={{ maxWidth: 900, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 24 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          {err && <div className="page-error" style={{ margin: 0 }}><AlertCircle size={14} /> {err}</div>}

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('inventory.purchaseOrder.form.vendor')} <span className="required">*</span></label>
              <input value={vendor} onChange={(e) => setVendor(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>{t('inventory.purchaseOrder.form.warehouse')} <span className="required">*</span></label>
              <select value={warehouseId} onChange={(e) => setWarehouseId(e.target.value ? Number(e.target.value) : '')}>
                {warehouses.map((w) => <option key={w.id} value={w.id}>{w.code} — {w.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('inventory.purchaseOrder.form.vendorAddress')}</label>
              <input value={vendorAddress} onChange={(e) => setVendorAddress(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('inventory.purchaseOrder.form.vendorContact')}</label>
              <input value={vendorContact} onChange={(e) => setVendorContact(e.target.value)} />
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label>{t('inventory.purchaseOrder.form.orderDate')}</label>
              <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('inventory.purchaseOrder.form.expectedDate')}</label>
              <input type="date" value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('inventory.purchaseOrder.form.taxRate')}</label>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} min="0" max="100" step="0.1" />
            </div>
          </div>

          {/* Line items */}
          <div className="form-group">
            <label>{t('inventory.purchaseOrder.form.lineItems')} <span className="required">*</span></label>
            <div className="table-wrap" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: 120 }}>{t('inventory.purchaseOrder.form.itemCode')}</th>
                    <th>{t('inventory.purchaseOrder.form.description')}</th>
                    <th style={{ width: 90 }}>{t('inventory.purchaseOrder.form.qty')}</th>
                    <th style={{ width: 90 }}>{t('inventory.purchaseOrder.form.unit')}</th>
                    <th style={{ width: 120 }}>{t('inventory.purchaseOrder.form.unitCost')}</th>
                    <th style={{ width: 130 }}>{t('common.total')}</th>
                    <th style={{ width: 200 }}>{t('inventory.purchaseOrder.form.linkCatalogPart')}</th>
                    <th style={{ width: 40 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.key}>
                      <td>
                        <input
                          value={row.item_code}
                          onChange={(e) => setRow(row.key, 'item_code', e.target.value)}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td>
                        <input
                          value={row.description}
                          onChange={(e) => setRow(row.key, 'description', e.target.value)}
                          placeholder={t('inventory.purchaseOrder.form.descriptionPlaceholder')}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td>
                        <input
                          type="number" min="0" step="0.01"
                          value={row.quantity_ordered}
                          onChange={(e) => setRow(row.key, 'quantity_ordered', e.target.value)}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td>
                        <input
                          value={row.unit}
                          onChange={(e) => setRow(row.key, 'unit', e.target.value)}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td>
                        <input
                          type="number" min="0" step="0.01"
                          value={row.unit_cost}
                          onChange={(e) => setRow(row.key, 'unit_cost', e.target.value)}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td className="cell-mono">{fmtAmt(lineTotals[i])}</td>
                      <td>
                        <SparePartSelect onSelect={(part) => applyCatalogPart(row.key, part)} />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="action-btn danger"
                          onClick={() => removeRow(row.key)}
                          disabled={rows.length === 1}
                          title={t('common.delete')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addRow} style={{ marginTop: 8 }}>
              <Plus size={14} /> {t('inventory.purchaseOrder.form.addRow')}
            </button>
          </div>

          <div className="form-group">
            <label>{t('common.notes')}</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
          </div>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ minWidth: 260, fontSize: 13.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('common.subtotal')}</span>
                <span className="cell-mono">{fmtAmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('billing.invoice.amountSummary.tax', { rate: taxRate || 0 })}</span>
                <span className="cell-mono">{fmtAmt(taxAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid var(--color-border)', marginTop: 4, fontWeight: 700, fontSize: 15 }}>
                <span>{t('common.total')}</span>
                <span className="cell-mono">{fmtAmt(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/inventory/purchase-orders')} disabled={isSaving}>{t('common.cancel')}</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>{isSaving ? t('inventory.purchaseOrder.form.creating') : t('inventory.purchaseOrder.form.createPO')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
