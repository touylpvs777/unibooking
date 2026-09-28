import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, PackageCheck, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getTransactions } from '@/api/inventory'
import PageHeader from '@/components/layout/PageHeader'
import '@/styles/shared.css'

interface ReceiptRow {
  id: number
  transaction_number: string
  spare_part: { part_number: string; name: string }
  warehouse: { name: string }
  quantity: number
  unit_cost: number
  total_cost: number
  created_at: string
}

export default function GoodsReceiveListPage() {
  const { t } = useTranslation()
  const [rows, setRows] = useState<ReceiptRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getTransactions()
      setRows(
        data
          .filter((item) => item.transaction_type === 'receive')
          .map((item) => ({
            id: item.id,
            transaction_number: item.transaction_number,
            spare_part: item.spare_part,
            warehouse: item.warehouse,
            quantity: item.quantity,
            unit_cost: item.unit_cost,
            total_cost: item.total_cost,
            created_at: item.created_at,
          }))
      )
    } catch {
      setError(t('goodsReceive.list.empty'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const summary = useMemo(() => {
    const totalQty = rows.reduce((sum, row) => sum + row.quantity, 0)
    const totalValue = rows.reduce((sum, row) => sum + row.total_cost, 0)
    return { totalQty, totalValue }
  }, [rows])

  return (
    <div>
      <PageHeader title={t('goodsReceive.list.title')} subtitle={t('goodsReceive.list.subtitle')}>
        <button className="btn btn-ghost" onClick={load} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} /> {t('inventory.common.refresh')}
        </button>
      </PageHeader>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      <div className="mp-chart-grid" style={{ margin: '16px 0' }}>
        <div className="mp-card">
          <div className="mp-card-body">
            <div className="kpi-label">{t('goodsReceive.table.number')}</div>
            <div className="kpi-value">{rows.length}</div>
          </div>
        </div>
        <div className="mp-card">
          <div className="mp-card-body">
            <div className="kpi-label">{t('goodsReceive.table.receivedDate')}</div>
            <div className="kpi-value">{summary.totalQty}</div>
          </div>
        </div>
        <div className="mp-card">
          <div className="mp-card-body">
            <div className="kpi-label">{t('common.total')}</div>
            <div className="kpi-value">{summary.totalValue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('goodsReceive.table.number')}</th>
                <th>{t('common.part')}</th>
                <th>{t('goodsReceive.table.warehouse')}</th>
                <th>{t('goodsReceive.table.quantity')}</th>
                <th>{t('goodsReceive.table.unitCost')}</th>
                <th>{t('goodsReceive.table.receivedDate')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="skeleton-row">
                    <td><div className="skeleton-cell" style={{ width: '75%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '90%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '70%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '50%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '65%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '80%' }} /></td>
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="table-empty">
                      <PackageCheck size={36} />
                      <p>{t('goodsReceive.list.empty')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td className="cell-desc">{row.transaction_number}</td>
                    <td>
                      <div className="cell-desc">{row.spare_part.name}</div>
                      <div className="cell-sub cell-muted">{row.spare_part.part_number}</div>
                    </td>
                    <td>{row.warehouse.name}</td>
                    <td>{row.quantity}</td>
                    <td>{row.unit_cost.toLocaleString()}</td>
                    <td>{new Date(row.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
