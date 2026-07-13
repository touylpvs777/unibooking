import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import type { Product, Brand, ProductCategory } from '@/types/catalog'
import '@/styles/shared.css'

interface ProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, unknown>) => Promise<boolean>
  product?: Product | null
  brands: Brand[]
  categories: ProductCategory[]
}

const EMPTY = {
  name_en: '',
  name_lo: '',
  sku: '',
  model_number: '',
  brand_id: '',
  category_id: '',
  description_en: '',
  is_active: true,
  is_featured: false,
  is_sale: true,
  is_rental: false,
  is_used_available: false,
  is_service_item: false,
}

export default function ProductForm({
  isOpen,
  onClose,
  onSubmit,
  product,
  brands,
  categories,
}: ProductFormProps) {
  const [form, setForm]         = useState({ ...EMPTY })
  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr]           = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return
    if (product) {
      setForm({
        name_en:           product.name_en,
        name_lo:           product.name_lo ?? '',
        sku:               product.sku,
        model_number:      product.model_number ?? '',
        brand_id:          product.brand?.id?.toString() ?? '',
        category_id:       product.category?.id?.toString() ?? '',
        description_en:    '',
        is_active:         product.is_active,
        is_featured:       product.is_featured,
        is_sale:           product.is_sale,
        is_rental:         product.is_rental,
        is_used_available: product.is_used_available,
        is_service_item:   product.is_service_item,
      })
    } else {
      setForm({ ...EMPTY })
    }
    setErr(null)
  }, [isOpen, product])

  const set = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name_en.trim()) { setErr('Product name is required.'); return }
    setIsSaving(true)
    setErr(null)
    const payload: Record<string, unknown> = {
      name_en:           form.name_en.trim(),
      name_lo:           form.name_lo.trim() || undefined,
      model_number:      form.model_number.trim() || undefined,
      brand_id:          form.brand_id ? Number(form.brand_id) : null,
      category_id:       form.category_id ? Number(form.category_id) : null,
      description_en:    form.description_en.trim() || undefined,
      is_active:         form.is_active,
      is_featured:       form.is_featured,
      is_sale:           form.is_sale,
      is_rental:         form.is_rental,
      is_used_available: form.is_used_available,
      is_service_item:   form.is_service_item,
    }
    if (!product && form.sku.trim()) payload.sku = form.sku.trim()
    const ok = await onSubmit(payload)
    setIsSaving(false)
    if (ok) onClose()
    else setErr('Save failed. Please try again.')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product' : 'New Product'}
      width={620}
    >
      <form onSubmit={handleSubmit} className="form-grid">
        {err && <div className="page-error" style={{ margin: 0 }}>{err}</div>}

        <div className="form-row-2">
          <div className="form-group">
            <label>Name (English) <span className="required">*</span></label>
            <input
              value={form.name_en}
              onChange={(e) => set('name_en', e.target.value)}
              placeholder="Product name in English"
              required
            />
          </div>
          <div className="form-group">
            <label>Name (Lao)</label>
            <input
              value={form.name_lo}
              onChange={(e) => set('name_lo', e.target.value)}
              placeholder="ຊື່ສິນຄ້າ"
            />
          </div>
        </div>

        <div className="form-row-2">
          {!product && (
            <div className="form-group">
              <label>SKU</label>
              <input
                value={form.sku}
                onChange={(e) => set('sku', e.target.value)}
                placeholder="Auto-generated if blank"
              />
            </div>
          )}
          <div className="form-group">
            <label>Model Number</label>
            <input
              value={form.model_number}
              onChange={(e) => set('model_number', e.target.value)}
              placeholder="e.g. EFG115"
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Brand</label>
            <select value={form.brand_id} onChange={(e) => set('brand_id', e.target.value)}>
              <option value="">— No brand —</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={form.category_id} onChange={(e) => set('category_id', e.target.value)}>
              <option value="">— No category —</option>
              {categories.map((c) => {
                const d = (c as never as { _depth: number })._depth ?? 0
                return <option key={c.id} value={c.id}>{'  '.repeat(d)}{c.name_en}</option>
              })}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={form.description_en}
            onChange={(e) => set('description_en', e.target.value)}
            rows={3}
            placeholder="Product description…"
          />
        </div>

        {/* Flags */}
        <div>
          <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--color-text)', display: 'block', marginBottom: 8 }}>
            Attributes
          </label>
          <div className="product-flags">
            {([
              ['is_active',         'Active'],
              ['is_sale',           'For Sale'],
              ['is_rental',         'For Rental'],
              ['is_featured',       'Featured'],
              ['is_used_available', 'Used Available'],
              ['is_service_item',   'Service Item'],
            ] as [string, string][]).map(([key, label]) => (
              <label key={key} className="flag-check">
                <input
                  type="checkbox"
                  checked={!!form[key as keyof typeof form]}
                  onChange={(e) => set(key, e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving…' : product ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>

      <style>{`
        .product-flags { display: flex; flex-wrap: wrap; gap: 10px; }
        .flag-check {
          display: flex; align-items: center; gap: 5px;
          font-size: 13px; cursor: pointer; user-select: none;
        }
        .flag-check input { cursor: pointer; }
      `}</style>
    </Modal>
  )
}
