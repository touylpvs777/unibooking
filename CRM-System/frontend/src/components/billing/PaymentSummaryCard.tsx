import { CreditCard } from 'lucide-react'

interface Props {
  totalPaid: number
  paymentCount: number
  currency: string
}

function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

export default function PaymentSummaryCard({ totalPaid, paymentCount, currency }: Props) {
  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)', padding: '18px 20px', borderLeft: '3px solid var(--color-success-600)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <CreditCard size={16} style={{ color: 'var(--color-success-600)' }} />
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--color-text-muted)' }}>Payments</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--color-text)' }}>
        {fmtAmt(totalPaid)} {currency}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12 }}>
        <div><span style={{ color: 'var(--color-text-muted)' }}>Transactions</span> <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{paymentCount}</span></div>
      </div>
    </div>
  )
}
