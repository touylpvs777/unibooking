import { useState, useEffect } from 'react'
import { AlertCircle, Plus, RefreshCw } from 'lucide-react'
import { getWarehouses, createWarehouse } from '@/api/inventory'
import { WarehouseGrid, WarehouseGridSkeleton } from '@/modules/inventory'
import Modal from '@/components/ui/Modal'
import { toast } from '@/store/toastStore'
import type { Warehouse as WH } from '@/types/inventory'
import '@/styles/shared.css'

export default function WarehousePage() {
  const [items, setItems] = useState<WH[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  const load = async () => {
    setIsLoading(true); setError(null)
    try { setItems((await getWarehouses()).data) }
    catch { setError('Failed to load warehouses.') }
    finally { setIsLoading(false) }
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Warehouses</h1>
          <p className="page-header-sub">{items.length} warehouses</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={load} disabled={isLoading}>
            <RefreshCw size={14} className={isLoading ? 'spin' : ''} /> Refresh
          </button>
          <button className="btn btn-primary" onClick={() => setFormOpen(true)}>
            <Plus size={15} /> Add Warehouse
          </button>
        </div>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      {isLoading ? <WarehouseGridSkeleton /> : <WarehouseGrid warehouses={items} />}

      <AddWarehouseModal isOpen={formOpen} onClose={() => setFormOpen(false)} onSuccess={load} />
    </div>
  )
}


function AddWarehouseModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ code: '', name: '', address: '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => { if (isOpen) { setForm({ code: '', name: '', address: '' }); setErr(null) } }, [isOpen])

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.code.trim() || !form.name.trim()) { setErr('Code and name are required.'); return }
    setSaving(true); setErr(null)
    try {
      await createWarehouse({ code: form.code.trim(), name: form.name.trim(), address: form.address.trim() || undefined })
      toast.success('Warehouse created.')
      onClose(); onSuccess()
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? 'Failed to create warehouse.')
    } finally { setSaving(false) }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Warehouse" width={460}>
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}
        <div className="form-row-2">
          <div className="form-group">
            <label>Code <span className="required">*</span></label>
            <input value={form.code} onChange={(e) => set('code', e.target.value)} placeholder="WH-A" required />
          </div>
          <div className="form-group">
            <label>Name <span className="required">*</span></label>
            <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Warehouse Alpha" required />
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea value={form.address} onChange={(e) => set('address', e.target.value)} rows={2} placeholder="Full address (optional)" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Creating...' : 'Create'}</button>
        </div>
      </form>
    </Modal>
  )
}
