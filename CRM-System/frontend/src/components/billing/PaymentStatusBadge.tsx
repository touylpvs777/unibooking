import { Badge, type BadgeVariant } from '@/components/ui/Badge'

const STATUS_MAP: Record<string, { variant: BadgeVariant; label: string }> = {
  pending:   { variant: 'amber', label: 'Pending' },
  confirmed: { variant: 'green', label: 'Confirmed' },
  rejected:  { variant: 'red',   label: 'Rejected' },
  refunded:  { variant: 'gray',  label: 'Refunded' },
}

export default function PaymentStatusBadge({ status }: { status: string }) {
  const cfg = STATUS_MAP[status] ?? { variant: 'gray' as BadgeVariant, label: status }
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>
}
