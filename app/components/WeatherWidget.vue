<template>
  <div class="world-weather">
    <button
      type="button"
      class="weather-pill"
      :aria-label="$t('weather.modalTitle')"
      @click="openModal"
    >
      <component :is="weatherIcon" class="weather-pill__icon" />
      <span class="weather-pill__city">{{ selectedLocation.name }}</span>
      <span class="weather-pill__temp">{{ temperatureLabel || '--°' }}</span>
    </button>

    <Teleport to="body">
      <Transition name="weather-modal">
        <div
          v-if="isModalOpen"
          class="weather-modal-overlay"
          @click.self="closeModal"
        >
          <div
            class="weather-modal"
            role="dialog"
            aria-modal="true"
            :aria-label="$t('weather.modalTitle')"
          >
            <button
              type="button"
              class="weather-modal__close"
              :aria-label="$t('common.close')"
              @click="closeModal"
            >
              <CloseOutlined />
            </button>

            <div class="weather-modal__search">
              <SearchOutlined class="weather-modal__search-icon" />
              <input
                v-model="searchQuery"
                type="text"
                class="weather-modal__search-input"
                :placeholder="$t('weather.searchPlaceholder')"
                @input="handleSearchInput"
              >
            </div>

            <ul v-if="searchQuery.trim().length >= 2" class="weather-modal__suggestions">
              <li v-if="isSearching" class="weather-modal__suggestion weather-modal__suggestion--empty">
                {{ $t('weather.searching') }}
              </li>
              <template v-else-if="searchResults.length">
                <li
                  v-for="result in searchResults"
                  :key="result.id"
                  class="weather-modal__suggestion"
                  @click="selectCity(result)"
                >
                  <span class="weather-modal__suggestion-name">{{ result.name }}</span>
                  <span class="weather-modal__suggestion-region">{{ formatRegion(result) }}</span>
                </li>
              </template>
              <li v-else class="weather-modal__suggestion weather-modal__suggestion--empty">
                {{ $t('weather.noResults') }}
              </li>
            </ul>

            <template v-else>
              <div class="weather-modal__hero">
                <span class="weather-modal__hero-city">{{ selectedLocation.name }}</span>
                <span v-if="formatRegion(selectedLocation)" class="weather-modal__hero-region">{{ formatRegion(selectedLocation) }}</span>
                <span class="weather-modal__hero-time">{{ currentTime }} · {{ currentDate }}</span>

                <div class="weather-modal__hero-main">
                  <component :is="weatherIcon" class="weather-modal__hero-icon" />
                  <span class="weather-modal__hero-temp">{{ temperatureLabel }}</span>
                </div>
                <span class="weather-modal__hero-condition">{{ conditionLabel }}</span>
              </div>

              <div class="weather-modal__stats">
                <div class="weather-modal__stat">
                  <span class="weather-modal__stat-value">{{ humidity }}%</span>
                  <span class="weather-modal__stat-label">{{ $t('weather.humidity') }}</span>
                </div>
                <div class="weather-modal__stat">
                  <span class="weather-modal__stat-value">{{ windSpeed }} km/h</span>
                  <span class="weather-modal__stat-label">{{ $t('weather.wind') }}</span>
                </div>
                <div class="weather-modal__stat">
                  <span class="weather-modal__stat-value">{{ uvIndex }}</span>
                  <span class="weather-modal__stat-label">{{ $t('weather.uvIndex') }}</span>
                </div>
              </div>

              <div class="weather-modal__calendar">
                <div class="weather-modal__calendar-header">
                  <button type="button" class="weather-modal__calendar-nav" :aria-label="$t('weather.prevMonth')" @click="goToPrevMonth">
                    <LeftOutlined />
                  </button>
                  <span class="weather-modal__calendar-title">{{ calendarMonthLabel }}</span>
                  <button type="button" class="weather-modal__calendar-nav" :aria-label="$t('weather.nextMonth')" @click="goToNextMonth">
                    <RightOutlined />
                  </button>
                </div>

                <div class="weather-modal__calendar-weekdays">
                  <span v-for="label in WEEKDAY_LABELS" :key="label">{{ label }}</span>
                </div>

                <div class="weather-modal__calendar-grid">
                  <div v-for="week in calendarWeeks" :key="week[0].key" class="weather-modal__calendar-row">
                    <div
                      v-for="cell in week"
                      :key="cell.key"
                      class="weather-modal__calendar-cell"
                      :class="{
                        'is-outside': !cell.inCurrentMonth,
                        'is-today': cell.isToday,
                        'has-forecast': !!cell.forecast
                      }"
                    >
                      <span class="weather-modal__calendar-daynum">{{ cell.day }}</span>
                      <template v-if="cell.forecast">
                        <component :is="WEATHER_ICONS[weatherCategory(cell.forecast.code)]" class="weather-modal__calendar-icon" />
                        <span class="weather-modal__calendar-temps">{{ cell.forecast.max }}°/{{ cell.forecast.min }}°</span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

              <p v-if="weatherError" class="weather-modal__error">{{ $t('weather.fetchError') }}</p>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, h, onMounted, onUnmounted, ref, watch } from 'vue'
import { CloseOutlined, LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons-vue'

const { t, locale } = useI18n()

const DEFAULT_LOCATION = { name: t('weather.city'), admin1: '', country: 'Laos', latitude: 17.9667, longitude: 102.6 }

const selectedLocation = ref({ ...DEFAULT_LOCATION })
const weather = ref(null)
const weatherError = ref(false)

async function fetchWeatherFor(location) {
  weatherError.value = false
  try {
    weather.value = await $fetch('https://api.open-meteo.com/v1/forecast', {
      query: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max',
        timezone: 'auto'
      }
    })
  } catch {
    weatherError.value = true
  }
}

onMounted(() => fetchWeatherFor(selectedLocation.value))

const temperature = computed(() => {
  const temp = weather.value?.current?.temperature_2m
  return typeof temp === 'number' ? Math.round(temp) : null
})

const temperatureLabel = computed(() => {
  if (temperature.value === null) return ''
  return `${temperature.value >= 0 ? '+' : ''}${temperature.value}°C`
})

const humidity = computed(() => {
  const value = weather.value?.current?.relative_humidity_2m
  return typeof value === 'number' ? Math.round(value) : '--'
})

const windSpeed = computed(() => {
  const value = weather.value?.current?.wind_speed_10m
  return typeof value === 'number' ? Math.round(value) : '--'
})

// Open-Meteo's forecast endpoint has no UV field on `current` -- only on
// daily/hourly -- so "now" is approximated with today's daily max.
const uvIndex = computed(() => {
  const value = weather.value?.daily?.uv_index_max?.[0]
  return typeof value === 'number' ? Math.round(value * 10) / 10 : '--'
})

const dailyForecast = computed(() => {
  const daily = weather.value?.daily
  if (!daily?.time) return []
  return daily.time.map((date, i) => ({
    date,
    max: Math.round(daily.temperature_2m_max[i]),
    min: Math.round(daily.temperature_2m_min[i]),
    code: daily.weather_code[i]
  }))
})

// WMO weather codes -- https://open-meteo.com/en/docs (current.weather_code)
const WEATHER_ICONS = {
  clear: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('circle', { cx: 12, cy: 12, r: 4.5 }),
    h('g', { stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round' },
      [0, 45, 90, 135, 180, 225, 270, 315].map((deg) =>
        h('line', {
          key: deg,
          x1: 12 + Math.cos((deg * Math.PI) / 180) * 7,
          y1: 12 + Math.sin((deg * Math.PI) / 180) * 7,
          x2: 12 + Math.cos((deg * Math.PI) / 180) * 10,
          y2: 12 + Math.sin((deg * Math.PI) / 180) * 10
        })
      ))
  ]),
  cloudy: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M7 18a4.5 4.5 0 0 1-.6-8.96A5.5 5.5 0 0 1 17.2 8.1 4 4 0 0 1 17 16H7Z' })
  ]),
  fog: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round' }, [
    h('path', { d: 'M4 9h11M4 12.5h16M4 16h13' })
  ]),
  rain: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M7 14.5a4 4 0 0 1-.6-7.95A5 5 0 0 1 16.2 6.1 3.6 3.6 0 0 1 16 13H7Z' }),
    h('g', { stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, [
      h('line', { x1: 8, y1: 16, x2: 7, y2: 20 }),
      h('line', { x1: 12, y1: 16, x2: 11, y2: 20 }),
      h('line', { x1: 16, y1: 16, x2: 15, y2: 20 })
    ])
  ]),
  snow: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M7 14.5a4 4 0 0 1-.6-7.95A5 5 0 0 1 16.2 6.1 3.6 3.6 0 0 1 16 13H7Z' }),
    h('g', { stroke: 'currentColor', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, [
      h('line', { x1: 8, y1: 16, x2: 8, y2: 20 }),
      h('line', { x1: 12, y1: 16, x2: 12, y2: 20 }),
      h('line', { x1: 16, y1: 16, x2: 16, y2: 20 })
    ])
  ]),
  thunder: () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
    h('path', { d: 'M7 13.5a4 4 0 0 1-.6-7.95A5 5 0 0 1 16.2 5.1 3.6 3.6 0 0 1 16 12H7Z' }),
    h('path', { d: 'M13 12.5 10 17h2.5l-1.5 4.5 5-6H13.5Z' })
  ])
}

function weatherCategory(code) {
  if (code === 0) return 'clear'
  if ([1, 2, 3].includes(code)) return 'cloudy'
  if ([45, 48].includes(code)) return 'fog'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow'
  if ([95, 96, 99].includes(code)) return 'thunder'
  return 'cloudy'
}

const conditionCategory = computed(() => weatherCategory(weather.value?.current?.weather_code))
const weatherIcon = computed(() => WEATHER_ICONS[conditionCategory.value])
const conditionLabel = computed(() => t(`weather.conditions.${conditionCategory.value}`))

// --- Local clock, tracking whichever location is currently selected ---
const now = ref(new Date())
let clockTimer = null

onMounted(() => {
  clockTimer = setInterval(() => { now.value = new Date() }, 30_000)
})
onUnmounted(() => {
  if (clockTimer !== null) clearInterval(clockTimer)
})

const LOCALE_TAGS = { en: 'en-US', lo: 'lo-LA', th: 'th-TH' }
const dateTimeLocale = computed(() => LOCALE_TAGS[locale.value] ?? 'en-US')
const timeZone = computed(() => weather.value?.timezone ?? 'UTC')

const currentTime = computed(() => new Intl.DateTimeFormat(dateTimeLocale.value, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: timeZone.value
}).format(now.value))

const currentDate = computed(() => new Intl.DateTimeFormat(dateTimeLocale.value, {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: timeZone.value
}).format(now.value))

function formatRegion(location) {
  return [location.admin1, location.country].filter(Boolean).join(', ')
}

// --- Smart calendar: current month grid with the 7-day forecast mapped onto
// its matching date cells. Deliberately uses the browser's own local date
// (not the selected city's timezone) for "today" and month math -- keeping
// one clock for calendar navigation avoids a rare, minor off-by-one-day
// edge case near midnight in exchange for much simpler code. -->
function isoDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const todayKey = computed(() => isoDateKey(now.value))
const calendarCursor = ref(new Date(now.value.getFullYear(), now.value.getMonth(), 1))

// Jump the visible month back to "today" whenever the selected city changes.
watch(selectedLocation, () => {
  calendarCursor.value = new Date(now.value.getFullYear(), now.value.getMonth(), 1)
})

function goToPrevMonth() {
  const cursor = calendarCursor.value
  calendarCursor.value = new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)
}

function goToNextMonth() {
  const cursor = calendarCursor.value
  calendarCursor.value = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
}

const calendarMonthLabel = computed(() => new Intl.DateTimeFormat(dateTimeLocale.value, {
  month: 'long',
  year: 'numeric'
}).format(calendarCursor.value))

// 2023-01-01 was a Sunday -- used purely as a stable Sun..Sat reference week
// to read out localized short weekday labels.
const WEEKDAY_LABELS = computed(() => {
  const formatter = new Intl.DateTimeFormat(dateTimeLocale.value, { weekday: 'short', timeZone: 'UTC' })
  return Array.from({ length: 7 }, (_, i) => formatter.format(new Date(Date.UTC(2023, 0, 1 + i))))
})

const forecastByDate = computed(() => {
  const map = {}
  for (const day of dailyForecast.value) map[day.date] = day
  return map
})

const calendarWeeks = computed(() => {
  const cursor = calendarCursor.value
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7

  const cells = Array.from({ length: totalCells }, (_, i) => {
    const date = new Date(year, month, i - firstWeekday + 1)
    const key = isoDateKey(date)
    return {
      key,
      day: date.getDate(),
      inCurrentMonth: date.getMonth() === month,
      isToday: key === todayKey.value,
      forecast: forecastByDate.value[key] ?? null
    }
  })

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
})

// --- Global city search (Open-Meteo Geocoding API) ---
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
let searchDebounceTimer = null

function handleSearchInput() {
  clearTimeout(searchDebounceTimer)
  const query = searchQuery.value.trim()
  if (query.length < 2) {
    searchResults.value = []
    return
  }
  searchDebounceTimer = setTimeout(() => runCitySearch(query), 350)
}

async function runCitySearch(query) {
  isSearching.value = true
  try {
    const response = await $fetch('https://geocoding-api.open-meteo.com/v1/search', {
      query: { name: query, count: 6, language: 'en', format: 'json' }
    })
    searchResults.value = response?.results ?? []
  } catch {
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

function selectCity(result) {
  selectedLocation.value = {
    name: result.name,
    admin1: result.admin1,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude
  }
  searchQuery.value = ''
  searchResults.value = []
  fetchWeatherFor(selectedLocation.value)
}

onUnmounted(() => clearTimeout(searchDebounceTimer))

// --- Modal open/close ---
const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  searchQuery.value = ''
  searchResults.value = []
}

function handleKeydown(event) {
  if (event.key === 'Escape' && isModalOpen.value) closeModal()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

watch(isModalOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Closed state: a compact pill in the site's own gold accent so it reads as
   part of the dark search card (see Booking/SearchForm.vue) rather than a
   foreign element dropped on top of it. */
.weather-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 999px;
  background: rgba(212, 175, 55, 0.1);
  color: #d4af37;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.weather-pill:hover {
  background: rgba(212, 175, 55, 0.18);
  border-color: #d4af37;
  transform: translateY(-1px);
}

.weather-pill__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.weather-pill__city {
  white-space: nowrap;
}

.weather-pill__temp {
  font-weight: 700;
  white-space: nowrap;
}

/* --- Modal: premium mobile weather app, dark glass with gold accents --- */
.weather-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(4, 10, 22, 0.68);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.weather-modal {
  position: relative;
  width: min(420px, 100%);
  max-height: 88vh;
  overflow-y: auto;
  padding: 32px 24px 24px;
  border-radius: 32px;
  background: linear-gradient(160deg, rgba(20, 45, 80, 0.92), rgba(8, 18, 38, 0.96));
  border: 1px solid rgba(212, 175, 55, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55);
  color: #ffffff;
}

.weather-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  cursor: pointer;
  transition: background 0.25s ease;
}

.weather-modal__close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.weather-modal__search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.25);
  margin-bottom: 8px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.weather-modal__search:focus-within {
  border-color: #d4af37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
}

.weather-modal__search-icon {
  color: #d4af37;
  flex-shrink: 0;
}

.weather-modal__search-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
}

.weather-modal__search-input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.weather-modal__suggestions {
  list-style: none;
  margin: 8px 0 0;
  padding: 4px 0;
  max-height: 260px;
  overflow-y: auto;
}

.weather-modal__suggestion {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.weather-modal__suggestion:hover {
  background: rgba(212, 175, 55, 0.1);
}

.weather-modal__suggestion--empty {
  cursor: default;
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
}

.weather-modal__suggestion--empty:hover {
  background: transparent;
}

.weather-modal__suggestion-name {
  font-size: 14px;
  font-weight: 600;
}

.weather-modal__suggestion-region {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.weather-modal__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding: 16px 0 8px;
}

.weather-modal__hero-city {
  font-size: 22px;
  font-weight: 800;
}

.weather-modal__hero-region,
.weather-modal__hero-time {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

.weather-modal__hero-main {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.weather-modal__hero-icon {
  width: 56px;
  height: 56px;
  color: #d4af37;
}

.weather-modal__hero-temp {
  font-size: 48px;
  font-weight: 800;
  line-height: 1;
}

.weather-modal__hero-condition {
  margin-top: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.weather-modal__stats {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 20px;
  padding: 16px 8px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.15);
}

.weather-modal__stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.weather-modal__stat-value {
  font-size: 15px;
  font-weight: 700;
}

.weather-modal__stat-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.8);
}

/* Smart calendar: current month grid, the 7-day forecast mapped onto its
   matching dates, gold-filled current day. */
.weather-modal__calendar {
  margin-top: 24px;
}

.weather-modal__calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.weather-modal__calendar-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.85);
}

.weather-modal__calendar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.weather-modal__calendar-nav:hover {
  background: rgba(212, 175, 55, 0.25);
  color: #d4af37;
}

.weather-modal__calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 6px;
}

.weather-modal__calendar-weekdays span {
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.weather-modal__calendar-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;
}

.weather-modal__calendar-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-height: 40px;
  padding: 4px 2px;
  border-radius: 10px;
  background: transparent;
  transition: background 0.2s ease, transform 0.2s ease;
}

.weather-modal__calendar-cell.has-forecast {
  background: rgba(255, 255, 255, 0.05);
}

.weather-modal__calendar-cell.is-outside {
  opacity: 0.32;
}

.weather-modal__calendar-cell.is-today {
  background: #d4af37;
  box-shadow: 0 4px 14px rgba(212, 175, 55, 0.4);
}

.weather-modal__calendar-daynum {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

.weather-modal__calendar-cell.is-today .weather-modal__calendar-daynum {
  color: #1a1204;
  font-weight: 800;
}

.weather-modal__calendar-icon {
  width: 14px;
  height: 14px;
  color: #ffffff;
}

.weather-modal__calendar-cell.is-today .weather-modal__calendar-icon {
  color: #1a1204;
}

.weather-modal__calendar-temps {
  font-size: 9px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
}

.weather-modal__calendar-cell.is-today .weather-modal__calendar-temps {
  color: #1a1204;
}

.weather-modal__error {
  margin: 16px 0 0;
  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.16);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fecaca;
  font-size: 13px;
  text-align: center;
}

/* Open/close transition: backdrop fade + panel pop, both plain CSS */
.weather-modal-enter-active,
.weather-modal-leave-active {
  transition: opacity 0.3s ease;
}

.weather-modal-enter-active .weather-modal,
.weather-modal-leave-active .weather-modal {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.weather-modal-enter-from,
.weather-modal-leave-to {
  opacity: 0;
}

.weather-modal-enter-from .weather-modal,
.weather-modal-leave-to .weather-modal {
  transform: translateY(24px) scale(0.96);
  opacity: 0;
}

@media (max-width: 480px) {
  .weather-modal-overlay {
    padding: 12px;
    align-items: flex-end;
  }

  .weather-modal {
    width: 100%;
    max-height: 86vh;
    border-radius: 28px 28px 0 0;
  }
}
</style>
