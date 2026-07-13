import { useNavigate } from 'react-router-dom'
import {
  ClipboardList, Truck, Receipt, ShoppingCart, Wrench, ArrowRight,
} from 'lucide-react'

const ACTIONS = [
  { id: 'rental', label: 'Create Rental', desc: 'New rental contract', icon: ClipboardList, color: 'var(--color-primary-600)', href: '/rental-contracts/new' },
  { id: 'equipment', label: 'Add Equipment', desc: 'Register forklift', icon: Truck, color: 'var(--color-info-600)', href: '/equipment' },
  { id: 'invoice', label: 'Create Invoice', desc: 'Generate billing', icon: Receipt, color: 'var(--color-success-600)', href: '/billing/invoices' },
  { id: 'po', label: 'Purchase Order', desc: 'Order spare parts', icon: ShoppingCart, color: 'var(--color-warning-600)', href: '/inventory/purchase-orders' },
  { id: 'maintenance', label: 'Maintenance', desc: 'Schedule service', icon: Wrench, color: 'var(--color-purple-600)', href: '/maintenance' },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
      {ACTIONS.map((a) => (
        <div
          key={a.id}
          className="mp-card"
          onClick={() => navigate(a.href)}
          style={{ cursor: 'pointer' }}
        >
          <div className="mp-card-body" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 'var(--radius-md)',
                background: `color-mix(in srgb, ${a.color} 12%, transparent)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <a.icon size={18} style={{ color: a.color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 1 }}>{a.desc}</div>
              </div>
              <ArrowRight size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
