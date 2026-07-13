import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { getDeposit, receiveDeposit, refundDeposit, forfeitDeposit, applyDeposit, getInvoices } from '@/api/billing'
import type { DepositOut, InvoiceOut } from '@/types/billing'
import '@/styles/shared.css'
import '@/styles/detail.css'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number, cur = 'LAK') { return `${n.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${cur}` }

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b', received: '#3b82f6', partially_refunded: '#8b5cf6',
  refunded: '#10b981', forfeited: '#ef4444', applied: '#6b7280',
}

function StatusBadge({ status }: { status: string }) {
  return <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 9999, background: `${STATUS_COLORS[status] || '#6b7280'}18`, color: STATUS_COLORS[status] || '#6b7280' }}>{status.replace('_', ' ')}</span>
}

export default function DepositDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [dep, setDep] = useState<DepositOut | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [modal, setModal] = useState<'receive' | 'refund' | 'forfeit' | 'apply' | null>(null)
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10))
  const [formAmount, setFormAmount] = useState('')
  const [formReason, setFormReason] = useState('')
  const [invoices, setInvoices] = useState<InvoiceOut[]>([])
  const [formInvoiceId, setFormInvoiceId] = useState<number | ''>('')

  const load = async () => {
    setIsLoading(true)
    try { setDep((await getDeposit(Number(id))).data) }
    catch { setError('Failed to load deposit.') }
    finally { setIsLoading(false) }
  }
  useEffect(() => { load() }, [id])

  const action = async (fn: () => Promise<unknown>) => {
    setBusy(true)
    try { await fn(); setModal(null); await load() }
    catch { alert('Action failed.') }
    finally { setBusy(false) }
  }

  const openApply = async () => {
    try {
      const all = [
        ...(await getInvoices({ status: 'issued', page_size: 100 })).data.items,
        ...(await getInvoices({ status: 'sent', page_size: 100 })).data.items,
        ...(await getInvoices({ status: 'partially_paid', page_size: 100 })).data.items,
        ...(await getInvoices({ status: 'overdue', page_size: 100 })).data.items,
      ]
      setInvoices(all)
      setModal('apply')
    } catch { alert('Failed to load invoices.') }
  }

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</div>
  if (error || !dep) return <div className="page-error"><AlertCircle size={16} /> {error || 'Not found'}</div>

  const remaining = dep.amount - dep.refund_amount - dep.forfeit_amount - dep.applied_amount
  const s = dep.deposit_status

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => navigate('/billing/deposits')} style={{ padding: '6px 10px' }}><ArrowLeft size={16} /></button>
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{dep.deposit_number} <StatusBadge status={s} /></h1>
            <p className="page-header-sub">{dep.customer.first_name} {dep.customer.last_name} — {dep.deposit_type}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {s === 'pending' && <button className="btn btn-primary" disabled={busy} onClick={() => setModal('receive')}>Mark Received</button>}
          {(s === 'received' || s === 'partially_refunded') && (
            <>
              <button className="btn btn-secondary" disabled={busy} onClick={() => setModal('refund')}>Refund</button>
              <button className="btn btn-secondary" style={{ color: 'var(--color-danger-500)' }} disabled={busy} onClick={() => setModal('forfeit')}>Forfeit</button>
              <button className="btn btn-primary" disabled={busy} onClick={openApply}>Apply to Invoice</button>
            </>
          )}
        </div>
      </div>

      {/* Financial Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12, marginTop: 16 }}>
        {[
          { label: 'Deposit Amount', value: dep.amount },
          { label: 'Refunded', value: dep.refund_amount },
          { label: 'Forfeited', value: dep.forfeit_amount },
          { label: 'Applied', value: dep.applied_amount },
          { label: 'Remaining', value: remaining },
        ].map((c) => (
          <div key={c.label} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{c.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{fmtAmt(c.value, dep.currency)}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 24, marginTop: 16, fontSize: 13, color: 'var(--color-text-muted)' }}>
        <span>Received: {fmtDate(dep.received_date)}</span>
        <span>Refund Date: {fmtDate(dep.refund_date)}</span>
        <span>Contract: <span style={{ cursor: 'pointer', color: 'var(--color-primary-500)' }} onClick={() => navigate(`/rental-contracts/${dep.contract_id}`)}>{dep.contract.contract_number}</span></span>
      </div>

      {dep.notes && (
        <div style={{ marginTop: 16, padding: 16, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13 }}>
          <strong>Notes:</strong> {dep.notes}
        </div>
      )}

      {/* Modals */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setModal(null)}>
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: 24, width: 400, maxWidth: '90vw' }} onClick={(e) => e.stopPropagation()}>
            {modal === 'receive' && (
              <>
                <h3>Mark Deposit Received</h3>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginTop: 12, marginBottom: 4 }}>Received Date</label>
                <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13 }} />
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                  <button className="btn btn-primary" disabled={busy} onClick={() => action(() => receiveDeposit(dep.id, { received_date: formDate }))}>Confirm</button>
                </div>
              </>
            )}
            {modal === 'refund' && (
              <>
                <h3>Refund Deposit</h3>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginTop: 12, marginBottom: 4 }}>Refund Amount (max: {fmtAmt(remaining, '')})</label>
                <input type="number" step="0.01" min="0" max={remaining} value={formAmount} onChange={(e) => setFormAmount(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13 }} />
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginTop: 12, marginBottom: 4 }}>Refund Date</label>
                <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13 }} />
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                  <button className="btn btn-primary" disabled={busy || !formAmount || Number(formAmount) <= 0} onClick={() => action(() => refundDeposit(dep.id, { refund_amount: Number(formAmount), refund_date: formDate }))}>Refund</button>
                </div>
              </>
            )}
            {modal === 'forfeit' && (
              <>
                <h3>Forfeit Deposit</h3>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginTop: 12, marginBottom: 4 }}>Forfeit Amount (max: {fmtAmt(remaining, '')})</label>
                <input type="number" step="0.01" min="0" max={remaining} value={formAmount} onChange={(e) => setFormAmount(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13 }} />
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginTop: 12, marginBottom: 4 }}>Reason</label>
                <textarea value={formReason} onChange={(e) => setFormReason(e.target.value)} rows={2} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13, resize: 'vertical' }} />
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                  <button className="btn btn-primary" style={{ background: 'var(--color-danger-500)' }} disabled={busy || !formAmount || Number(formAmount) <= 0} onClick={() => action(() => forfeitDeposit(dep.id, { forfeit_amount: Number(formAmount), reason: formReason || undefined }))}>Forfeit</button>
                </div>
              </>
            )}
            {modal === 'apply' && (
              <>
                <h3>Apply Deposit to Invoice</h3>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginTop: 12, marginBottom: 4 }}>Invoice</label>
                <select value={formInvoiceId} onChange={(e) => setFormInvoiceId(e.target.value ? Number(e.target.value) : '')} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13 }}>
                  <option value="">Select invoice...</option>
                  {invoices.map((inv) => <option key={inv.id} value={inv.id}>{inv.invoice_number} — Balance: {inv.balance_due.toLocaleString()} {inv.currency}</option>)}
                </select>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginTop: 12, marginBottom: 4 }}>Amount (max: {fmtAmt(remaining, '')})</label>
                <input type="number" step="0.01" min="0" max={remaining} value={formAmount} onChange={(e) => setFormAmount(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 13 }} />
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
                  <button className="btn btn-primary" disabled={busy || !formInvoiceId || !formAmount || Number(formAmount) <= 0} onClick={() => action(() => applyDeposit(dep.id, { apply_amount: Number(formAmount), invoice_id: Number(formInvoiceId) }))}>Apply</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
