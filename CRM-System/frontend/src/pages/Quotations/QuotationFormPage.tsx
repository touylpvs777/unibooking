import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { createQuotation } from '@/api/quotation'
import type { QuotationType } from '@/types/quotation'
import { toast } from '@/store/toastStore'
import PageHeader from '@/components/layout/PageHeader'
import '@/styles/shared.css'

const EMPTY = {
  quotation_type: 'rental',
  title: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  tax_rate: '0',
  currency: 'LAK',
  valid_from: '',
  valid_until: '',
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
        valid_from: form.valid_from || undefined,
        valid_until: form.valid_until || undefined,
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
              <input value={form.currency} onChange={(e) => set('currency', e.target.value)} maxLength={3} />
            </div>
          </div>

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
