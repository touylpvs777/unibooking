const STATUS: Record<string, { label: string; color: string; bg: string }> = {
  draft:        { label: 'Draft',        color: 'var(--color-gray-700)',    bg: 'var(--color-gray-100)' },
  survey:       { label: 'Survey',       color: 'var(--color-info-700)',    bg: 'var(--color-info-50)' },
  design:       { label: 'Design',       color: 'var(--color-info-700)',    bg: 'var(--color-info-50)' },
  boq_approved: { label: 'BOQ Approved', color: 'var(--color-primary-700)', bg: 'var(--color-primary-50)' },
  installation: { label: 'Installation', color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  handover:     { label: 'Handover',     color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  completed:    { label: 'Completed',    color: 'var(--color-success-700)', bg: 'var(--color-success-50)' },
}

const MILESTONE: Record<string, { label: string; color: string; bg: string }> = {
  pending:     { label: 'Pending',     color: 'var(--color-gray-700)',    bg: 'var(--color-gray-100)' },
  in_progress: { label: 'In Progress', color: 'var(--color-info-700)',    bg: 'var(--color-info-50)' },
  completed:   { label: 'Completed',   color: 'var(--color-success-700)', bg: 'var(--color-success-50)' },
}

const badge = (c: { color: string; bg: string }): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', padding: '2px 10px',
  borderRadius: 'var(--radius-full)', fontSize: 11.5, fontWeight: 600,
  color: c.color, background: c.bg, whiteSpace: 'nowrap',
})

const fallback = { label: '—', color: 'var(--color-gray-700)', bg: 'var(--color-gray-100)' }

export function ProjectStatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? { ...fallback, label: status }
  return <span style={badge(s)}>{s.label}</span>
}

export function MilestoneStatusBadge({ status }: { status: string }) {
  const s = MILESTONE[status] ?? { ...fallback, label: status }
  return <span style={badge(s)}>{s.label}</span>
}
