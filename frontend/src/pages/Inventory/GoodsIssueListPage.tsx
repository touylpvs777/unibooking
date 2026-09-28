import { useEffect, useState } from 'react'
import { AlertCircle, PackageMinus, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getTransactions } from '@/api/inventory'
import PageHeader from '@/components/layout/PageHeader'
import '@/styles/shared.css'

interface IssueRow {
  id: number
  transaction_number: string
  spare_part: { part_number: string; name: string }
  warehouse: { name: string }
  quantity: number
  created_at: string
}

export default function GoodsIssueListPage() {
  const { t } = useTranslation()
  const [rows, setRows] = useState<IssueRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getTransactions()
      setRows(
        data
          .filter((item) => item.transaction_type === 'issue')
          .map((item) => ({
            id: item.id,
            transaction_number: item.transaction_number,
            spare_part: item.spare_part,
            warehouse: item.warehouse,
            quantity: item.quantity,
            created_at: item.created_at,
          }))
      )
    } catch {
      setError(t('goodsIssue.list.empty'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <PageHeader title={t('goodsIssue.list.title')} subtitle={t('goodsIssue.list.subtitle')}>
        <button className="btn btn-ghost" onClick={load} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} /> {t('inventory.common.refresh')}
        </button>
      </PageHeader>

      {error && <div className="page-error"><AlertCircle size={16} /> {error}</div>}

      <div className="table-card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('goodsIssue.table.number')}</th>
                <th>{t('common.part')}</th>
                <th>{t('goodsIssue.table.warehouse')}</th>
                <th>{t('goodsIssue.table.issueDate')}</th>
                <th>{t('goodsIssue.table.quantity')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="skeleton-row">
                    <td><div className="skeleton-cell" style={{ width: '75%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '90%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '70%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '80%' }} /></td>
                    <td><div className="skeleton-cell" style={{ width: '60%' }} /></td>
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="table-empty">
                      <PackageMinus size={36} />
                      <p>{t('goodsIssue.list.empty')}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.transaction_number}</td>
                    <td>
                      <div className="cell-desc">{row.spare_part.name}</div>
                      <div className="cell-sub cell-muted">{row.spare_part.part_number}</div>
                    </td>
                    <td>{row.warehouse.name}</td>
                    <td>{new Date(row.created_at).toLocaleDateString()}</td>
                    <td>{row.quantity}</td>
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
