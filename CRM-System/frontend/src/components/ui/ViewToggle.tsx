import { LayoutGrid, List } from 'lucide-react'

interface ViewToggleProps {
  view: 'grid' | 'list'
  onChange: (view: 'grid' | 'list') => void
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="mp-view-toggle">
      <button
        className={`mp-view-btn${view === 'grid' ? ' active' : ''}`}
        onClick={() => onChange('grid')}
        title="Grid view"
        aria-label="Grid view"
      >
        <LayoutGrid size={15} />
      </button>
      <button
        className={`mp-view-btn${view === 'list' ? ' active' : ''}`}
        onClick={() => onChange('list')}
        title="List view"
        aria-label="List view"
      >
        <List size={15} />
      </button>
    </div>
  )
}
