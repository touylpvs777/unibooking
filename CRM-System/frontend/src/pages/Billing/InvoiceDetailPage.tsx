import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AlertCircle, ChevronLeft, Send, XCircle, CheckCircle, Ban } from 'lucide-react'
import { getInvoice, issueInvoice, sendInvoice, cancelInvoice, voidInvoice } from '@/api/billing'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import PrintButton from '@/components/ui/PrintButton'
import { toast } from '@/store/toastStore'
import type { InvoiceDetail } from '@/types/billing'
import { getHeaderColorClass } from '@/utils/routeHeaderColor'
import '@/styles/shared.css'
import '@/styles/detail.css'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number, cur = '') { return `${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${cur ? ' ' + cur : ''}` }

const STATUS_LABEL_KEYS: Record<string, string> = {
  draft: 'billing.invoice.status.draft', issued: 'billing.invoice.status.issued',
  sent: 'billing.invoice.status.sent', partially_paid: 'billing.invoice.status.partially_paid',
  paid: 'billing.invoice.status.paid', overdue: 'billing.invoice.status.overdue',
  cancelled: 'billing.invoice.status.cancelled', voided: 'billing.invoice.status.voided',
}
const STATUS_VARIANT: Record<string, BadgeVariant> = {
  draft: 'gray', issued: 'blue', sent: 'purple', partially_paid: 'amber',
  paid: 'green', overdue: 'red', cancelled: 'gray', voided: 'gray',
}

export default function InvoiceDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const headerColorClass = getHeaderColorClass(useLocation().pathname)
  const [inv, setInv] = useState<InvoiceDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState('')

  function InvBadge({ status }: { status: string }) {
    const variant = STATUS_VARIANT[status] ?? ('gray' as BadgeVariant)
    const label = STATUS_LABEL_KEYS[status] ? t(STATUS_LABEL_KEYS[status]) : status
    return <Badge variant={variant}>{label}</Badge>
  }

  const load = async () => {
    setIsLoading(true)
    try { setInv((await getInvoice(Number(id))).data) }
    catch { setError(t('billing.invoice.detail.loadError')) }
    finally { setIsLoading(false) }
  }
  useEffect(() => { load() }, [id])

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(true)
    try { await fn(); toast.success(label); await load() }
    catch { toast.error(t('billing.invoice.detail.actionFailed', { action: label })) }
    finally { setBusy(false) }
  }

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>{t('common.loading')}</div>
  if (error || !inv) return <div className="page-error"><AlertCircle size={16} /> {error || t('billing.invoice.detail.notFound')}</div>

  const s = inv.status

  return (
    <div>
      {/* Header */}
      <div className={`page-header page-header-banner ${headerColorClass}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-ghost" onClick={() => navigate('/billing/invoices')} style={{ padding: '6px 8px' }}>
            <ChevronLeft size={16} />
          </button>
          <div>
            <div className="detail-title-row">
              <h1 className="detail-name" style={{ fontSize: 20 }}>{inv.invoice_number}</h1>
              <InvBadge status={s} />
            </div>
            <div className="detail-subtitle">
              {inv.customer.first_name} {inv.customer.last_name}
              {inv.customer.company ? ` — ${inv.customer.company}` : ''}
            </div>
          </div>
        </div>
        <div className="detail-actions">
          <PrintButton />
          {s === 'draft' && <button className="btn btn-primary" disabled={busy} onClick={() => run(t('billing.invoice.toast.issued'), () => issueInvoice(inv.id))}><CheckCircle size={14} /> {t('billing.invoice.actions.issue')}</button>}
          {s === 'issued' && <button className="btn btn-primary" disabled={busy} onClick={() => run(t('billing.invoice.toast.sent'), () => sendInvoice(inv.id))}><Send size={14} /> {t('billing.invoice.actions.send')}</button>}
          {(s === 'issued' || s === 'sent') && <button className="btn btn-ghost" disabled={busy} onClick={() => run(t('billing.invoice.toast.voided'), () => voidInvoice(inv.id))}><Ban size={14} /> {t('billing.invoice.actions.void')}</button>}
          {!['paid', 'voided', 'cancelled'].includes(s) && <button className="btn btn-danger" disabled={busy} onClick={() => setCancelOpen(true)}><XCircle size={14} /> {t('common.cancel')}</button>}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="detail-summary-grid">
        {[
          { label: t('common.subtotal'), value: fmtAmt(inv.subtotal, inv.currency) },
          { label: t('billing.invoice.summary.tax', { rate: inv.tax_rate }), value: fmtAmt(inv.tax_amount, inv.currency) },
          { label: t('billing.invoice.summary.discount'), value: fmtAmt(inv.discount_amount, inv.currency) },
          { label: t('common.total'), value: fmtAmt(inv.total_amount, inv.currency) },
          { label: t('billing.invoice.summary.paid'), value: fmtAmt(inv.amount_paid, inv.currency) },
          { label: t('billing.invoice.summary.balanceDue'), value: fmtAmt(inv.balance_due, inv.currency) },
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
          <dt>{t('billing.invoice.meta.issueDate')}</dt><dd>{fmtDate(inv.issue_date)}</dd>
          <dt>{t('billing.invoice.meta.dueDate')}</dt><dd>{fmtDate(inv.due_date)}</dd>
          <dt>{t('billing.invoice.meta.paidDate')}</dt><dd>{fmtDate(inv.paid_date)}</dd>
          <dt>{t('common.createdAt')}</dt><dd>{fmtDate(inv.created_at)}</dd>
        </dl>
        <dl className="detail-meta">
          {inv.contract ? (
            <>
              <dt>{t('billing.invoice.meta.contract')}</dt>
              <dd>
                <span style={{ cursor: 'pointer', color: 'var(--color-primary-600)' }} onClick={() => navigate(`/rental-contracts/${inv.contract_id}`)}>
                  {inv.contract.contract_number}
                </span>
              </dd>
            </>
          ) : (
            <>
              <dt>{t('billing.invoice.meta.referenceType')}</dt>
              <dd>{inv.reference_type ?? '—'}</dd>
            </>
          )}
          {inv.billing_period_start && <><dt>{t('billing.invoice.meta.period')}</dt><dd>{fmtDate(inv.billing_period_start)} — {fmtDate(inv.billing_period_end)}</dd></>}
          {inv.creator && <><dt>{t('billing.invoice.meta.createdBy')}</dt><dd>{inv.creator.full_name || inv.creator.username}</dd></>}
        </dl>
      </div>

      {/* Notes */}
      {inv.notes && (
        <div className="detail-internal-note" style={{ marginTop: 20, background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <strong style={{ color: 'var(--color-text-muted)' }}>{t('common.notes')}</strong>
          <p style={{ margin: '4px 0 0', color: 'var(--color-text)' }}>{inv.notes}</p>
        </div>
      )}
      {inv.internal_notes && (
        <div className="detail-internal-note" style={{ marginTop: 8 }}>
          <strong>{t('billing.invoice.detail.internalNotes')}</strong>
          <p style={{ margin: '4px 0 0' }}>{inv.internal_notes}</p>
        </div>
      )}
      {inv.cancellation_reason && (
        <div className="detail-internal-note" style={{ marginTop: 8, background: 'var(--color-danger-50)', borderColor: 'var(--color-danger-300)' }}>
          <strong style={{ color: 'var(--color-danger-700)' }}>{t('billing.invoice.detail.cancellationReason')}</strong>
          <p style={{ margin: '4px 0 0', color: 'var(--color-danger-700)' }}>{inv.cancellation_reason}</p>
        </div>
      )}

      {/* Line Items */}
      <div className="detail-section-bar" style={{ marginTop: 28 }}>
        <h3 className="detail-section-title">{t('billing.invoice.lineItems.title')}</h3>
      </div>
      <div className="table-card" style={{ marginTop: 8 }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>{t('billing.invoice.lineItems.number')}</th><th>{t('common.description')}</th><th>{t('billing.invoice.lineItems.qty')}</th><th>{t('billing.invoice.lineItems.rate')}</th><th>{t('common.amount')}</th><th>{t('billing.invoice.lineItems.tax')}</th><th>{t('common.total')}</th></tr></thead>
            <tbody>
              {inv.items.length === 0 ? (
                <tr><td colSpan={7}><div className="detail-empty-state">{t('billing.invoice.lineItems.empty')}</div></td></tr>
              ) : inv.items.map((it) => (
                <tr key={it.id}>
                  <td className="cell-muted">{it.line_number}</td>
                  <td className="cell-desc">{it.description}</td>
                  <td className="cell-mono">{it.quantity}</td>
                  <td className="cell-mono">{fmtAmt(it.unit_rate)}</td>
                  <td className="cell-mono">{fmtAmt(it.amount)}</td>
                  <td className="cell-mono">{fmtAmt(it.tax_amount)}</td>
                  <td className="cell-mono cell-total">{fmtAmt(it.line_total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Allocations */}
      {inv.allocations.length > 0 && (
        <>
          <div className="detail-section-bar" style={{ marginTop: 28 }}>
            <h3 className="detail-section-title">{t('billing.invoice.allocations.title')}</h3>
          </div>
          <div className="table-card" style={{ marginTop: 8 }}>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>{t('billing.invoice.allocations.payment')}</th><th>{t('common.amount')}</th><th>{t('common.date')}</th></tr></thead>
                <tbody>
                  {inv.allocations.map((a) => (
                    <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/billing/payments/${a.payment_id}`)}>
                      <td className="cell-desc">{t('billing.invoice.allocations.paymentLabel', { id: a.payment_id })}</td>
                      <td className="cell-mono cell-total">{fmtAmt(a.allocated_amount, inv.currency)}</td>
                      <td className="cell-muted">{fmtDate(a.allocated_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Cancel Modal */}
      <Modal isOpen={cancelOpen} onClose={() => setCancelOpen(false)} title={t('billing.invoice.modal.cancel.title')} footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => setCancelOpen(false)}>{t('common.close')}</button>
          <button className="btn btn-danger" disabled={!cancelReason.trim() || busy} onClick={() => { setCancelOpen(false); run(t('billing.invoice.toast.cancelled'), () => cancelInvoice(inv.id, cancelReason)); setCancelReason('') }}>
            {t('billing.invoice.modal.cancel.title')}
          </button>
        </div>
      }>
        <div className="form-grid">
          <div className="form-group">
            <label>{t('billing.invoice.modal.cancel.reasonLabel')} <span className="required">*</span></label>
            <textarea rows={3} value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} placeholder={t('billing.invoice.modal.cancel.reasonPlaceholder')} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
