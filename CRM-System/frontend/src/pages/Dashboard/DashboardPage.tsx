import { useState, useEffect, useRef, useCallback } from 'react'
import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ChevronLeft, ChevronRight,
  Forklift, Handshake, ReceiptText, KeyRound, Truck, Construction,
  Zap, CreditCard, Vault, BarChart3, Warehouse, ShoppingCart,
  Wrench, Boxes, CalendarClock, Route, Activity, Package,
} from 'lucide-react'

const HERO_SLIDES = [
  { key: 'assets', gradient: 'linear-gradient(135deg, #12283f 0%, #1c4e9c 55%, #4cc2ff 100%)', href: '/equipment' },
  { key: 'invoicing', gradient: 'linear-gradient(135deg, #2b1140 0%, #7c3aed 55%, #d946ef 100%)', href: '/billing/invoices' },
  { key: 'maintenance', gradient: 'linear-gradient(135deg, #0c2b24 0%, #0f7d76 55%, #34d8b8 100%)', href: '/maintenance' },
] as const

const PROMO_CARDS = [
  { key: 'sale', classes: 'from-[#ff5f7e] to-[#a63ce0]' },
  { key: 'new', classes: 'from-[#21d4a7] to-[#1481c9]' },
  { key: 'staffPicks', classes: 'from-[#ffb545] to-[#ff5e5e]' },
] as const

const ICON_GRADIENTS = [
  'linear-gradient(155deg,#ff7a59,#c23f6b)', 'linear-gradient(155deg,#4cc2ff,#2a6fd6)',
  'linear-gradient(155deg,#21d4a7,#0f7d76)', 'linear-gradient(155deg,#ffb545,#ff5e5e)',
  'linear-gradient(155deg,#a76bf0,#5a3ce0)', 'linear-gradient(155deg,#f2d94e,#e08a2e)',
]

// Real DK Lao Platform modules — mapped to their actual routes wherever one exists.
const MOST_USED = [
  { key: 'equipmentRegistry', href: '/equipment', icon: Forklift },
  { key: 'customers', href: '/customers', icon: Handshake },
  { key: 'quotations', href: '/quotations', icon: ReceiptText },
  { key: 'rentalContracts', href: '/rental-contracts', icon: KeyRound },
  { key: 'movements', href: '/movements', icon: Truck },
  { key: 'projects', href: '/projects', icon: Construction },
] as const

const RECOMMENDED = [
  { key: 'smartInvoicing', href: '/billing/invoices', icon: Zap },
  { key: 'payments', href: '/billing/payments', icon: CreditCard },
  { key: 'deposits', href: '/billing/deposits', icon: Vault },
  { key: 'statements', href: '/billing/statements', icon: BarChart3 },
  { key: 'inventory', href: '/inventory', icon: Warehouse },
  { key: 'purchaseOrders', href: '/inventory/purchase-orders', icon: ShoppingCart },
] as const

const FIELD_SERVICE = [
  { key: 'workOrders', href: '/maintenance', badge: 'free' as const, icon: Wrench },
  { key: 'assetRegistry', href: '/equipment', badge: 'free' as const, icon: Boxes },
  { key: 'maintenanceSchedule', href: '/maintenance', badge: 'free' as const, icon: CalendarClock },
  { thirdPartyKey: 'routeWise', badge: 'comingSoon' as const, icon: Route },
  { thirdPartyKey: 'fleetPulse', badge: 'comingSoon' as const, icon: Activity },
  { thirdPartyKey: 'partsBin', badge: 'comingSoon' as const, icon: Package },
]

function TrendingRow({
  title, iconOffset, children,
}: { title: string; iconOffset: number; children: (grad: (i: number) => string) => React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const scroll = (dir: number) => trackRef.current?.scrollBy({ left: dir * 480, behavior: 'smooth' })
  const grad = (i: number) => ICON_GRADIENTS[(iconOffset + i) % ICON_GRADIENTS.length]

  return (
    <section className="mb-9">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 cursor-pointer group">
          <h2 className="text-[17px] font-bold text-[var(--color-text)] group-hover:text-sky-400 transition-colors">{title}</h2>
          <ChevronRight size={17} className="text-[var(--color-text)] group-hover:text-sky-400 transition-colors" />
        </div>
        <div className="flex gap-1.5">
          <button
            type="button" onClick={() => scroll(-1)} disabled={!canLeft}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button" onClick={() => scroll(1)} disabled={!canRight}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div ref={trackRef} className="flex gap-3.5 overflow-x-auto pb-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children(grad)}
      </div>
    </section>
  )
}

function ItemCard({ title, sub, badge, isFree, gradient, icon: Icon, onClick }: { title: string; sub: string; badge: string; isFree: boolean; gradient: string; icon: LucideIcon; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex-none w-[168px] flex flex-col gap-2 p-2.5 rounded-2xl hover:bg-[var(--color-bg-subtle)] hover:-translate-y-0.5 transition-all ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div
        className="w-full aspect-square rounded-2xl flex items-center justify-center shadow-lg"
        style={{ background: gradient }}
      >
        <Icon size={30} strokeWidth={1.75} className="text-white/95" />
      </div>
      <div className="text-[13px] font-bold text-[var(--color-text)] truncate">{title}</div>
      <div className="text-[11.5px] text-[var(--color-text-muted)] truncate -mt-1.5">{sub}</div>
      <span className={`self-start text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${isFree ? 'bg-emerald-500/15 text-emerald-400' : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]'}`}>
        {badge}
      </span>
    </div>
  )
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [heroIndex, setHeroIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const slide = HERO_SLIDES[heroIndex]
  const freeLabel = t('dashboard.store.free')
  const comingSoonLabel = t('dashboard.store.comingSoon')

  return (
    <div>
      {/* Hero carousel + gradient promo cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4 mb-8">
        <div
          className="relative rounded-2xl overflow-hidden min-h-[340px] flex flex-col justify-end p-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {HERO_SLIDES.map((s, i) => (
            <div
              key={s.key}
              className={`absolute inset-0 transition-opacity duration-500 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ background: s.gradient }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <div className="relative">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sky-300 mb-2">{t(`dashboard.store.hero.${slide.key}.eyebrow`)}</div>
            <h1 className="text-3xl font-extrabold text-white mb-2 text-balance">{t(`dashboard.store.hero.${slide.key}.title`)}</h1>
            <p className="text-sm text-gray-200 max-w-md mb-5 leading-relaxed">{t(`dashboard.store.hero.${slide.key}.desc`)}</p>
            <button
              type="button"
              onClick={() => navigate(slide.href)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-[13.5px] hover:bg-gray-200 hover:scale-[1.035] transition-all"
            >
              {t('dashboard.store.get')} <ChevronRight size={15} />
            </button>
          </div>

          <div className="absolute bottom-4 right-6 flex gap-1.5">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setHeroIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === heroIndex ? 'bg-white scale-125' : 'bg-white/35'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {PROMO_CARDS.map((p) => (
            <div
              key={p.key}
              className={`flex-1 rounded-2xl p-5 flex flex-col justify-end min-h-[90px] cursor-pointer hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-xl transition-all bg-gradient-to-br ${p.classes}`}
            >
              <div className="text-[10.5px] font-bold uppercase tracking-wide text-white/85 mb-1">{t(`dashboard.store.promo.${p.key}.kicker`)}</div>
              <div className="text-lg font-extrabold text-white leading-snug">{t(`dashboard.store.promo.${p.key}.title`)}</div>
            </div>
          ))}
        </div>
      </div>

      <TrendingRow title={t('dashboard.store.rows.mostUsed')} iconOffset={0}>
        {(grad) => MOST_USED.map((item, i) => (
          <ItemCard
            key={item.key}
            title={t(`dashboard.store.modules.${item.key}.title`)}
            sub={t(`dashboard.store.modules.${item.key}.sub`)}
            badge={freeLabel}
            isFree
            gradient={grad(i)}
            icon={item.icon}
            onClick={() => navigate(item.href)}
          />
        ))}
      </TrendingRow>

      <TrendingRow title={t('dashboard.store.rows.recommended')} iconOffset={7}>
        {(grad) => RECOMMENDED.map((item, i) => (
          <ItemCard
            key={item.key}
            title={t(`dashboard.store.modules.${item.key}.title`)}
            sub={t(`dashboard.store.modules.${item.key}.sub`)}
            badge={freeLabel}
            isFree
            gradient={grad(i)}
            icon={item.icon}
            onClick={() => navigate(item.href)}
          />
        ))}
      </TrendingRow>

      <TrendingRow title={t('dashboard.store.rows.fieldService')} iconOffset={14}>
        {(grad) => FIELD_SERVICE.map((item, i) => {
          const isDkModule = 'key' in item
          const titleKey = isDkModule ? `dashboard.store.modules.${item.key}.title` : `dashboard.store.thirdParty.${item.thirdPartyKey}.title`
          const subKey = isDkModule ? `dashboard.store.modules.${item.key}.sub` : `dashboard.store.thirdParty.${item.thirdPartyKey}.sub`
          return (
            <ItemCard
              key={isDkModule ? item.key : item.thirdPartyKey}
              title={t(titleKey)}
              sub={t(subKey)}
              badge={item.badge === 'free' ? freeLabel : comingSoonLabel}
              isFree={item.badge === 'free'}
              gradient={grad(i)}
              icon={item.icon}
              onClick={isDkModule ? () => navigate(item.href) : undefined}
            />
          )
        })}
      </TrendingRow>
    </div>
  )
}
