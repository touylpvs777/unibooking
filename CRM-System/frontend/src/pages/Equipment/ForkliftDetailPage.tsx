import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ChevronLeft, Fuel, Gauge, Calendar, Clock, MapPin,
  AlertCircle, FileText, Wrench, User, Shield,
} from 'lucide-react'
import { getForklift } from '@/api/forklift'
import { ForkliftStatusBadge, ForkliftConditionBadge } from '@/components/equipment/ForkliftStatusBadge'
import PhotoGallery from '@/components/equipment/PhotoGallery'
import StatusTimeline from '@/components/equipment/StatusTimeline'
import type { ForkliftDetail } from '@/types/forklift'
import './ForkliftDetailPage.css'
import '@/styles/shared.css'

const FUEL_LABELS: Record<string, string> = { electric: 'Electric', diesel: 'Diesel', lpg: 'LPG', dual_fuel: 'Dual Fuel' }

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

type TabId = 'overview' | 'photos' | 'timeline' | 'documents' | 'contracts'

export default function ForkliftDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [forklift, setForklift] = useState<ForkliftDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const hash = window.location.hash.slice(1) as TabId
    return ['overview', 'photos', 'timeline', 'documents', 'contracts'].includes(hash) ? hash : 'overview'
  })

  const load = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await getForklift(Number(id))
      setForklift(data)
    } catch {
      setError('Forklift not found or failed to load.')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => { load() }, [load])

  const switchTab = (tab: TabId) => {
    setActiveTab(tab)
    window.history.replaceState(null, '', `#${tab}`)
  }

  if (isLoading) {
    return (
      <div className="forklift-detail">
        <div className="fd-skeleton">
          <div className="skeleton-cell" style={{ height: 18, width: '30%', marginBottom: 24 }} />
          <div className="fd-skeleton-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="skeleton-cell" style={{ height: 12, width: '50%' }} />
              <div className="skeleton-cell" style={{ height: 24, width: '80%' }} />
              <div className="skeleton-cell" style={{ height: 14, width: '40%' }} />
            </div>
            <div>
              <div className="skeleton-cell" style={{ height: 200, borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !forklift) {
    return (
      <div className="forklift-detail">
        <button className="fd-back" onClick={() => navigate('/equipment')}><ChevronLeft size={16} /> Back to Equipment</button>
        <div className="page-error" style={{ marginTop: 24 }}><AlertCircle size={16} /> {error ?? 'Forklift not found.'}</div>
      </div>
    )
  }

  const primaryPhoto = forklift.photos.find((p) => p.is_primary) ?? forklift.photos[0]
  const hoursUsed = forklift.current_hour_meter - forklift.initial_hour_meter
  const daysSinceCreated = Math.max(1, Math.ceil((Date.now() - new Date(forklift.created_at).getTime()) / 86400000))
  const dailyAvg = hoursUsed / daysSinceCreated
  const threshold = 5000
  const pct = Math.min((forklift.current_hour_meter / threshold) * 100, 100)
  const barColor = pct < 60 ? 'var(--color-success-500)' : pct < 85 ? 'var(--color-warning-500)' : 'var(--color-danger-500)'

  const warrantyExpired = forklift.warranty_expiry ? new Date(forklift.warranty_expiry) < new Date() : null

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'photos', label: 'Photos', count: forklift.photos.length },
    { id: 'timeline', label: 'Timeline', count: forklift.recent_status_history.length },
    { id: 'documents', label: 'Documents', count: forklift.documents.length },
    { id: 'contracts', label: 'Contracts' },
  ]

  return (
    <div className="forklift-detail">
      <button className="fd-back" onClick={() => navigate('/equipment')}><ChevronLeft size={16} /> Back to Equipment</button>

      {/* Asset Header */}
      <div className="fd-header">
        <div className="fd-header-left">
          {primaryPhoto ? (
            <img src={primaryPhoto.thumbnail_url ?? primaryPhoto.image_url} alt={forklift.name_en} className="fd-header-avatar" />
          ) : (
            <div className="fd-header-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
              <Wrench size={24} />
            </div>
          )}
          <div className="fd-header-info">
            {forklift.brand && <div className="fd-header-brand">{forklift.brand.name}</div>}
            <div className="fd-header-name">{forklift.name_en}</div>
            <div className="fd-header-meta">
              <span>S/N: {forklift.serial_number}</span>
              {forklift.year_manufactured && <span>· {forklift.year_manufactured}</span>}
              {forklift.fuel_type && <span>· {FUEL_LABELS[forklift.fuel_type] ?? forklift.fuel_type}</span>}
            </div>
            <div className="fd-header-badges">
              <ForkliftStatusBadge status={forklift.status} />
              <ForkliftConditionBadge condition={forklift.condition} />
              {!forklift.is_active && (
                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 9px', borderRadius: 20, fontSize: 11.5, fontWeight: 600, background: 'var(--color-gray-100)', color: 'var(--color-gray-500)', border: '1px solid var(--color-gray-200)' }}>Inactive</span>
              )}
            </div>
          </div>
        </div>
        <div className="fd-header-actions">
          <button className="btn btn-ghost" onClick={() => navigate(`/quotations/new`)}><FileText size={14} /> New Quote</button>
          <button className="btn btn-primary" onClick={() => navigate(`/rental-contracts/new`)}><FileText size={14} /> New Contract</button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="fd-tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`fd-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => switchTab(t.id)}>
            {t.label}
            {t.count != null && <span className="fd-tab-count">({t.count})</span>}
          </button>
        ))}
      </div>

      {/* ═══ Overview Tab ═══ */}
      {activeTab === 'overview' && (
        <div className="fd-overview">
          <div className="fd-main">
            {/* Specifications */}
            <div className="fd-card">
              <div className="fd-card-header"><Wrench size={16} /> Specifications</div>
              <div className="fd-card-body">
                <div className="fd-spec-chips">
                  {forklift.fuel_type && (
                    <div className="fd-spec-chip">
                      <span className="fd-spec-chip-value"><Fuel size={13} /> {FUEL_LABELS[forklift.fuel_type] ?? forklift.fuel_type}</span>
                      <span className="fd-spec-chip-label">Fuel Type</span>
                    </div>
                  )}
                  {forklift.capacity_kg != null && (
                    <div className="fd-spec-chip">
                      <span className="fd-spec-chip-value"><Gauge size={13} /> {forklift.capacity_kg.toLocaleString()} kg</span>
                      <span className="fd-spec-chip-label">Capacity</span>
                    </div>
                  )}
                  {forklift.year_manufactured && (
                    <div className="fd-spec-chip">
                      <span className="fd-spec-chip-value"><Calendar size={13} /> {forklift.year_manufactured}</span>
                      <span className="fd-spec-chip-label">Year</span>
                    </div>
                  )}
                </div>
                <div className="fd-kv-grid">
                  <span className="fd-kv-key">Serial Number</span><span className="fd-kv-value" style={{ fontVariantNumeric: 'tabular-nums' }}>{forklift.serial_number}</span>
                  {forklift.internal_code && <><span className="fd-kv-key">Internal Code</span><span className="fd-kv-value">{forklift.internal_code}</span></>}
                  {forklift.model_number && <><span className="fd-kv-key">Model</span><span className="fd-kv-value">{forklift.model_number}</span></>}
                  {forklift.mast_type && <><span className="fd-kv-key">Mast Type</span><span className="fd-kv-value">{forklift.mast_type}</span></>}
                  {forklift.max_lift_height_mm != null && <><span className="fd-kv-key">Max Lift Height</span><span className="fd-kv-value">{forklift.max_lift_height_mm.toLocaleString()} mm</span></>}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="fd-card">
              <div className="fd-card-header"><MapPin size={16} /> Current Location</div>
              <div className="fd-card-body">
                {forklift.current_location ? (
                  <div className="fd-location-box">
                    <div className="fd-location-name">{forklift.current_location.location_name}</div>
                    {forklift.current_location.warehouse_zone && <div className="fd-location-zone">Zone: {forklift.current_location.warehouse_zone}</div>}
                    {forklift.current_location.address && <div className="fd-location-address"><MapPin size={11} /> {forklift.current_location.address}</div>}
                    <div className="fd-location-date"><Calendar size={11} /> Since: {fmtDate(forklift.current_location.effective_date)}</div>
                    {forklift.current_location.notes && <div className="fd-location-notes">{forklift.current_location.notes}</div>}
                  </div>
                ) : (
                  <div className="fd-location-empty"><MapPin size={16} /> No location recorded</div>
                )}
              </div>
            </div>

            {/* Notes */}
            {forklift.notes && (
              <div className="fd-card">
                <div className="fd-card-header"><FileText size={16} /> Notes</div>
                <div className="fd-card-body"><p className="fd-notes">{forklift.notes}</p></div>
              </div>
            )}
          </div>

          <div className="fd-sidebar">
            {/* Hour Meter */}
            <div className="fd-card">
              <div className="fd-card-header"><Clock size={16} /> Hour Meter</div>
              <div className="fd-card-body">
                <div className="fd-hours-big">
                  {forklift.current_hour_meter.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  <span className="fd-hours-unit"> hours</span>
                </div>
                <div className="fd-hours-bar">
                  <div className="fd-hours-bar-track"><div className="fd-hours-bar-fill" style={{ width: `${pct}%`, background: barColor }} /></div>
                  <div className="fd-hours-bar-label">
                    <span>{Math.round(pct)}% of {threshold.toLocaleString()} hrs</span>
                    <span>service interval</span>
                  </div>
                </div>
                <div className="fd-kv-grid fd-hours-stats">
                  <span className="fd-kv-key">Initial</span><span className="fd-kv-value">{forklift.initial_hour_meter.toLocaleString()} hrs</span>
                  <span className="fd-kv-key">Hours Used</span><span className="fd-kv-value">{hoursUsed.toLocaleString(undefined, { maximumFractionDigits: 1 })} hrs</span>
                  <span className="fd-kv-key">Daily Avg</span><span className="fd-kv-value">{dailyAvg.toFixed(1)} hrs</span>
                  {dailyAvg > 0 && forklift.current_hour_meter < threshold && (
                    <><span className="fd-kv-key">Est. Service</span><span className="fd-kv-value">~{Math.ceil((threshold - forklift.current_hour_meter) / dailyAvg)} days</span></>
                  )}
                </div>
              </div>
            </div>

            {/* Asset Summary */}
            <div className="fd-card">
              <div className="fd-card-header"><Shield size={16} /> Asset Summary</div>
              <div className="fd-card-body">
                <div className="fd-kv-grid">
                  <span className="fd-kv-key">Purchase Date</span><span className="fd-kv-value">{fmtDate(forklift.purchase_date)}</span>
                  {forklift.purchase_date && (
                    <><span className="fd-kv-key">Asset Age</span><span className="fd-kv-value">{((Date.now() - new Date(forklift.purchase_date).getTime()) / 31557600000).toFixed(1)} years</span></>
                  )}
                  <span className="fd-kv-key">Warranty</span>
                  <span className="fd-kv-value">
                    {forklift.warranty_expiry ? (
                      <span style={{ color: warrantyExpired ? 'var(--color-danger-600)' : 'var(--color-success-600)' }}>
                        {warrantyExpired ? 'Expired' : 'Valid'} · {fmtDate(forklift.warranty_expiry)}
                      </span>
                    ) : '—'}
                  </span>
                  <span className="fd-kv-key">Condition</span><span className="fd-kv-value" style={{ textTransform: 'capitalize' }}>{forklift.condition}</span>
                  <span className="fd-kv-key">Status Changes</span><span className="fd-kv-value">{forklift.recent_status_history.length}</span>
                  <span className="fd-kv-key">Documents</span><span className="fd-kv-value">{forklift.documents.length} files</span>
                  <span className="fd-kv-key">Photos</span><span className="fd-kv-value">{forklift.photos.length} images</span>
                </div>
              </div>
            </div>

            {/* Customer Link */}
            {forklift.customer && (
              <div className="fd-card">
                <div className="fd-card-header"><User size={16} /> Assigned Customer</div>
                <div className="fd-card-body">
                  <div className="fd-customer-link">
                    <User size={14} />
                    <span>{forklift.customer.first_name} {forklift.customer.last_name}</span>
                    {forklift.customer.company && <span style={{ color: 'var(--color-text-muted)' }}>({forklift.customer.company})</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ Photos Tab ═══ */}
      {activeTab === 'photos' && (
        <PhotoGallery photos={forklift.photos} assetName={forklift.name_en} />
      )}

      {/* ═══ Timeline Tab ═══ */}
      {activeTab === 'timeline' && (
        <StatusTimeline history={forklift.recent_status_history} />
      )}

      {/* ═══ Documents Tab ═══ */}
      {activeTab === 'documents' && (
        forklift.documents.length > 0 ? (
          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th className="col-hide-sm">Expiry</th>
                  <th className="col-hide-sm">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {forklift.documents.map((d) => (
                  <tr key={d.id}>
                    <td><a href={d.file_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{d.title}</a></td>
                    <td className="cell-muted" style={{ textTransform: 'capitalize' }}>{d.document_type.replace(/_/g, ' ')}</td>
                    <td className="cell-muted col-hide-sm">{fmtDate(d.expiry_date)}</td>
                    <td className="cell-muted col-hide-sm">{fmtDate(d.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="fd-location-empty" style={{ margin: '20px 0' }}>
            <FileText size={16} /> No documents uploaded
          </div>
        )
      )}

      {/* ═══ Contracts Tab ═══ */}
      {activeTab === 'contracts' && (
        <div className="fd-card" style={{ maxWidth: 500 }}>
          <div className="fd-card-body" style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 13, marginBottom: 12 }}>
              View rental contracts linked to this equipment
            </p>
            <Link to={`/rental-contracts`} className="btn btn-primary" style={{ display: 'inline-flex' }}>
              View Rental Contracts →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
