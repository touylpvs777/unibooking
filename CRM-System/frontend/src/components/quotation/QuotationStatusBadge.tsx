import { Badge } from '@/components/ui/Badge'

type BadgeVariant = 'green' | 'amber' | 'gray' | 'blue' | 'red' | 'purple' | 'cyan'

const STATUS_MAP: Record<string, BadgeVariant> = {
  draft:        'gray',
  under_review: 'amber',
  approved:     'blue',
  revision:     'purple',
  sent:         'cyan',
  accepted:     'green',
  rejected:     'red',
  expired:      'gray',
  converted:    'green',
  cancelled:    'gray',
}

const STATUS_LABELS: Record<string, string> = {
  draft:        'Draft',
  under_review: 'Under Review',
  approved:     'Approved',
  revision:     'Revision',
  sent:         'Sent',
  accepted:     'Accepted',
  rejected:     'Rejected',
  expired:      'Expired',
  converted:    'Converted',
  cancelled:    'Cancelled',
}

const TYPE_MAP: Record<string, BadgeVariant> = {
  rental:      'blue',
  sales:       'green',
  service:     'amber',
  spare_parts: 'purple',
}

const TYPE_LABELS: Record<string, string> = {
  rental:      'Rental',
  sales:       'Sales',
  service:     'Service',
  spare_parts: 'Spare Parts',
}

export function QuotationStatusBadge({ status }: { status: string }) {
  return <Badge variant={STATUS_MAP[status] ?? 'gray'}>{STATUS_LABELS[status] ?? status}</Badge>
}

export function QuotationTypeBadge({ type }: { type: string }) {
  return <Badge variant={TYPE_MAP[type] ?? 'gray'}>{TYPE_LABELS[type] ?? type}</Badge>
}
