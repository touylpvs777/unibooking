import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight, Command } from 'lucide-react'
import { createPortal } from 'react-dom'
import { ROUTE_CONFIG } from '@/config/routes'
import './SearchBar.css'

interface SearchResult {
  label: string
  path: string
  group: string
}

const NAV_RESULTS: SearchResult[] = ROUTE_CONFIG
  .filter((r) => !r.path.includes(':'))
  .map((r) => ({ label: r.label, path: r.path, group: 'Navigation' }))

const QUICK_ACTIONS: SearchResult[] = [
  { label: 'New Customer', path: '/customers', group: 'Quick Actions' },
  { label: 'New Quotation', path: '/quotations/new', group: 'Quick Actions' },
  { label: 'New Contract', path: '/rental-contracts/new', group: 'Quick Actions' },
  { label: 'Register Equipment', path: '/equipment', group: 'Quick Actions' },
]

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const navigate = useNavigate()

  const filtered = query.trim()
    ? [...NAV_RESULTS, ...QUICK_ACTIONS].filter((r) =>
        r.label.toLowerCase().includes(query.toLowerCase())
      )
    : [...QUICK_ACTIONS.slice(0, 3), ...NAV_RESULTS.slice(0, 6)]

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
    ;(acc[r.group] ??= []).push(r)
    return acc
  }, {})

  let flatIdx = -1
  const listboxId = 'search-palette-listbox'

  return (
    <>
      <button className="search-trigger" onClick={open} aria-label="Search (Ctrl+K)">
        <Search size={15} />
        <span className="search-trigger-text">Search...</span>
        <kbd className="search-trigger-kbd"><Command size={10} />K</kbd>
      </button>

      {isOpen && createPortal(
        <div className="search-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
          <div ref={paletteRef} className="search-palette" role="dialog" aria-modal="true" aria-label="Search" onKeyDown={handleKeyDown}>
            <div className="search-palette-input-wrap">
              <Search size={18} className="search-palette-icon" />
              <input
                ref={inputRef}
                className="search-palette-input"
                placeholder="Search pages, actions..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
                role="combobox"
                aria-expanded="true"
                aria-controls={listboxId}
                aria-activedescendant={filtered[activeIndex] ? `search-opt-${activeIndex}` : undefined}
                aria-autocomplete="list"
                aria-label="Search commands"
              />
              {query && (
                <button className="search-palette-clear" onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="search-palette-results" id={listboxId} role="listbox" aria-label="Search results">
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="search-group" role="group" aria-label={group}>
                  <div className="search-group-label" aria-hidden="true">{group}</div>
                  {items.map((item) => {
                    flatIdx++
                    const idx = flatIdx
                    return (
                      <button
                        key={item.path + item.label}
                        id={`search-opt-${idx}`}
                        className={`search-result${idx === activeIndex ? ' active' : ''}`}
                        onClick={() => select(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        role="option"
                        aria-selected={idx === activeIndex}
                      >
                        <span className="search-result-label">{item.label}</span>
                        <ArrowRight size={14} className="search-result-arrow" />
                      </button>
                    )
                  })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="search-empty" role="status">No results for &ldquo;{query}&rdquo;</div>
              )}
            </div>

            <div className="search-palette-footer" aria-hidden="true">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
