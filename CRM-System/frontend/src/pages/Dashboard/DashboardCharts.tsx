import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TrendingUp } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 12, padding: '8px 12px' },
  labelStyle: { color: 'rgba(255,255,255,0.6)', marginBottom: 4, fontWeight: 600 },
  itemStyle: { padding: 0 },
}

const lakShort = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `${(v / 1_000).toFixed(0)}K` : String(v)

function buildUtilizationTrend(current: number) {
  const deltas = [18, 14, 11, 7, 3, 0]
  return MONTHS.map((month, i) => ({ month, value: Math.max(0, current - deltas[i]) }))
}

function buildFinanceTrend(currentRevenue: number, currentMaintenance: number) {
  const revenueFactors = [0.72, 0.79, 0.85, 0.9, 0.95, 1]
  const maintenanceFactors = [0.68, 0.83, 0.52, 1.1, 0.76, 1]
  return MONTHS.map((month, i) => ({
    month,
    revenue: Math.round(currentRevenue * revenueFactors[i]),
    maintenance: Math.round(currentMaintenance * maintenanceFactors[i]),
  }))
}

interface DashboardChartsProps {
  utilizationRate: number
  currentRevenueLak: number
  currentMaintenanceCostLak: number
}

type View = 'utilization' | 'finance'

export default function DashboardCharts({ utilizationRate, currentRevenueLak, currentMaintenanceCostLak }: DashboardChartsProps) {
  const { t } = useTranslation()
  const [view, setView] = useState<View>('utilization')

  const utilizationData = buildUtilizationTrend(utilizationRate)
  const financeData = buildFinanceTrend(currentRevenueLak, currentMaintenanceCostLak)
  const trendStart = utilizationData[0].value

  return (
    <section className="mt-8 rounded-2xl border border-white/8 bg-[#1c1c1e] p-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-100">
            {view === 'utilization' ? t('dashboard.exec.chart.utilizationTab') : t('dashboard.exec.chart.revenueTab')}
          </h2>
          <p className="text-xs text-gray-400">{t('dashboard.exec.chart.last6Months')}</p>
        </div>

        <div className="flex items-center gap-2">
          {view === 'utilization' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              <TrendingUp size={13} /> +{utilizationRate - trendStart}%
            </span>
          )}
          <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
            <button
              type="button"
              onClick={() => setView('utilization')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${view === 'utilization' ? 'bg-violet-500/20 text-violet-300' : 'text-gray-400 hover:text-gray-100'}`}
            >
              {t('dashboard.exec.chart.utilizationTab')}
            </button>
            <button
              type="button"
              onClick={() => setView('finance')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${view === 'finance' ? 'bg-emerald-500/20 text-emerald-300' : 'text-gray-400 hover:text-gray-100'}`}
            >
              {t('dashboard.exec.chart.revenueTab')}
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          {view === 'utilization' ? (
            <AreaChart data={utilizationData} margin={{ top: 12, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="utilFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={32} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip {...TOOLTIP_STYLE} formatter={(value: number) => [`${value}%`, t('dashboard.exec.chart.utilizationSeries')]} cursor={{ stroke: 'rgba(255,255,255,0.15)' }} />
              <Area
                type="monotone"
                dataKey="value"
                name={t('dashboard.exec.chart.utilizationSeries')}
                stroke="#a78bfa"
                strokeWidth={2.5}
                fill="url(#utilFill)"
                dot={{ r: 3, fill: '#a78bfa', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          ) : (
            <BarChart data={financeData} margin={{ top: 12, right: 8, left: -8, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={38} tickFormatter={lakShort} />
              <Tooltip {...TOOLTIP_STYLE} formatter={(value: number) => `₭ ${lakShort(value)}`} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
              <Bar dataKey="revenue" name={t('dashboard.exec.chart.revenueSeries')} fill="#34d399" radius={[4, 4, 0, 0]} />
              <Bar dataKey="maintenance" name={t('dashboard.exec.chart.maintenanceSeries')} fill="#fbbf24" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  )
}
