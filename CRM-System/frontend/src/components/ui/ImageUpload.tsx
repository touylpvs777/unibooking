import { useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Upload, X, CheckCircle2 } from 'lucide-react'
import { uploadImage, type UploadResult } from '@/api/upload'
import './ImageUpload.css'

const ACCEPTED = '.jpg,.jpeg,.png,.webp'
const MAX_SIZE_MB = 5
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

interface Props {
  onUploaded?: (result: UploadResult) => void
  className?: string
}

export default function ImageUpload({ onUploaded, className }: Props) {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<UploadResult | null>(null)
  const [dragging, setDragging] = useState(false)

  const reset = () => {
    setPreview(null)
    setProgress(null)
    setError(null)
    setResult(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const validate = (file: File): string | null => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!ext || !['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      return t('imageUpload.invalidFormat')
    }
    if (file.size > MAX_SIZE_BYTES) {
      return t('imageUpload.fileTooLarge', { size: MAX_SIZE_MB })
    }
    if (!file.type.startsWith('image/')) {
      return t('imageUpload.invalidImage')
    }
    return null
  }

  const handleFile = useCallback(async (file: File) => {
    setError(null)
    setResult(null)

    const validationError = validate(file)
    if (validationError) {
      setError(validationError)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setProgress(0)

    try {
      const res = await uploadImage(file, setProgress)
      setResult(res)
      setProgress(100)
      onUploaded?.(res)
    } catch (err) {
      const msg = (err as { response?: { data?: { detail?: string } } })
        ?.response?.data?.detail || t('imageUpload.uploadFailed')
      setError(msg)
      setProgress(null)
    }
  }, [onUploaded])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  if (preview) {
    return (
      <div className={className}>
        <div className="img-upload-preview">
          <img src={preview} alt={t('imageUpload.previewAlt')} />
          <button className="img-upload-remove" onClick={reset} title={t('imageUpload.remove')} type="button">
            <X size={14} />
          </button>
        </div>

        {progress !== null && progress < 100 && (
          <div className="img-upload-progress">
            <div className="img-upload-progress-bar">
              <div className="img-upload-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="img-upload-progress-text">{progress}%</div>
          </div>
        )}

        {result && (
          <div className="img-upload-success">
            <CheckCircle2 size={14} /> {t('imageUpload.uploadedSuccessfully')}
          </div>
        )}

        {error && <div className="img-upload-error">{error}</div>}
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        className={`img-upload${dragging ? ' dragging' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          onChange={onFileChange}
          hidden
        />
        <div className="img-upload-icon"><Upload size={28} /></div>
        <div className="img-upload-label">{t('imageUpload.clickOrDrag')}</div>
        <div className="img-upload-hint">{t('imageUpload.hint', { size: MAX_SIZE_MB })}</div>
      </div>
      {error && <div className="img-upload-error">{error}</div>}
    </div>
  )
}
