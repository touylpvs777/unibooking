import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X } from 'lucide-react'
import { getCustomers } from '@/api/customers'
import type { Customer } from '@/types/customer'

interface Props {
  onChange: (customer: Customer | null) => void
  placeholder?: string
}

export default function CustomerSelect({ onChange, placeholder }: Props) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Customer[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState<Customer | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    const handle = setTimeout(async () => {
      setIsLoading(true)
      try {
        const { data } = await getCustomers({ q: query || undefined, limit: 8 })
        if (!cancelled) setResults(data)
      } catch {
        if (!cancelled) setResults([])
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }, 300)
    return () => { cancelled = true; clearTimeout(handle) }
  }, [query, isOpen])

  const handleSelect = (c: Customer) => {
    setSelected(c)
    onChange(c)
    setIsOpen(false)
    setQuery('')
  }

  const handleClear = () => {
    setSelected(null)
    onChange(null)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {selected ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: '1px solid var(--color-border)', borderRadius: 'var(--radius)',
          padding: '8px 12px', background: 'var(--color-surface)',
        }}>
          <span style={{ fontSize: 13.5 }}>
            <strong>{selected.first_name} {selected.last_name}</strong>
            {selected.company && <span style={{ color: 'var(--color-text-muted)' }}> — {selected.company}</span>}
          </span>
          <button
            type="button"
            onClick={handleClear}
            aria-label={t('common.clear')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex' }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder ?? t('billing.invoice.form.customerSearchPlaceholder')}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '8px 12px 8px 32px',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', fontSize: 13.5,
            }}
          />
        </div>
      )}

      {isOpen && !selected && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--color-surface)', border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', zIndex: 20,
          maxHeight: 260, overflowY: 'auto',
        }}>
          {isLoading ? (
            <div style={{ padding: 12, fontSize: 13, color: 'var(--color-text-muted)' }}>{t('common.loading')}</div>
          ) : results.length === 0 ? (
            <div style={{ padding: 12, fontSize: 13, color: 'var(--color-text-muted)' }}>{t('billing.invoice.form.noCustomersFound')}</div>
          ) : (
            results.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelect(c)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13.5 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-bg-subtle)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <strong>{c.first_name} {c.last_name}</strong>
                {c.company && <span style={{ color: 'var(--color-text-muted)' }}> · {c.company}</span>}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
