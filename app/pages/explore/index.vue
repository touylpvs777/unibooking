<template>
  <div class="explore-page">
    <div class="explore-page__header">
      <h1 class="explore-page__title">{{ $t('explore.title') }}</h1>
      <p class="explore-page__subtitle">{{ $t('explore.subtitle') }}</p>

      <div class="explore-page__controls">
        <a-input-search
          v-model:value="filters.location"
          size="large"
          :placeholder="$t('explore.locationSearchPlaceholder')"
          allow-clear
          class="explore-page__search"
          @search="runSearch"
        />

        <!-- Optional -- price only ever comes back from GET /services/search
             when a date range is given (see priceLabel()'s comment below),
             so picking dates here is what turns "see price in details" into
             a real per-night rate on every card, and is also what unlocks
             the price-range filter in the sidebar (see hasSelectedDates). -->
        <a-range-picker
          v-model:value="filters.dates"
          size="large"
          class="explore-page__dates"
          :placeholder="[$t('explore.startDatePlaceholder'), $t('explore.endDatePlaceholder')]"
          @change="runSearch"
        />
      </div>
    </div>

    <a-alert
      v-if="exploreStore.error"
      type="error"
      :message="exploreStore.error"
      show-icon
      closable
      class="explore-page__error"
      @close="exploreStore.error = null"
    />

    <a-row :gutter="[24, 24]">
      <!-- Filters sidebar -->
      <a-col :xs="24" :md="7" :lg="6">
        <a-card :title="$t('explore.filtersTitle')" :bordered="false" class="filters-sidebar">
          <div class="filter-group">
            <h4 class="filter-group__title">{{ $t('explore.categoryTitle') }}</h4>
            <a-checkbox-group v-model:value="filters.types" class="filter-group__checkboxes" @change="runSearch">
              <a-checkbox value="HOTEL">{{ $t('common.serviceTypes.room') }}</a-checkbox>
              <a-checkbox value="TOUR">{{ $t('common.serviceTypes.tour') }}</a-checkbox>
              <a-checkbox value="CAR_RENTAL">{{ $t('common.serviceTypes.carRental') }}</a-checkbox>
            </a-checkbox-group>
          </div>

          <a-divider class="filter-group__divider" />

          <div class="filter-group">
            <h4 class="filter-group__title">{{ $t('explore.priceRangeTitle') }}</h4>
            <a-slider
              v-model:value="filters.priceRange"
              range
              :min="0"
              :max="PRICE_SLIDER_MAX"
              :step="50000"
              :disabled="!hasSelectedDates"
              :tip-formatter="(v) => `₭${formatPrice(v)}`"
              @afterChange="runSearch"
            />
            <div class="filter-group__price-labels">
              <span>₭{{ formatPrice(filters.priceRange[0]) }}</span>
              <span>₭{{ formatPrice(filters.priceRange[1]) }}</span>
            </div>
            <p v-if="!hasSelectedDates" class="filter-group__hint">
              {{ $t('explore.priceFilterHint') }}
            </p>
          </div>

          <a-divider class="filter-group__divider" />

          <div class="filter-group">
            <h4 class="filter-group__title">{{ $t('explore.minRatingTitle') }}</h4>
            <a-rate v-model:value="filters.minRating" @change="runSearch" />
            <p v-if="filters.minRating" class="filter-group__hint">{{ $t('explore.starsAndUp', { n: filters.minRating }) }}</p>
          </div>

          <a-button block class="filters-sidebar__reset" @click="resetFilters">{{ $t('explore.resetFilters') }}</a-button>
        </a-card>
      </a-col>

      <!-- Results -->
      <a-col :xs="24" :md="17" :lg="18">
        <p v-if="!exploreStore.isLoading && exploreStore.services.length" class="explore-page__count">
          {{ $t('explore.resultsCount', { count: exploreStore.meta.total }) }}
        </p>

        <!-- Loading: a skeleton grid matching the real card grid's shape,
             instead of a single centered spinner, so the layout doesn't jump
             once results arrive. -->
        <a-row v-if="exploreStore.isLoading" :gutter="[24, 24]">
          <a-col v-for="n in 8" :key="n" :xs="24" :sm="12" :lg="8">
            <a-card :loading="true" class="service-card" />
          </a-col>
        </a-row>

        <a-empty
          v-else-if="!exploreStore.services.length"
          :description="$t('explore.noResults')"
          class="explore-page__empty"
        />

        <a-row v-else :gutter="[24, 24]">
          <a-col v-for="service in exploreStore.services" :key="service.id" :xs="24" :sm="12" :lg="8">
            <a-card class="service-card" :bordered="false" :body-style="{ padding: '16px' }">
              <template #cover>
                <img :src="coverImage(service)" :alt="service.name" class="service-card__image">
              </template>

              <a-tag :color="typeTagMeta(service.type).color" class="service-card__type-tag">
                {{ typeTagMeta(service.type).text }}
              </a-tag>

              <h3 class="service-card__title">{{ service.name }}</h3>

              <p class="service-card__location">
                <EnvironmentOutlined />
                {{ service.location }}
              </p>

              <div class="service-card__footer">
                <span class="service-card__price">{{ priceLabel(service) }}</span>
                <NuxtLink :to="detailsLink(service)">
                  <a-button type="primary">{{ $t('common.viewDetails') }}</a-button>
                </NuxtLink>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { useExploreStore } from '~/stores/explore'
import { formatPrice } from '~/utils/currency'

const { t } = useI18n()
const exploreStore = useExploreStore()
const route = useRoute()

// ₭5,000,000/night is a generous ceiling for a per-night rate on this
// platform -- the slider's own max, and also what "untouched" looks like
// (see runSearch: the upper handle left at this value means "no upper
// bound", not "cap at exactly 5,000,000").
const PRICE_SLIDER_MAX = 5000000

// Homepage service-grid cards (see index.vue's serviceGridItems) link here
// as /explore?category=HOTEL -- seeds the checkbox filter below so the
// click actually filters results, not just navigates.
const initialCategory = typeof route.query.category === 'string' ? route.query.category : undefined

const filters = reactive({
  location: '',
  // Checkbox-group "Categories" filter -- ServiceType values, any-of. Empty
  // means "all types", matching the old radio-group's "ທັງໝົດ" option.
  // HOTEL/TOUR/CAR_RENTAL show as checked in the sidebar when preset this
  // way; other ServiceType values (FLIGHT/PACKAGE) still filter the
  // results even though there's no checkbox for them here.
  types: initialCategory ? [initialCategory] : [],
  // a-range-picker's v-model is [Dayjs, Dayjs] | [] -- see isoDate() below.
  dates: [],
  priceRange: [0, PRICE_SLIDER_MAX],
  // a-rate's v-model -- 0 means "no minimum" (allowClear's default lets a
  // second click on the same star reset back to 0).
  minRating: 0
})

const hasSelectedDates = computed(() => (filters.dates || []).length === 2)

// a-range-picker/a-date-picker values are Dayjs instances, which -- like
// native Date -- expose toISOString(). Same helper as
// components/Booking/SearchForm.vue's own isoDate().
function isoDate(value) {
  return value ? value.toISOString().slice(0, 10) : undefined
}

function runSearch() {
  const [start, end] = filters.dates || []
  const startDate = isoDate(start)
  const endDate = isoDate(end)
  const datesSelected = Boolean(startDate && endDate)

  exploreStore.search({
    location: filters.location,
    types: filters.types,
    startDate,
    endDate,
    // minPrice/maxPrice require a date range on the backend (price is set
    // per night, not per service) -- only sent when dates are actually
    // selected, and only when the slider's been moved off its full range
    // (an untouched slider means "no price filter" here, not "0 to
    // PRICE_SLIDER_MAX").
    minPrice: datesSelected && filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
    maxPrice: datesSelected && filters.priceRange[1] < PRICE_SLIDER_MAX ? filters.priceRange[1] : undefined,
    minRating: filters.minRating || undefined
  })
}

function resetFilters() {
  filters.types = []
  filters.priceRange = [0, PRICE_SLIDER_MAX]
  filters.minRating = 0
  runSearch()
}

onMounted(runSearch)

// Backend ServiceType: HOTEL/FLIGHT/TRAIN/BUS/TOUR/CAR_RENTAL/PACKAGE --
// only HOTEL/TOUR/CAR_RENTAL are filterable from this page's radio group
// (same 3-type convention as the supplier portal's Add Item form), the
// rest are shown here only in case one turns up in unfiltered results.
const TYPE_COLOR_MAP = {
  HOTEL: 'blue',
  TOUR: 'gold',
  CAR_RENTAL: 'purple',
  FLIGHT: 'cyan',
  TRAIN: 'green',
  BUS: 'orange',
  PACKAGE: 'default'
}
const TYPE_KEY_MAP = {
  HOTEL: 'room',
  TOUR: 'tour',
  CAR_RENTAL: 'carRental',
  FLIGHT: 'flight',
  TRAIN: 'train',
  BUS: 'bus',
  PACKAGE: 'package'
}

function typeTagMeta(type) {
  return {
    color: TYPE_COLOR_MAP[type] || 'default',
    text: TYPE_KEY_MAP[type] ? t(`common.serviceTypes.${TYPE_KEY_MAP[type]}`) : type
  }
}

// Same placehold.co convention as pages/hotels.vue's placeholderImage.
function placeholderImage(name) {
  return `https://placehold.co/600x400/f0f9ff/1e40af?text=${encodeURIComponent(name)}`
}

// `images` is at most 1 row here -- the oldest upload, i.e. the cover photo
// (see ServicesService's searchResultInclude) -- falling back to the
// placeholder for a service with no photos uploaded yet.
function coverImage(service) {
  return service.images?.[0]?.url || placeholderImage(service.name)
}

// `inventory` is only present on a result when the search itself carried a
// date range (see ServicesService.search's searchCatalog() vs date-range
// branch) -- without one, there's no per-night InventoryPricing to read,
// so this honestly falls back instead of showing a fabricated price.
function priceLabel(service) {
  const entry = service.inventory?.[0]
  return entry ? `₭ ${formatPrice(Number(entry.price))} ${t('common.perNight')}` : t('explore.priceSeeDetails')
}

// Hands the selected dates to the Service Details page via query params
// (only when actually set) so a range chosen here doesn't have to be
// re-picked there -- see pages/services/[id].vue's own use of
// route.query.startDate/endDate.
function detailsLink(service) {
  const [start, end] = filters.dates || []
  const startDate = isoDate(start)
  const endDate = isoDate(end)
  return {
    path: `/services/${service.id}`,
    query: startDate && endDate ? { startDate, endDate } : undefined
  }
}
</script>

<style scoped>
.explore-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.explore-page__header {
  text-align: center;
  margin-bottom: 32px;
}

.explore-page__title {
  font-size: 28px;
  font-weight: 700;
  color: #14294f;
  margin-bottom: 8px;
}

.explore-page__subtitle {
  color: #64748b;
  margin-bottom: 24px;
}

.explore-page__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.explore-page__search {
  max-width: 420px;
}

.explore-page__dates {
  min-width: 280px;
}

.explore-page__error {
  margin-bottom: 16px;
}

.explore-page__count {
  color: #64748b;
  margin-bottom: 16px;
}

.explore-page__empty {
  margin-top: 48px;
}

.filters-sidebar {
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  position: sticky;
  top: 24px;
}

.filters-sidebar :deep(.ant-card-head-title) {
  color: #14294f;
  font-weight: 700;
}

.filter-group {
  margin-bottom: 4px;
}

.filter-group__divider {
  margin: 16px 0;
}

.filter-group__title {
  font-size: 13px;
  font-weight: 700;
  color: #14294f;
  margin: 0 0 12px;
}

.filter-group__checkboxes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group__price-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

.filter-group__hint {
  font-size: 12px;
  color: #94a3b8;
  margin: 8px 0 0;
}

.filters-sidebar__reset {
  margin-top: 16px;
}

.service-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

.service-card__image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.service-card__type-tag {
  margin-bottom: 8px;
}

.service-card__title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 13px;
  margin-bottom: 16px;
}

.service-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.service-card__price {
  font-size: 14px;
  font-weight: 700;
  color: #1e40af;
}

@media (max-width: 767px) {
  .explore-page {
    padding: 24px 16px;
  }

  .explore-page__controls {
    flex-direction: column;
    align-items: stretch;
  }

  .explore-page__search {
    max-width: none;
  }

  .explore-page__dates {
    min-width: 0;
    width: 100%;
  }
}
</style>
