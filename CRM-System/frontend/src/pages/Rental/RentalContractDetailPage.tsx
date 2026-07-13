import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft, AlertCircle, Plus, Trash2, Send, Check,
  X, RotateCcw, Clock, DollarSign, CalendarPlus,
  Truck, ShieldAlert,
} from 'lucide-react'
import {
  getRentalContract, addContractItem, deleteContractItem,
  submitContract, approveContract, rejectContract,
  activateContract, cancelContract, closeContract,
  createExtension, approveExtension, rejectExtension,
  createReturn,
} from '@/api/rental'
import { RentalStatusBadge, RentalContractTypeBadge } from '@/components/rental/RentalStatusBadge'
import Modal from '@/components/ui/Modal'
import { toast } from '@/store/toastStore'
import type { RentalContractDetail, ReturnType } from '@/types/rental'
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

export default function RentalContractDetailPage() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [ct, setCt]               = useState<RentalContractDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)
  const [actionLoading, setAL]    = useState(false)
  const [itemFormOpen, setIFO]    = useState(false)
  const [extFormOpen, setEFO]     = useState(false)
  const [retFormOpen, setRFO]     = useState(false)

  const load = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getRentalContract(Number(id))
      setCt(data)
    } catch {
      setError('Rental contract not found or failed to load.')
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
    if (!ct) return
    await doAction('Item removed', () => deleteContractItem(ct.id, itemId))
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

  if (error || !ct) {
    return (
      <div className="product-detail">
        <button className="detail-back" onClick={() => navigate('/rental-contracts')}>
          <ChevronLeft size={16} /> Back to Rental Contracts
        </button>
        <div className="page-error" style={{ marginTop: 24 }}>
          <AlertCircle size={16} /> {error ?? 'Rental contract not found.'}
        </div>
      </div>
    )
  }

  const actions = ct.available_actions
  const isEditable = ct.status === 'draft' || ct.status === 'reservation'
  const bs = ct.billing_summary

  return (
    <div className="product-detail">
      <button className="detail-back" onClick={() => navigate('/rental-contracts')}>
        <ChevronLeft size={16} /> Back to Rental Contracts
      </button>

      {/* Header */}
      <div className="detail-header">
        <div>
          <div className="detail-title-row">
            <h1 className="detail-name">{ct.contract_number}</h1>
            <span className="detail-rev">Rev {ct.revision_number}</span>
          </div>
          <div className="detail-subtitle">
            {ct.customer.first_name} {ct.customer.last_name}
            {ct.customer.company ? ` (${ct.customer.company})` : ''}
          </div>
          <div className="detail-badges">
            <RentalStatusBadge status={ct.status} />
            <RentalContractTypeBadge type={ct.contract_type} />
          </div>
        </div>

        <div className="detail-actions">
          {actions.includes('submit') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Submitted for approval', () => submitContract(ct.id))}>
              <Send size={14} /> Submit
            </button>
          )}
          {actions.includes('approve') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Approved', () => approveContract(ct.id))}>
              <Check size={14} /> Approve
            </button>
          )}
          {actions.includes('reject') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction('Revision requested', () => rejectContract(ct.id, 'Revision needed'))}>
              <RotateCcw size={14} /> Request Revision
            </button>
          )}
          {actions.includes('activate') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Activated', () => activateContract(ct.id))}>
              <Check size={14} /> Activate
            </button>
          )}
          {actions.includes('request_return') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => setRFO(true)}>
              <Truck size={14} /> Request Return
            </button>
          )}
          {actions.includes('request_extension') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => setEFO(true)}>
              <CalendarPlus size={14} /> Request Extension
            </button>
          )}
          {actions.includes('complete_inspection') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => toast.info('Inspection completion — use Return panel below.')}>
              <ShieldAlert size={14} /> Complete Inspection
            </button>
          )}
          {actions.includes('generate_billing') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => toast.info('Billing generation — coming in Phase 4.')}>
              <DollarSign size={14} /> Generate Billing
            </button>
          )}
          {actions.includes('cancel') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction('Cancelled', () => cancelContract(ct.id, 'Cancelled by user'))}>
              <X size={14} /> Cancel
            </button>
          )}
          {actions.includes('close') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Contract closed', () => closeContract(ct.id))}>
              <Check size={14} /> Close Contract
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="detail-summary-grid">
        {[
          { label: 'Subtotal', value: fmtAmount(ct.subtotal) },
          { label: `Tax (${ct.tax_rate}%)`, value: fmtAmount(ct.tax_amount) },
          { label: 'Discount', value: fmtAmount(ct.discount_amount) },
          { label: 'Total', value: `${fmtAmount(ct.total_value)} ${ct.currency}` },
        ].map((c) => (
          <div key={c.label} className="detail-summary-card">
            <div className="detail-summary-label">{c.label}</div>
            <div className="detail-summary-value">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Billing Summary */}
      {bs && bs.event_count > 0 && (
        <div className="detail-summary-grid" style={{ marginTop: 8 }}>
          {[
            { label: 'Total Billed', value: fmtAmount(bs.total_billed) },
            { label: 'Total Paid', value: fmtAmount(bs.total_paid) },
            { label: 'Outstanding', value: fmtAmount(bs.total_outstanding) },
            { label: 'Overdue', value: fmtAmount(bs.total_overdue) },
          ].map((c) => (
            <div key={c.label} className="detail-summary-card">
              <div className="detail-summary-label">{c.label}</div>
              <div className="detail-summary-value">{c.value} {bs.currency}</div>
            </div>
          ))}
        </div>
      )}

      {/* Details */}
      <div className="detail-info-grid">
        <div>
          <dl className="detail-meta">
            <dt>Customer</dt>
            <dd>
              {ct.customer.first_name} {ct.customer.last_name}
              {ct.customer.company ? ` (${ct.customer.company})` : ''}
            </dd>
            {ct.delivery_contact_name && (<><dt>Delivery Contact</dt><dd>{ct.delivery_contact_name}</dd></>)}
            {ct.delivery_contact_phone && (<><dt>Delivery Phone</dt><dd>{ct.delivery_contact_phone}</dd></>)}
            {ct.assigned_user && (<><dt>Assigned To</dt><dd>{ct.assigned_user.full_name ?? ct.assigned_user.username}</dd></>)}
            {ct.delivery_address && (<><dt>Delivery Address</dt><dd>{ct.delivery_address}</dd></>)}
            {ct.approved_by_user && (<><dt>Approved By</dt><dd>{ct.approved_by_user.full_name ?? ct.approved_by_user.username}</dd></>)}
          </dl>
        </div>
        <div>
          <dl className="detail-meta">
            <dt>Start Date</dt><dd>{fmtDate(ct.start_date)}</dd>
            <dt>End Date</dt><dd>{fmtDate(ct.end_date)}</dd>
            {ct.actual_start_date && (<><dt>Actual Start</dt><dd>{fmtDate(ct.actual_start_date)}</dd></>)}
            {ct.actual_end_date && (<><dt>Actual End</dt><dd>{fmtDate(ct.actual_end_date)}</dd></>)}
            <dt>Deposit</dt>
            <dd>{fmtAmount(ct.deposit_amount)} {ct.currency} ({ct.deposit_status})</dd>
            <dt>Payment Terms</dt><dd>{ct.payment_terms_days} days</dd>
            <dt>Created</dt><dd>{fmtDate(ct.created_at)}</dd>
          </dl>
        </div>
      </div>

      {ct.notes && (
        <div className="detail-description" style={{ marginTop: 16 }}>
          <div className="detail-section-title">Notes</div>
          <p>{ct.notes}</p>
        </div>
      )}

      {ct.internal_notes && (
        <div className="detail-internal-note">
          <strong>Internal Note</strong>
          <p>{ct.internal_notes}</p>
        </div>
      )}

      {/* Line Items */}
      <div className="detail-specs-section" style={{ marginTop: 24 }}>
        <div className="detail-section-bar">
          <h2 className="detail-section-title">Line Items ({ct.items.length})</h2>
          {isEditable && (
            <button className="btn btn-primary btn-sm" onClick={() => setIFO(true)}>
              <Plus size={13} /> Add Item
            </button>
          )}
        </div>

        {ct.items.length > 0 ? (
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th className="col-hide-sm">Monthly Rate</th>
                  <th className="col-hide-sm">Daily Rate</th>
                  <th>Line Total</th>
                  {isEditable && <th style={{ width: 40 }}></th>}
                </tr>
              </thead>
              <tbody>
                {ct.items.map((item) => (
                  <tr key={item.id}>
                    <td className="cell-muted">{item.line_number}</td>
                    <td>
                      <div className="cell-desc">{item.description}</div>
                      {item.forklift && <div className="cell-muted cell-sub">S/N: {item.forklift.serial_number}</div>}
                      {item.hours_used != null && <div className="cell-muted cell-sub">Hours: {item.hours_used}</div>}
                    </td>
                    <td className="cell-muted cell-type">{item.line_status.replace(/_/g, ' ')}</td>
                    <td className="cell-muted col-hide-sm cell-mono">{fmtAmount(item.monthly_rate)}</td>
                    <td className="cell-muted col-hide-sm cell-mono">{fmtAmount(item.daily_rate)}</td>
                    <td className="cell-mono cell-total">{fmtAmount(item.line_total)}</td>
                    {isEditable && (
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
            No line items yet. {isEditable && 'Add items to build the contract.'}
          </div>
        )}
      </div>

      {/* Extensions */}
      {ct.recent_extensions.length > 0 && (
        <div className="detail-specs-section">
          <div className="detail-section-bar">
            <h2 className="detail-section-title">Extensions ({ct.recent_extensions.length})</h2>
          </div>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Original End</th>
                  <th>New End</th>
                  <th>Status</th>
                  <th className="col-hide-sm">Reason</th>
                  <th className="col-hide-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ct.recent_extensions.map((ext) => (
                  <tr key={ext.id}>
                    <td className="cell-muted">{ext.extension_number}</td>
                    <td className="cell-muted">{fmtDate(ext.original_end_date)}</td>
                    <td className="cell-muted">{fmtDate(ext.new_end_date)}</td>
                    <td>
                      <span className={ext.status === 'approved' ? 'decision-approved' : ext.status === 'rejected' ? 'decision-rejected' : 'cell-type'}>
                        {ext.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="cell-muted col-hide-sm">{ext.reason ?? '—'}</td>
                    <td className="col-hide-sm">
                      {ext.status === 'pending' && actions.includes('approve') && (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-primary btn-sm" disabled={actionLoading}
                            onClick={() => doAction('Extension approved', () => approveExtension(ct.id, ext.id))}>
                            Approve
                          </button>
                          <button className="btn btn-secondary btn-sm" disabled={actionLoading}
                            onClick={() => doAction('Extension rejected', () => rejectExtension(ct.id, ext.id, 'Rejected'))}>
                            Reject
                          </button>
                        </div>
                      )}
                      {ext.status !== 'pending' && '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Active Returns */}
      {ct.active_returns.length > 0 && (
        <div className="detail-specs-section">
          <h2 className="detail-section-title">Active Returns ({ct.active_returns.length})</h2>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Return #</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th className="col-hide-sm">Requested</th>
                  <th className="col-hide-sm">Scheduled Pickup</th>
                  <th className="col-hide-sm">Forklift</th>
                </tr>
              </thead>
              <tbody>
                {ct.active_returns.map((ret) => (
                  <tr key={ret.id}>
                    <td className="cell-desc">{ret.return_number}</td>
                    <td className="cell-muted cell-type">{ret.return_type.replace(/_/g, ' ')}</td>
                    <td className="cell-muted cell-type">{ret.status.replace(/_/g, ' ')}</td>
                    <td className="cell-muted col-hide-sm">{fmtDate(ret.requested_date)}</td>
                    <td className="cell-muted col-hide-sm">{fmtDate(ret.scheduled_pickup_date)}</td>
                    <td className="cell-muted col-hide-sm">{ret.forklift ? ret.forklift.serial_number : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Status History */}
      {ct.recent_status_history.length > 0 && (
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
                {ct.recent_status_history.map((h) => (
                  <tr key={h.id}>
                    <td className="cell-muted">{fmtDateTime(h.changed_at)}</td>
                    <td>{h.from_status ? <RentalStatusBadge status={h.from_status} /> : '—'}</td>
                    <td><RentalStatusBadge status={h.to_status} /></td>
                    <td className="cell-muted col-hide-sm">{h.reason ?? '—'}</td>
                    <td className="cell-muted col-hide-sm">{h.user?.full_name ?? h.user?.username ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddItemModal isOpen={itemFormOpen} onClose={() => setIFO(false)} contractId={ct.id} onSuccess={load} />
      <ExtensionModal isOpen={extFormOpen} onClose={() => setEFO(false)} contractId={ct.id} currentEndDate={ct.end_date} onSuccess={load} />
      <ReturnModal isOpen={retFormOpen} onClose={() => setRFO(false)} contractId={ct.id} items={ct.items} onSuccess={load} />
    </div>
  )
}


// ── Add Item Modal ──────────────────────────────────────────────────────────

function AddItemModal({ isOpen, onClose, contractId, onSuccess }: {
  isOpen: boolean; onClose: () => void; contractId: number; onSuccess: () => void
}) {
  const [form, setForm] = useState({ forklift_id: '', description: '', monthly_rate: '', daily_rate: '', hourly_rate: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => { if (isOpen) { setForm({ forklift_id: '', description: '', monthly_rate: '', daily_rate: '', hourly_rate: '', notes: '' }); setErr(null) } }, [isOpen])

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.forklift_id) { setErr('Forklift ID is required.'); return }
    if (!form.description.trim()) { setErr('Description is required.'); return }
    if (!form.monthly_rate) { setErr('Monthly rate is required.'); return }
    if (!form.daily_rate) { setErr('Daily rate is required.'); return }
    setSaving(true); setErr(null)
    try {
      await addContractItem(contractId, {
        forklift_id: Number(form.forklift_id),
        description: form.description.trim(),
        monthly_rate: Number(form.monthly_rate),
        daily_rate: Number(form.daily_rate),
        hourly_rate: form.hourly_rate ? Number(form.hourly_rate) : undefined,
        notes: form.notes.trim() || undefined,
      })
      toast.success('Item added.')
      onClose(); onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? 'Failed to add item.')
    } finally { setSaving(false) }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Contract Item" width={560}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}
        <div className="form-row-2">
          <div className="form-group">
            <label>Forklift ID <span className="required">*</span></label>
            <input type="number" value={form.forklift_id} onChange={(e) => set('forklift_id', e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Hourly Rate</label>
            <input type="number" value={form.hourly_rate} onChange={(e) => set('hourly_rate', e.target.value)} min="0" step="any" placeholder="Optional" />
          </div>
        </div>
        <div className="form-group">
          <label>Description <span className="required">*</span></label>
          <input value={form.description} onChange={(e) => set('description', e.target.value)} required />
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label>Monthly Rate <span className="required">*</span></label>
            <input type="number" value={form.monthly_rate} onChange={(e) => set('monthly_rate', e.target.value)} min="0" step="any" required />
          </div>
          <div className="form-group">
            <label>Daily Rate <span className="required">*</span></label>
            <input type="number" value={form.daily_rate} onChange={(e) => set('daily_rate', e.target.value)} min="0" step="any" required />
          </div>
        </div>
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


// ── Extension Request Modal ─────────────────────────────────────────────────

function ExtensionModal({ isOpen, onClose, contractId, currentEndDate, onSuccess }: {
  isOpen: boolean; onClose: () => void; contractId: number; currentEndDate: string; onSuccess: () => void
}) {
  const [form, setForm] = useState({ new_end_date: '', rate_adjustment_pct: '0', reason: '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => { if (isOpen) { setForm({ new_end_date: '', rate_adjustment_pct: '0', reason: '' }); setErr(null) } }, [isOpen])

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.new_end_date) { setErr('New end date is required.'); return }
    if (form.new_end_date <= currentEndDate) { setErr('New end date must be after current end date.'); return }
    setSaving(true); setErr(null)
    try {
      await createExtension(contractId, {
        new_end_date: form.new_end_date,
        rate_adjustment_pct: Number(form.rate_adjustment_pct) || 0,
        reason: form.reason.trim() || undefined,
      })
      toast.success('Extension requested.')
      onClose(); onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? 'Failed to request extension.')
    } finally { setSaving(false) }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Contract Extension" width={480}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}
        <div className="form-group">
          <label>Current End Date</label>
          <input value={fmtDate(currentEndDate)} disabled />
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label>New End Date <span className="required">*</span></label>
            <input type="date" value={form.new_end_date} onChange={(e) => set('new_end_date', e.target.value)} min={currentEndDate} required />
          </div>
          <div className="form-group">
            <label>Rate Adjustment (%)</label>
            <input type="number" value={form.rate_adjustment_pct} onChange={(e) => set('rate_adjustment_pct', e.target.value)} step="0.1" />
          </div>
        </div>
        <div className="form-group">
          <label>Reason</label>
          <textarea value={form.reason} onChange={(e) => set('reason', e.target.value)} rows={2} placeholder="Reason for extension request..." />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Requesting...' : 'Request Extension'}</button>
        </div>
      </form>
    </Modal>
  )
}


// ── Return Request Modal ────────────────────────────────────────────────────

function ReturnModal({ isOpen, onClose, contractId, items, onSuccess }: {
  isOpen: boolean; onClose: () => void; contractId: number
  items: { id: number; forklift: { id: number; serial_number: string } | null; description: string }[]
  onSuccess: () => void
}) {
  const [form, setForm] = useState({ return_type: 'scheduled' as string, requested_date: '', contract_item_id: '', forklift_id: '', pickup_address: '', scheduled_pickup_date: '', is_early_termination: false, notes: '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().slice(0, 10)
      setForm({ return_type: 'scheduled', requested_date: today, contract_item_id: '', forklift_id: '', pickup_address: '', scheduled_pickup_date: '', is_early_termination: false, notes: '' })
      setErr(null)
    }
  }, [isOpen])

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }))

  const activeItems = items.filter((i) => i.forklift && i.forklift.id)

  const handleItemChange = (itemIdStr: string) => {
    set('contract_item_id', itemIdStr)
    const item = items.find((i) => String(i.id) === itemIdStr)
    if (item?.forklift) set('forklift_id', String(item.forklift.id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.requested_date) { setErr('Requested date is required.'); return }
    setSaving(true); setErr(null)
    try {
      await createReturn(contractId, {
        return_type: form.return_type as ReturnType,
        requested_date: form.requested_date,
        contract_item_id: form.contract_item_id ? Number(form.contract_item_id) : undefined,
        forklift_id: form.forklift_id ? Number(form.forklift_id) : undefined,
        pickup_address: form.pickup_address.trim() || undefined,
        scheduled_pickup_date: form.scheduled_pickup_date || undefined,
        is_early_termination: form.is_early_termination,
        notes: form.notes.trim() || undefined,
      })
      toast.success('Return requested.')
      onClose(); onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? 'Failed to create return request.')
    } finally { setSaving(false) }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Equipment Return" width={560}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}
        <div className="form-row-2">
          <div className="form-group">
            <label>Return Type <span className="required">*</span></label>
            <select value={form.return_type} onChange={(e) => set('return_type', e.target.value)}>
              <option value="scheduled">Scheduled</option>
              <option value="early">Early</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className="form-group">
            <label>Requested Date <span className="required">*</span></label>
            <input type="date" value={form.requested_date} onChange={(e) => set('requested_date', e.target.value)} required />
          </div>
        </div>
        {activeItems.length > 0 && (
          <div className="form-group">
            <label>Equipment to Return</label>
            <select value={form.contract_item_id} onChange={(e) => handleItemChange(e.target.value)}>
              <option value="">— All equipment —</option>
              {activeItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.forklift ? `${item.forklift.serial_number} — ` : ''}{item.description}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-row-2">
          <div className="form-group">
            <label>Scheduled Pickup Date</label>
            <input type="date" value={form.scheduled_pickup_date} onChange={(e) => set('scheduled_pickup_date', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Pickup Address</label>
            <input value={form.pickup_address} onChange={(e) => set('pickup_address', e.target.value)} placeholder="Customer site address" />
          </div>
        </div>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={form.is_early_termination} onChange={(e) => set('is_early_termination', e.target.checked)} />
            Early termination (penalty may apply)
          </label>
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} placeholder="Additional instructions..." />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Requesting...' : 'Request Return'}</button>
        </div>
      </form>
    </Modal>
  )
}
