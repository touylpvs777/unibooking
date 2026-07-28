import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { createQuotation } from '@/api/quotation'
import type { QuotationType } from '@/types/quotation'
import { toast } from '@/store/toastStore'
import PageHeader from '@/components/layout/PageHeader'
import '@/styles/shared.css'

const CURRENCY_OPTIONS = ['LAK', 'THB', 'USD', 'CNY']

const EMPTY = {
  quotation_type: 'rental',
  title: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  tax_rate: '0',
  currency: 'LAK',
  exchange_rate: '1',
  bank_details: '',
  valid_from: '',
  valid_until: '',
  vehicle_make: '',
  vehicle_model: '',
  vehicle_vin: '',
  vehicle_engine_no: '',
  vehicle_reg_no: '',
  job_number: '',
  notes: '',
  internal_notes: '',
}

export default function QuotationFormPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm]         = useState({ ...EMPTY })
  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr]           = useState<string | null>(null)

  const TYPE_OPTIONS = [
    { value: 'rental', label: t('quotations.form.typeOptions.rental') },
    { value: 'sales', label: t('quotations.form.typeOptions.sales') },
    { value: 'service', label: t('quotations.form.typeOptions.service') },
    { value: 'spare_parts', label: t('quotations.form.typeOptions.spareParts') },
  ]

  const set = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { setErr(t('quotations.form.titleRequired')); return }

    setIsSaving(true)
    setErr(null)

    try {
      const { data } = await createQuotation({
        quotation_type: form.quotation_type as QuotationType,
        title: form.title.trim(),
        contact_name: form.contact_name.trim() || undefined,
        contact_email: form.contact_email.trim() || undefined,
        contact_phone: form.contact_phone.trim() || undefined,
        tax_rate: form.tax_rate ? Number(form.tax_rate) : 0,
        currency: form.currency,
        exchange_rate: form.exchange_rate ? Number(form.exchange_rate) : 1,
        bank_details: form.bank_details.trim() || undefined,
        valid_from: form.valid_from || undefined,
        valid_until: form.valid_until || undefined,
        vehicle_make: form.vehicle_make.trim() || undefined,
        vehicle_model: form.vehicle_model.trim() || undefined,
        vehicle_vin: form.vehicle_vin.trim() || undefined,
        vehicle_engine_no: form.vehicle_engine_no.trim() || undefined,
        vehicle_reg_no: form.vehicle_reg_no.trim() || undefined,
        job_number: form.job_number.trim() || undefined,
        notes: form.notes.trim() || undefined,
        internal_notes: form.internal_notes.trim() || undefined,
      })
      toast.success(t('quotations.form.createdToast', { number: data.quotation_number }))
      navigate(`/quotations/${data.id}`)
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('quotations.form.createFailed'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <button
        className="detail-back"
        onClick={() => navigate('/quotations')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 13.5, marginBottom: 20 }}
      >
        <ChevronLeft size={16} /> {t('quotations.form.backToQuotations')}
      </button>

      <PageHeader title={t('quotations.form.newQuotation')} style={{ marginBottom: 24 }} />

      <div style={{ maxWidth: 700, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 24 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          {err && <div className="page-error" style={{ margin: 0 }}><AlertCircle size={14} /> {err}</div>}

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('quotations.form.typeLabel')} <span className="required">*</span></label>
              <select value={form.quotation_type} onChange={(e) => set('quotation_type', e.target.value)}>
                {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{t('quotations.form.currencyLabel')}</label>
              <select value={form.currency} onChange={(e) => set('currency', e.target.value)}>
                {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {form.currency !== 'LAK' && (
            <div className="form-row-2">
              <div className="form-group">
                <label>{t('quotations.form.exchangeRateLabel')}</label>
                <input
                  type="number" min="0" step="0.0001"
                  value={form.exchange_rate}
                  onChange={(e) => set('exchange_rate', e.target.value)}
                  placeholder="1"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>{t('quotations.form.titleLabel')} <span className="required">*</span></label>
            <input
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder={t('quotations.form.titlePlaceholder')}
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('quotations.form.contactNameLabel')}</label>
              <input value={form.contact_name} onChange={(e) => set('contact_name', e.target.value)} placeholder={t('quotations.form.contactNamePlaceholder')} />
            </div>
            <div className="form-group">
              <label>{t('quotations.form.contactEmailLabel')}</label>
              <input type="email" value={form.contact_email} onChange={(e) => set('contact_email', e.target.value)} placeholder={t('quotations.form.contactEmailPlaceholder')} />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('quotations.form.contactPhoneLabel')}</label>
              <input value={form.contact_phone} onChange={(e) => set('contact_phone', e.target.value)} placeholder={t('quotations.form.contactPhonePlaceholder')} />
            </div>
            <div className="form-group">
              <label>{t('quotations.form.taxRateLabel')}</label>
              <input type="number" value={form.tax_rate} onChange={(e) => set('tax_rate', e.target.value)} min="0" max="100" step="0.1" />
            </div>
          </div>

          <div className="form-group">
            <label>{t('quotations.form.vehicleInfo.title')}</label>
            <div className="form-row-3">
              <div className="form-group">
                <label>{t('quotations.form.vehicleInfo.make')}</label>
                <input value={form.vehicle_make} onChange={(e) => set('vehicle_make', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('quotations.form.vehicleInfo.model')}</label>
                <input value={form.vehicle_model} onChange={(e) => set('vehicle_model', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('quotations.form.vehicleInfo.vin')}</label>
                <input value={form.vehicle_vin} onChange={(e) => set('vehicle_vin', e.target.value)} />
              </div>
            </div>
            <div className="form-row-3" style={{ marginTop: 12 }}>
              <div className="form-group">
                <label>{t('quotations.form.vehicleInfo.engineNo')}</label>
                <input value={form.vehicle_engine_no} onChange={(e) => set('vehicle_engine_no', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('quotations.form.vehicleInfo.regNo')}</label>
                <input value={form.vehicle_reg_no} onChange={(e) => set('vehicle_reg_no', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('quotations.form.vehicleInfo.jobNumber')}</label>
                <input value={form.job_number} onChange={(e) => set('job_number', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>{t('quotations.form.bankDetails')}</label>
            <textarea
              value={form.bank_details}
              onChange={(e) => set('bank_details', e.target.value)}
              rows={3}
              placeholder={t('quotations.form.bankDetailsPlaceholder')}
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('quotations.form.validFromLabel')}</label>
              <input type="date" value={form.valid_from} onChange={(e) => set('valid_from', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('quotations.form.validUntilLabel')}</label>
              <input type="date" value={form.valid_until} onChange={(e) => set('valid_until', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>{t('quotations.form.notesLabel')}</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} placeholder={t('quotations.form.notesPlaceholder')} />
          </div>

          <div className="form-group">
            <label>{t('quotations.form.internalNotesLabel')}</label>
            <textarea value={form.internal_notes} onChange={(e) => set('internal_notes', e.target.value)} rows={2} placeholder={t('quotations.form.internalNotesPlaceholder')} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/quotations')} disabled={isSaving}>
              {t('common.cancel')}
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? t('quotations.form.creating') : t('quotations.form.createQuotation')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
