import InvoiceStatusBadge from './InvoiceStatusBadge'
import type { InvoiceOut } from '@/types/billing'

function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }
function fmtAmt(n: number) { return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }

interface Props {
  invoices: InvoiceOut[]
  onRowClick?: (id: number) => void
}

export default function StatementTable({ invoices, onRowClick }: Props) {
  if (invoices.length === 0) {
    return (
      <div className="detail-empty-state" style={{ padding: '40px 20px' }}>
        No statement entries
      </div>
    )
  }

  let runningBalance = 0

  return (
    <div className="table-card">
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice #</th>
              <th>Description</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Charges</th>
              <th style={{ textAlign: 'right' }}>Payments</th>
              <th style={{ textAlign: 'right' }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              runningBalance += inv.balance_due
              return (
                <tr
                  key={inv.id}
                  style={{ cursor: onRowClick ? 'pointer' : undefined }}
                  onClick={() => onRowClick?.(inv.id)}
                >
                  <td className="cell-muted">{fmtDate(inv.issue_date || inv.created_at)}</td>
                  <td className="cell-desc">{inv.invoice_number}</td>
                  <td className="cell-muted">{inv.contract.contract_number}</td>
                  <td><InvoiceStatusBadge status={inv.status} /></td>
                  <td className="cell-mono" style={{ textAlign: 'right' }}>{fmtAmt(inv.total_amount)}</td>
                  <td className="cell-mono" style={{ textAlign: 'right', color: 'var(--color-success-600)' }}>
                    {inv.amount_paid > 0 ? fmtAmt(inv.amount_paid) : '—'}
                  </td>
                  <td className="cell-mono cell-total" style={{ textAlign: 'right', color: runningBalance > 0 ? 'var(--color-danger-600)' : 'var(--color-text)' }}>
                    {fmtAmt(runningBalance)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
