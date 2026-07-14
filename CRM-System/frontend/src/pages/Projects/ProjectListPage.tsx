import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, AlertCircle, ChevronLeft, ChevronRight, Building2 } from 'lucide-react'
import { getProjects, createProject } from '@/api/projects'
import { ProjectStatusBadge } from '@/components/projects/ProjectStatusBadge'
import { MilestoneProgressBar } from '@/components/projects/MilestoneProgressBar'
import { toast } from '@/store/toastStore'
import ProjectForm from './ProjectForm'
import type { Project, ProjectCreate, ProjectUpdate } from '@/types/project'
import '@/styles/shared.css'

const STATUS_OPTS = [
  { value: '', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'survey', label: 'Survey' },
  { value: 'design', label: 'Design' },
  { value: 'boq_approved', label: 'BOQ Approved' },
  { value: 'installation', label: 'Installation' },
  { value: 'handover', label: 'Handover' },
  { value: 'completed', label: 'Completed' },
]

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="skeleton-row">
          <td><div className="skeleton-cell" style={{ width: '75%' }} /></td>
          <td><div className="skeleton-cell" style={{ width: '55%' }} /></td>
          <td className="col-hide-sm"><div className="skeleton-cell" style={{ width: '60%' }} /></td>
          <td><div className="skeleton-cell" style={{ width: 80 }} /></td>
          <td><div className="skeleton-cell" style={{ width: 110 }} /></td>
        </tr>
      ))}
    </>
  )
}

export default function ProjectListPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<Project[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  const load = useCallback(async () => {
    setIsLoading(true); setError(null)
    try {
      const { data } = await getProjects({ status: statusFilter || undefined, page, page_size: 20 })
      setItems(data.items); setTotal(data.total); setPages(data.pages)
    } catch (e: unknown) {
      const status = (e as { response?: { status?: number } })?.response?.status
      setError(status === 403 ? "You don't have permission to view projects." : 'Failed to load projects.')
    } finally {
      setIsLoading(false)
    }
  }, [statusFilter, page])

  useEffect(() => { load() }, [load])

  const handleCreate = async (data: ProjectCreate | ProjectUpdate): Promise<boolean> => {
    try {
      await createProject(data as ProjectCreate)
      toast.success('Project created.')
      await load()
      return true
    } catch (e: unknown) {
      const detail = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      toast.error(detail ?? 'Failed to create project.')
      return false
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Warehouse Projects</h1>
          <p className="page-header-sub">{total.toLocaleString()} project{total !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setFormOpen(true)}>
          <Plus size={14} /> Create Project
        </button>
      </div>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      <div className="toolbar">
        <select className="filter-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}>
          {STATUS_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="toolbar-count">{total} result{total !== 1 ? 's' : ''}</span>
      </div>

      <div className="table-card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Customer</th>
                <th className="col-hide-sm">Start / End</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <SkeletonRows /> : items.length === 0 ? (
                <tr><td colSpan={5}>
                  <div className="table-empty"><Building2 size={36} /><p>No projects found</p><small>Create a project to get started.</small></div>
                </td></tr>
              ) : items.map((p) => (
                <tr key={p.id} onClick={() => navigate(`/projects/${p.id}`)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="cell-desc">{p.name}</div>
                    <div className="cell-muted" style={{ fontSize: 11.5 }}>{p.project_number}</div>
                  </td>
                  <td className="cell-muted">{p.customer_name || `#${p.customer_id}`}</td>
                  <td className="cell-muted col-hide-sm">{fmtDate(p.start_date)} — {fmtDate(p.end_date)}</td>
                  <td><ProjectStatusBadge status={p.status} /></td>
                  <td><MilestoneProgressBar completed={p.milestone_completed} total={p.milestone_total} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && pages > 1 && (
          <div className="pagination">
            <span className="pagination-info">Page {page} of {pages} ({total} total)</span>
            <div className="pagination-controls">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft size={14} /></button>
              <button className="page-btn" disabled={page === pages} onClick={() => setPage((p) => p + 1)}><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      <ProjectForm isOpen={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} />
    </div>
  )
}
