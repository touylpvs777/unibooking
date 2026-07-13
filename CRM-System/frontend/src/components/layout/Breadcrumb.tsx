import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { buildBreadcrumbs, getPageTitle } from '@/config/routes'
import './Breadcrumb.css'

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const crumbs = buildBreadcrumbs(pathname)
  const title = getPageTitle(pathname)

  useEffect(() => {
    document.title = `${title} — DK Service`
  }, [title])

  if (crumbs.length <= 1) {
    return <span className="breadcrumb-title">{title}</span>
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={i} className="breadcrumb-segment">
            {i > 0 && <ChevronRight size={14} className="breadcrumb-sep" />}
            {isLast ? (
              <span className="breadcrumb-current">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="breadcrumb-link">
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
