import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
import PrintButton from '@/components/ui/PrintButton'
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
  const { t } = useTranslation()
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
      setError(t('rental.detail.notFoundError'))
    } finally {
      setIsLoading(false)
    }
  }, [id, t])

  useEffect(() => { load() }, [load])

  const doAction = async (label: string, fn: () => Promise<unknown>) => {
    setAL(true)
    try {
      await fn()
      toast.success(label)
      await load()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? t('rental.detail.actionFailed', { action: label }))
    } finally {
      setAL(false)
    }
  }

  const handleDeleteItem = async (itemId: number) => {
    if (!ct) return
    await doAction(t('rental.detail.toasts.itemRemoved'), () => deleteContractItem(ct.id, itemId))
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
          <ChevronLeft size={16} /> {t('rental.detail.backToContracts')}
        </button>
        <div className="page-error" style={{ marginTop: 24 }}>
          <AlertCircle size={16} /> {error ?? t('rental.detail.notFoundError')}
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
        <ChevronLeft size={16} /> {t('rental.detail.backToContracts')}
      </button>

      {/* Header */}
      <div className="detail-header">
        <div>
          <div className="detail-title-row">
            <h1 className="detail-name">{ct.contract_number}</h1>
            <span className="detail-rev">{t('rental.detail.rev', { number: ct.revision_number })}</span>
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
          <PrintButton />
          {actions.includes('submit') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('rental.detail.toasts.submitted'), () => submitContract(ct.id))}>
              <Send size={14} /> {t('rental.detail.submit')}
            </button>
          )}
          {actions.includes('approve') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('common.approved'), () => approveContract(ct.id))}>
              <Check size={14} /> {t('rental.detail.approve')}
            </button>
          )}
          {actions.includes('reject') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction(t('rental.detail.toasts.revisionRequested'), () => rejectContract(ct.id, t('rental.detail.reasons.revisionNeeded')))}>
              <RotateCcw size={14} /> {t('rental.detail.requestRevision')}
            </button>
          )}
          {actions.includes('activate') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('rental.detail.toasts.activated'), () => activateContract(ct.id))}>
              <Check size={14} /> {t('rental.detail.activate')}
            </button>
          )}
          {actions.includes('request_return') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => setRFO(true)}>
              <Truck size={14} /> {t('rental.detail.requestReturn')}
            </button>
          )}
          {actions.includes('request_extension') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => setEFO(true)}>
              <CalendarPlus size={14} /> {t('rental.detail.requestExtension')}
            </button>
          )}
          {actions.includes('complete_inspection') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => toast.info(t('rental.detail.inspectionInfo'))}>
              <ShieldAlert size={14} /> {t('rental.detail.completeInspection')}
            </button>
          )}
          {actions.includes('generate_billing') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => toast.info(t('rental.detail.billingInfo'))}>
              <DollarSign size={14} /> {t('rental.detail.generateBilling')}
            </button>
          )}
          {actions.includes('cancel') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction(t('common.cancelled'), () => cancelContract(ct.id, t('rental.detail.reasons.cancelledByUser')))}>
              <X size={14} /> {t('common.cancel')}
            </button>
          )}
          {actions.includes('close') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('rental.detail.toasts.contractClosed'), () => closeContract(ct.id))}>
              <Check size={14} /> {t('rental.detail.closeContract')}
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="detail-summary-grid">
        {[
          { label: t('common.subtotal'), value: fmtAmount(ct.subtotal) },
          { label: t('rental.detail.taxWithRate', { rate: ct.tax_rate }), value: fmtAmount(ct.tax_amount) },
          { label: t('rental.detail.discount'), value: fmtAmount(ct.discount_amount) },
          { label: t('common.total'), value: `${fmtAmount(ct.total_value)} ${ct.currency}` },
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
            { label: t('rental.detail.totalBilled'), value: fmtAmount(bs.total_billed) },
            { label: t('rental.detail.totalPaid'), value: fmtAmount(bs.total_paid) },
            { label: t('rental.detail.outstanding'), value: fmtAmount(bs.total_outstanding) },
            { label: t('rental.status.overdue'), value: fmtAmount(bs.total_overdue) },
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
            <dt>{t('rental.detail.customer')}</dt>
            <dd>
              {ct.customer.first_name} {ct.customer.last_name}
              {ct.customer.company ? ` (${ct.customer.company})` : ''}
            </dd>
            {ct.delivery_contact_name && (<><dt>{t('rental.detail.deliveryContact')}</dt><dd>{ct.delivery_contact_name}</dd></>)}
            {ct.delivery_contact_phone && (<><dt>{t('rental.detail.deliveryPhone')}</dt><dd>{ct.delivery_contact_phone}</dd></>)}
            {ct.assigned_user && (<><dt>{t('rental.detail.assignedTo')}</dt><dd>{ct.assigned_user.full_name ?? ct.assigned_user.username}</dd></>)}
            {ct.delivery_address && (<><dt>{t('rental.form.deliveryAddress')}</dt><dd>{ct.delivery_address}</dd></>)}
            {ct.approved_by_user && (<><dt>{t('rental.detail.approvedBy')}</dt><dd>{ct.approved_by_user.full_name ?? ct.approved_by_user.username}</dd></>)}
          </dl>
        </div>
        <div>
          <dl className="detail-meta">
            <dt>{t('rental.form.startDate')}</dt><dd>{fmtDate(ct.start_date)}</dd>
            <dt>{t('rental.form.endDate')}</dt><dd>{fmtDate(ct.end_date)}</dd>
            {ct.actual_start_date && (<><dt>{t('rental.detail.actualStart')}</dt><dd>{fmtDate(ct.actual_start_date)}</dd></>)}
            {ct.actual_end_date && (<><dt>{t('rental.detail.actualEnd')}</dt><dd>{fmtDate(ct.actual_end_date)}</dd></>)}
            <dt>{t('rental.detail.deposit')}</dt>
            <dd>{fmtAmount(ct.deposit_amount)} {ct.currency} ({ct.deposit_status})</dd>
            <dt>{t('rental.detail.paymentTerms')}</dt><dd>{t('rental.detail.daysCount', { count: ct.payment_terms_days })}</dd>
            <dt>{t('common.createdAt')}</dt><dd>{fmtDate(ct.created_at)}</dd>
          </dl>
        </div>
      </div>

      {ct.notes && (
        <div className="detail-description" style={{ marginTop: 16 }}>
          <div className="detail-section-title">{t('common.notes')}</div>
          <p>{ct.notes}</p>
        </div>
      )}

      {ct.internal_notes && (
        <div className="detail-internal-note">
          <strong>{t('rental.detail.internalNote')}</strong>
          <p>{ct.internal_notes}</p>
        </div>
      )}

      {/* Line Items */}
      <div className="detail-specs-section" style={{ marginTop: 24 }}>
        <div className="detail-section-bar">
          <h2 className="detail-section-title">{t('rental.detail.lineItems', { count: ct.items.length })}</h2>
          {isEditable && (
            <button className="btn btn-primary btn-sm" onClick={() => setIFO(true)}>
              <Plus size={13} /> {t('rental.detail.addItem')}
            </button>
          )}
        </div>

        {ct.items.length > 0 ? (
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('rental.detail.colNumber')}</th>
                  <th>{t('common.description')}</th>
                  <th>{t('common.status')}</th>
                  <th className="col-hide-sm">{t('rental.detail.colMonthlyRate')}</th>
                  <th className="col-hide-sm">{t('rental.detail.colDailyRate')}</th>
                  <th>{t('rental.detail.colLineTotal')}</th>
                  {isEditable && <th style={{ width: 40 }}></th>}
                </tr>
              </thead>
              <tbody>
                {ct.items.map((item) => (
                  <tr key={item.id}>
                    <td className="cell-muted">{item.line_number}</td>
                    <td>
                      <div className="cell-desc">{item.description}</div>
                      {item.forklift && <div className="cell-muted cell-sub">{t('rental.detail.serialNumber', { serial: item.forklift.serial_number })}</div>}
                      {item.hours_used != null && <div className="cell-muted cell-sub">{t('rental.detail.hoursUsed', { count: item.hours_used })}</div>}
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
            {t('rental.detail.noLineItems')} {isEditable && t('rental.detail.addItemsHint')}
          </div>
        )}
      </div>

      {/* Extensions */}
      {ct.recent_extensions.length > 0 && (
        <div className="detail-specs-section">
          <div className="detail-section-bar">
            <h2 className="detail-section-title">{t('rental.detail.extensions', { count: ct.recent_extensions.length })}</h2>
          </div>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('rental.detail.colNumber')}</th>
                  <th>{t('rental.detail.colOriginalEnd')}</th>
                  <th>{t('rental.detail.colNewEnd')}</th>
                  <th>{t('common.status')}</th>
                  <th className="col-hide-sm">{t('rental.detail.colReason')}</th>
                  <th className="col-hide-sm">{t('common.actions')}</th>
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
                            onClick={() => doAction(t('rental.detail.toasts.extensionApproved'), () => approveExtension(ct.id, ext.id))}>
                            {t('rental.detail.approve')}
                          </button>
                          <button className="btn btn-secondary btn-sm" disabled={actionLoading}
                            onClick={() => doAction(t('rental.detail.toasts.extensionRejected'), () => rejectExtension(ct.id, ext.id, t('rental.detail.reasons.rejected')))}>
                            {t('common.rejected')}
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
          <h2 className="detail-section-title">{t('rental.detail.activeReturns', { count: ct.active_returns.length })}</h2>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('rental.detail.colReturnNumber')}</th>
                  <th>{t('common.type')}</th>
                  <th>{t('common.status')}</th>
                  <th className="col-hide-sm">{t('rental.detail.colRequested')}</th>
                  <th className="col-hide-sm">{t('rental.detail.colScheduledPickup')}</th>
                  <th className="col-hide-sm">{t('rental.detail.colForklift')}</th>
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
            <Clock size={16} /> {t('rental.detail.statusHistory')}
          </h2>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('common.date')}</th>
                  <th>{t('rental.detail.colFrom')}</th>
                  <th>{t('rental.detail.colTo')}</th>
                  <th className="col-hide-sm">{t('rental.detail.colReason')}</th>
                  <th className="col-hide-sm">{t('rental.detail.colBy')}</th>
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
  const { t } = useTranslation()
  const [form, setForm] = useState({ forklift_id: '', description: '', monthly_rate: '', daily_rate: '', hourly_rate: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => { if (isOpen) { setForm({ forklift_id: '', description: '', monthly_rate: '', daily_rate: '', hourly_rate: '', notes: '' }); setErr(null) } }, [isOpen])

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.forklift_id) { setErr(t('rental.detail.addItemModal.forkliftIdRequired')); return }
    if (!form.description.trim()) { setErr(t('rental.detail.addItemModal.descriptionRequired')); return }
    if (!form.monthly_rate) { setErr(t('rental.detail.addItemModal.monthlyRateRequired')); return }
    if (!form.daily_rate) { setErr(t('rental.detail.addItemModal.dailyRateRequired')); return }
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
      toast.success(t('rental.detail.addItemModal.itemAdded'))
      onClose(); onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('rental.detail.addItemModal.addFailed'))
    } finally { setSaving(false) }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('rental.detail.addItemModal.title')} width={560}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}
        <div className="form-row-2">
          <div className="form-group">
            <label>{t('rental.detail.addItemModal.forkliftId')} <span className="required">*</span></label>
            <input type="number" value={form.forklift_id} onChange={(e) => set('forklift_id', e.target.value)} required />
          </div>
          <div className="form-group">
            <label>{t('rental.detail.addItemModal.hourlyRate')}</label>
            <input type="number" value={form.hourly_rate} onChange={(e) => set('hourly_rate', e.target.value)} min="0" step="any" placeholder={t('common.optional')} />
          </div>
        </div>
        <div className="form-group">
          <label>{t('common.description')} <span className="required">*</span></label>
          <input value={form.description} onChange={(e) => set('description', e.target.value)} required />
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label>{t('rental.detail.addItemModal.monthlyRate')} <span className="required">*</span></label>
            <input type="number" value={form.monthly_rate} onChange={(e) => set('monthly_rate', e.target.value)} min="0" step="any" required />
          </div>
          <div className="form-group">
            <label>{t('rental.detail.addItemModal.dailyRate')} <span className="required">*</span></label>
            <input type="number" value={form.daily_rate} onChange={(e) => set('daily_rate', e.target.value)} min="0" step="any" required />
          </div>
        </div>
        <div className="form-group">
          <label>{t('common.notes')}</label>
          <input value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder={t('common.optional')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>{t('common.cancel')}</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? t('rental.detail.addItemModal.adding') : t('rental.detail.addItem')}</button>
        </div>
      </form>
    </Modal>
  )
}


// ── Extension Request Modal ─────────────────────────────────────────────────

function ExtensionModal({ isOpen, onClose, contractId, currentEndDate, onSuccess }: {
  isOpen: boolean; onClose: () => void; contractId: number; currentEndDate: string; onSuccess: () => void
}) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ new_end_date: '', rate_adjustment_pct: '0', reason: '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => { if (isOpen) { setForm({ new_end_date: '', rate_adjustment_pct: '0', reason: '' }); setErr(null) } }, [isOpen])

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.new_end_date) { setErr(t('rental.detail.extensionModal.newEndDateRequired')); return }
    if (form.new_end_date <= currentEndDate) { setErr(t('rental.detail.extensionModal.newEndDateAfterCurrent')); return }
    setSaving(true); setErr(null)
    try {
      await createExtension(contractId, {
        new_end_date: form.new_end_date,
        rate_adjustment_pct: Number(form.rate_adjustment_pct) || 0,
        reason: form.reason.trim() || undefined,
      })
      toast.success(t('rental.detail.extensionModal.extensionRequested'))
      onClose(); onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('rental.detail.extensionModal.requestFailed'))
    } finally { setSaving(false) }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('rental.detail.extensionModal.title')} width={480}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}
        <div className="form-group">
          <label>{t('rental.detail.extensionModal.currentEndDate')}</label>
          <input value={fmtDate(currentEndDate)} disabled />
        </div>
        <div className="form-row-2">
          <div className="form-group">
            <label>{t('rental.detail.extensionModal.newEndDate')} <span className="required">*</span></label>
            <input type="date" value={form.new_end_date} onChange={(e) => set('new_end_date', e.target.value)} min={currentEndDate} required />
          </div>
          <div className="form-group">
            <label>{t('rental.detail.extensionModal.rateAdjustment')}</label>
            <input type="number" value={form.rate_adjustment_pct} onChange={(e) => set('rate_adjustment_pct', e.target.value)} step="0.1" />
          </div>
        </div>
        <div className="form-group">
          <label>{t('rental.detail.extensionModal.reason')}</label>
          <textarea value={form.reason} onChange={(e) => set('reason', e.target.value)} rows={2} placeholder={t('rental.detail.extensionModal.reasonPlaceholder')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>{t('common.cancel')}</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? t('rental.detail.extensionModal.requesting') : t('rental.detail.extensionModal.requestExtension')}</button>
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
  const { t } = useTranslation()
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
    if (!form.requested_date) { setErr(t('rental.detail.returnModal.requestedDateRequired')); return }
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
      toast.success(t('rental.detail.returnModal.returnRequested'))
      onClose(); onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('rental.detail.returnModal.requestFailed'))
    } finally { setSaving(false) }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('rental.detail.returnModal.title')} width={560}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}
        <div className="form-row-2">
          <div className="form-group">
            <label>{t('rental.detail.returnModal.returnType')} <span className="required">*</span></label>
            <select value={form.return_type} onChange={(e) => set('return_type', e.target.value)}>
              <option value="scheduled">{t('rental.detail.returnModal.scheduled')}</option>
              <option value="early">{t('rental.detail.returnModal.early')}</option>
              <option value="overdue">{t('rental.status.overdue')}</option>
            </select>
          </div>
          <div className="form-group">
            <label>{t('rental.detail.returnModal.requestedDate')} <span className="required">*</span></label>
            <input type="date" value={form.requested_date} onChange={(e) => set('requested_date', e.target.value)} required />
          </div>
        </div>
        {activeItems.length > 0 && (
          <div className="form-group">
            <label>{t('rental.detail.returnModal.equipmentToReturn')}</label>
            <select value={form.contract_item_id} onChange={(e) => handleItemChange(e.target.value)}>
              <option value="">{t('rental.detail.returnModal.allEquipment')}</option>
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
            <label>{t('rental.detail.returnModal.scheduledPickupDate')}</label>
            <input type="date" value={form.scheduled_pickup_date} onChange={(e) => set('scheduled_pickup_date', e.target.value)} />
          </div>
          <div className="form-group">
            <label>{t('rental.detail.returnModal.pickupAddress')}</label>
            <input value={form.pickup_address} onChange={(e) => set('pickup_address', e.target.value)} placeholder={t('rental.detail.returnModal.pickupAddressPlaceholder')} />
          </div>
        </div>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={form.is_early_termination} onChange={(e) => set('is_early_termination', e.target.checked)} />
            {t('rental.detail.returnModal.earlyTermination')}
          </label>
        </div>
        <div className="form-group">
          <label>{t('common.notes')}</label>
          <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} placeholder={t('rental.detail.returnModal.notesPlaceholder')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>{t('common.cancel')}</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? t('rental.detail.returnModal.requesting') : t('rental.detail.returnModal.requestReturn')}</button>
        </div>
      </form>
    </Modal>
  )
}
