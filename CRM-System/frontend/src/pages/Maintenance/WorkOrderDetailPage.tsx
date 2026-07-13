import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, AlertCircle, Play, Check, X, ShieldCheck, DollarSign } from 'lucide-react'
import { getWorkOrder, startWorkOrder, completeWorkOrder, verifyWorkOrder, cancelWorkOrder, addCost } from '@/api/maintenance'
import { WOStatusBadge, WOTypeBadge, WOPriorityBadge } from '@/components/maintenance/MaintenanceStatusBadge'
import Modal from '@/components/ui/Modal'
import { toast } from '@/store/toastStore'
import type { WorkOrderDetail } from '@/types/maintenance'
import '@/pages/Catalog/ProductDetailPage.css'
import '@/styles/detail.css'
import '@/styles/shared.css'

function fmtDate(iso: string | null) { if (!iso) return '—'; return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
function fmtDateTime(iso: string | null) { if (!iso) return '—'; return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

export default function WorkOrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [wo, setWo] = useState<WorkOrderDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [aL, setAL] = useState(false)
  const [startModal, setStartModal] = useState(false)
  const [completeModal, setCompleteModal] = useState(false)
  const [costModal, setCostModal] = useState(false)

  const load = useCallback(async () => {
    if (!id) return; setIsLoading(true); setError(null)
    try { setWo((await getWorkOrder(Number(id))).data) } catch { setError('Work order not found.') } finally { setIsLoading(false) }
  }, [id])
  useEffect(() => { load() }, [load])

  const doAction = async (label: string, fn: () => Promise<unknown>) => {
    setAL(true)
    try { await fn(); toast.success(label); await load() }
    catch (e: unknown) { const m = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail; toast.error(m ?? `Failed: ${label}`) }
    finally { setAL(false) }
  }

  if (isLoading) return <div className="product-detail"><div className="detail-skeleton"><div className="skeleton-cell" style={{ height: 18, width: '30%', marginBottom: 24 }} /><div className="detail-skeleton-body"><div className="detail-skeleton-info"><div className="skeleton-cell" style={{ height: 24, width: '80%' }} /></div></div></div></div>
  if (error || !wo) return <div className="product-detail"><button className="detail-back" onClick={() => navigate('/maintenance/work-orders')}><ChevronLeft size={16} /> Back</button><div className="page-error" style={{ marginTop: 24 }}><AlertCircle size={16} /> {error ?? 'Not found.'}</div></div>

  const s = wo.status
  const canStart = s === 'scheduled' || s === 'due'
  const canComplete = s === 'in_progress'
  const canVerify = s === 'completed'
  const canCancel = !['completed', 'verified', 'cancelled'].includes(s)
  const canAddCost = !['verified', 'cancelled'].includes(s)

  return (
    <div className="product-detail">
      <button className="detail-back" onClick={() => navigate('/maintenance/work-orders')}><ChevronLeft size={16} /> Back to Work Orders</button>

      <div className="detail-header">
        <div>
          <div className="detail-title-row"><h1 className="detail-name">{wo.work_order_number}</h1></div>
          <div className="detail-subtitle">{wo.title}</div>
          <div className="detail-badges">
            <WOStatusBadge status={wo.status} />
            <WOTypeBadge type={wo.order_type} />
            <WOPriorityBadge priority={wo.priority} />
          </div>
        </div>
        <div className="detail-actions">
          {canStart && <button className="btn btn-primary" disabled={aL} onClick={() => setStartModal(true)}><Play size={14} /> Start Work</button>}
          {canComplete && <button className="btn btn-primary" disabled={aL} onClick={() => setCompleteModal(true)}><Check size={14} /> Complete</button>}
          {canVerify && <button className="btn btn-primary" disabled={aL} onClick={() => doAction('Verified', () => verifyWorkOrder(wo.id))}><ShieldCheck size={14} /> Verify</button>}
          {canAddCost && <button className="btn btn-secondary" disabled={aL} onClick={() => setCostModal(true)}><DollarSign size={14} /> Add Cost</button>}
          {canCancel && <button className="btn btn-secondary" disabled={aL} onClick={() => doAction('Cancelled', () => cancelWorkOrder(wo.id, 'Cancelled by user'))}><X size={14} /> Cancel</button>}
        </div>
      </div>

      <div className="detail-summary-grid">
        {[
          { label: 'Scheduled', value: fmtDate(wo.scheduled_date) },
          { label: 'Est. Hours', value: `${wo.estimated_hours}h` },
          { label: 'Actual Hours', value: wo.actual_hours ? `${wo.actual_hours}h` : '—' },
          { label: 'Actual Cost', value: wo.actual_cost ? fmtAmt(wo.actual_cost) : fmtAmt(wo.estimated_cost) },
        ].map((c) => <div key={c.label} className="detail-summary-card"><div className="detail-summary-label">{c.label}</div><div className="detail-summary-value">{c.value}</div></div>)}
      </div>

      <div className="detail-info-grid">
        <div>
          <dl className="detail-meta">
            <dt>Equipment</dt><dd>{wo.forklift.serial_number} — {wo.forklift.name_en}</dd>
            {wo.technician && <><dt>Technician</dt><dd>{wo.technician.full_name ?? wo.technician.username}</dd></>}
            {wo.plan && <><dt>PM Plan</dt><dd>{wo.plan.name} ({wo.plan.interval_value} {wo.plan.interval_type})</dd></>}
            {wo.hour_meter_at_service != null && <><dt>Hour Meter</dt><dd>{wo.hour_meter_at_service}</dd></>}
          </dl>
        </div>
        <div>
          <dl className="detail-meta">
            <dt>Started</dt><dd>{fmtDateTime(wo.started_at)}</dd>
            <dt>Completed</dt><dd>{fmtDateTime(wo.completed_at)}</dd>
            {wo.verified_at && <><dt>Verified</dt><dd>{fmtDateTime(wo.verified_at)}</dd></>}
            {wo.verifier && <><dt>Verified By</dt><dd>{wo.verifier.full_name ?? wo.verifier.username}</dd></>}
            <dt>Created</dt><dd>{fmtDate(wo.created_at)}</dd>
          </dl>
        </div>
      </div>

      {wo.description && <div className="detail-description" style={{ marginTop: 16 }}><div className="detail-section-title">Description</div><p>{wo.description}</p></div>}
      {wo.findings && <div className="detail-description" style={{ marginTop: 12 }}><div className="detail-section-title">Findings</div><p>{wo.findings}</p></div>}
      {wo.resolution && <div className="detail-description" style={{ marginTop: 12 }}><div className="detail-section-title">Resolution</div><p>{wo.resolution}</p></div>}
      {wo.cancellation_reason && <div className="detail-internal-note" style={{ borderColor: 'var(--color-danger-300)', background: 'var(--color-danger-50)' }}><strong style={{ color: 'var(--color-danger-700)' }}>Cancellation Reason</strong><p style={{ color: 'var(--color-danger-900)' }}>{wo.cancellation_reason}</p></div>}

      {wo.costs.length > 0 && (
        <div className="detail-specs-section" style={{ marginTop: 24 }}>
          <h2 className="detail-section-title">Cost Breakdown ({wo.costs.length})</h2>
          <div className="table-card" style={{ marginTop: 10 }}>
            <table className="data-table">
              <thead><tr><th>Type</th><th>Description</th><th className="col-hide-sm">Qty</th><th className="col-hide-sm">Rate</th><th>Amount</th></tr></thead>
              <tbody>
                {wo.costs.map((c) => (
                  <tr key={c.id}>
                    <td className="cell-type">{c.cost_type.replace(/_/g, ' ')}</td>
                    <td className="cell-desc">{c.description}</td>
                    <td className="cell-muted col-hide-sm cell-mono">{c.quantity}</td>
                    <td className="cell-muted col-hide-sm cell-mono">{fmtAmt(c.unit_rate)}</td>
                    <td className="cell-mono cell-total">{fmtAmt(c.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <StartModal isOpen={startModal} onClose={() => setStartModal(false)} onSubmit={(r, n) => doAction('Work started', () => startWorkOrder(wo.id, r, n)).then(() => setStartModal(false))} />
      <CompleteModal isOpen={completeModal} onClose={() => setCompleteModal(false)} onSubmit={(h, f, r) => doAction('Completed', () => completeWorkOrder(wo.id, h, f, r)).then(() => setCompleteModal(false))} />
      <CostModal isOpen={costModal} onClose={() => setCostModal(false)} woId={wo.id} onSuccess={load} />
    </div>
  )
}

function StartModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (reading: number, notes?: string) => Promise<void> }) {
  const [r, setR] = useState(''); const [n, setN] = useState(''); const [s, setS] = useState(false)
  useEffect(() => { if (isOpen) { setR(''); setN('') } }, [isOpen])
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start Work Order" width={400}>
      <form onSubmit={async (e) => { e.preventDefault(); if (!r) return; setS(true); await onSubmit(Number(r), n.trim() || undefined); setS(false) }} className="form-grid">
        <div className="form-group"><label>Hour Meter Reading <span className="required">*</span></label><input type="number" value={r} onChange={(e) => setR(e.target.value)} min="0" step="0.1" required /></div>
        <div className="form-group"><label>Notes</label><input value={n} onChange={(e) => setN(e.target.value)} placeholder="Optional" /></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><button type="button" className="btn btn-secondary" onClick={onClose} disabled={s}>Cancel</button><button type="submit" className="btn btn-primary" disabled={s || !r}>{s ? 'Starting...' : 'Start'}</button></div>
      </form>
    </Modal>
  )
}

function CompleteModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (hours: number, findings?: string, resolution?: string) => Promise<void> }) {
  const [h, setH] = useState(''); const [f, setF] = useState(''); const [r, setR] = useState(''); const [s, setS] = useState(false)
  useEffect(() => { if (isOpen) { setH(''); setF(''); setR('') } }, [isOpen])
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Work Order" width={500}>
      <form onSubmit={async (e) => { e.preventDefault(); if (!h) return; setS(true); await onSubmit(Number(h), f.trim() || undefined, r.trim() || undefined); setS(false) }} className="form-grid">
        <div className="form-group"><label>Actual Hours <span className="required">*</span></label><input type="number" value={h} onChange={(e) => setH(e.target.value)} min="0.1" step="0.1" required /></div>
        <div className="form-group"><label>Findings</label><textarea value={f} onChange={(e) => setF(e.target.value)} rows={2} placeholder="What was found during inspection..." /></div>
        <div className="form-group"><label>Resolution</label><textarea value={r} onChange={(e) => setR(e.target.value)} rows={2} placeholder="What was done to resolve..." /></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><button type="button" className="btn btn-secondary" onClick={onClose} disabled={s}>Cancel</button><button type="submit" className="btn btn-primary" disabled={s || !h}>{s ? 'Completing...' : 'Complete'}</button></div>
      </form>
    </Modal>
  )
}

function CostModal({ isOpen, onClose, woId, onSuccess }: { isOpen: boolean; onClose: () => void; woId: number; onSuccess: () => void }) {
  const [form, setForm] = useState({ cost_type: 'parts', description: '', quantity: '1', unit_rate: '' })
  const [s, setS] = useState(false); const [err, setErr] = useState<string | null>(null)
  useEffect(() => { if (isOpen) { setForm({ cost_type: 'parts', description: '', quantity: '1', unit_rate: '' }); setErr(null) } }, [isOpen])
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Cost Entry" width={480}>
      <form onSubmit={async (e) => {
        e.preventDefault(); if (!form.description.trim() || !form.unit_rate) { setErr('Description and rate required.'); return }
        setS(true); setErr(null)
        try { await addCost(woId, { cost_type: form.cost_type, description: form.description.trim(), quantity: Number(form.quantity) || 1, unit_rate: Number(form.unit_rate) }); toast.success('Cost added.'); onClose(); onSuccess() }
        catch (e: unknown) { const m = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail; setErr(m ?? 'Failed.') }
        finally { setS(false) }
      }} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}
        <div className="form-row-2">
          <div className="form-group"><label>Cost Type</label><select value={form.cost_type} onChange={(e) => set('cost_type', e.target.value)}><option value="parts">Parts</option><option value="labor">Labor</option><option value="external_service">External Service</option><option value="other">Other</option></select></div>
          <div className="form-group"><label>Quantity</label><input type="number" value={form.quantity} onChange={(e) => set('quantity', e.target.value)} min="0.01" step="any" /></div>
        </div>
        <div className="form-group"><label>Description <span className="required">*</span></label><input value={form.description} onChange={(e) => set('description', e.target.value)} required /></div>
        <div className="form-group"><label>Unit Rate <span className="required">*</span></label><input type="number" value={form.unit_rate} onChange={(e) => set('unit_rate', e.target.value)} min="0" step="any" required /></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><button type="button" className="btn btn-secondary" onClick={onClose} disabled={s}>Cancel</button><button type="submit" className="btn btn-primary" disabled={s}>{s ? 'Adding...' : 'Add Cost'}</button></div>
      </form>
    </Modal>
  )
}
