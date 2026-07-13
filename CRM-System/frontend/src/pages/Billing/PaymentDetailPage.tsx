import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, ChevronLeft, CheckCircle, XCircle, ArrowRightLeft } from 'lucide-react'
import { getPayment, confirmPayment, rejectPayment, allocatePayment, getInvoices } from '@/api/billing'
import { Badge, type BadgeVariant } from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { toast } from '@/store/toastStore'
import type { PaymentOut, InvoiceOut } from '@/types/billing'
import '@/styles/shared.css'
import '@/styles/detail.css'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number, cur = '') { return `${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${cur ? ' ' + cur : ''}` }

const PAY_STATUS: Record<string, { variant: BadgeVariant; label: string }> = {
  pending: { variant: 'amber', label: 'Pending' }, confirmed: { variant: 'green', label: 'Confirmed' },
  rejected: { variant: 'red', label: 'Rejected' }, refunded: { variant: 'gray', label: 'Refunded' },
}
const METHOD_LABELS: Record<string, string> = {
  cash: 'Cash', bank_transfer: 'Bank Transfer', check: 'Check',
  credit_card: 'Credit Card', mobile_payment: 'Mobile Payment', other: 'Other',
}

export default function PaymentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [pay, setPay] = useState<PaymentOut | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const [allocOpen, setAllocOpen] = useState(false)
  const [invoices, setInvoices] = useState<InvoiceOut[]>([])
  const [allocInvId, setAllocInvId] = useState<number | ''>('')
  const [allocAmt, setAllocAmt] = useState('')

  const load = async () => {
    setIsLoading(true)
    try { setPay((await getPayment(Number(id))).data) }
    catch { setError('Failed to load payment.') }
    finally { setIsLoading(false) }
  }
  useEffect(() => { load() }, [id])

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(true)
    try { await fn(); toast.success(label); await load() }
    catch { toast.error(`Failed: ${label}`) }
    finally { setBusy(false) }
  }

  const openAllocate = async () => {
    try {
      const all: InvoiceOut[] = []
      for (const s of ['issued', 'sent', 'partially_paid', 'overdue']) {
        const { data } = await getInvoices({ status: s, page_size: 100 })
        all.push(...data.items)
      }
      setInvoices(all)
      setAllocOpen(true)
    } catch { toast.error('Failed to load invoices') }
  }

  const handleAllocate = () => {
    if (!allocInvId || !allocAmt || Number(allocAmt) <= 0) return
    setAllocOpen(false)
    run('Payment allocated', () => allocatePayment(pay!.id, { invoice_id: Number(allocInvId), allocated_amount: Number(allocAmt) }))
    setAllocInvId(''); setAllocAmt('')
  }

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</div>
  if (error || !pay) return <div className="page-error"><AlertCircle size={16} /> {error || 'Payment not found'}</div>

  const cfg = PAY_STATUS[pay.payment_status] ?? { variant: 'gray' as BadgeVariant, label: pay.payment_status }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-ghost" onClick={() => navigate('/billing/payments')} style={{ padding: '6px 8px' }}>
            <ChevronLeft size={16} />
          </button>
          <div>
            <div className="detail-title-row">
              <h1 className="detail-name" style={{ fontSize: 20 }}>{pay.payment_number}</h1>
              <Badge variant={cfg.variant}>{cfg.label}</Badge>
            </div>
            <div className="detail-subtitle">
              {pay.customer.first_name} {pay.customer.last_name}
              {pay.customer.company ? ` — ${pay.customer.company}` : ''}
            </div>
          </div>
        </div>
        <div className="detail-actions">
          {pay.payment_status === 'pending' && (
            <>
              <button className="btn btn-primary" disabled={busy} onClick={() => run('Payment confirmed', () => confirmPayment(pay.id))}>
                <CheckCircle size={14} /> Confirm
              </button>
              <button className="btn btn-danger" disabled={busy} onClick={() => run('Payment rejected', () => rejectPayment(pay.id))}>
                <XCircle size={14} /> Reject
              </button>
            </>
          )}
          {pay.payment_status === 'confirmed' && (
            <button className="btn btn-primary" disabled={busy} onClick={openAllocate}>
              <ArrowRightLeft size={14} /> Allocate to Invoice
            </button>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="detail-summary-grid">
        {[
          { label: 'Amount', value: fmtAmt(pay.amount, pay.currency) },
          { label: 'Method', value: METHOD_LABELS[pay.payment_method] || pay.payment_method },
          { label: 'Payment Date', value: fmtDate(pay.payment_date) },
          { label: 'Received', value: fmtDate(pay.received_date) },
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
          <dt>Reference</dt><dd>{pay.reference_number || '—'}</dd>
          <dt>Created</dt><dd>{fmtDate(pay.created_at)}</dd>
          {pay.creator && <><dt>Created By</dt><dd>{pay.creator.full_name || pay.creator.username}</dd></>}
        </dl>
        <dl className="detail-meta">
          {pay.confirmed_at && <><dt>Confirmed</dt><dd>{fmtDate(pay.confirmed_at)}</dd></>}
          {pay.confirmer && <><dt>Confirmed By</dt><dd>{pay.confirmer.full_name || pay.confirmer.username}</dd></>}
          {pay.contract && (
            <>
              <dt>Contract</dt>
              <dd>
                <span style={{ cursor: 'pointer', color: 'var(--color-primary-600)' }} onClick={() => navigate(`/rental-contracts/${pay.contract_id}`)}>
                  {pay.contract.contract_number}
                </span>
              </dd>
            </>
          )}
        </dl>
      </div>

      {pay.notes && (
        <div className="detail-internal-note" style={{ marginTop: 20, background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <strong style={{ color: 'var(--color-text-muted)' }}>Notes</strong>
          <p style={{ margin: '4px 0 0', color: 'var(--color-text)' }}>{pay.notes}</p>
        </div>
      )}

      {/* Allocate Modal */}
      <Modal isOpen={allocOpen} onClose={() => setAllocOpen(false)} title="Allocate Payment to Invoice" width={520} footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => setAllocOpen(false)}>Cancel</button>
          <button className="btn btn-primary" disabled={!allocInvId || !allocAmt || Number(allocAmt) <= 0} onClick={handleAllocate}>Allocate</button>
        </div>
      }>
        <div className="form-grid">
          <div className="form-group">
            <label>Invoice <span className="required">*</span></label>
            <select value={allocInvId} onChange={(e) => setAllocInvId(e.target.value ? Number(e.target.value) : '')}>
              <option value="">Select invoice...</option>
              {invoices.map((inv) => <option key={inv.id} value={inv.id}>{inv.invoice_number} — Balance: {fmtAmt(inv.balance_due, inv.currency)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Amount <span className="required">*</span></label>
            <input type="number" step="0.01" min="0" placeholder="0.00" value={allocAmt} onChange={(e) => setAllocAmt(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
