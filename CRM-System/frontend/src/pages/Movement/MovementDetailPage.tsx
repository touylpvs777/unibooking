import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft, AlertCircle, Truck, MapPin,
  X, Check, Play,
} from 'lucide-react'
import {
  getMovement, prepareMovement, departMovement,
  arriveMovement, completeMovement, cancelMovement,
} from '@/api/movement'
import { MovementStatusBadge, MovementTypeBadge, MovementPriorityBadge } from '@/components/movement/MovementStatusBadge'
import MovementTimeline from '@/components/movement/MovementTimeline'
import Modal from '@/components/ui/Modal'
import { toast } from '@/store/toastStore'
import type { MovementDetail } from '@/types/movement'
import '@/pages/Catalog/ProductDetailPage.css'
import '@/styles/detail.css'
import '@/styles/shared.css'

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtDateTime(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function MovementDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [mv, setMv] = useState<MovementDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setAL] = useState(false)
  const [departModal, setDepartModal] = useState(false)
  const [arriveModal, setArriveModal] = useState(false)

  const load = useCallback(async () => {
    if (!id) return
    setIsLoading(true); setError(null)
    try { setMv((await getMovement(Number(id))).data) }
    catch { setError('Movement not found.') }
    finally { setIsLoading(false) }
  }, [id])

  useEffect(() => { load() }, [load])

  const doAction = async (label: string, fn: () => Promise<unknown>) => {
    setAL(true)
    try { await fn(); toast.success(label); await load() }
    catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(msg ?? `Failed: ${label}`)
    }
    finally { setAL(false) }
  }

  if (isLoading) {
    return (
      <div className="product-detail">
        <div className="detail-skeleton">
          <div className="skeleton-cell" style={{ height: 18, width: '30%', marginBottom: 24 }} />
          <div className="detail-skeleton-body"><div className="detail-skeleton-info">
            <div className="skeleton-cell" style={{ height: 12, width: '50%' }} />
            <div className="skeleton-cell" style={{ height: 24, width: '80%', marginTop: 8 }} />
          </div></div>
        </div>
      </div>
    )
  }

  if (error || !mv) {
    return (
      <div className="product-detail">
        <button className="detail-back" onClick={() => navigate('/movements')}><ChevronLeft size={16} /> Back</button>
        <div className="page-error" style={{ marginTop: 24 }}><AlertCircle size={16} /> {error ?? 'Not found.'}</div>
      </div>
    )
  }

  const s = mv.status
  const canPrepare = s === 'draft'
  const canDepart = s === 'preparing'
  const canArrive = s === 'in_transit'
  const canComplete = s === 'delivered'
  const canCancel = !['completed', 'cancelled'].includes(s)

  return (
    <div className="product-detail">
      <button className="detail-back" onClick={() => navigate('/movements')}><ChevronLeft size={16} /> Back to Movements</button>

      <div className="detail-header">
        <div>
          <div className="detail-title-row">
            <h1 className="detail-name">{mv.movement_number}</h1>
          </div>
          <div className="detail-subtitle">
            <Truck size={14} style={{ verticalAlign: -2, marginRight: 4 }} />
            {mv.forklift.serial_number} — {mv.forklift.name_en}
          </div>
          <div className="detail-badges">
            <MovementStatusBadge status={mv.status} />
            <MovementTypeBadge type={mv.movement_type} />
            <MovementPriorityBadge priority={mv.priority} />
          </div>
        </div>

        <div className="detail-actions">
          {canPrepare && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Preparation started', () => prepareMovement(mv.id))}>
              <Play size={14} /> Start Preparing
            </button>
          )}
          {canDepart && (
            <button className="btn btn-primary" disabled={actionLoading} onClick={() => setDepartModal(true)}>
              <Truck size={14} /> Record Departure
            </button>
          )}
          {canArrive && (
            <button className="btn btn-primary" disabled={actionLoading} onClick={() => setArriveModal(true)}>
              <MapPin size={14} /> Record Arrival
            </button>
          )}
          {canComplete && (
            <button className="btn btn-primary" disabled={actionLoading}
              onClick={() => doAction('Movement completed', () => completeMovement(mv.id))}>
              <Check size={14} /> Mark Complete
            </button>
          )}
          {canCancel && (
            <button className="btn btn-secondary" disabled={actionLoading}
              onClick={() => doAction('Cancelled', () => cancelMovement(mv.id, 'Cancelled by user'))}>
              <X size={14} /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* Route */}
      <div className="detail-summary-grid">
        <div className="detail-summary-card">
          <div className="detail-summary-label">From</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)', marginTop: 4 }}>{mv.from_location}</div>
          {mv.from_address && <div className="cell-muted cell-sub">{mv.from_address}</div>}
        </div>
        <div className="detail-summary-card">
          <div className="detail-summary-label">To</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)', marginTop: 4 }}>{mv.to_location}</div>
          {mv.to_address && <div className="cell-muted cell-sub">{mv.to_address}</div>}
        </div>
        <div className="detail-summary-card">
          <div className="detail-summary-label">Scheduled</div>
          <div className="detail-summary-value">{fmtDate(mv.scheduled_date)}</div>
        </div>
        {mv.tracking_code && (
          <div className="detail-summary-card">
            <div className="detail-summary-label">Tracking Code</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)', marginTop: 4, fontFamily: 'monospace' }}>{mv.tracking_code}</div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="detail-info-grid">
        <div>
          <dl className="detail-meta">
            <dt>Equipment</dt><dd>{mv.forklift.serial_number} — {mv.forklift.name_en}</dd>
            {mv.customer && (<><dt>Customer</dt><dd>{mv.customer.first_name} {mv.customer.last_name}{mv.customer.company ? ` (${mv.customer.company})` : ''}</dd></>)}
            {mv.rental_contract && (<><dt>Contract</dt><dd>{mv.rental_contract.contract_number}</dd></>)}
            {mv.assigned_driver && (<><dt>Driver</dt><dd>{mv.assigned_driver.full_name ?? mv.assigned_driver.username}</dd></>)}
          </dl>
        </div>
        <div>
          <dl className="detail-meta">
            <dt>Departed</dt><dd>{fmtDateTime(mv.actual_departure)}</dd>
            <dt>Arrived</dt><dd>{fmtDateTime(mv.actual_arrival)}</dd>
            {mv.departure_hour_meter != null && (<><dt>Departure Hours</dt><dd>{mv.departure_hour_meter}</dd></>)}
            {mv.arrival_hour_meter != null && (<><dt>Arrival Hours</dt><dd>{mv.arrival_hour_meter}</dd></>)}
            <dt>Created</dt><dd>{fmtDate(mv.created_at)}</dd>
          </dl>
        </div>
      </div>

      {mv.notes && (
        <div className="detail-description" style={{ marginTop: 16 }}>
          <div className="detail-section-title">Notes</div>
          <p>{mv.notes}</p>
        </div>
      )}
      {mv.internal_notes && (
        <div className="detail-internal-note"><strong>Internal Note</strong><p>{mv.internal_notes}</p></div>
      )}
      {mv.cancellation_reason && (
        <div className="detail-internal-note" style={{ borderColor: 'var(--color-danger-300)', background: 'var(--color-danger-50)' }}>
          <strong style={{ color: 'var(--color-danger-700)' }}>Cancellation Reason</strong>
          <p style={{ color: 'var(--color-danger-900)' }}>{mv.cancellation_reason}</p>
        </div>
      )}

      {/* Timeline */}
      <MovementTimeline checkpoints={mv.checkpoints} />

      {/* Departure Modal */}
      <HourMeterModal
        isOpen={departModal} onClose={() => setDepartModal(false)}
        title="Record Departure" label="Departure Hour Meter"
        onSubmit={(reading, notes) => doAction('Departed', () => departMovement(mv.id, reading, notes)).then(() => setDepartModal(false))}
      />
      {/* Arrival Modal */}
      <HourMeterModal
        isOpen={arriveModal} onClose={() => setArriveModal(false)}
        title="Record Arrival" label="Arrival Hour Meter"
        minReading={mv.departure_hour_meter ?? undefined}
        onSubmit={(reading, notes) => doAction('Arrived', () => arriveMovement(mv.id, reading, notes)).then(() => setArriveModal(false))}
      />
    </div>
  )
}


function HourMeterModal({ isOpen, onClose, title, label, minReading, onSubmit }: {
  isOpen: boolean; onClose: () => void; title: string; label: string
  minReading?: number; onSubmit: (reading: number, notes?: string) => Promise<void>
}) {
  const [reading, setReading] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (isOpen) { setReading(''); setNotes(''); } }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reading) return
    setSaving(true)
    await onSubmit(Number(reading), notes.trim() || undefined)
    setSaving(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width={400}>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>{label} <span className="required">*</span></label>
          <input type="number" value={reading} onChange={(e) => setReading(e.target.value)}
            min={minReading ?? 0} step="0.1" required />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving || !reading}>{saving ? 'Saving...' : 'Confirm'}</button>
        </div>
      </form>
    </Modal>
  )
}
