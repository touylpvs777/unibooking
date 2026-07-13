const STATUS: Record<string, { label: string; color: string; bg: string }> = {
  scheduled:   { label: 'Scheduled',   color: 'var(--color-gray-700)',    bg: 'var(--color-gray-100)' },
  due:         { label: 'Due',         color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  in_progress: { label: 'In Progress', color: 'var(--color-info-700)',    bg: 'var(--color-info-50)' },
  completed:   { label: 'Completed',   color: 'var(--color-success-700)', bg: 'var(--color-success-50)' },
  verified:    { label: 'Verified',    color: 'var(--color-primary-700)', bg: 'var(--color-primary-50)' },
  cancelled:   { label: 'Cancelled',   color: 'var(--color-danger-700)',  bg: 'var(--color-danger-50)' },
}

const TYPE: Record<string, { label: string; color: string; bg: string }> = {
  preventive:  { label: 'Preventive',  color: 'var(--color-primary-700)', bg: 'var(--color-primary-50)' },
  corrective:  { label: 'Corrective',  color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  emergency:   { label: 'Emergency',   color: 'var(--color-danger-700)',  bg: 'var(--color-danger-50)' },
  inspection:  { label: 'Inspection',  color: 'var(--color-info-700)',    bg: 'var(--color-info-50)' },
}

const PRIORITY: Record<string, { label: string; color: string; bg: string }> = {
  low:      { label: 'Low',      color: 'var(--color-gray-600)',    bg: 'var(--color-gray-100)' },
  normal:   { label: 'Normal',   color: 'var(--color-primary-600)', bg: 'var(--color-primary-50)' },
  high:     { label: 'High',     color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  critical: { label: 'Critical', color: 'var(--color-danger-700)',  bg: 'var(--color-danger-50)' },
}

const badge = (c: { color: string; bg: string }): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', padding: '2px 10px',
  borderRadius: 'var(--radius-full)', fontSize: 11.5, fontWeight: 600,
  color: c.color, background: c.bg, whiteSpace: 'nowrap',
})

const fallback = { label: '—', color: 'var(--color-gray-700)', bg: 'var(--color-gray-100)' }

export function WOStatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? { ...fallback, label: status }
  return <span style={badge(s)}>{s.label}</span>
}

export function WOTypeBadge({ type }: { type: string }) {
  const t = TYPE[type] ?? { ...fallback, label: type }
  return <span style={badge(t)}>{t.label}</span>
}

export function WOPriorityBadge({ priority }: { priority: string }) {
  const p = PRIORITY[priority] ?? { ...fallback, label: priority }
  return <span style={badge(p)}>{p.label}</span>
}
