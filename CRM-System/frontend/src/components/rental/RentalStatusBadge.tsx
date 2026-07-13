import { Badge } from '@/components/ui/Badge'

type BadgeVariant = 'green' | 'amber' | 'gray' | 'blue' | 'red' | 'purple' | 'cyan'

const STATUS_MAP: Record<string, BadgeVariant> = {
  reservation:       'gray',
  draft:             'gray',
  pending_approval:  'amber',
  approved:          'blue',
  revision:          'purple',
  delivering:        'cyan',
  active:            'green',
  overdue:           'red',
  returning:         'amber',
  inspecting:        'cyan',
  settling:          'purple',
  closed:            'green',
  cancelled:         'gray',
}

const STATUS_LABELS: Record<string, string> = {
  reservation:       'Reservation',
  draft:             'Draft',
  pending_approval:  'Pending Approval',
  approved:          'Approved',
  revision:          'Revision',
  delivering:        'Delivering',
  active:            'Active',
  overdue:           'Overdue',
  returning:         'Returning',
  inspecting:        'Inspecting',
  settling:          'Settling',
  closed:            'Closed',
  cancelled:         'Cancelled',
}

const CONTRACT_TYPE_MAP: Record<string, BadgeVariant> = {
  short_term: 'blue',
  long_term:  'green',
  project:    'purple',
}

const CONTRACT_TYPE_LABELS: Record<string, string> = {
  short_term: 'Short Term',
  long_term:  'Long Term',
  project:    'Project',
}

export function RentalStatusBadge({ status }: { status: string }) {
  return <Badge variant={STATUS_MAP[status] ?? 'gray'}>{STATUS_LABELS[status] ?? status}</Badge>
}

export function RentalContractTypeBadge({ type }: { type: string }) {
  return <Badge variant={CONTRACT_TYPE_MAP[type] ?? 'gray'}>{CONTRACT_TYPE_LABELS[type] ?? type}</Badge>
}
