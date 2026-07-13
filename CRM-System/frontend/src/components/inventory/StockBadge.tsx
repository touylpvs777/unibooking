const PO_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  draft:                { label: 'Draft',              color: 'var(--color-gray-700)',    bg: 'var(--color-gray-100)' },
  ordered:              { label: 'Ordered',            color: 'var(--color-info-700)',    bg: 'var(--color-info-50)' },
  partially_received:   { label: 'Partial',            color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' },
  received:             { label: 'Received',           color: 'var(--color-success-700)', bg: 'var(--color-success-50)' },
  cancelled:            { label: 'Cancelled',          color: 'var(--color-danger-700)',  bg: 'var(--color-danger-50)' },
}

const CATEGORY: Record<string, string> = {
  filter: 'Filter', belt: 'Belt', brake: 'Brake', hydraulic: 'Hydraulic',
  electrical: 'Electrical', engine: 'Engine', tire: 'Tire', chain: 'Chain',
  battery: 'Battery', lubricant: 'Lubricant', general: 'General',
}

const badge = (c: { color: string; bg: string }): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', padding: '2px 10px',
  borderRadius: 'var(--radius-full)', fontSize: 11.5, fontWeight: 600,
  color: c.color, background: c.bg, whiteSpace: 'nowrap',
})

export function POStatusBadge({ status }: { status: string }) {
  const s = PO_STATUS[status] ?? { label: status, color: 'var(--color-gray-700)', bg: 'var(--color-gray-100)' }
  return <span style={badge(s)}>{s.label}</span>
}

export function StockLevelBadge({ available, minLevel }: { available: number; minLevel: number }) {
  const isLow = available <= minLevel
  const isOut = available <= 0
  const c = isOut
    ? { color: 'var(--color-danger-700)', bg: 'var(--color-danger-50)' }
    : isLow
    ? { color: 'var(--color-warning-700)', bg: 'var(--color-warning-50)' }
    : { color: 'var(--color-success-700)', bg: 'var(--color-success-50)' }
  const label = isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'
  return <span style={badge(c)}>{label}</span>
}

export function PartCategoryBadge({ category }: { category: string }) {
  return (
    <span style={badge({ color: 'var(--color-primary-700)', bg: 'var(--color-primary-50)' })}>
      {CATEGORY[category] ?? category}
    </span>
  )
}
