import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { createMovement } from '@/api/movement'
import { toast } from '@/store/toastStore'
import type { MovementType, MovementPriority } from '@/types/movement'
import '@/styles/shared.css'

const TYPE_OPTIONS = [
  { value: 'customer_deployment', label: 'Customer Deployment' },
  { value: 'customer_return', label: 'Customer Return' },
  { value: 'warehouse_transfer', label: 'Warehouse Transfer' },
  { value: 'internal_relocation', label: 'Internal Relocation' },
]

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

const EMPTY = {
  movement_type: 'customer_deployment',
  forklift_id: '',
  customer_id: '',
  from_location: '',
  from_address: '',
  to_location: '',
  to_address: '',
  scheduled_date: '',
  priority: 'normal',
  tracking_code: '',
  notes: '',
  internal_notes: '',
}

export default function MovementForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ ...EMPTY })
  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.forklift_id) { setErr('Forklift ID is required.'); return }
    if (!form.from_location.trim()) { setErr('From location is required.'); return }
    if (!form.to_location.trim()) { setErr('To location is required.'); return }
    if (!form.scheduled_date) { setErr('Scheduled date is required.'); return }

    setIsSaving(true); setErr(null)
    try {
      const { data } = await createMovement({
        movement_type: form.movement_type as MovementType,
        forklift_id: Number(form.forklift_id),
        customer_id: form.customer_id ? Number(form.customer_id) : undefined,
        from_location: form.from_location.trim(),
        from_address: form.from_address.trim() || undefined,
        to_location: form.to_location.trim(),
        to_address: form.to_address.trim() || undefined,
        scheduled_date: form.scheduled_date,
        priority: form.priority as MovementPriority,
        tracking_code: form.tracking_code.trim() || undefined,
        notes: form.notes.trim() || undefined,
        internal_notes: form.internal_notes.trim() || undefined,
      })
      toast.success(`Movement ${data.movement_number} created.`)
      navigate(`/movements/${data.id}`)
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? 'Failed to create movement.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <button
        className="detail-back"
        onClick={() => navigate('/movements')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 13.5, marginBottom: 20 }}
      >
        <ChevronLeft size={16} /> Back to Movements
      </button>

      <div className="page-header" style={{ marginBottom: 24 }}><h1>New Movement</h1></div>

      <div style={{ maxWidth: 700, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 24 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          {err && <div className="page-error" style={{ margin: 0 }}><AlertCircle size={14} /> {err}</div>}

          <div className="form-row-2">
            <div className="form-group">
              <label>Movement Type <span className="required">*</span></label>
              <select value={form.movement_type} onChange={(e) => set('movement_type', e.target.value)}>
                {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select value={form.priority} onChange={(e) => set('priority', e.target.value)}>
                {PRIORITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Forklift ID <span className="required">*</span></label>
              <input type="number" value={form.forklift_id} onChange={(e) => set('forklift_id', e.target.value)} placeholder="Enter forklift ID" required />
            </div>
            <div className="form-group">
              <label>Customer ID</label>
              <input type="number" value={form.customer_id} onChange={(e) => set('customer_id', e.target.value)} placeholder="Optional" />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>From Location <span className="required">*</span></label>
              <input value={form.from_location} onChange={(e) => set('from_location', e.target.value)} placeholder="DK Warehouse A" required />
            </div>
            <div className="form-group">
              <label>To Location <span className="required">*</span></label>
              <input value={form.to_location} onChange={(e) => set('to_location', e.target.value)} placeholder="Customer Site X" required />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>From Address</label>
              <input value={form.from_address} onChange={(e) => set('from_address', e.target.value)} placeholder="Full address (optional)" />
            </div>
            <div className="form-group">
              <label>To Address</label>
              <input value={form.to_address} onChange={(e) => set('to_address', e.target.value)} placeholder="Full address (optional)" />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Scheduled Date <span className="required">*</span></label>
              <input type="date" value={form.scheduled_date} onChange={(e) => set('scheduled_date', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Tracking / QR Code</label>
              <input value={form.tracking_code} onChange={(e) => set('tracking_code', e.target.value)} placeholder="QR or barcode reference" />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} placeholder="Visible notes..." />
          </div>

          <div className="form-group">
            <label>Internal Notes</label>
            <textarea value={form.internal_notes} onChange={(e) => set('internal_notes', e.target.value)} rows={2} placeholder="Internal only..." />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/movements')} disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>{isSaving ? 'Creating...' : 'Create Movement'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
