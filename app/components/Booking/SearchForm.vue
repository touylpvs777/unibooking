<template>
  <a-card class="search-form" :bordered="false">
    <a-tabs v-model:activeKey="activeTab">
      <template #rightExtra>
        <ClientOnly>
          <WeatherWidget />
        </ClientOnly>
      </template>

      <!-- Hotels -->
      <a-tab-pane key="hotels" :tab="$t('search.hotelsTab')">
        <a-row :gutter="[16, 16]" align="bottom">
          <a-col :xs="24" :sm="12" :md="7">
            <label class="field-label">{{ $t('search.locationLabel') }}</label>
            <a-input v-model:value="hotelSearch.location" :placeholder="$t('search.locationPlaceholder')" size="large" />
          </a-col>

          <a-col :xs="24" :sm="12" :md="8">
            <label class="field-label">{{ $t('search.datesLabel') }}</label>
            <a-range-picker v-model:value="hotelSearch.dates" size="large" style="width: 100%" />
          </a-col>

          <a-col :xs="24" :sm="12" :md="5">
            <label class="field-label">{{ $t('search.guestsLabel') }}</label>
            <a-select id="hotel-search-guests" v-model:value="hotelSearch.guests" size="large" style="width: 100%">
              <a-select-option v-for="n in 6" :key="n" :value="n">{{ $t('search.guestsOption', { n }) }}</a-select-option>
            </a-select>
          </a-col>

          <a-col :xs="24" :sm="12" :md="4">
            <a-button type="primary" size="large" block @click="handleHotelSearch">
              {{ $t('search.searchButton') }}
            </a-button>
          </a-col>
        </a-row>
      </a-tab-pane>

      <!-- Transport -->
      <a-tab-pane key="transport" :tab="$t('search.transportTab')">
        <a-row :gutter="[16, 16]" align="bottom">
          <a-col :xs="24" :sm="12" :md="6">
            <label class="field-label">{{ $t('search.originLabel') }}</label>
            <a-input v-model:value="transportSearch.from" :placeholder="$t('search.originPlaceholder')" size="large" />
          </a-col>

          <a-col :xs="24" :sm="12" :md="6">
            <label class="field-label">{{ $t('search.destinationLabel') }}</label>
            <a-input v-model:value="transportSearch.to" :placeholder="$t('search.destinationPlaceholder')" size="large" />
          </a-col>

          <a-col :xs="24" :sm="12" :md="7">
            <label class="field-label">{{ $t('search.travelDateLabel') }}</label>
            <a-date-picker v-model:value="transportSearch.departureDate" size="large" style="width: 100%" />
          </a-col>

          <a-col :xs="24" :sm="12" :md="5">
            <a-button type="primary" size="large" block @click="handleTransportSearch">
              {{ $t('search.searchFlightsButton') }}
            </a-button>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script setup>
// Nuxt auto-imports: ref, reactive, useRouter, useBookingStore
const bookingStore = useBookingStore()
const router = useRouter()

const activeTab = ref('hotels')

// `location` is a shared useState ref (see useSearchLocation) instead of
// plain local state -- reactive() unwraps top-level ref properties, so
// reads/writes on hotelSearch.location transparently go through it. This is
// what lets ProvinceSelector (a sibling component on the homepage) populate
// this field when a district/village is clicked there.
const searchLocation = useSearchLocation()
const hotelSearch = reactive({
  location: searchLocation,
  dates: [],
  guests: 1
})

const transportSearch = reactive({
  from: '',
  to: '',
  departureDate: null
})

// a-range-picker/a-date-picker values are Dayjs instances, which -- like
// native Date -- expose toISOString(), matching the isoDate() helper already
// used on the hotels/transport results pages.
function isoDate(value) {
  return value ? value.toISOString().slice(0, 10) : undefined
}

function handleHotelSearch() {
  const [startDate, endDate] = hotelSearch.dates

  // ບັນທຶກຂໍ້ມູນການຄົ້ນຫາລົງໃນ Pinia store ເພື່ອໃຊ້ຕໍ່ໃນຂັ້ນຕອນການຈອງ
  bookingStore.bookingData.startDate = startDate ?? null
  bookingStore.bookingData.endDate = endDate ?? null
  bookingStore.bookingData.guests = hotelSearch.guests

  router.push({
    path: '/hotels',
    query: {
      location: hotelSearch.location || undefined,
      checkInDate: isoDate(startDate),
      checkOutDate: isoDate(endDate),
      guests: hotelSearch.guests
    }
  })
}

function handleTransportSearch() {
  bookingStore.bookingData.startDate = transportSearch.departureDate

  router.push({
    path: '/transport',
    query: {
      origin: transportSearch.from || undefined,
      destination: transportSearch.to || undefined,
      departureDate: isoDate(transportSearch.departureDate)
    }
  })
}
</script>

<style scoped>
/* "Blue Light" accent — electric cyan on black. See index.vue's
   .services-section block for the matching service-card treatment. */
.search-form {
  border-radius: 12px;
}

.search-form :deep(.ant-tabs-tab) {
  color: rgba(34, 211, 238, 0.55);
}

.search-form :deep(.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #22d3ee !important;
}

/* Active navigation tab underline */
.search-form :deep(.ant-tabs-ink-bar) {
  background: #22d3ee;
}

.search-form :deep(.ant-input),
.search-form :deep(.ant-select-selector),
.search-form :deep(.ant-picker) {
  background: #1a2331;
  border-color: rgba(34, 211, 238, 0.4);
  color: #22d3ee;
}

.search-form :deep(.ant-input:hover),
.search-form :deep(.ant-select-selector:hover),
.search-form :deep(.ant-picker:hover) {
  border-color: #22d3ee;
}

.search-form :deep(.ant-input-focused),
.search-form :deep(.ant-input:focus),
.search-form :deep(.ant-select-focused .ant-select-selector),
.search-form :deep(.ant-picker-focused) {
  border-color: #22d3ee !important;
  box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.2) !important;
}

.search-form :deep(.ant-input::placeholder),
.search-form :deep(.ant-picker-input input::placeholder) {
  color: rgba(34, 211, 238, 0.45);
}

.search-form :deep(.ant-select-selection-item),
.search-form :deep(.ant-picker-input input) {
  color: #22d3ee;
}

.search-form :deep(.ant-picker-suffix),
.search-form :deep(.ant-select-arrow) {
  color: rgba(34, 211, 238, 0.6);
}

/* Primary "ຄົ້ນຫາ" search button */
.search-form :deep(.ant-btn-primary) {
  background: #d4af37 !important;
  border-color: #d4af37 !important;
  color: #14294f !important;
  font-weight: 700;
  text-shadow: none;
  transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
}

.search-form :deep(.ant-btn-primary:hover) {
  background: #e0c05c !important;
  border-color: #e0c05c !important;
  color: #14294f !important;
  transform: scale(1.02);
}

.search-form :deep(.ant-tabs-extra-content) {
  display: flex;
  align-items: center;
}

.field-label {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  color: #22d3ee;
  font-weight: 500;
}
</style>
