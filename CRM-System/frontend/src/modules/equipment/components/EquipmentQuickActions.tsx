import { useNavigate } from 'react-router-dom'
import { Plus, Wrench, ArrowRightLeft, ClipboardList } from 'lucide-react'

const ACTIONS = [
  { id: 'register', label: 'Register Equipment', desc: 'Add new forklift', icon: Plus, color: 'var(--color-primary-600)' },
  { id: 'movement', label: 'Create Movement', desc: 'Transfer equipment', icon: ArrowRightLeft, color: 'var(--color-info-600)', href: '/movements/new' },
  { id: 'maintenance', label: 'Schedule Service', desc: 'Preventive maintenance', icon: Wrench, color: 'var(--color-warning-600)', href: '/maintenance' },
  { id: 'rental', label: 'New Rental', desc: 'Assign to contract', icon: ClipboardList, color: 'var(--color-success-600)', href: '/rental-contracts/new' },
]

interface Props {
  onRegister: () => void
}

export default function EquipmentQuickActions({ onRegister }: Props) {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {ACTIONS.map((a) => (
        <button
          key={a.id}
          className="btn btn-ghost"
          onClick={() => a.href ? navigate(a.href) : onRegister()}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5 }}
        >
          <a.icon size={14} style={{ color: a.color }} /> {a.label}
        </button>
      ))}
    </div>
  )
}
