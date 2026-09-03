<template>
  <div class="container">
    <h1 class="page-title">{{ $t('transport.title') }}</h1>

    <a-card class="filter-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="12" :md="4">
          <label class="field-label">{{ $t('common.columns.type') }}</label>
          <a-select v-model:value="filters.mode" size="large" style="width: 100%" allow-clear :placeholder="$t('common.allOption')">
            <a-select-option v-for="mode in modeOptions" :key="mode" :value="mode">{{ modeLabel(mode) }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :sm="12" :md="5">
          <label class="field-label">{{ $t('search.originLabel') }}</label>
          <a-input v-model:value="filters.origin" size="large" :placeholder="$t('search.originPlaceholder')" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="5">
          <label class="field-label">{{ $t('search.destinationLabel') }}</label>
          <a-input v-model:value="filters.destination" size="large" :placeholder="$t('search.destinationPlaceholder')" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="4">
          <label class="field-label">{{ $t('search.travelDateLabel') }}</label>
          <a-input v-model:value="filters.departureDate" type="date" size="large" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="3">
          <label class="field-label">{{ $t('transport.seatClassLabel') }}</label>
          <a-select v-model:value="filters.seatClass" size="large" style="width: 100%" allow-clear :placeholder="$t('common.allOption')">
            <a-select-option v-for="cls in seatClassOptions" :key="cls" :value="cls">{{ seatClassLabel(cls) }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="3" class="filter-card__search-col">
          <a-button type="primary" block size="large" :loading="bookingStore.isLoading" @click="runSearch">
            {{ $t('common.search') }}
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-spin :spinning="bookingStore.isLoading">
      <a-empty v-if="!bookingStore.isLoading && !bookingStore.services.length" :description="$t('transport.noResults')" />

      <a-row v-else :gutter="[24, 24]">
        <a-col v-for="route in bookingStore.services" :key="route.id" :xs="24" :md="12" :lg="8">
          <a-card hoverable class="route-card">
            <template #cover>
              <img :src="placeholderImage(route.name)" :alt="route.name" class="route-card__image" />
            </template>

            <h3 class="route-card__name">{{ route.name }}</h3>
            <a-tag color="blue" class="route-card__type">{{ modeLabel(route.type) }}</a-tag>
            <a-tag v-if="route.transportDetails?.seatClass" color="gold">{{ seatClassLabel(route.transportDetails.seatClass) }}</a-tag>
            <p class="route-card__route">
              {{ route.transportDetails?.origin ?? route.location }}
              <ArrowRightOutlined />
              {{ route.transportDetails?.destination }}
            </p>
            <p class="route-card__price">
              <template v-if="unitPriceFor(route) != null">
                {{ formatPrice(unitPriceFor(route)) }} {{ $t('common.kip') }} {{ $t('transport.priceUnit') }}
              </template>
              <template v-else>{{ $t('transport.noSeatsToday') }}</template>
            </p>

            <a-button type="primary" block :disabled="unitPriceFor(route) == null" @click="handleBookNow(route)">
              {{ $t('transport.bookTicketButton') }}
            </a-button>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import { useBookingStore } from '~/stores/booking'

const { t } = useI18n()
const bookingStore = useBookingStore()
const router = useRouter()
const route = useRoute()

const modeOptions = ['FLIGHT', 'TRAIN', 'BUS']
const seatClassOptions = ['ECONOMY', 'BUSINESS', 'FIRST']

const MODE_KEY_MAP = { FLIGHT: 'flight', TRAIN: 'train', BUS: 'bus' }
function modeLabel(mode) {
  return t(`common.serviceTypes.${MODE_KEY_MAP[mode] ?? mode}`, mode)
}

const SEAT_CLASS_KEY_MAP = { ECONOMY: 'economy', BUSINESS: 'business', FIRST: 'first' }
function seatClassLabel(cls) {
  return t(`common.seatClasses.${SEAT_CLASS_KEY_MAP[cls] ?? cls}`, cls)
}

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

// Transport is a same-day service -- one departure date, one seat = one unit
// (see GET /transport/search on unibooking-backend, which widens a single
// departureDate into a one-day availability window).
//
// Seeded from the homepage SearchForm's ?origin=&destination=&departureDate=
// query params when present, so a search on `/` actually filters results
// here instead of just landing on the page with today's date.
//
// departureDate starts empty so SSR and the pre-hydration client render the
// same thing -- "today" depends on the reader's clock, which onMounted below
// fills in once we're client-side only, avoiding a hydration mismatch if the
// server and client happen to straddle a UTC day boundary between render and
// hydration.
const filters = reactive({
  mode: undefined,
  origin: route.query.origin ?? '',
  destination: route.query.destination ?? '',
  departureDate: route.query.departureDate ?? '',
  seatClass: undefined
})

function runSearch() {
  bookingStore.searchTransport({
    mode: filters.mode,
    origin: filters.origin || undefined,
    destination: filters.destination || undefined,
    departureDate: filters.departureDate,
    seatClass: filters.seatClass,
    sortBy: 'price_asc'
  })
}

onMounted(() => {
  if (!filters.departureDate) {
    filters.departureDate = isoDate(new Date())
  }
  runSearch()
})

function unitPriceFor(route) {
  const entry = route.inventory?.find((row) => row.date?.slice(0, 10) === filters.departureDate) ?? route.inventory?.[0]
  return entry ? Number(entry.price) : null
}

function placeholderImage(name) {
  return `https://placehold.co/600x400/f8fafc/0369a1?text=${encodeURIComponent(name)}`
}

function formatPrice(value) {
  return new Intl.NumberFormat('lo-LA').format(value)
}

function handleBookNow(route) {
  bookingStore.selectedService = route
  bookingStore.bookingData.startDate = filters.departureDate
  bookingStore.bookingData.endDate = filters.departureDate
  router.push('/checkout')
}
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
}

.filter-card {
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  margin-bottom: 24px;
}

.field-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

.filter-card__search-col {
  display: flex;
  align-items: flex-end;
}

.route-card {
  border-radius: 12px;
  overflow: hidden;
}

.route-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.route-card__name {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.route-card__type {
  margin-bottom: 8px;
}

.route-card__route {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 13px;
  margin: 8px 0 4px;
}

.route-card__price {
  font-size: 16px;
  font-weight: 700;
  color: #0369a1;
  margin-bottom: 16px;
}
</style>
