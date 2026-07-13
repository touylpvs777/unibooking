import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'
import './Toast.css'

const ICONS = {
  success: <CheckCircle size={16} />,
  error:   <XCircle size={16} />,
  info:    <Info size={16} />,
}

export default function ToastContainer() {
  const { toasts, remove } = useToastStore()

  return (
    <div className="toast-container" role="status" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} role={t.type === 'error' ? 'alert' : 'status'}>
          <span className="toast-icon">{ICONS[t.type]}</span>
          <span className="toast-msg">{t.message}</span>
          <button className="toast-close" onClick={() => remove(t.id)} aria-label="Dismiss notification">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
