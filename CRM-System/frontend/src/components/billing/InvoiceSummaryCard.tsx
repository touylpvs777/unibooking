import { FileText } from 'lucide-react'

interface Props {
  totalInvoiced: number
  outstanding: number
  overdue: number
  invoiceCount: number
  currency: string
}

function fmtAmt(n: number) { return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) }

export default function InvoiceSummaryCard({ totalInvoiced, outstanding, overdue, invoiceCount, currency }: Props) {
  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)', padding: '18px 20px', borderLeft: '3px solid var(--color-primary-600)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <FileText size={16} style={{ color: 'var(--color-primary-600)' }} />
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--color-text-muted)' }}>Invoices</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--color-text)' }}>
        {fmtAmt(totalInvoiced)} {currency}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12 }}>
        <div><span style={{ color: 'var(--color-text-muted)' }}>Outstanding</span> <span style={{ fontWeight: 600, color: 'var(--color-warning-600)' }}>{fmtAmt(outstanding)}</span></div>
        <div><span style={{ color: 'var(--color-text-muted)' }}>Overdue</span> <span style={{ fontWeight: 600, color: 'var(--color-danger-600)' }}>{fmtAmt(overdue)}</span></div>
        <div><span style={{ color: 'var(--color-text-muted)' }}>Count</span> <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{invoiceCount}</span></div>
      </div>
    </div>
  )
}
