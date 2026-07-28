import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ChevronLeft, AlertCircle, Plus, Trash2, Send, Check,
  X, RotateCcw, FileText, Clock, FileDown,
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
import PrintButton from '@/components/ui/PrintButton'
import DocumentPreview from '@/components/DocumentPreview'
import { toast } from '@/store/toastStore'
import { useCompanyStore } from '@/store/companyStore'
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

export default function QuotationDetailPage() {
  const { t } = useTranslation()
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [qt, setQt]               = useState<QuotationDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError]         = useState<string | null>(null)
  const [actionLoading, setAL]    = useState(false)
  const [itemFormOpen, setIFO]    = useState(false)

  const companyProfile = useCompanyStore((s) => s.profile)
  const fetchCompanyProfile = useCompanyStore((s) => s.fetch)
  useEffect(() => { fetchCompanyProfile() }, [fetchCompanyProfile])

  const load = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getQuotation(Number(id))
      setQt(data)
    } catch {
      setError(t('quotations.detail.notFoundError'))
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
      toast.error(msg ?? t('quotations.detail.actionFailed', { action: label }))
    } finally {
      setAL(false)
    }
  }

  const handleDeleteItem = async (itemId: number) => {
    if (!qt) return
    await doAction(t('quotations.detail.toasts.itemRemoved'), () => deleteItem(qt.id, itemId))
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
          <ChevronLeft size={16} /> {t('quotations.detail.backToQuotations')}
        </button>
        <div className="page-error" style={{ marginTop: 24 }}>
          <AlertCircle size={16} /> {error ?? t('quotations.detail.notFoundError')}
        </div>
      </div>
    )
  }

  const actions = qt.available_actions
  const isDraft = qt.status === 'draft'

  return (
    <div>
    <div className="doc-preview-hide-on-print product-detail">
      <button className="detail-back" onClick={() => navigate('/quotations')}>
        <ChevronLeft size={16} /> {t('quotations.detail.backToQuotations')}
      </button>

      {/* Header */}
      <div className="detail-header">
        <div>
          <div className="detail-title-row">
            <h1 className="detail-name">{qt.quotation_number}</h1>
            <span className="detail-rev">{t('quotations.detail.rev', { number: qt.revision_number })}</span>
          </div>
          <div className="detail-subtitle">{qt.title}</div>
          <div className="detail-badges">
            <QuotationStatusBadge status={qt.status} />
            <QuotationTypeBadge type={qt.quotation_type} />
          </div>
        </div>

        <div className="detail-actions">
          <PrintButton />
          <button className="btn btn-primary" onClick={() => window.print()}>
            <FileDown size={14} /> {t('common.exportPdf')}
          </button>
          {actions.includes('submit') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('quotations.detail.toasts.submitted'), () => submitQuotation(qt.id))}>
              <Send size={14} /> {t('quotations.detail.submit')}
            </button>
          )}
          {actions.includes('approve') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('common.approved'), () => approveQuotation(qt.id))}>
              <Check size={14} /> {t('quotations.detail.approve')}
            </button>
          )}
          {actions.includes('reject') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction(t('quotations.detail.toasts.revisionRequested'), () => rejectQuotation(qt.id, t('quotations.detail.revisionNeededReason')))}>
              <RotateCcw size={14} /> {t('quotations.detail.requestRevision')}
            </button>
          )}
          {actions.includes('send') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('quotations.detail.toasts.sent'), () => sendQuotation(qt.id))}>
              <Send size={14} /> {t('quotations.detail.sendToCustomer')}
            </button>
          )}
          {actions.includes('accept') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('quotations.detail.toasts.markedAccepted'), () => acceptQuotation(qt.id))}>
              <Check size={14} /> {t('quotations.detail.markAccepted')}
            </button>
          )}
          {actions.includes('decline') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction(t('quotations.detail.toasts.markedRejected'), () => declineQuotation(qt.id))}>
              <X size={14} /> {t('quotations.detail.markRejected')}
            </button>
          )}
          {actions.includes('convert') && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction(t('quotations.detail.toasts.converted'), () => convertQuotation(qt.id, qt.quotation_type === 'rental' ? 'rental_contract' : 'sales_order'))}>
              <FileText size={14} /> {t('quotations.detail.convert')}
            </button>
          )}
          {actions.includes('cancel') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction(t('common.cancelled'), () => cancelQuotation(qt.id))}>
              <X size={14} /> {t('common.cancel')}
            </button>
          )}
          {actions.includes('reactivate') && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction(t('quotations.detail.toasts.reactivated'), () => reactivateQuotation(qt.id))}>
              <RotateCcw size={14} /> {t('quotations.detail.reactivate')}
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="detail-summary-grid">
        {[
          { label: t('common.subtotal'), value: fmtAmount(qt.subtotal) },
          { label: t('quotations.detail.taxWithRate', { rate: qt.tax_rate }), value: fmtAmount(qt.tax_amount) },
          { label: t('quotations.detail.discount'), value: fmtAmount(qt.discount_amount) },
          { label: t('common.total'), value: `${fmtAmount(qt.total_amount)} ${qt.currency}` },
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
              <><dt>{t('quotations.detail.customer')}</dt><dd>{qt.customer.first_name} {qt.customer.last_name}{qt.customer.company ? ` (${qt.customer.company})` : ''}</dd></>
            )}
            {qt.contact_name && (<><dt>{t('quotations.detail.contact')}</dt><dd>{qt.contact_name}</dd></>)}
            {qt.contact_email && (<><dt>{t('common.email')}</dt><dd>{qt.contact_email}</dd></>)}
            {qt.contact_phone && (<><dt>{t('common.phone')}</dt><dd>{qt.contact_phone}</dd></>)}
            {qt.assigned_user && (<><dt>{t('quotations.detail.assignedTo')}</dt><dd>{qt.assigned_user.full_name ?? qt.assigned_user.username}</dd></>)}
          </dl>
        </div>
        <div>
          <dl className="detail-meta">
            <dt>{t('quotations.detail.validFrom')}</dt><dd>{fmtDate(qt.valid_from)}</dd>
            <dt>{t('quotations.detail.validUntil')}</dt><dd>{fmtDate(qt.valid_until)}</dd>
            <dt>{t('common.createdAt')}</dt><dd>{fmtDate(qt.created_at)}</dd>
            {qt.converted_to_type && (<><dt>{t('quotations.detail.convertedTo')}</dt><dd className="cell-type">{qt.converted_to_type.replace(/_/g, ' ')}</dd></>)}
          </dl>
        </div>
      </div>

      {qt.notes && (
        <div className="detail-description" style={{ marginTop: 16 }}>
          <div className="detail-section-title">{t('common.notes')}</div>
          <p>{qt.notes}</p>
        </div>
      )}

      {qt.internal_notes && (
        <div className="detail-internal-note">
          <strong>{t('quotations.detail.internalNote')}</strong>
          <p>{qt.internal_notes}</p>
        </div>
      )}

      {/* Line Items */}
      <div className="detail-specs-section" style={{ marginTop: 24 }}>
        <div className="detail-section-bar">
          <h2 className="detail-section-title">{t('quotations.detail.lineItems', { count: qt.items.length })}</h2>
          {isDraft && (
            <button className="btn btn-primary btn-sm" onClick={() => setIFO(true)}>
              <Plus size={13} /> {t('quotations.detail.addItem')}
            </button>
          )}
        </div>

        {qt.items.length > 0 ? (
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('quotations.detail.colNumber')}</th>
                  <th>{t('common.description')}</th>
                  <th>{t('common.type')}</th>
                  <th className="col-hide-sm">{t('common.quantity')}</th>
                  <th className="col-hide-sm">{t('quotations.detail.colUnitPrice')}</th>
                  <th className="col-hide-sm">{t('quotations.detail.colDiscount')}</th>
                  <th>{t('common.total')}</th>
                  {isDraft && <th style={{ width: 40 }}></th>}
                </tr>
              </thead>
              <tbody>
                {qt.items.map((item) => (
                  <tr key={item.id}>
                    <td className="cell-muted">{item.line_number}</td>
                    <td>
                      <div className="cell-desc">{item.description}</div>
                      {item.item_code && <div className="cell-muted cell-sub">{t('quotations.detail.colItemCode')}: {item.item_code}</div>}
                      {item.forklift && <div className="cell-muted cell-sub">{t('quotations.detail.serialNumber', { serial: item.forklift.serial_number })}</div>}
                      {item.product && <div className="cell-muted cell-sub">{t('quotations.detail.sku', { sku: item.product.sku })}</div>}
                      {item.rental_duration_days && <div className="cell-muted cell-sub">{t('quotations.detail.durationDays', { count: item.rental_duration_days, period: item.rental_rate_period })}</div>}
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
            {t('quotations.detail.noLineItems')} {isDraft && t('quotations.detail.addItemsHint')}
          </div>
        )}
      </div>

      {/* Status History */}
      {qt.recent_status_history.length > 0 && (
        <div className="detail-specs-section">
          <h2 className="detail-section-title detail-section-title-row">
            <Clock size={16} /> {t('quotations.detail.statusHistory')}
          </h2>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('common.date')}</th>
                  <th>{t('quotations.detail.colFrom')}</th>
                  <th>{t('quotations.detail.colTo')}</th>
                  <th className="col-hide-sm">{t('quotations.detail.colReason')}</th>
                  <th className="col-hide-sm">{t('quotations.detail.colBy')}</th>
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
          <h2 className="detail-section-title">{t('quotations.detail.approvalHistory')}</h2>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('common.date')}</th>
                  <th>{t('quotations.detail.colRev')}</th>
                  <th>{t('quotations.detail.colDecision')}</th>
                  <th className="col-hide-sm">{t('quotations.detail.colReason')}</th>
                  <th className="col-hide-sm">{t('quotations.detail.colConditions')}</th>
                  <th className="col-hide-sm">{t('quotations.detail.colBy')}</th>
                </tr>
              </thead>
              <tbody>
                {qt.recent_approvals.map((a) => (
                  <tr key={a.id}>
                    <td className="cell-muted">{fmtDateTime(a.decided_at)}</td>
                    <td className="cell-muted">R{a.revision_number}</td>
                    <td>
                      <span className={a.decision === 'approved' ? 'decision-approved' : 'decision-rejected'}>
                        {a.decision === 'approved' ? t('common.approved') : t('common.rejected')}
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

      <div className="doc-preview">
        <DocumentPreview
          docType="quotation"
          documentNumber={qt.quotation_number}
          date={fmtDate(qt.valid_from ?? qt.created_at)}
          companyName={companyProfile?.company_name}
          companyAddress={companyProfile?.address}
          companyPhone={companyProfile?.phone}
          partyLabel={t('documentPreview.customerDetails')}
          partyName={qt.customer ? `${qt.customer.first_name} ${qt.customer.last_name}${qt.customer.company ? ` — ${qt.customer.company}` : ''}` : (qt.contact_name || '—')}
          partyContact={qt.contact_phone ?? qt.contact_email ?? undefined}
          vehicle={{
            make: qt.vehicle_make ?? undefined, model: qt.vehicle_model ?? undefined, vin: qt.vehicle_vin ?? undefined,
            engineNo: qt.vehicle_engine_no ?? undefined, regNo: qt.vehicle_reg_no ?? undefined, jobNumber: qt.job_number ?? undefined,
          }}
          items={qt.items.map((it) => ({
            itemCode: it.item_code ?? undefined, description: it.description, unit: it.unit ?? undefined,
            qty: it.quantity, unitPrice: it.unit_price, total: it.line_total,
          }))}
          subtotal={qt.subtotal}
          taxRate={qt.tax_rate}
          taxAmount={qt.tax_amount}
          grandTotal={qt.total_amount}
          currency={qt.currency}
          showBankDetails
          bankDetailsText={qt.bank_details ?? undefined}
          grandTotalInBaseCurrency={qt.currency !== 'LAK' ? { amount: qt.total_amount * qt.exchange_rate, currency: 'LAK' } : undefined}
        />
      </div>
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
  const { t } = useTranslation()

  const ITEM_TYPE_OPTIONS = [
    { value: 'forklift_rental', label: t('quotations.itemType.forkliftRental') },
    { value: 'forklift_sale', label: t('quotations.itemType.forkliftSale') },
    { value: 'service', label: t('quotations.itemType.service') },
    { value: 'spare_part', label: t('quotations.itemType.sparePart') },
    { value: 'delivery', label: t('quotations.itemType.delivery') },
    { value: 'insurance', label: t('quotations.itemType.insurance') },
    { value: 'custom', label: t('quotations.itemType.custom') },
  ]

  const [form, setForm] = useState({
    item_type: 'custom' as string,
    item_code: '',
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
      setForm({ item_type: 'custom', item_code: '', description: '', quantity: '1', unit: 'unit', unit_price: '', discount_percent: '0', rental_duration_days: '', rental_rate_period: '', notes: '' })
      setErr(null)
    }
  }, [isOpen])

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.description.trim()) { setErr(t('quotations.detail.addItemModal.descriptionRequired')); return }
    if (!form.unit_price) { setErr(t('quotations.detail.addItemModal.unitPriceRequired')); return }
    setSaving(true)
    setErr(null)
    try {
      await addItem(quotationId, {
        item_type: form.item_type as ItemType,
        item_code: form.item_code.trim() || undefined,
        description: form.description.trim(),
        quantity: Number(form.quantity) || 1,
        unit: form.unit,
        unit_price: Number(form.unit_price),
        discount_percent: Number(form.discount_percent) || 0,
        rental_duration_days: form.rental_duration_days ? Number(form.rental_duration_days) : undefined,
        rental_rate_period: form.rental_rate_period || undefined,
        notes: form.notes.trim() || undefined,
      })
      toast.success(t('quotations.detail.addItemModal.itemAdded'))
      onClose()
      onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('quotations.detail.addItemModal.addFailed'))
    } finally {
      setSaving(false)
    }
  }

  const isRental = form.item_type === 'forklift_rental'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('quotations.detail.addItemModal.title')} width={560}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}

        <div className="form-row-2">
          <div className="form-group">
            <label>{t('quotations.detail.addItemModal.itemType')} <span className="required">*</span></label>
            <select value={form.item_type} onChange={(e) => set('item_type', e.target.value)}>
              {ITEM_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>{t('quotations.detail.addItemModal.itemCode')}</label>
            <input value={form.item_code} onChange={(e) => set('item_code', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label>{t('common.description')} <span className="required">*</span></label>
          <input value={form.description} onChange={(e) => set('description', e.target.value)} placeholder={t('quotations.detail.addItemModal.descriptionPlaceholder')} required />
        </div>

        <div className="form-group">
          <label>{t('quotations.detail.addItemModal.unit')}</label>
          <input value={form.unit} onChange={(e) => set('unit', e.target.value)} />
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>{t('common.quantity')}</label>
            <input type="number" value={form.quantity} onChange={(e) => set('quantity', e.target.value)} min="0.01" step="any" />
          </div>
          <div className="form-group">
            <label>{t('quotations.detail.addItemModal.unitPrice')} <span className="required">*</span></label>
            <input type="number" value={form.unit_price} onChange={(e) => set('unit_price', e.target.value)} min="0" step="any" required />
          </div>
        </div>

        <div className="form-group">
          <label>{t('quotations.detail.addItemModal.discountPercent')}</label>
          <input type="number" value={form.discount_percent} onChange={(e) => set('discount_percent', e.target.value)} min="0" max="100" step="0.1" />
        </div>

        {isRental && (
          <div className="form-row-2">
            <div className="form-group">
              <label>{t('quotations.detail.addItemModal.rentalDuration')}</label>
              <input type="number" value={form.rental_duration_days} onChange={(e) => set('rental_duration_days', e.target.value)} min="1" />
            </div>
            <div className="form-group">
              <label>{t('quotations.detail.addItemModal.ratePeriod')}</label>
              <select value={form.rental_rate_period} onChange={(e) => set('rental_rate_period', e.target.value)}>
                <option value="">{t('quotations.detail.addItemModal.selectRatePeriod')}</option>
                <option value="daily">{t('quotations.detail.addItemModal.daily')}</option>
                <option value="weekly">{t('quotations.detail.addItemModal.weekly')}</option>
                <option value="monthly">{t('quotations.detail.addItemModal.monthly')}</option>
              </select>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>{t('common.notes')}</label>
          <input value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder={t('common.optional')} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>{t('common.cancel')}</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? t('quotations.detail.addItemModal.adding') : t('quotations.detail.addItem')}</button>
        </div>
      </form>
    </Modal>
  )
}
