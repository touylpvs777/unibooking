import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, ChevronLeft, Send, XCircle, CheckCircle, Ban } from 'lucide-react'
import { getInvoice, issueInvoice, sendInvoice, cancelInvoice, voidInvoice } from '@/api/billing'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { toast } from '@/store/toastStore'
import type { InvoiceDetail } from '@/types/billing'
import '@/styles/shared.css'
import '@/styles/detail.css'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number, cur = '') { return `${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${cur ? ' ' + cur : ''}` }

const STATUS_MAP: Record<string, { variant: BadgeVariant; label: string }> = {
  draft: { variant: 'gray', label: 'Draft' }, issued: { variant: 'blue', label: 'Issued' },
  sent: { variant: 'purple', label: 'Sent' }, partially_paid: { variant: 'amber', label: 'Partial' },
  paid: { variant: 'green', label: 'Paid' }, overdue: { variant: 'red', label: 'Overdue' },
  cancelled: { variant: 'gray', label: 'Cancelled' }, voided: { variant: 'gray', label: 'Voided' },
}

function InvBadge({ status }: { status: string }) {
  const c = STATUS_MAP[status] ?? { variant: 'gray' as BadgeVariant, label: status }
  return <Badge variant={c.variant}>{c.label}</Badge>
}

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [inv, setInv] = useState<InvoiceDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState('')

  const load = async () => {
    setIsLoading(true)
    try { setInv((await getInvoice(Number(id))).data) }
    catch { setError('Failed to load invoice.') }
    finally { setIsLoading(false) }
  }
  useEffect(() => { load() }, [id])

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(true)
    try { await fn(); toast.success(label); await load() }
    catch { toast.error(`Failed: ${label}`) }
    finally { setBusy(false) }
  }

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</div>
  if (error || !inv) return <div className="page-error"><AlertCircle size={16} /> {error || 'Invoice not found'}</div>

  const s = inv.status

  return (
    <div>
      {/* Header */}
      <div className="page-header">
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
          {s === 'draft' && <button className="btn btn-primary" disabled={busy} onClick={() => run('Invoice issued', () => issueInvoice(inv.id))}><CheckCircle size={14} /> Issue</button>}
          {s === 'issued' && <button className="btn btn-primary" disabled={busy} onClick={() => run('Invoice sent', () => sendInvoice(inv.id))}><Send size={14} /> Send</button>}
          {(s === 'issued' || s === 'sent') && <button className="btn btn-ghost" disabled={busy} onClick={() => run('Invoice voided', () => voidInvoice(inv.id))}><Ban size={14} /> Void</button>}
          {!['paid', 'voided', 'cancelled'].includes(s) && <button className="btn btn-danger" disabled={busy} onClick={() => setCancelOpen(true)}><XCircle size={14} /> Cancel</button>}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="detail-summary-grid">
        {[
          { label: 'Subtotal', value: fmtAmt(inv.subtotal, inv.currency) },
          { label: `Tax (${inv.tax_rate}%)`, value: fmtAmt(inv.tax_amount, inv.currency) },
          { label: 'Discount', value: fmtAmt(inv.discount_amount, inv.currency) },
          { label: 'Total', value: fmtAmt(inv.total_amount, inv.currency) },
          { label: 'Paid', value: fmtAmt(inv.amount_paid, inv.currency) },
          { label: 'Balance Due', value: fmtAmt(inv.balance_due, inv.currency) },
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
          <dt>Issue Date</dt><dd>{fmtDate(inv.issue_date)}</dd>
          <dt>Due Date</dt><dd>{fmtDate(inv.due_date)}</dd>
          <dt>Paid Date</dt><dd>{fmtDate(inv.paid_date)}</dd>
          <dt>Created</dt><dd>{fmtDate(inv.created_at)}</dd>
        </dl>
        <dl className="detail-meta">
          <dt>Contract</dt>
          <dd>
            <span style={{ cursor: 'pointer', color: 'var(--color-primary-600)' }} onClick={() => navigate(`/rental-contracts/${inv.contract_id}`)}>
              {inv.contract.contract_number}
            </span>
          </dd>
          {inv.billing_period_start && <><dt>Period</dt><dd>{fmtDate(inv.billing_period_start)} — {fmtDate(inv.billing_period_end)}</dd></>}
          {inv.creator && <><dt>Created By</dt><dd>{inv.creator.full_name || inv.creator.username}</dd></>}
        </dl>
      </div>

      {/* Notes */}
      {inv.notes && (
        <div className="detail-internal-note" style={{ marginTop: 20, background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <strong style={{ color: 'var(--color-text-muted)' }}>Notes</strong>
          <p style={{ margin: '4px 0 0', color: 'var(--color-text)' }}>{inv.notes}</p>
        </div>
      )}
      {inv.internal_notes && (
        <div className="detail-internal-note" style={{ marginTop: 8 }}>
          <strong>Internal Notes</strong>
          <p style={{ margin: '4px 0 0' }}>{inv.internal_notes}</p>
        </div>
      )}
      {inv.cancellation_reason && (
        <div className="detail-internal-note" style={{ marginTop: 8, background: 'var(--color-danger-50)', borderColor: 'var(--color-danger-300)' }}>
          <strong style={{ color: 'var(--color-danger-700)' }}>Cancellation Reason</strong>
          <p style={{ margin: '4px 0 0', color: 'var(--color-danger-700)' }}>{inv.cancellation_reason}</p>
        </div>
      )}

      {/* Line Items */}
      <div className="detail-section-bar" style={{ marginTop: 28 }}>
        <h3 className="detail-section-title">Line Items</h3>
      </div>
      <div className="table-card" style={{ marginTop: 8 }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>#</th><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th><th>Tax</th><th>Total</th></tr></thead>
            <tbody>
              {inv.items.length === 0 ? (
                <tr><td colSpan={7}><div className="detail-empty-state">No line items</div></td></tr>
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
            <h3 className="detail-section-title">Payment Allocations</h3>
          </div>
          <div className="table-card" style={{ marginTop: 8 }}>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>Payment</th><th>Amount</th><th>Date</th></tr></thead>
                <tbody>
                  {inv.allocations.map((a) => (
                    <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/billing/payments/${a.payment_id}`)}>
                      <td className="cell-desc">Payment #{a.payment_id}</td>
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
      <Modal isOpen={cancelOpen} onClose={() => setCancelOpen(false)} title="Cancel Invoice" footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => setCancelOpen(false)}>Close</button>
          <button className="btn btn-danger" disabled={!cancelReason.trim() || busy} onClick={() => { setCancelOpen(false); run('Invoice cancelled', () => cancelInvoice(inv.id, cancelReason)); setCancelReason('') }}>
            Cancel Invoice
          </button>
        </div>
      }>
        <div className="form-grid">
          <div className="form-group">
            <label>Reason for cancellation <span className="required">*</span></label>
            <textarea rows={3} value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} placeholder="Enter reason..." />
          </div>
        </div>
      </Modal>
    </div>
  )
}
