import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import type { Forklift } from '@/types/forklift'
import type { Brand } from '@/types/catalog'
import '@/styles/shared.css'

interface ForkliftFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, unknown>) => Promise<boolean>
  forklift?: Forklift | null
  brands: Brand[]
}

const EMPTY = {
  serial_number: '',
  name_en: '',
  name_lo: '',
  model_number: '',
  internal_code: '',
  brand_id: '',
  status: 'in_stock',
  condition: 'new',
  fuel_type: '',
  capacity_kg: '',
  year_manufactured: '',
  purchase_date: '',
  warranty_expiry: '',
  initial_hour_meter: '0',
  current_hour_meter: '0',
  notes: '',
  is_active: true,
}

const STATUS_OPTIONS = [
  { value: 'in_stock', label: 'In Stock' },
  { value: 'sold', label: 'Sold' },
  { value: 'rented', label: 'Rented' },
  { value: 'in_service', label: 'In Service' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'decommissioned', label: 'Decommissioned' },
]

const CONDITION_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' },
]

const FUEL_OPTIONS = [
  { value: '', label: '— Not specified —' },
  { value: 'electric', label: 'Electric' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'lpg', label: 'LPG' },
  { value: 'dual_fuel', label: 'Dual Fuel' },
]

export default function ForkliftForm({
  isOpen,
  onClose,
  onSubmit,
  forklift,
  brands,
}: ForkliftFormProps) {
  const [form, setForm]         = useState({ ...EMPTY })
  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr]           = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return
    if (forklift) {
      setForm({
        serial_number:      forklift.serial_number,
        name_en:            forklift.name_en,
        name_lo:            forklift.name_lo ?? '',
        model_number:       forklift.model_number ?? '',
        internal_code:      forklift.internal_code ?? '',
        brand_id:           forklift.brand?.id?.toString() ?? '',
        status:             forklift.status,
        condition:          forklift.condition,
        fuel_type:          forklift.fuel_type ?? '',
        capacity_kg:        forklift.capacity_kg?.toString() ?? '',
        year_manufactured:  forklift.year_manufactured?.toString() ?? '',
        purchase_date:      '',
        warranty_expiry:    '',
        initial_hour_meter: '0',
        current_hour_meter: forklift.current_hour_meter.toString(),
        notes:              '',
        is_active:          forklift.is_active,
      })
    } else {
      setForm({ ...EMPTY })
    }
    setErr(null)
  }, [isOpen, forklift])

  const set = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.serial_number.trim()) { setErr('Serial number is required.'); return }
    if (!form.name_en.trim()) { setErr('Name is required.'); return }

    setIsSaving(true)
    setErr(null)

    const payload: Record<string, unknown> = {
      serial_number:      form.serial_number.trim(),
      name_en:            form.name_en.trim(),
      name_lo:            form.name_lo.trim() || undefined,
      model_number:       form.model_number.trim() || undefined,
      internal_code:      form.internal_code.trim() || undefined,
      brand_id:           form.brand_id ? Number(form.brand_id) : null,
      status:             form.status,
      condition:          form.condition,
      fuel_type:          form.fuel_type || null,
      capacity_kg:        form.capacity_kg ? Number(form.capacity_kg) : null,
      year_manufactured:  form.year_manufactured ? Number(form.year_manufactured) : null,
      current_hour_meter: form.current_hour_meter ? Number(form.current_hour_meter) : 0,
      notes:              form.notes.trim() || undefined,
      is_active:          form.is_active,
    }

    if (!forklift) {
      payload.initial_hour_meter = form.initial_hour_meter ? Number(form.initial_hour_meter) : 0
      if (form.purchase_date) payload.purchase_date = form.purchase_date
      if (form.warranty_expiry) payload.warranty_expiry = form.warranty_expiry
    }

    const ok = await onSubmit(payload)
    setIsSaving(false)
    if (ok) onClose()
    else setErr('Save failed. Please try again.')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={forklift ? 'Edit Forklift' : 'Register Forklift'}
      width={660}
    >
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}

        {/* Row 1: Serial + Name */}
        <div className="form-row-2">
          <div className="form-group">
            <label>Serial Number <span className="required">*</span></label>
            <input
              value={form.serial_number}
              onChange={(e) => set('serial_number', e.target.value)}
              placeholder="e.g. JH-2024-001"
              required
              disabled={!!forklift}
            />
          </div>
          <div className="form-group">
            <label>Name (English) <span className="required">*</span></label>
            <input
              value={form.name_en}
              onChange={(e) => set('name_en', e.target.value)}
              placeholder="e.g. Jungheinrich EFG 216k"
              required
            />
          </div>
        </div>

        {/* Row 2: Name Lao + Internal Code */}
        <div className="form-row-2">
          <div className="form-group">
            <label>Name (Lao)</label>
            <input
              value={form.name_lo}
              onChange={(e) => set('name_lo', e.target.value)}
              placeholder="ຊື່ລົດຍົກ"
            />
          </div>
          <div className="form-group">
            <label>Internal Code</label>
            <input
              value={form.internal_code}
              onChange={(e) => set('internal_code', e.target.value)}
              placeholder="DK asset tag"
            />
          </div>
        </div>

        {/* Row 3: Brand + Model Number */}
        <div className="form-row-2">
          <div className="form-group">
            <label>Brand</label>
            <select value={form.brand_id} onChange={(e) => set('brand_id', e.target.value)}>
              <option value="">— No brand —</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Model Number</label>
            <input
              value={form.model_number}
              onChange={(e) => set('model_number', e.target.value)}
              placeholder="e.g. EFG 216k"
            />
          </div>
        </div>

        {/* Row 4: Status + Condition */}
        <div className="form-row-2">
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)}>
              {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Condition</label>
            <select value={form.condition} onChange={(e) => set('condition', e.target.value)}>
              {CONDITION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Row 5: Fuel + Capacity */}
        <div className="form-row-2">
          <div className="form-group">
            <label>Fuel Type</label>
            <select value={form.fuel_type} onChange={(e) => set('fuel_type', e.target.value)}>
              {FUEL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Capacity (kg)</label>
            <input
              type="number"
              value={form.capacity_kg}
              onChange={(e) => set('capacity_kg', e.target.value)}
              placeholder="e.g. 1600"
              min="0"
            />
          </div>
        </div>

        {/* Row 6: Year + Hour Meter */}
        <div className="form-row-2">
          <div className="form-group">
            <label>Year Manufactured</label>
            <input
              type="number"
              value={form.year_manufactured}
              onChange={(e) => set('year_manufactured', e.target.value)}
              placeholder="e.g. 2024"
              min="1900"
              max="2100"
            />
          </div>
          <div className="form-group">
            <label>{forklift ? 'Current Hour Meter' : 'Initial Hour Meter'}</label>
            <input
              type="number"
              value={forklift ? form.current_hour_meter : form.initial_hour_meter}
              onChange={(e) => set(forklift ? 'current_hour_meter' : 'initial_hour_meter', e.target.value)}
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        {/* Row 7: Purchase Date + Warranty (create only) */}
        {!forklift && (
          <div className="form-row-2">
            <div className="form-group">
              <label>Purchase Date</label>
              <input
                type="date"
                value={form.purchase_date}
                onChange={(e) => set('purchase_date', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Warranty Expiry</label>
              <input
                type="date"
                value={form.warranty_expiry}
                onChange={(e) => set('warranty_expiry', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="form-group">
          <label>Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
            rows={2}
            placeholder="Optional notes..."
          />
        </div>

        {/* Active flag */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => set('is_active', e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Active
          </label>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : forklift ? 'Save Changes' : 'Register Forklift'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
