import { useNavigate } from 'react-router-dom'
import { FileText, CreditCard, Landmark, FileSpreadsheet, TrendingUp, Receipt, ArrowRight } from 'lucide-react'

const ITEMS = [
  { id: 'invoices', label: 'Invoices', desc: 'Create and manage', icon: FileText, color: 'var(--color-primary-600)', href: '/billing/invoices' },
  { id: 'payments', label: 'Payments', desc: 'Track collection', icon: CreditCard, color: 'var(--color-success-600)', href: '/billing/payments' },
  { id: 'deposits', label: 'Deposits', desc: 'Security deposits', icon: Landmark, color: 'var(--color-info-600)', href: '/billing/deposits' },
  { id: 'statements', label: 'Statements', desc: 'Account activity', icon: FileSpreadsheet, color: 'var(--color-purple-600)', href: '/billing/statements' },
  { id: 'finance', label: 'Analytics', desc: 'Charts & trends', icon: TrendingUp, color: 'var(--color-warning-600)', href: '/billing/finance' },
  { id: 'recognition', label: 'Revenue', desc: 'Recognition schedule', icon: Receipt, color: 'var(--color-gray-500)', href: '/billing/revenue-recognitions' },
]

export default function FinanceQuickNav() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
      {ITEMS.map((item) => (
        <div key={item.id} className="mp-card" onClick={() => navigate(item.href)} style={{ cursor: 'pointer' }}>
          <div className="mp-card-body" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 'var(--radius-md)',
                background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{item.desc}</div>
              </div>
              <ArrowRight size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
