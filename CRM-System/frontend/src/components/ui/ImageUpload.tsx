import { useRef, useState, useCallback } from 'react'
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
      return 'Only JPG, PNG, and WebP images are allowed.'
    }
    if (file.size > MAX_SIZE_BYTES) {
      return `File size exceeds ${MAX_SIZE_MB} MB limit.`
    }
    if (!file.type.startsWith('image/')) {
      return 'File is not a valid image.'
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
        ?.response?.data?.detail || 'Upload failed. Please try again.'
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
          <img src={preview} alt="Upload preview" />
          <button className="img-upload-remove" onClick={reset} title="Remove" type="button">
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
            <CheckCircle2 size={14} /> Uploaded successfully
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
        <div className="img-upload-label">Click or drag an image to upload</div>
        <div className="img-upload-hint">JPG, PNG, WebP · Max {MAX_SIZE_MB} MB</div>
      </div>
      {error && <div className="img-upload-error">{error}</div>}
    </div>
  )
}
