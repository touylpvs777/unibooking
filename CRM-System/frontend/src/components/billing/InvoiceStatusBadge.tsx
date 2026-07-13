import { Badge, type BadgeVariant } from '@/components/ui/Badge'

const STATUS_MAP: Record<string, { variant: BadgeVariant; label: string }> = {
  draft:          { variant: 'gray',   label: 'Draft' },
  issued:         { variant: 'blue',   label: 'Issued' },
  sent:           { variant: 'purple', label: 'Sent' },
  partially_paid: { variant: 'amber',  label: 'Partial' },
  paid:           { variant: 'green',  label: 'Paid' },
  overdue:        { variant: 'red',    label: 'Overdue' },
  cancelled:      { variant: 'gray',   label: 'Cancelled' },
  voided:         { variant: 'gray',   label: 'Voided' },
}

export default function InvoiceStatusBadge({ status }: { status: string }) {
  const cfg = STATUS_MAP[status] ?? { variant: 'gray' as BadgeVariant, label: status }
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>
}
