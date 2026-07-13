import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { createRentalContract } from '@/api/rental'
import { toast } from '@/store/toastStore'
import type { ContractType } from '@/types/rental'
import '@/styles/shared.css'

const TYPE_OPTIONS = [
  { value: 'short_term', label: 'Short Term' },
  { value: 'long_term', label: 'Long Term' },
  { value: 'project', label: 'Project' },
]

const EMPTY = {
  contract_type: 'short_term',
  customer_id: '',
  start_date: '',
  end_date: '',
  tax_rate: '0',
  currency: 'LAK',
  deposit_amount: '0',
  delivery_address: '',
  delivery_contact_name: '',
  delivery_contact_phone: '',
  notes: '',
  internal_notes: '',
}

export default function RentalContractFormPage() {
  const navigate = useNavigate()
  const [form, setForm]         = useState({ ...EMPTY })
  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr]           = useState<string | null>(null)

  const set = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.customer_id) { setErr('Customer ID is required.'); return }
    if (!form.start_date) { setErr('Start date is required.'); return }
    if (!form.end_date) { setErr('End date is required.'); return }

    setIsSaving(true)
    setErr(null)

    try {
      const { data } = await createRentalContract({
        contract_type: form.contract_type as ContractType,
        customer_id: Number(form.customer_id),
        start_date: form.start_date,
        end_date: form.end_date,
        tax_rate: form.tax_rate ? Number(form.tax_rate) : 0,
        currency: form.currency,
        deposit_amount: form.deposit_amount ? Number(form.deposit_amount) : 0,
        delivery_address: form.delivery_address.trim() || undefined,
        delivery_contact_name: form.delivery_contact_name.trim() || undefined,
        delivery_contact_phone: form.delivery_contact_phone.trim() || undefined,
        notes: form.notes.trim() || undefined,
        internal_notes: form.internal_notes.trim() || undefined,
      })
      toast.success(`Contract ${data.contract_number} created.`)
      navigate(`/rental-contracts/${data.id}`)
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? 'Failed to create rental contract.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <button
        className="detail-back"
        onClick={() => navigate('/rental-contracts')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 13.5, marginBottom: 20 }}
      >
        <ChevronLeft size={16} /> Back to Rental Contracts
      </button>

      <div className="page-header" style={{ marginBottom: 24 }}>
        <h1>New Rental Contract</h1>
      </div>

      <div style={{ maxWidth: 700, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 24 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          {err && <div className="page-error" style={{ margin: 0 }}><AlertCircle size={14} /> {err}</div>}

          <div className="form-row-2">
            <div className="form-group">
              <label>Contract Type <span className="required">*</span></label>
              <select value={form.contract_type} onChange={(e) => set('contract_type', e.target.value)}>
                {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Currency</label>
              <input value={form.currency} onChange={(e) => set('currency', e.target.value)} maxLength={3} />
            </div>
          </div>

          <div className="form-group">
            <label>Customer ID <span className="required">*</span></label>
            <input
              type="number"
              value={form.customer_id}
              onChange={(e) => set('customer_id', e.target.value)}
              placeholder="Enter customer ID"
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Start Date <span className="required">*</span></label>
              <input type="date" value={form.start_date} onChange={(e) => set('start_date', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>End Date <span className="required">*</span></label>
              <input type="date" value={form.end_date} onChange={(e) => set('end_date', e.target.value)} required />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Tax Rate (%)</label>
              <input type="number" value={form.tax_rate} onChange={(e) => set('tax_rate', e.target.value)} min="0" max="100" step="0.1" />
            </div>
            <div className="form-group">
              <label>Deposit Amount</label>
              <input type="number" value={form.deposit_amount} onChange={(e) => set('deposit_amount', e.target.value)} min="0" step="any" />
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Address</label>
            <input value={form.delivery_address} onChange={(e) => set('delivery_address', e.target.value)} placeholder="Full delivery address" />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Delivery Contact Name</label>
              <input value={form.delivery_contact_name} onChange={(e) => set('delivery_contact_name', e.target.value)} placeholder="Mr. / Ms." />
            </div>
            <div className="form-group">
              <label>Delivery Contact Phone</label>
              <input value={form.delivery_contact_phone} onChange={(e) => set('delivery_contact_phone', e.target.value)} placeholder="+856 20 ..." />
            </div>
          </div>

          <div className="form-group">
            <label>Notes (customer-visible)</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} placeholder="Visible on contract..." />
          </div>

          <div className="form-group">
            <label>Internal Notes</label>
            <textarea value={form.internal_notes} onChange={(e) => set('internal_notes', e.target.value)} rows={2} placeholder="Internal only, not shown to customer..." />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/rental-contracts')} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Creating...' : 'Create Contract'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
