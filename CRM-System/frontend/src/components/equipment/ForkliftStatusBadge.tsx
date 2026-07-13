import { Badge } from '@/components/ui/Badge'

type BadgeVariant = 'green' | 'amber' | 'gray' | 'blue' | 'red' | 'purple' | 'cyan'

const STATUS_MAP: Record<string, BadgeVariant> = {
  in_stock:        'green',
  sold:            'blue',
  rented:          'purple',
  in_service:      'amber',
  reserved:        'cyan',
  decommissioned:  'red',
}

const STATUS_LABELS: Record<string, string> = {
  in_stock:       'In Stock',
  sold:           'Sold',
  rented:         'Rented',
  in_service:     'In Service',
  reserved:       'Reserved',
  decommissioned: 'Decommissioned',
}

const CONDITION_MAP: Record<string, BadgeVariant> = {
  new:          'green',
  used:         'amber',
  refurbished:  'blue',
}

const CONDITION_LABELS: Record<string, string> = {
  new:         'New',
  used:        'Used',
  refurbished: 'Refurbished',
}

export function ForkliftStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={STATUS_MAP[status] ?? 'gray'}>
      {STATUS_LABELS[status] ?? status}
    </Badge>
  )
}

export function ForkliftConditionBadge({ condition }: { condition: string }) {
  return (
    <Badge variant={CONDITION_MAP[condition] ?? 'gray'}>
      {CONDITION_LABELS[condition] ?? condition}
    </Badge>
  )
}
