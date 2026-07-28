import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, AlertCircle, Plus, Trash2 } from 'lucide-react'
import { createInvoice } from '@/api/billing'
import CustomerSelect from '@/components/billing/CustomerSelect'
import DocumentPreview from '@/components/DocumentPreview'
import { toast } from '@/store/toastStore'
import { useCompanyStore } from '@/store/companyStore'
import type { ReferenceType } from '@/types/billing'
import type { Customer } from '@/types/customer'
import PageHeader from '@/components/layout/PageHeader'
import '@/styles/shared.css'

const CURRENCY_OPTIONS = ['LAK', 'THB', 'USD', 'CNY']

interface LineItemRow {
  key: number
  item_code: string
  description: string
  unit: string
  quantity: string
  unit_rate: string
}

let nextKey = 1
const emptyRow = (): LineItemRow => ({ key: nextKey++, item_code: '', description: '', unit: 'piece', quantity: '1', unit_rate: '0' })

const REFERENCE_TYPE_OPTIONS: { value: ReferenceType; labelKey: string }[] = [
  { value: 'sales', labelKey: 'billing.invoice.referenceType.sales' },
  { value: 'work_order', labelKey: 'billing.invoice.referenceType.workOrder' },
  { value: 'rental', labelKey: 'billing.invoice.referenceType.rental' },
]

function fmtAmt(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function InvoiceFormPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [referenceType, setReferenceType] = useState<ReferenceType>('sales')
  const [issueDate, setIssueDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [taxRate, setTaxRate] = useState('10')
  const [rows, setRows] = useState<LineItemRow[]>([emptyRow()])

  const [currency, setCurrency] = useState('LAK')
  const [exchangeRate, setExchangeRate] = useState('1')
  const [bankDetails, setBankDetails] = useState('')

  const [vehicleMake, setVehicleMake] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')
  const [vehicleVin, setVehicleVin] = useState('')
  const [vehicleEngineNo, setVehicleEngineNo] = useState('')
  const [vehicleRegNo, setVehicleRegNo] = useState('')
  const [jobNumber, setJobNumber] = useState('')

  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const setRow = (key: number, field: keyof Omit<LineItemRow, 'key'>, value: string) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)))

  const addRow = () => setRows((prev) => [...prev, emptyRow()])
  const removeRow = (key: number) => setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.key !== key) : prev))

  const lineTotals = useMemo(
    () => rows.map((r) => (Number(r.quantity) || 0) * (Number(r.unit_rate) || 0)),
    [rows],
  )
  const subtotal = useMemo(() => lineTotals.reduce((s, v) => s + v, 0), [lineTotals])
  const taxAmount = useMemo(() => subtotal * ((Number(taxRate) || 0) / 100), [subtotal, taxRate])
  const grandTotal = subtotal + taxAmount
  const grandTotalInLAK = useMemo(
    () => (currency === 'LAK' ? grandTotal : grandTotal * (Number(exchangeRate) || 0)),
    [currency, exchangeRate, grandTotal],
  )

  const companyProfile = useCompanyStore((s) => s.profile)
  const fetchCompanyProfile = useCompanyStore((s) => s.fetch)
  useEffect(() => { fetchCompanyProfile() }, [fetchCompanyProfile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer) { setErr(t('billing.invoice.form.errors.customerRequired')); return }
    const validRows = rows.filter((r) => r.description.trim())
    if (validRows.length === 0) { setErr(t('billing.invoice.form.errors.itemRequired')); return }

    setIsSaving(true); setErr(null)
    try {
      const { data } = await createInvoice({
        customer_id: customer.id,
        reference_type: referenceType,
        issue_date: issueDate || undefined,
        due_date: dueDate || undefined,
        tax_rate: Number(taxRate) || 0,
        currency,
        exchange_rate: Number(exchangeRate) || 1,
        bank_details: bankDetails.trim() || undefined,
        vehicle_make: vehicleMake.trim() || undefined,
        vehicle_model: vehicleModel.trim() || undefined,
        vehicle_vin: vehicleVin.trim() || undefined,
        vehicle_engine_no: vehicleEngineNo.trim() || undefined,
        vehicle_reg_no: vehicleRegNo.trim() || undefined,
        job_number: jobNumber.trim() || undefined,
        items: validRows.map((r) => ({
          item_code: r.item_code.trim() || undefined,
          description: r.description.trim(),
          unit: r.unit.trim() || undefined,
          quantity: Number(r.quantity) || 1,
          unit_rate: Number(r.unit_rate) || 0,
        })),
      })
      toast.success(t('billing.invoice.form.created', { number: data.invoice_number }))
      navigate(`/billing/invoices/${data.id}`)
    } catch (error: unknown) {
      const msg = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setErr(msg ?? t('billing.invoice.form.createFailed'))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <button
        className="detail-back"
        onClick={() => navigate('/billing/invoices')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 13.5, marginBottom: 20 }}
      >
        <ChevronLeft size={16} /> {t('billing.invoice.form.backToList')}
      </button>

      <PageHeader title={t('billing.invoice.form.title')} style={{ marginBottom: 24 }} />

      <div style={{ maxWidth: 900, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: 24 }}>
        <form onSubmit={handleSubmit} className="form-grid">
          {err && <div className="page-error" style={{ margin: 0 }}><AlertCircle size={14} /> {err}</div>}

          <div className="form-group">
            <label>{t('billing.invoice.form.customer')} <span className="required">*</span></label>
            <CustomerSelect onChange={setCustomer} />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('billing.invoice.form.referenceType')}</label>
              <select value={referenceType} onChange={(e) => setReferenceType(e.target.value as ReferenceType)}>
                {REFERENCE_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{t('billing.invoice.form.taxRate')}</label>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} min="0" max="100" step="0.1" />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('billing.invoice.form.currency')}</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>{t('billing.invoice.form.exchangeRate')}</label>
              <input
                type="number" min="0" step="0.0001"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                disabled={currency === 'LAK'}
                placeholder="1"
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{t('billing.invoice.meta.issueDate')}</label>
              <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t('billing.invoice.meta.dueDate')}</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="form-group">
            <label>{t('billing.invoice.vehicleInfo.title')}</label>
            <div className="form-row-3">
              <div className="form-group">
                <label>{t('billing.invoice.vehicleInfo.make')}</label>
                <input value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('billing.invoice.vehicleInfo.model')}</label>
                <input value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('billing.invoice.vehicleInfo.vin')}</label>
                <input value={vehicleVin} onChange={(e) => setVehicleVin(e.target.value)} />
              </div>
            </div>
            <div className="form-row-3" style={{ marginTop: 12 }}>
              <div className="form-group">
                <label>{t('billing.invoice.vehicleInfo.engineNo')}</label>
                <input value={vehicleEngineNo} onChange={(e) => setVehicleEngineNo(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('billing.invoice.vehicleInfo.regNo')}</label>
                <input value={vehicleRegNo} onChange={(e) => setVehicleRegNo(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('billing.invoice.vehicleInfo.jobNumber')}</label>
                <input value={jobNumber} onChange={(e) => setJobNumber(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="form-group">
            <label>{t('billing.invoice.form.bankDetails')}</label>
            <textarea
              value={bankDetails}
              onChange={(e) => setBankDetails(e.target.value)}
              rows={3}
              placeholder={t('billing.invoice.form.bankDetailsPlaceholder')}
            />
          </div>

          {/* Line items */}
          <div className="form-group">
            <label>{t('billing.invoice.lineItems.title')} <span className="required">*</span></label>
            <div className="table-wrap" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: 120 }}>{t('billing.invoice.form.itemCode')}</th>
                    <th>{t('billing.invoice.form.description')}</th>
                    <th style={{ width: 90 }}>{t('billing.invoice.lineItems.qty')}</th>
                    <th style={{ width: 90 }}>{t('billing.invoice.form.unit')}</th>
                    <th style={{ width: 130 }}>{t('billing.invoice.form.unitPrice')}</th>
                    <th style={{ width: 130 }}>{t('billing.invoice.form.lineTotal')}</th>
                    <th style={{ width: 40 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.key}>
                      <td>
                        <input
                          value={row.item_code}
                          onChange={(e) => setRow(row.key, 'item_code', e.target.value)}
                          placeholder={t('billing.invoice.form.itemCodePlaceholder')}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td>
                        <input
                          value={row.description}
                          onChange={(e) => setRow(row.key, 'description', e.target.value)}
                          placeholder={t('billing.invoice.form.descriptionPlaceholder')}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td>
                        <input
                          type="number" min="0" step="0.01"
                          value={row.quantity}
                          onChange={(e) => setRow(row.key, 'quantity', e.target.value)}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td>
                        <input
                          value={row.unit}
                          onChange={(e) => setRow(row.key, 'unit', e.target.value)}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td>
                        <input
                          type="number" min="0" step="0.01"
                          value={row.unit_rate}
                          onChange={(e) => setRow(row.key, 'unit_rate', e.target.value)}
                          style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                      </td>
                      <td className="cell-mono">{fmtAmt(lineTotals[i])}</td>
                      <td>
                        <button
                          type="button"
                          className="action-btn danger"
                          onClick={() => removeRow(row.key)}
                          disabled={rows.length === 1}
                          title={t('common.delete')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={addRow} style={{ marginTop: 8 }}>
              <Plus size={14} /> {t('billing.invoice.form.addRow')}
            </button>
          </div>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ minWidth: 260, fontSize: 13.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('billing.invoice.form.subtotal')}</span>
                <span className="cell-mono">{fmtAmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('billing.invoice.amountSummary.tax', { rate: taxRate || 0 })}</span>
                <span className="cell-mono">{fmtAmt(taxAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid var(--color-border)', marginTop: 4, fontWeight: 700, fontSize: 15 }}>
                <span>{t('billing.invoice.form.grandTotal')}</span>
                <span className="cell-mono">{fmtAmt(grandTotal)} {currency}</span>
              </div>
              {currency !== 'LAK' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12.5, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  <span>{t('billing.invoice.form.grandTotalInLAK')}</span>
                  <span className="cell-mono">{fmtAmt(grandTotalInLAK)} LAK</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/billing/invoices')} disabled={isSaving}>{t('common.cancel')}</button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>{isSaving ? t('billing.invoice.form.creating') : t('billing.invoice.form.createInvoice')}</button>
          </div>
        </form>
      </div>

      {/* Live document preview */}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: 'var(--color-text-muted)' }}>{t('billing.invoice.form.previewTitle')}</h3>
        <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 10, padding: 16, background: '#f5f5f5' }}>
          <DocumentPreview
            docType="invoice"
            documentNumber={t('billing.invoice.form.previewPendingNumber')}
            date={issueDate || new Date().toISOString().slice(0, 10)}
            companyName={companyProfile?.company_name}
            companyAddress={companyProfile?.address}
            companyPhone={companyProfile?.phone}
            partyLabel={t('documentPreview.customerDetails')}
            partyName={customer ? `${customer.first_name} ${customer.last_name}${customer.company ? ` — ${customer.company}` : ''}` : '—'}
            vehicle={{
              make: vehicleMake, model: vehicleModel, vin: vehicleVin,
              engineNo: vehicleEngineNo, regNo: vehicleRegNo, jobNumber: jobNumber,
            }}
            items={rows.map((r, i) => ({
              itemCode: r.item_code, description: r.description || '—', unit: r.unit,
              qty: Number(r.quantity) || 0, unitPrice: Number(r.unit_rate) || 0, total: lineTotals[i],
            }))}
            subtotal={subtotal}
            taxRate={Number(taxRate) || 0}
            taxAmount={taxAmount}
            grandTotal={grandTotal}
            currency={currency}
            showBankDetails
            bankDetailsText={bankDetails}
            grandTotalInBaseCurrency={currency !== 'LAK' ? { amount: grandTotalInLAK, currency: 'LAK' } : undefined}
          />
        </div>
      </div>
    </div>
  )
}
