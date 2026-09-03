<template>
  <div class="hotels-page">
    <a-row :gutter="24">
      <!-- Filter sidebar -->
      <a-col :xs="24" :md="7" :lg="6">
        <a-card class="filter-card" :bordered="false">
          <h3 class="filter-card__title">{{ $t('hotels.filtersTitle') }}</h3>

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('search.locationLabel') }}</p>
            <a-input
              v-model:value="filters.location"
              size="large"
              :placeholder="$t('hotels.locationPlaceholder')"
              allow-clear
            />
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('hotels.priceRangeLabel') }}</p>
            <a-slider
              v-model:value="filters.priceRange"
              range
              :min="0"
              :max="5000000"
              :step="50000"
            />
            <div class="filter-block__price-display">
              ₭ {{ formatPrice(filters.priceRange[0]) }} - ₭ {{ formatPrice(filters.priceRange[1]) }}
            </div>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('hotels.checkInDatesLabel') }}</p>
            <a-space direction="vertical" style="width: 100%">
              <a-input v-model:value="filters.checkInDate" type="date" size="large" />
              <a-input v-model:value="filters.checkOutDate" type="date" size="large" />
            </a-space>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('hotels.starRatingLabel') }}</p>
            <a-rate v-model:value="filters.starRating" allow-clear />
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('hotels.propertyTypeLabel') }}</p>
            <a-select v-model:value="filters.propertyType" size="large" style="width: 100%" allow-clear :placeholder="$t('hotels.allTypes')">
              <a-select-option v-for="type in propertyTypeOptions" :key="type" :value="type">{{ propertyTypeLabel(type) }}</a-select-option>
            </a-select>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('hotels.amenitiesLabel') }}</p>
            <a-checkbox-group v-model:value="filters.amenities" class="filter-block__group">
              <a-checkbox v-for="amenity in amenityOptions" :key="amenity" :value="amenity" class="filter-block__checkbox">
                {{ amenityLabel(amenity) }}
              </a-checkbox>
            </a-checkbox-group>
          </div>

          <a-divider />

          <a-button type="primary" block size="large" :loading="bookingStore.isLoading" @click="runSearch">
            {{ $t('common.search') }}
          </a-button>
        </a-card>
      </a-col>

      <!-- Results -->
      <a-col :xs="24" :md="17" :lg="18">
        <div class="results-header">
          <h2 class="results-header__count">{{ $t('hotels.resultsCount', { count: bookingStore.servicesMeta?.total ?? 0 }) }}</h2>
          <a-select id="hotels-sort-by" v-model:value="filters.sortBy" size="large" class="results-header__sort" @change="runSearch">
            <a-select-option value="price_asc">{{ $t('hotels.sortPriceAsc') }}</a-select-option>
            <a-select-option value="price_desc">{{ $t('hotels.sortPriceDesc') }}</a-select-option>
            <a-select-option value="newest">{{ $t('hotels.sortNewest') }}</a-select-option>
          </a-select>
        </div>

        <a-empty v-if="!bookingStore.isLoading && !bookingStore.services.length" :description="$t('hotels.noResults')" />

        <div v-else class="hotel-list">
          <div v-for="hotel in bookingStore.services" :key="hotel.id" class="hotel-card">
            <img :src="placeholderImage(hotel.name)" :alt="hotel.name" class="hotel-card__image" />

            <div class="hotel-card__body">
              <h3 class="hotel-card__name">{{ hotel.name }}</h3>
              <a-rate v-if="hotel.hotelDetails?.starRating" disabled :value="hotel.hotelDetails.starRating" class="hotel-card__rate" />
              <p class="hotel-card__supplier">
                {{ hotel.supplier?.companyName }}
                <a-tag v-if="hotel.supplier?.isVerified" color="green" class="hotel-card__verified">{{ $t('common.verified') }}</a-tag>
              </p>
              <p class="hotel-card__location">
                <EnvironmentOutlined />
                {{ hotel.location }}
              </p>
              <p class="hotel-card__description">{{ hotel.description }}</p>
              <div v-if="hotel.hotelDetails?.amenities?.length" class="hotel-card__amenities">
                <a-tag v-for="amenity in hotel.hotelDetails.amenities" :key="amenity" color="blue">{{ amenity }}</a-tag>
              </div>
            </div>

            <div class="hotel-card__action">
              <template v-if="unitPriceFor(hotel) != null">
                <div class="hotel-card__price">₭ {{ formatPrice(unitPriceFor(hotel)) }} {{ $t('common.perNight') }}</div>
                <div class="hotel-card__price-note">{{ $t('hotels.priceIncludesTax') }}</div>
              </template>
              <template v-else>
                <div class="hotel-card__price-note">{{ $t('hotels.noAvailability') }}</div>
              </template>

              <a-button type="primary" size="large" :disabled="unitPriceFor(hotel) == null" @click="handleBookNow(hotel)">
                {{ $t('common.bookNow') }}
              </a-button>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { useBookingStore } from '~/stores/booking'
import { formatPrice } from '~/utils/currency'

const { t } = useI18n()
const bookingStore = useBookingStore()
const router = useRouter()
const route = useRoute()

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

// Property type/amenity option lists: unibooking-backend's HotelDetails
// stores propertyType as a fixed enum (HotelPropertyType) but amenities as a
// free-form String[] -- these are just a curated set of common values, not
// an exhaustive/enforced list.
const propertyTypeOptions = ['HOTEL', 'RESORT', 'VILLA', 'GUESTHOUSE']
const amenityOptions = ['WiFi', 'Pool', 'Breakfast', 'Gym', 'Spa', 'Parking', 'Air Conditioning']

const PROPERTY_TYPE_KEY_MAP = { HOTEL: 'hotel', RESORT: 'resort', VILLA: 'villa', GUESTHOUSE: 'guesthouse' }
function propertyTypeLabel(type) {
  return t(`common.propertyTypes.${PROPERTY_TYPE_KEY_MAP[type] ?? type}`, type)
}

const AMENITY_KEY_MAP = {
  WiFi: 'wifi',
  Pool: 'pool',
  Breakfast: 'breakfast',
  Gym: 'gym',
  Spa: 'spa',
  Parking: 'parking',
  'Air Conditioning': 'airConditioning'
}
function amenityLabel(name) {
  return t(`common.amenities.${AMENITY_KEY_MAP[name] ?? name}`, name)
}

// Price lives on InventoryPricing (per-date), not on Service itself, so a
// date range must always accompany a hotel search for prices to come back
// at all -- see HotelSearchDto/HotelsService.search on the backend.
// Seeded from the homepage SearchForm's ?location=&checkInDate=&checkOutDate=
// query params when present, so a search on `/` actually filters results
// here instead of just landing on the page with the default date range.
// checkInDate/checkOutDate start empty so SSR and the pre-hydration client
// render the same thing -- "today"/"tomorrow" depends on the reader's clock,
// which onMounted below fills in once we're client-side only, avoiding a
// hydration mismatch if the server and client happen to straddle a UTC day
// boundary between render and hydration.
const filters = reactive({
  location: route.query.location ?? '',
  priceRange: [0, 5000000],
  checkInDate: route.query.checkInDate ?? '',
  checkOutDate: route.query.checkOutDate ?? '',
  starRating: 0,
  propertyType: undefined,
  amenities: [],
  sortBy: 'price_asc'
})

function runSearch() {
  bookingStore.searchHotels({
    location: filters.location || undefined,
    checkInDate: filters.checkInDate,
    checkOutDate: filters.checkOutDate,
    minPrice: filters.priceRange[0] || undefined,
    maxPrice: filters.priceRange[1] || undefined,
    starRating: filters.starRating || undefined,
    propertyType: filters.propertyType,
    amenities: filters.amenities.length ? filters.amenities : undefined,
    sortBy: filters.sortBy
  })
}

onMounted(() => {
  if (!filters.checkInDate) {
    const today = new Date()
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    filters.checkInDate = isoDate(today)
    filters.checkOutDate = isoDate(tomorrow)
  }
  runSearch()
})

function unitPriceFor(service) {
  const entry = service.inventory?.find((row) => row.date?.slice(0, 10) === filters.checkInDate) ?? service.inventory?.[0]
  return entry ? Number(entry.price) : null
}

function placeholderImage(name) {
  return `https://placehold.co/600x400/f0f9ff/1e40af?text=${encodeURIComponent(name)}`
}

function handleBookNow(hotel) {
  bookingStore.selectedService = hotel
  bookingStore.bookingData.startDate = filters.checkInDate
  bookingStore.bookingData.endDate = filters.checkOutDate
  router.push('/checkout')
}
</script>

<style scoped>
.hotels-page {
  background: #f8fafc;
  padding: 40px 24px;
  border-radius: 16px;
}

/* Filter sidebar */
.filter-card {
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  position: sticky;
  top: 24px;
}

.filter-card__title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
}

.filter-block__label {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
}

.filter-block__price-display {
  font-size: 13px;
  color: #64748b;
  margin-top: 8px;
}

/* Results header */
.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.results-header__count {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.results-header__sort {
  width: 220px;
}

/* Hotel list */
.hotel-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hotel-card {
  display: flex;
  gap: 20px;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.hotel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

.hotel-card__image {
  flex: 0 0 280px;
  width: 280px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

.hotel-card__body {
  flex: 1;
  min-width: 0;
}

.hotel-card__name {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.hotel-card__rate {
  font-size: 14px;
  margin-bottom: 6px;
}

.hotel-card__supplier {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
}

.hotel-card__amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.hotel-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 12px;
}

.hotel-card__description {
  font-size: 13px;
  color: #94a3b8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hotel-card__action {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  text-align: right;
  gap: 4px;
}

.hotel-card__price {
  font-size: 20px;
  font-weight: 700;
  color: #1e40af;
}

.hotel-card__price-note {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}

/* Mobile: stack card content vertically */
@media (max-width: 767px) {
  .hotels-page {
    padding: 24px 16px;
  }

  .filter-card {
    position: static;
    margin-bottom: 20px;
  }

  .hotel-card {
    flex-direction: column;
  }

  .hotel-card__image {
    width: 100%;
    height: 180px;
  }

  .hotel-card__action {
    flex: none;
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }

  .hotel-card__action .ant-btn {
    width: 100%;
  }
}
</style>
