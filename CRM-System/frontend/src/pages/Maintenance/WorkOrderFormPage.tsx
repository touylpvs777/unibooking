import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { createWorkOrder, getTechnicians } from '@/api/maintenance'
import AssetSelect from '@/components/maintenance/AssetSelect'
import { toast } from '@/store/toastStore'
import type { OrderType, UserBrief } from '@/types/maintenance'
import type { Forklift } from '@/types/forklift'
import PageHeader from '@/components/layout/PageHeader'
import '@/styles/shared.css'

const TYPE_OPTIONS: { value: OrderType; labelKey: string }[] = [
  { value: 'preventive', labelKey: 'maintenance.type.preventive' },
  { value: 'corrective', labelKey: 'maintenance.type.corrective' },
  { value: 'inspection', labelKey: 'maintenance.type.inspection' },
  { value: 'install', labelKey: 'maintenance.type.install' },
]

export default function WorkOrderFormPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [asset, setAsset] = useState<Forklift | null>(null)
  const [orderType, setOrderType] = useState<OrderType>('preventive')
  const [scheduledAt, setScheduledAt] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [technicians, setTechnicians] = useState<UserBrief[]>([])

  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    getTechnicians().then(({ data }) => setTechnicians(data)).catch(() => setTechnicians([]))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setErr(t('maintenance.workOrders.form.errors.titleRequired')); return }
    if (!asset) { setErr(t('maintenance.workOrders.form.errors.assetRequired')); return }
    if (!scheduledAt) { setErr(t('maintenance.workOrders.form.errors.scheduleRequired')); return }

    setIsSaving(true); setErr(null)
    try {
      const { data } = await createWorkOrder({
        forklift_id: asset.id,
        order_type: orderType,
        title: title.trim(),
        scheduled_date: new Date(scheduledAt).toISOString(),
        assigned_to: assignedTo ? Number(assignedTo) : undefined,
      })
      toast.success(t('maintenance.workOrders.form.created', { number: data.work_order_number }))
      navigate(`/maintenance/work-orders/${data.id}`)
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('maintenance.workOrders.form.createFailed'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <button
        className="detail-back"
        onClick={() => navigate('/maintenance/work-orders')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 13.5, marginBottom: 20 }}
      >
        <ChevronLeft size={16} /> {t('maintenance.workOrders.form.backToList')}
      </button>

      <PageHeader title={t('maintenance.workOrders.form.title')} style={{ marginBottom: 24 }} />

      <div style={{ maxWidth: 700, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 24 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          {err && <div className="page-error" style={{ margin: 0 }}><AlertCircle size={14} /> {err}</div>}

          <div className="form-group">
            <label>{t('maintenance.workOrders.form.workOrderTitle')} <span className="required">*</span></label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('maintenance.workOrders.form.workOrderTitlePlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <label>{t('maintenance.workOrders.form.asset')} <span className="required">*</span></label>
            <AssetSelect onChange={setAsset} placeholder={t('maintenance.workOrders.form.assetSearchPlaceholder')} />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('maintenance.workOrders.form.workType')} <span className="required">*</span></label>
              <select value={orderType} onChange={(e) => setOrderType(e.target.value as OrderType)}>
                {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{t('maintenance.workOrders.form.assignee')}</label>
              <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                <option value="">{t('maintenance.workOrders.form.unassigned')}</option>
                {technicians.map((u) => (
                  <option key={u.id} value={u.id}>{u.full_name ?? u.username}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>{t('maintenance.workOrders.form.schedule')} <span className="required">*</span></label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/maintenance/work-orders')} disabled={isSaving}>{t('common.cancel')}</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>{isSaving ? t('maintenance.workOrders.form.creating') : t('maintenance.workOrders.form.createWorkOrder')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
