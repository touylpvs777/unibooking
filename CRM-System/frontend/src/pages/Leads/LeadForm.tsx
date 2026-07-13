import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import Modal from '@/components/ui/Modal'
import type { Lead, LeadCreate, LeadSource, LeadStatus } from '@/types/lead'

// Valid status transitions mirroring the backend VALID_TRANSITIONS dict
const TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  new:       ['new', 'contacted', 'lost'],
  contacted: ['contacted', 'qualified', 'lost'],
  qualified: ['qualified', 'proposal', 'lost'],
  proposal:  ['proposal', 'won', 'lost'],
  won:       ['won'],
  lost:      ['lost', 'new'],
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New', contacted: 'Contacted', qualified: 'Qualified',
  proposal: 'Proposal', won: 'Won', lost: 'Lost',
}

const SOURCE_OPTIONS: { value: LeadSource; label: string }[] = [
  { value: 'website',      label: 'Website' },
  { value: 'referral',     label: 'Referral' },
  { value: 'cold_call',    label: 'Cold Call' },
  { value: 'email',        label: 'Email' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'other',        label: 'Other' },
]

interface LeadFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: LeadCreate) => Promise<boolean>
  lead?: Lead | null
}

const EMPTY = {
  title: '',
  description: '',
  value: '',
  source: '' as LeadSource | '',
  status: 'new' as LeadStatus,
}

export default function LeadForm({ isOpen, onClose, onSubmit, lead }: LeadFormProps) {
  const isEdit = !!lead
  const [fields, setFields] = useState(EMPTY)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setFields(
      lead
        ? {
            title:       lead.title,
            description: lead.description ?? '',
            value:       lead.value != null ? String(lead.value) : '',
            source:      lead.source ?? '',
            status:      lead.status,
          }
        : EMPTY
    )
  }, [isOpen, lead])

  const set =
    (key: keyof typeof EMPTY) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields((p) => ({ ...p, [key]: e.target.value }))

  const allowedStatuses: LeadStatus[] = isEdit
    ? TRANSITIONS[lead!.status]
    : ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const payload: LeadCreate = {
      title:  fields.title.trim(),
      status: fields.status,
      ...(fields.description.trim() && { description: fields.description.trim() }),
      ...(fields.value              && { value: parseFloat(fields.value) }),
      ...(fields.source             && { source: fields.source as LeadSource }),
    }
    const ok = await onSubmit(payload)
    setLoading(false)
    if (ok) onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Lead' : 'New Lead'}
      width={500}
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" form="lead-form" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Lead'}
          </button>
        </>
      }
    >
      <form id="lead-form" onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="lf-title">Title <span className="required">*</span></label>
          <input
            id="lf-title"
            value={fields.title}
            onChange={set('title')}
            required
            placeholder="e.g. Enterprise Software Deal"
          />
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="lf-status">Status</label>
            <select id="lf-status" value={fields.status} onChange={set('status')}>
              {allowedStatuses.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
            {isEdit && lead!.status === 'won' && (
              <small style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>
                Won leads cannot be moved to another status.
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lf-source">Source</label>
            <select id="lf-source" value={fields.source} onChange={set('source')}>
              <option value="">— None —</option>
              {SOURCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lf-value">Value ($)</label>
          <div className="input-prefix-wrap">
            <span className="input-prefix">$</span>
            <input
              id="lf-value"
              type="number"
              min="0"
              step="0.01"
              value={fields.value}
              onChange={set('value')}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lf-desc">Description</label>
          <textarea
            id="lf-desc"
            value={fields.description}
            onChange={set('description')}
            placeholder="Brief notes about this lead…"
            rows={3}
          />
        </div>
      </form>
    </Modal>
  )
}
