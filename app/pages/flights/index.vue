<template>
  <div class="container">
    <ModuleBanner
      :image="bannerImage"
      :title="$t('home.services.flights.title')"
      :subtitle="$t('home.services.flights.description')"
    />

    <a-card class="filter-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="12" :md="6">
          <label class="field-label">{{ $t('search.originLabel') }}</label>
          <a-input v-model:value="filters.origin" size="large" :placeholder="$t('search.originPlaceholder')" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="6">
          <label class="field-label">{{ $t('search.destinationLabel') }}</label>
          <a-input v-model:value="filters.destination" size="large" :placeholder="$t('search.destinationPlaceholder')" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="5">
          <label class="field-label">{{ $t('search.travelDateLabel') }}</label>
          <a-input v-model:value="filters.departureDate" type="date" size="large" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="4">
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
      <a-empty v-if="!bookingStore.isLoading && !bookingStore.services.length" :description="$t('flights.noResults')" />

      <a-row v-else :gutter="[24, 24]">
        <a-col v-for="flight in bookingStore.services" :key="flight.id" :xs="24" :md="12" :lg="8">
          <a-card hoverable class="route-card">
            <template #cover>
              <!-- coverImageFor(flight) guarantees the image shown here is this
                   specific flight's own cover photo (or the FLIGHT-type default),
                   never another listing's or the homepage hero's art. "Book
                   Ticket" stays a separate sibling control so its click doesn't
                   also navigate. -->
              <NuxtLink :to="detailsLink(flight)" class="route-card__cover-link">
                <img :src="coverImageFor(flight)" :alt="flight.name" class="route-card__image" />
              </NuxtLink>
            </template>

            <NuxtLink :to="detailsLink(flight)" class="route-card__link">
              <h3 class="route-card__name">{{ flight.name }}</h3>
              <a-tag v-if="flight.transportDetails?.seatClass" color="gold">{{ seatClassLabel(flight.transportDetails.seatClass) }}</a-tag>
              <p class="route-card__route">
                {{ flight.transportDetails?.origin ?? flight.location }}
                <ArrowRightOutlined />
                {{ flight.transportDetails?.destination }}
              </p>
              <p class="route-card__price">
                <template v-if="unitPriceFor(flight) != null">
                  {{ formatPrice(unitPriceFor(flight)) }} {{ $t('common.kip') }} {{ $t('transport.priceUnit') }}
                </template>
                <template v-else>{{ $t('transport.noSeatsToday') }}</template>
              </p>
            </NuxtLink>

            <a-button type="primary" block :disabled="unitPriceFor(flight) == null" @click="handleBookNow(flight)">
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
import { formatPrice } from '~/utils/currency'
import { coverImageFor, defaultImageForType } from '~/utils/serviceImages'

const { t } = useI18n()
const bookingStore = useBookingStore()
const router = useRouter()
const route = useRoute()

const bannerImage = defaultImageForType('FLIGHT')
const seatClassOptions = ['ECONOMY', 'BUSINESS', 'FIRST']

const SEAT_CLASS_KEY_MAP = { ECONOMY: 'economy', BUSINESS: 'business', FIRST: 'first' }
function seatClassLabel(cls) {
  return t(`common.seatClasses.${SEAT_CLASS_KEY_MAP[cls] ?? cls}`, cls)
}

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

// Same GET /transport/search backing as pages/transport/index.vue, just
// pinned to mode: 'FLIGHT' so this page only ever shows flights -- no mode
// selector needed. Seeded from the homepage SearchForm's
// ?origin=&destination=&departureDate= query params when present.
const filters = reactive({
  origin: route.query.origin ?? '',
  destination: route.query.destination ?? '',
  departureDate: route.query.departureDate ?? '',
  seatClass: undefined
})

function runSearch() {
  bookingStore.searchTransport({
    mode: 'FLIGHT',
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

function unitPriceFor(flight) {
  const entry = flight.inventory?.find((row) => row.date?.slice(0, 10) === filters.departureDate) ?? flight.inventory?.[0]
  return entry ? Number(entry.price) : null
}

// Hands the selected departure date to /flights/:id (pages/flights/[id].vue,
// backed by components/ServiceDetail/DetailView.vue) via query params, same
// convention as pages/transport/index.vue's own detailsLink().
function detailsLink(flight) {
  return {
    path: `/flights/${flight.id}`,
    query: filters.departureDate ? { startDate: filters.departureDate, endDate: filters.departureDate } : undefined
  }
}

function handleBookNow(flight) {
  bookingStore.selectedService = flight
  bookingStore.bookingData.startDate = filters.departureDate
  bookingStore.bookingData.endDate = filters.departureDate
  router.push('/checkout')
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  width: 100%;
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

.route-card__cover-link {
  display: block;
}

.route-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.route-card__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.route-card__name {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
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

@media (max-width: 767px) {
  .container {
    padding: 24px 16px;
  }
}
</style>
