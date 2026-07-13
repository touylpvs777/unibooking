import { useState, useEffect, type FormEvent } from 'react'
import Modal from '@/components/ui/Modal'
import type { Customer, CustomerCreate, CustomerStatus } from '@/types/customer'

interface CustomerFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CustomerCreate) => Promise<boolean>
  customer?: Customer | null
}

const EMPTY = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  status: 'prospect' as CustomerStatus,
  notes: '',
}

export default function CustomerForm({ isOpen, onClose, onSubmit, customer }: CustomerFormProps) {
  const isEdit = !!customer
  const [fields, setFields] = useState(EMPTY)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFields(
        customer
          ? {
              first_name: customer.first_name,
              last_name: customer.last_name,
              email: customer.email ?? '',
              phone: customer.phone ?? '',
              company: customer.company ?? '',
              status: customer.status,
              notes: customer.notes ?? '',
            }
          : EMPTY
      )
    }
  }, [isOpen, customer])

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const payload: CustomerCreate = {
      first_name: fields.first_name.trim(),
      last_name: fields.last_name.trim(),
      status: fields.status,
      ...(fields.email.trim()   && { email:   fields.email.trim() }),
      ...(fields.phone.trim()   && { phone:   fields.phone.trim() }),
      ...(fields.company.trim() && { company: fields.company.trim() }),
      ...(fields.notes.trim()   && { notes:   fields.notes.trim() }),
    }
    const ok = await onSubmit(payload)
    setIsLoading(false)
    if (ok) onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Customer' : 'New Customer'}
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" form="customer-form" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Customer'}
          </button>
        </>
      }
    >
      <form id="customer-form" onSubmit={handleSubmit} className="form-grid">
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="cf-first">First Name <span className="required">*</span></label>
            <input id="cf-first" value={fields.first_name} onChange={set('first_name')} required placeholder="John" />
          </div>
          <div className="form-group">
            <label htmlFor="cf-last">Last Name <span className="required">*</span></label>
            <input id="cf-last" value={fields.last_name} onChange={set('last_name')} required placeholder="Doe" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" type="email" value={fields.email} onChange={set('email')} placeholder="john@example.com" />
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="cf-phone">Phone</label>
            <input id="cf-phone" value={fields.phone} onChange={set('phone')} placeholder="+1 555 000 0000" />
          </div>
          <div className="form-group">
            <label htmlFor="cf-status">Status</label>
            <select id="cf-status" value={fields.status} onChange={set('status')}>
              <option value="prospect">Prospect</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="churned">Churned</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" value={fields.company} onChange={set('company')} placeholder="Acme Corp" />
        </div>

        <div className="form-group">
          <label htmlFor="cf-notes">Notes</label>
          <textarea id="cf-notes" value={fields.notes} onChange={set('notes')} placeholder="Any additional notes…" rows={3} />
        </div>
      </form>
    </Modal>
  )
}
