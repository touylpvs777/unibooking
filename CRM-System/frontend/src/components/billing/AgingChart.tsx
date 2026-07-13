import type { InvoiceOut } from '@/types/billing'

function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

interface Props {
  invoices: InvoiceOut[]
  currency: string
}

interface AgingBucket {
  label: string
  amount: number
  count: number
  color: string
}

export default function AgingChart({ invoices, currency }: Props) {
  const today = new Date()
  const buckets: AgingBucket[] = [
    { label: 'Current', amount: 0, count: 0, color: 'var(--color-success-500)' },
    { label: '1-30 days', amount: 0, count: 0, color: 'var(--color-info-500)' },
    { label: '31-60 days', amount: 0, count: 0, color: 'var(--color-warning-500)' },
    { label: '61-90 days', amount: 0, count: 0, color: 'var(--color-amber-600, #d97706)' },
    { label: '90+ days', amount: 0, count: 0, color: 'var(--color-danger-500)' },
  ]

  invoices
    .filter((inv) => inv.balance_due > 0 && ['issued', 'sent', 'partially_paid', 'overdue'].includes(inv.status))
    .forEach((inv) => {
      const due = inv.due_date ? new Date(inv.due_date) : new Date(inv.created_at)
      const daysOverdue = Math.floor((today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))

      let idx = 0
      if (daysOverdue <= 0) idx = 0
      else if (daysOverdue <= 30) idx = 1
      else if (daysOverdue <= 60) idx = 2
      else if (daysOverdue <= 90) idx = 3
      else idx = 4

      buckets[idx].amount += inv.balance_due
      buckets[idx].count += 1
    })

  const maxAmount = Math.max(...buckets.map((b) => b.amount), 1)
  const totalOutstanding = buckets.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)', padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--color-text-muted)' }}>
          Aging Receivables
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: totalOutstanding > 0 ? 'var(--color-danger-600)' : 'var(--color-text)' }}>
          {fmtAmt(totalOutstanding)} {currency}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {buckets.map((b) => (
          <div key={b.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{b.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: b.amount > 0 ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                {fmtAmt(b.amount)} {b.count > 0 ? `(${b.count})` : ''}
              </span>
            </div>
            <div style={{ height: 6, background: 'var(--color-bg)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${(b.amount / maxAmount) * 100}%`,
                background: b.color, borderRadius: 3, transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
