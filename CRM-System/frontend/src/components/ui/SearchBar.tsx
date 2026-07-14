import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, X, ArrowRight, Command } from 'lucide-react'
import { createPortal } from 'react-dom'
import { ROUTE_CONFIG } from '@/config/routes'
import './SearchBar.css'

interface SearchResult {
  labelKey: string
  path: string
  groupKey: string
}

const NAV_RESULTS: SearchResult[] = ROUTE_CONFIG
  .filter((r) => !r.path.includes(':'))
  .map((r) => ({ labelKey: r.labelKey, path: r.path, groupKey: 'header.groupNavigation' }))

const QUICK_ACTIONS: SearchResult[] = [
  { labelKey: 'header.quickActionNewCustomer', path: '/customers', groupKey: 'header.groupQuickActions' },
  { labelKey: 'header.quickActionNewQuotation', path: '/quotations/new', groupKey: 'header.groupQuickActions' },
  { labelKey: 'header.quickActionNewContract', path: '/rental-contracts/new', groupKey: 'header.groupQuickActions' },
  { labelKey: 'header.quickActionRegisterEquipment', path: '/equipment', groupKey: 'header.groupQuickActions' },
]

export default function SearchBar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const navigate = useNavigate()

  const filtered = useMemo(() => (query.trim()
    ? [...NAV_RESULTS, ...QUICK_ACTIONS].filter((r) =>
        t(r.labelKey).toLowerCase().includes(query.toLowerCase())
      )
    : [...QUICK_ACTIONS.slice(0, 3), ...NAV_RESULTS.slice(0, 6)]
  ), [query, t])

  const open = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement
    setIsOpen(true)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    previousFocus.current?.focus()
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((v) => { if (!v) previousFocus.current = document.activeElement as HTMLElement; return !v })
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [isOpen])

  const select = (result: SearchResult) => {
    navigate(result.path)
    close()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      select(filtered[activeIndex])
    } else if (e.key === 'Escape') {
      close()
    }
  }

  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, r) => {
    ;(acc[r.groupKey] ??= []).push(r)
    return acc
  }, {})

  let flatIdx = -1
  const listboxId = 'search-palette-listbox'

  return (
    <>
      <button className="search-trigger" onClick={open} aria-label={t('header.searchLabel')}>
        <Search size={15} />
        <span className="search-trigger-text">{t('header.searchTrigger')}</span>
        <kbd className="search-trigger-kbd"><Command size={10} />K</kbd>
      </button>

      {isOpen && createPortal(
        <div className="search-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
          <div ref={paletteRef} className="search-palette" role="dialog" aria-modal="true" aria-label={t('header.searchLabel')} onKeyDown={handleKeyDown}>
            <div className="search-palette-input-wrap">
              <Search size={18} className="search-palette-icon" />
              <input
                ref={inputRef}
                className="search-palette-input"
                placeholder={t('header.searchPlaceholder')}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
                role="combobox"
                aria-expanded="true"
                aria-controls={listboxId}
                aria-activedescendant={filtered[activeIndex] ? `search-opt-${activeIndex}` : undefined}
                aria-autocomplete="list"
                aria-label={t('header.searchCommandsLabel')}
              />
              {query && (
                <button className="search-palette-clear" onClick={() => setQuery('')} aria-label={t('header.clearSearch')}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="search-palette-results" id={listboxId} role="listbox" aria-label={t('header.searchResults')}>
              {Object.entries(grouped).map(([groupKey, items]) => (
                <div key={groupKey} className="search-group" role="group" aria-label={t(groupKey)}>
                  <div className="search-group-label" aria-hidden="true">{t(groupKey)}</div>
                  {items.map((item) => {
                    flatIdx++
                    const idx = flatIdx
                    return (
                      <button
                        key={item.path + item.labelKey}
                        id={`search-opt-${idx}`}
                        className={`search-result${idx === activeIndex ? ' active' : ''}`}
                        onClick={() => select(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        role="option"
                        aria-selected={idx === activeIndex}
                      >
                        <span className="search-result-label">{t(item.labelKey)}</span>
                        <ArrowRight size={14} className="search-result-arrow" />
                      </button>
                    )
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="search-empty" role="status">{t('header.noResults', { query })}</div>
              )}
            </div>

            <div className="search-palette-footer" aria-hidden="true">
              <span>↑↓ {t('header.navigate')}</span>
              <span>↵ {t('header.select')}</span>
              <span>esc {t('header.close')}</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
