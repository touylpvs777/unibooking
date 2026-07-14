import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { createRentalContract } from '@/api/rental'
import { toast } from '@/store/toastStore'
import type { ContractType } from '@/types/rental'
import '@/styles/shared.css'

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
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm]         = useState({ ...EMPTY })
  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr]           = useState<string | null>(null)

  const TYPE_OPTIONS = [
    { value: 'short_term', label: t('rental.contractType.shortTerm') },
    { value: 'long_term', label: t('rental.contractType.longTerm') },
    { value: 'project', label: t('rental.contractType.project') },
  ]

  const set = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.customer_id) { setErr(t('rental.form.customerIdRequired')); return }
    if (!form.start_date) { setErr(t('rental.form.startDateRequired')); return }
    if (!form.end_date) { setErr(t('rental.form.endDateRequired')); return }

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
      toast.success(t('rental.form.createdToast', { number: data.contract_number }))
      navigate(`/rental-contracts/${data.id}`)
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('rental.form.createFailed'))
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
        <ChevronLeft size={16} /> {t('rental.form.backToContracts')}
      </button>

      <div className="page-header" style={{ marginBottom: 24 }}>
        <h1>{t('rental.form.newContract')}</h1>
      </div>

      <div style={{ maxWidth: 700, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 24 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          {err && <div className="page-error" style={{ margin: 0 }}><AlertCircle size={14} /> {err}</div>}

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('rental.form.contractType')} <span className="required">*</span></label>
              <select value={form.contract_type} onChange={(e) => set('contract_type', e.target.value)}>
                {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{t('rental.form.currencyLabel')}</label>
              <input value={form.currency} onChange={(e) => set('currency', e.target.value)} maxLength={3} />
            </div>
          </div>

          <div className="form-group">
            <label>{t('rental.form.customerId')} <span className="required">*</span></label>
            <input
              type="number"
              value={form.customer_id}
              onChange={(e) => set('customer_id', e.target.value)}
              placeholder={t('rental.form.customerIdPlaceholder')}
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('rental.form.startDate')} <span className="required">*</span></label>
              <input type="date" value={form.start_date} onChange={(e) => set('start_date', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>{t('rental.form.endDate')} <span className="required">*</span></label>
              <input type="date" value={form.end_date} onChange={(e) => set('end_date', e.target.value)} required />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('rental.form.taxRateLabel')}</label>
              <input type="number" value={form.tax_rate} onChange={(e) => set('tax_rate', e.target.value)} min="0" max="100" step="0.1" />
            </div>
            <div className="form-group">
              <label>{t('rental.form.depositAmount')}</label>
              <input type="number" value={form.deposit_amount} onChange={(e) => set('deposit_amount', e.target.value)} min="0" step="any" />
            </div>
          </div>

          <div className="form-group">
            <label>{t('rental.form.deliveryAddress')}</label>
            <input value={form.delivery_address} onChange={(e) => set('delivery_address', e.target.value)} placeholder={t('rental.form.deliveryAddressPlaceholder')} />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('rental.form.deliveryContactName')}</label>
              <input value={form.delivery_contact_name} onChange={(e) => set('delivery_contact_name', e.target.value)} placeholder={t('rental.form.deliveryContactNamePlaceholder')} />
            </div>
            <div className="form-group">
              <label>{t('rental.form.deliveryContactPhone')}</label>
              <input value={form.delivery_contact_phone} onChange={(e) => set('delivery_contact_phone', e.target.value)} placeholder={t('rental.form.deliveryContactPhonePlaceholder')} />
            </div>
          </div>

          <div className="form-group">
            <label>{t('rental.form.notesLabel')}</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} placeholder={t('rental.form.notesPlaceholder')} />
          </div>

          <div className="form-group">
            <label>{t('rental.form.internalNotesLabel')}</label>
            <textarea value={form.internal_notes} onChange={(e) => set('internal_notes', e.target.value)} rows={2} placeholder={t('rental.form.internalNotesPlaceholder')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/rental-contracts')} disabled={isSaving}>
              {t('common.cancel')}
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? t('rental.form.creating') : t('rental.form.createContract')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
