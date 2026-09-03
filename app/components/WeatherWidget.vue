<template>
  <a
    v-if="temperature !== null"
    class="weather-widget"
    href="#"
    :title="$t('weather.vientianeTooltip')"
    @click.prevent
  >
    <component :is="weatherIcon" class="weather-widget__icon" />
    <span class="weather-widget__temp">{{ temperature }}°C</span>
  </a>
</template>

<script setup>
import { computed, h } from 'vue'

// Open-Meteo needs no API key. Vientiane, Laos coordinates.
const { data } = await useFetch('https://api.open-meteo.com/v1/forecast', {
  key: 'weather-vientiane',
  query: { latitude: 17.9667, longitude: 102.6, current_weather: true },
  lazy: true,
  server: false
})

const temperature = computed(() => {
  const temp = data.value?.current_weather?.temperature
  return typeof temp === 'number' ? Math.round(temp) : null
})

// WMO weather codes -- https://open-meteo.com/en/docs (current_weather.weathercode)
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

const weatherIcon = computed(() => {
  const code = data.value?.current_weather?.weathercode
  return WEATHER_ICONS[weatherCategory(code)]
})
</script>

<style scoped>
.weather-widget {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid rgba(197, 160, 89, 0.35);
  border-radius: 999px;
  background: rgba(197, 160, 89, 0.08);
  color: #c5a059;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  cursor: default;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.weather-widget:hover {
  transform: translateY(-1px);
  background: rgba(197, 160, 89, 0.16);
  border-color: rgba(197, 160, 89, 0.55);
  color: #d9b871;
}

.weather-widget__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.weather-widget__temp {
  line-height: 1;
}
</style>
