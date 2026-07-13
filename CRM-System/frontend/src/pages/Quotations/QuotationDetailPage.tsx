import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft, AlertCircle, Plus, Trash2, Send, Check,
  X, RotateCcw, FileText, Clock,
} from 'lucide-react'
import {
  getQuotation,
  addItem, deleteItem,
  submitQuotation, approveQuotation, rejectQuotation,
  sendQuotation, acceptQuotation, declineQuotation,
  convertQuotation, cancelQuotation, reactivateQuotation,
} from '@/api/quotation'
import { QuotationStatusBadge, QuotationTypeBadge } from '@/components/quotation/QuotationStatusBadge'
import Modal from '@/components/ui/Modal'
import { toast } from '@/store/toastStore'
import type { QuotationDetail, ItemType } from '@/types/quotation'
import '@/pages/Catalog/ProductDetailPage.css'
import '@/styles/detail.css'
import '@/styles/shared.css'

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function fmtAmount(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

const ITEM_TYPE_OPTIONS = [
  { value: 'forklift_rental', label: 'Forklift Rental' },
  { value: 'forklift_sale', label: 'Forklift Sale' },
  { value: 'service', label: 'Service' },
  { value: 'spare_part', label: 'Spare Part' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'custom', label: 'Custom' },
]

export default function QuotationDetailPage() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [qt, setQt]               = useState<QuotationDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)
  const [actionLoading, setAL]    = useState(false)
  const [itemFormOpen, setIFO]    = useState(false)

  const load = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getQuotation(Number(id))
      setQt(data)
    } catch {
      setError('Quotation not found or failed to load.')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => { load() }, [load])

  const doAction = async (label: string, fn: () => Promise<unknown>) => {
    setAL(true)
    try {
      await fn()
      toast.success(label)
      await load()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? `Failed: ${label}`)
    } finally {
      setAL(false)
    }
  }

  const handleDeleteItem = async (itemId: number) => {
    if (!qt) return
    await doAction('Item removed', () => deleteItem(qt.id, itemId))
  }

  if (isLoading) {
    return (
      <div className="product-detail">
        <div className="detail-skeleton">
          <div className="skeleton-cell" style={{ height: 18, width: '30%', marginBottom: 24 }} />
          <div className="detail-skeleton-body">
            <div className="detail-skeleton-info">
              <div className="skeleton-cell" style={{ height: 12, width: '50%' }} />
              <div className="skeleton-cell" style={{ height: 24, width: '80%', marginTop: 8 }} />
              <div className="skeleton-cell" style={{ height: 14, width: '40%', marginTop: 12 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !qt) {
    return (
      <div className="product-detail">
        <button className="detail-back" onClick={() => navigate('/quotations')}>
          <ChevronLeft size={16} /> Back to Quotations
        </button>
        <div className="page-error" style={{ marginTop: 24 }}>
          <AlertCircle size={16} /> {error ?? 'Quotation not found.'}
        </div>
      </div>
    )
  }

  const actions = qt.available_actions
  const isDraft = qt.status === 'draft'

  return (
    <div className="product-detail">
      <button className="detail-back" onClick={() => navigate('/quotations')}>
        <ChevronLeft size={16} /> Back to Quotations
      </button>

      {/* Header */}
      <div className="detail-header">
        <div>
          <div className="detail-title-row">
            <h1 className="detail-name">{qt.quotation_number}</h1>
            <span className="detail-rev">Rev {qt.revision_number}</span>
          </div>
          <div className="detail-subtitle">{qt.title}</div>
          <div className="detail-badges">
            <QuotationStatusBadge status={qt.status} />
            <QuotationTypeBadge type={qt.quotation_type} />
          </div>
        </div>

        <div className="detail-actions">
          {actions.includes('submit') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Submitted for review', () => submitQuotation(qt.id))}>
              <Send size={14} /> Submit
            </button>
          )}
          {actions.includes('approve') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Approved', () => approveQuotation(qt.id))}>
              <Check size={14} /> Approve
            </button>
          )}
          {actions.includes('reject') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction('Revision requested', () => rejectQuotation(qt.id, 'Revision needed'))}>
              <RotateCcw size={14} /> Request Revision
            </button>
          )}
          {actions.includes('send') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Sent to customer', () => sendQuotation(qt.id))}>
              <Send size={14} /> Send to Customer
            </button>
          )}
          {actions.includes('accept') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Marked as accepted', () => acceptQuotation(qt.id))}>
              <Check size={14} /> Mark Accepted
            </button>
          )}
          {actions.includes('decline') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction('Marked as rejected', () => declineQuotation(qt.id))}>
              <X size={14} /> Mark Rejected
            </button>
          )}
          {actions.includes('convert') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Converted', () => convertQuotation(qt.id, qt.quotation_type === 'rental' ? 'rental_contract' : 'sales_order'))}>
              <FileText size={14} /> Convert
            </button>
          )}
          {actions.includes('cancel') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction('Cancelled', () => cancelQuotation(qt.id))}>
              <X size={14} /> Cancel
            </button>
          )}
          {actions.includes('reactivate') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction('Reactivated', () => reactivateQuotation(qt.id))}>
              <RotateCcw size={14} /> Reactivate
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="detail-summary-grid">
        {[
          { label: 'Subtotal', value: fmtAmount(qt.subtotal) },
          { label: `Tax (${qt.tax_rate}%)`, value: fmtAmount(qt.tax_amount) },
          { label: 'Discount', value: fmtAmount(qt.discount_amount) },
          { label: 'Total', value: `${fmtAmount(qt.total_amount)} ${qt.currency}` },
        ].map((c) => (
          <div key={c.label} className="detail-summary-card">
            <div className="detail-summary-label">{c.label}</div>
            <div className="detail-summary-value">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="detail-info-grid">
        <div>
          <dl className="detail-meta">
            {qt.customer && (
              <><dt>Customer</dt><dd>{qt.customer.first_name} {qt.customer.last_name}{qt.customer.company ? ` (${qt.customer.company})` : ''}</dd></>
            )}
            {qt.contact_name && (<><dt>Contact</dt><dd>{qt.contact_name}</dd></>)}
            {qt.contact_email && (<><dt>Email</dt><dd>{qt.contact_email}</dd></>)}
            {qt.contact_phone && (<><dt>Phone</dt><dd>{qt.contact_phone}</dd></>)}
            {qt.assigned_user && (<><dt>Assigned To</dt><dd>{qt.assigned_user.full_name ?? qt.assigned_user.username}</dd></>)}
          </dl>
        </div>
        <div>
          <dl className="detail-meta">
            <dt>Valid From</dt><dd>{fmtDate(qt.valid_from)}</dd>
            <dt>Valid Until</dt><dd>{fmtDate(qt.valid_until)}</dd>
            <dt>Created</dt><dd>{fmtDate(qt.created_at)}</dd>
            {qt.converted_to_type && (<><dt>Converted To</dt><dd className="cell-type">{qt.converted_to_type.replace(/_/g, ' ')}</dd></>)}
          </dl>
        </div>
      </div>

      {qt.notes && (
        <div className="detail-description" style={{ marginTop: 16 }}>
          <div className="detail-section-title">Notes</div>
          <p>{qt.notes}</p>
        </div>
      )}

      {qt.internal_notes && (
        <div className="detail-internal-note">
          <strong>Internal Note</strong>
          <p>{qt.internal_notes}</p>
        </div>
      )}

      {/* Line Items */}
      <div className="detail-specs-section" style={{ marginTop: 24 }}>
        <div className="detail-section-bar">
          <h2 className="detail-section-title">Line Items ({qt.items.length})</h2>
          {isDraft && (
            <button className="btn btn-primary btn-sm" onClick={() => setIFO(true)}>
              <Plus size={13} /> Add Item
            </button>
          )}
        </div>

        {qt.items.length > 0 ? (
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th className="col-hide-sm">Qty</th>
                  <th className="col-hide-sm">Unit Price</th>
                  <th className="col-hide-sm">Disc %</th>
                  <th>Total</th>
                  {isDraft && <th style={{ width: 40 }}></th>}
                </tr>
              </thead>
              <tbody>
                {qt.items.map((item) => (
                  <tr key={item.id}>
                    <td className="cell-muted">{item.line_number}</td>
                    <td>
                      <div className="cell-desc">{item.description}</div>
                      {item.forklift && <div className="cell-muted cell-sub">S/N: {item.forklift.serial_number}</div>}
                      {item.product && <div className="cell-muted cell-sub">SKU: {item.product.sku}</div>}
                      {item.rental_duration_days && <div className="cell-muted cell-sub">{item.rental_duration_days} days ({item.rental_rate_period})</div>}
                    </td>
                    <td className="cell-muted cell-type">{item.item_type.replace(/_/g, ' ')}</td>
                    <td className="cell-muted col-hide-sm cell-mono">{item.quantity}</td>
                    <td className="cell-muted col-hide-sm cell-mono">{fmtAmount(item.unit_price)}</td>
                    <td className="cell-muted col-hide-sm cell-mono">{item.discount_percent > 0 ? `${item.discount_percent}%` : '—'}</td>
                    <td className="cell-mono cell-total">{fmtAmount(item.line_total)}</td>
                    {isDraft && (
                      <td>
                        <button className="action-btn danger" onClick={() => handleDeleteItem(item.id)}><Trash2 size={13} /></button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="detail-empty-state">
            No line items yet. {isDraft && 'Add items to build the quotation.'}
          </div>
        )}
      </div>

      {/* Status History */}
      {qt.recent_status_history.length > 0 && (
        <div className="detail-specs-section">
          <h2 className="detail-section-title detail-section-title-row">
            <Clock size={16} /> Status History
          </h2>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>From</th>
                  <th>To</th>
                  <th className="col-hide-sm">Reason</th>
                  <th className="col-hide-sm">By</th>
                </tr>
              </thead>
              <tbody>
                {qt.recent_status_history.map((h) => (
                  <tr key={h.id}>
                    <td className="cell-muted">{fmtDateTime(h.changed_at)}</td>
                    <td>{h.from_status ? <QuotationStatusBadge status={h.from_status} /> : '—'}</td>
                    <td><QuotationStatusBadge status={h.to_status} /></td>
                    <td className="cell-muted col-hide-sm">{h.reason ?? '—'}</td>
                    <td className="cell-muted col-hide-sm">{h.user?.full_name ?? h.user?.username ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Approvals */}
      {qt.recent_approvals.length > 0 && (
        <div className="detail-specs-section">
          <h2 className="detail-section-title">Approval History</h2>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Rev</th>
                  <th>Decision</th>
                  <th className="col-hide-sm">Reason</th>
                  <th className="col-hide-sm">Conditions</th>
                  <th className="col-hide-sm">By</th>
                </tr>
              </thead>
              <tbody>
                {qt.recent_approvals.map((a) => (
                  <tr key={a.id}>
                    <td className="cell-muted">{fmtDateTime(a.decided_at)}</td>
                    <td className="cell-muted">R{a.revision_number}</td>
                    <td>
                      <span className={a.decision === 'approved' ? 'decision-approved' : 'decision-rejected'}>
                        {a.decision === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    </td>
                    <td className="cell-muted col-hide-sm">{a.reason ?? '—'}</td>
                    <td className="cell-muted col-hide-sm">{a.conditions ?? '—'}</td>
                    <td className="cell-muted col-hide-sm">{a.user?.full_name ?? a.user?.username ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={itemFormOpen}
        onClose={() => setIFO(false)}
        quotationId={qt.id}
        onSuccess={load}
      />
    </div>
  )
}


// ── Add Item Modal ──────────────────────────────────────────────────────────

function AddItemModal({
  isOpen, onClose, quotationId, onSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  quotationId: number
  onSuccess: () => void
}) {
  const [form, setForm] = useState({
    item_type: 'custom' as string,
    description: '',
    quantity: '1',
    unit: 'unit',
    unit_price: '',
    discount_percent: '0',
    rental_duration_days: '',
    rental_rate_period: '',
    notes: '',
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setForm({ item_type: 'custom', description: '', quantity: '1', unit: 'unit', unit_price: '', discount_percent: '0', rental_duration_days: '', rental_rate_period: '', notes: '' })
      setErr(null)
    }
  }, [isOpen])

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.description.trim()) { setErr('Description is required.'); return }
    if (!form.unit_price) { setErr('Unit price is required.'); return }
    setSaving(true)
    setErr(null)
    try {
      await addItem(quotationId, {
        item_type: form.item_type as ItemType,
        description: form.description.trim(),
        quantity: Number(form.quantity) || 1,
        unit: form.unit,
        unit_price: Number(form.unit_price),
        discount_percent: Number(form.discount_percent) || 0,
        rental_duration_days: form.rental_duration_days ? Number(form.rental_duration_days) : undefined,
        rental_rate_period: form.rental_rate_period || undefined,
        notes: form.notes.trim() || undefined,
      })
      toast.success('Item added.')
      onClose()
      onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? 'Failed to add item.')
    } finally {
      setSaving(false)
    }
  }

  const isRental = form.item_type === 'forklift_rental'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Line Item" width={560}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}

        <div className="form-row-2">
          <div className="form-group">
            <label>Item Type <span className="required">*</span></label>
            <select value={form.item_type} onChange={(e) => set('item_type', e.target.value)}>
              {ITEM_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input value={form.unit} onChange={(e) => set('unit', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label>Description <span className="required">*</span></label>
          <input value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Item description" required />
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" value={form.quantity} onChange={(e) => set('quantity', e.target.value)} min="0.01" step="any" />
          </div>
          <div className="form-group">
            <label>Unit Price <span className="required">*</span></label>
            <input type="number" value={form.unit_price} onChange={(e) => set('unit_price', e.target.value)} min="0" step="any" required />
          </div>
        </div>

        <div className="form-group">
          <label>Discount (%)</label>
          <input type="number" value={form.discount_percent} onChange={(e) => set('discount_percent', e.target.value)} min="0" max="100" step="0.1" />
        </div>

        {isRental && (
          <div className="form-row-2">
            <div className="form-group">
              <label>Rental Duration (days)</label>
              <input type="number" value={form.rental_duration_days} onChange={(e) => set('rental_duration_days', e.target.value)} min="1" />
            </div>
            <div className="form-group">
              <label>Rate Period</label>
              <select value={form.rental_rate_period} onChange={(e) => set('rental_rate_period', e.target.value)}>
                <option value="">— Select —</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Notes</label>
          <input value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Optional" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Adding...' : 'Add Item'}</button>
        </div>
      </form>
    </Modal>
  )
}
