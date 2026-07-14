import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Upload, FileSpreadsheet, CheckCircle2, XCircle,
  ChevronDown, ChevronRight, AlertCircle, RefreshCw, Loader2,
} from 'lucide-react'
import { previewImport, executeImport } from '@/api/catalog'
import type { ImportPreviewResponse, ImportExecuteResponse, SheetPreview } from '@/types/catalog'
import { toast } from '@/store/toastStore'
import './ImportPage.css'
import '@/styles/shared.css'

type Step = 'upload' | 'preview' | 'result'

function SheetPreviewCard({ sheet }: { sheet: SheetPreview }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(true)

  return (
    <div className="sheet-card">
      <button className="sheet-card-header" onClick={() => setOpen(!open)}>
        <div className="sheet-card-title">
          <FileSpreadsheet size={15} />
          <strong>{sheet.sheet_name}</strong>
          <span className="sheet-handler">{t('catalog.import.handlerLabel', { handler: sheet.handler })}</span>
        </div>
        <div className="sheet-card-counts">
          <span className="count-valid"><CheckCircle2 size={13} /> {t('catalog.import.validCount', { count: sheet.total_valid })}</span>
          {sheet.total_errors > 0 && (
            <span className="count-error"><XCircle size={13} /> {t('catalog.import.errorsCount', { count: sheet.total_errors })}</span>
          )}
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </button>

      {open && (
        <div className="sheet-card-body">
          {/* Valid rows preview */}
          {sheet.valid_rows.length > 0 && (
            <div className="sheet-table-wrap">
              <div className="sheet-sub-title">{t('catalog.import.productsToImport', { count: sheet.valid_rows.length })}</div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t('catalog.import.table.rowNum')}</th>
                    <th>{t('catalog.import.table.action')}</th>
                    <th>{t('common.name')}</th>
                    <th>{t('catalog.import.table.model')}</th>
                    <th>{t('catalog.import.table.brand')}</th>
                    <th>{t('common.category')}</th>
                    <th>{t('catalog.import.table.specs')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sheet.valid_rows.map((row) => (
                    <tr key={row.row_number}>
                      <td className="cell-muted cell-mono">{row.row_number}</td>
                      <td>
                        <span className={`action-badge ${row.action}`}>{row.action}</span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{row.name_en}</td>
                      <td className="cell-muted">{row.model_number ?? '—'}</td>
                      <td className="cell-muted">{row.brand_name ?? '—'}</td>
                      <td className="cell-muted">
                        {[row.category_l1, row.category_l2, row.category_l3].filter(Boolean).join(' › ')}
                      </td>
                      <td className="cell-muted">{row.specs.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Error rows */}
          {sheet.error_rows.length > 0 && (
            <div className="sheet-table-wrap" style={{ marginTop: 12 }}>
              <div className="sheet-sub-title error">{t('catalog.import.rowsWithErrors', { count: sheet.error_rows.length })}</div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t('catalog.import.table.rowNum')}</th>
                    <th>{t('catalog.import.table.error')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sheet.error_rows.map((e, i) => (
                    <tr key={i}>
                      <td className="cell-muted cell-mono">{e.row_number}</td>
                      <td style={{ color: 'var(--color-danger-600)' }}>{e.error_message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ImportPage() {
  const { t } = useTranslation()
  const fileInputRef              = useRef<HTMLInputElement>(null)
  const [step, setStep]           = useState<Step>('upload')
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile]           = useState<File | null>(null)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isExecuting, setIsExecuting]   = useState(false)
  const [preview, setPreview]     = useState<ImportPreviewResponse | null>(null)
  const [result, setResult]       = useState<ImportExecuteResponse | null>(null)

  const handleFileSelect = (f: File) => {
    if (!f.name.match(/\.(xlsx|xls)$/i)) {
      toast.error(t('catalog.import.invalidFileType'))
      return
    }
    setFile(f)
    setPreview(null)
    setResult(null)
    setStep('upload')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFileSelect(f)
  }

  const handlePreview = async () => {
    if (!file) return
    setIsPreviewing(true)
    try {
      const { data } = await previewImport(file)
      setPreview(data)
      setStep('preview')
    } catch {
      toast.error(t('catalog.import.parseFailed'))
    } finally {
      setIsPreviewing(false)
    }
  }

  const handleExecute = async () => {
    if (!preview) return
    setIsExecuting(true)
    try {
      const { data } = await executeImport(preview.job_id)
      setResult(data)
      setStep('result')
      if (data.error_rows === 0) toast.success(t('catalog.import.successToast', { count: data.success_rows }))
      else toast.error(t('catalog.import.errorToast', { count: data.error_rows }))
    } catch {
      toast.error(t('catalog.import.executeFailed'))
    } finally {
      setIsExecuting(false)
    }
  }

  const reset = () => {
    setStep('upload')
    setFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="import-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>{t('catalog.import.title')}</h1>
          <p className="page-header-sub">{t('catalog.import.subtitle')}</p>
        </div>
        {step !== 'upload' && (
          <button className="btn btn-ghost" onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={14} /> {t('catalog.import.startOver')}
          </button>
        )}
      </div>

      {/* Steps indicator */}
      <div className="import-steps">
        {(['upload', 'preview', 'result'] as Step[]).map((s, i) => (
          <div key={s} className={`import-step${step === s ? ' active' : ''}${['preview', 'result'].indexOf(step) > ['preview', 'result'].indexOf(s) ? ' done' : ''}`}>
            <div className="import-step-num">{i + 1}</div>
            <div className="import-step-label">{s === 'upload' ? t('catalog.import.steps.upload') : s === 'preview' ? t('catalog.import.steps.preview') : t('catalog.import.steps.result')}</div>
            {i < 2 && <div className="import-step-connector" />}
          </div>
        ))}
      </div>

      {/* ── Step 1: Upload ── */}
      {step === 'upload' && (
        <div className="import-section">
          <div
            className={`dropzone${isDragging ? ' dragging' : ''}${file ? ' has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f) }}
            />
            <FileSpreadsheet size={40} className="dropzone-icon" />
            {file ? (
              <>
                <div className="dropzone-filename">{file.name}</div>
                <div className="dropzone-size">{(file.size / 1024).toFixed(1)} KB</div>
              </>
            ) : (
              <>
                <div className="dropzone-text">{t('catalog.import.dropzoneText')}</div>
                <div className="dropzone-hint">{t('catalog.import.dropzoneHint')}</div>
              </>
            )}
          </div>

          {file && (
            <div className="import-actions">
              <button className="btn btn-secondary" onClick={reset}>{t('catalog.import.clear')}</button>
              <button className="btn btn-primary" onClick={handlePreview} disabled={isPreviewing}>
                {isPreviewing ? (
                  <><Loader2 size={15} className="spin" /> {t('catalog.import.analysing')}</>
                ) : (
                  <><Upload size={15} /> {t('catalog.import.previewImport')}</>
                )}
              </button>
            </div>
          )}

          <div className="import-info">
            <AlertCircle size={14} />
            <div>
              <strong>{t('catalog.import.supportedSheetsLabel')}</strong> {t('catalog.import.supportedSheetsList')}
              {' '}{t('catalog.import.autoDetectHint')}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Preview ── */}
      {step === 'preview' && preview && (
        <div className="import-section">
          {/* Summary */}
          <div className="preview-summary">
            <div className="summary-card">
              <div className="summary-label">{t('catalog.import.sheetsDetected')}</div>
              <div className="summary-value">{preview.sheets_detected.length}</div>
            </div>
            <div className="summary-card valid">
              <div className="summary-label">{t('catalog.import.validRows')}</div>
              <div className="summary-value">{preview.total_valid}</div>
            </div>
            <div className={`summary-card${preview.total_errors > 0 ? ' error' : ''}`}>
              <div className="summary-label">{t('catalog.import.errorRows')}</div>
              <div className="summary-value">{preview.total_errors}</div>
            </div>
          </div>

          <div className="preview-filename">
            <FileSpreadsheet size={14} /> {preview.filename}
          </div>

          {/* Per-sheet preview */}
          <div className="sheets-list">
            {preview.sheets.map((sheet) => (
              <SheetPreviewCard key={sheet.sheet_name} sheet={sheet} />
            ))}
          </div>

          <div className="import-actions">
            <button className="btn btn-secondary" onClick={reset}>{t('common.cancel')}</button>
            <button
              className="btn btn-primary"
              onClick={handleExecute}
              disabled={isExecuting || preview.total_valid === 0}
            >
              {isExecuting ? (
                <><Loader2 size={15} className="spin" /> {t('catalog.import.importing')}</>
              ) : (
                <>{t('catalog.import.importCount', { count: preview.total_valid })}</>
              )}
            </button>
          </div>
          {preview.total_valid === 0 && (
            <p style={{ fontSize: 13, color: 'var(--color-danger-600)', textAlign: 'center' }}>
              {t('catalog.import.noValidRows')}
            </p>
          )}
        </div>
      )}

      {/* ── Step 3: Result ── */}
      {step === 'result' && result && (
        <div className="import-section">
          <div className={`result-banner ${result.error_rows === 0 ? 'success' : 'partial'}`}>
            {result.error_rows === 0 ? (
              <><CheckCircle2 size={24} /> {t('catalog.import.successBanner')}</>
            ) : (
              <><AlertCircle size={24} /> {t('catalog.import.partialBanner')}</>
            )}
          </div>

          <div className="preview-summary">
            <div className="summary-card valid">
              <div className="summary-label">{t('catalog.import.imported')}</div>
              <div className="summary-value">{result.success_rows}</div>
            </div>
            <div className={`summary-card${result.error_rows > 0 ? ' error' : ''}`}>
              <div className="summary-label">{t('catalog.import.errors')}</div>
              <div className="summary-value">{result.error_rows}</div>
            </div>
          </div>

          {result.errors.length > 0 && (
            <div className="table-card" style={{ marginTop: 16 }}>
              <div style={{ padding: '12px 16px', fontWeight: 600, fontSize: 13.5 }}>{t('catalog.import.failedRows')}</div>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>{t('catalog.import.table.sheet')}</th>
                      <th>{t('catalog.import.table.rowNum')}</th>
                      <th>{t('catalog.import.table.error')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.errors.map((e, i) => (
                      <tr key={i}>
                        <td className="cell-muted">{e.sheet_name}</td>
                        <td className="cell-muted cell-mono">{e.row_number}</td>
                        <td style={{ color: 'var(--color-danger-600)' }}>{e.error_message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="import-actions">
            <button className="btn btn-secondary" onClick={reset}>{t('catalog.import.importAnother')}</button>
            <a href="/catalog" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {t('catalog.import.viewCatalog')}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
