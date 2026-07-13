import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Package, Warehouse, ShoppingCart } from 'lucide-react'
import { getDashboard, getParts } from '@/api/inventory'
import {
  InventoryKpiStrip, InventoryKpiStripSkeleton,
  LowStockAlerts, LowStockAlertsSkeleton,
  InventoryQuickNav, StockDistributionChart,
} from '@/modules/inventory'
import type { DashboardSummary, SparePart } from '@/types/inventory'
import '@/styles/shared.css'

export default function InventoryDashboardPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<DashboardSummary | null>(null)
  const [parts, setParts] = useState<SparePart[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setIsLoading(true); setError(null)
    try {
      const [dashRes, partsRes] = await Promise.all([
        getDashboard(),
        getParts({ page_size: 100 }),
      ])
      setData(dashRes.data)
      setParts(partsRes.data.items)
    } catch { setError('Failed to load inventory data.') }
    finally { setIsLoading(false) }
  }

  useEffect(() => { load() }, [])

  const categoryData = (() => {
    const counts: Record<string, number> = {}
    parts.forEach((p) => { counts[p.part_category] = (counts[p.part_category] || 0) + 1 })
    return Object.entries(counts).map(([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count)
  })()

  if (error) return <div className="page-error"><AlertCircle size={16} /> {error}</div>

  return (
    <div>
      {/* Hero */}
      <div className="mp-hero" style={{ background: 'linear-gradient(135deg, #0f4c75 0%, #1b262c 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="mp-hero-title">Inventory & Spare Parts</div>
            <div className="mp-hero-sub">Stock management and procurement overview</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ background: 'var(--color-hero-btn-bg)', borderColor: 'var(--color-hero-btn-border)', color: 'var(--color-on-hero)' }} onClick={() => navigate('/inventory/warehouses')}>
              <Warehouse size={14} /> Warehouses
            </button>
            <button className="btn btn-ghost" style={{ background: 'var(--color-hero-btn-bg)', borderColor: 'var(--color-hero-btn-border)', color: 'var(--color-on-hero)' }} onClick={() => navigate('/inventory/purchase-orders')}>
              <ShoppingCart size={14} /> POs
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/inventory/parts')}>
              <Package size={14} /> Spare Parts
            </button>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      {isLoading ? <InventoryKpiStripSkeleton /> : data ? <InventoryKpiStrip data={data} /> : null}

      {/* Quick Navigation */}
      <div className="mp-section">
        <div className="mp-section-header">
          <span className="mp-section-title">Quick Access</span>
        </div>
        <InventoryQuickNav />
      </div>

      {/* Charts + Alerts */}
      <div className="mp-chart-grid" style={{ marginTop: 16 }}>
        <StockDistributionChart data={categoryData} loading={isLoading} />
        {isLoading ? <LowStockAlertsSkeleton /> : data ? <LowStockAlerts alerts={data.reorder_alerts} /> : null}
      </div>
    </div>
  )
}
