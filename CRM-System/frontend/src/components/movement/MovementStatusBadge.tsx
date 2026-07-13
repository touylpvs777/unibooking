const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  draft:      { label: 'Draft',      color: 'var(--color-gray-700)',    bg: 'var(--color-gray-100)' },
  preparing:  { label: 'Preparing',  color: 'var(--color-info-700)',    bg: 'var(--color-info-50)' },
  in_transit: { label: 'In Transit', color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  delivered:  { label: 'Delivered',  color: 'var(--color-primary-700)', bg: 'var(--color-primary-50)' },
  completed:  { label: 'Completed',  color: 'var(--color-success-700)', bg: 'var(--color-success-50)' },
  cancelled:  { label: 'Cancelled',  color: 'var(--color-danger-700)',  bg: 'var(--color-danger-50)' },
}

const TYPE_MAP: Record<string, { label: string; color: string; bg: string }> = {
  warehouse_transfer:   { label: 'Transfer',   color: 'var(--color-purple-700)',  bg: 'var(--color-purple-50)' },
  customer_deployment:  { label: 'Deployment',  color: 'var(--color-primary-700)', bg: 'var(--color-primary-50)' },
  customer_return:      { label: 'Return',      color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  internal_relocation:  { label: 'Relocation',  color: 'var(--color-info-700)',    bg: 'var(--color-info-50)' },
}

const PRIORITY_MAP: Record<string, { label: string; color: string; bg: string }> = {
  low:    { label: 'Low',    color: 'var(--color-gray-600)',    bg: 'var(--color-gray-100)' },
  normal: { label: 'Normal', color: 'var(--color-primary-600)', bg: 'var(--color-primary-50)' },
  high:   { label: 'High',   color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  urgent: { label: 'Urgent', color: 'var(--color-danger-700)',  bg: 'var(--color-danger-50)' },
}

const badgeStyle = (c: { color: string; bg: string }): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', padding: '2px 10px',
  borderRadius: 'var(--radius-full)', fontSize: 11.5, fontWeight: 600,
  color: c.color, background: c.bg, whiteSpace: 'nowrap',
})

export function MovementStatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? { label: status, color: 'var(--color-gray-700)', bg: 'var(--color-gray-100)' }
  return <span style={badgeStyle(s)}>{s.label}</span>
}

export function MovementTypeBadge({ type }: { type: string }) {
  const t = TYPE_MAP[type] ?? { label: type, color: 'var(--color-gray-700)', bg: 'var(--color-gray-100)' }
  return <span style={badgeStyle(t)}>{t.label}</span>
}

export function MovementPriorityBadge({ priority }: { priority: string }) {
  const p = PRIORITY_MAP[priority] ?? { label: priority, color: 'var(--color-gray-600)', bg: 'var(--color-gray-100)' }
  return <span style={badgeStyle(p)}>{p.label}</span>
}
