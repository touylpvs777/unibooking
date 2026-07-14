import { useTranslation } from 'react-i18next'
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

const STATUS_LABEL_KEYS: Record<string, string> = {
  in_stock:       'equipment.status.inStock',
  sold:           'equipment.status.sold',
  rented:         'equipment.status.rented',
  in_service:     'equipment.status.inService',
  reserved:       'equipment.status.reserved',
  decommissioned: 'equipment.status.decommissioned',
}

const CONDITION_MAP: Record<string, BadgeVariant> = {
  new:          'green',
  used:         'amber',
  refurbished:  'blue',
}

const CONDITION_LABEL_KEYS: Record<string, string> = {
  new:         'equipment.condition.new',
  used:        'equipment.condition.used',
  refurbished: 'equipment.condition.refurbished',
}

export function ForkliftStatusBadge({ status }: { status: string }) {
  const { t } = useTranslation()
  return (
    <Badge variant={STATUS_MAP[status] ?? 'gray'}>
      {STATUS_LABEL_KEYS[status] ? t(STATUS_LABEL_KEYS[status]) : status}
    </Badge>
  )
}

export function ForkliftConditionBadge({ condition }: { condition: string }) {
  const { t } = useTranslation()
  return (
    <Badge variant={CONDITION_MAP[condition] ?? 'gray'}>
      {CONDITION_LABEL_KEYS[condition] ? t(CONDITION_LABEL_KEYS[condition]) : condition}
    </Badge>
  )
}
