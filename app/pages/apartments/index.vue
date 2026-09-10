<template>
  <div class="apartments-page">
    <ModuleBanner
      :image="bannerImage"
      :title="$t('home.services.apartments.title')"
      :subtitle="$t('home.services.apartments.description')"
    />

    <a-row :gutter="24">
      <!-- Filter sidebar -->
      <a-col :xs="24" :md="7" :lg="6">
        <a-card class="filter-card" :bordered="false">
          <h3 class="filter-card__title">{{ $t('apartments.filtersTitle') }}</h3>

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('search.locationLabel') }}</p>
            <a-input
              v-model:value="filters.location"
              size="large"
              :placeholder="$t('apartments.locationPlaceholder')"
              allow-clear
            />
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('apartments.priceRangeLabel') }}</p>
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
            <p class="filter-block__label">{{ $t('apartments.checkInDatesLabel') }}</p>
            <a-space direction="vertical" style="width: 100%">
              <a-input v-model:value="filters.checkInDate" type="date" size="large" />
              <a-input v-model:value="filters.checkOutDate" type="date" size="large" />
            </a-space>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('apartments.bedroomsLabel') }}</p>
            <a-select v-model:value="filters.bedrooms" size="large" style="width: 100%" allow-clear :placeholder="$t('apartments.anyBedrooms')">
              <a-select-option v-for="n in 5" :key="n" :value="n">{{ n }}+</a-select-option>
            </a-select>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('apartments.guestsLabel') }}</p>
            <a-select v-model:value="filters.maxGuests" size="large" style="width: 100%" allow-clear :placeholder="$t('apartments.anyGuests')">
              <a-select-option v-for="n in 8" :key="n" :value="n">{{ $t('search.guestsOption', { n }) }}</a-select-option>
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
          <h2 class="results-header__count">{{ $t('apartments.resultsCount', { count: bookingStore.servicesMeta?.total ?? 0 }) }}</h2>
          <a-select id="apartments-sort-by" v-model:value="filters.sortBy" size="large" class="results-header__sort" @change="runSearch">
            <a-select-option value="price_asc">{{ $t('hotels.sortPriceAsc') }}</a-select-option>
            <a-select-option value="price_desc">{{ $t('hotels.sortPriceDesc') }}</a-select-option>
            <a-select-option value="newest">{{ $t('hotels.sortNewest') }}</a-select-option>
          </a-select>
        </div>

        <a-empty v-if="!bookingStore.isLoading && !bookingStore.services.length" :description="$t('apartments.noResults')" />

        <div v-else class="apartment-list">
          <div v-for="apartment in bookingStore.services" :key="apartment.id" class="apartment-card">
            <!-- Clicking the photo/details area navigates to this apartment's
                 own detail page (/apartments/:id) -- same convention as
                 pages/hotels/index.vue's own hotel-card__link. -->
            <NuxtLink :to="detailsLink(apartment)" class="apartment-card__link">
              <img :src="coverImageFor(apartment)" :alt="apartment.name" class="apartment-card__image" />

              <div class="apartment-card__body">
                <h3 class="apartment-card__name">{{ apartment.name }}</h3>
                <p v-if="apartment.apartmentDetails" class="apartment-card__facts">
                  {{ $t('apartments.bedroomsCount', { n: apartment.apartmentDetails.bedrooms }) }}
                  &middot;
                  {{ $t('apartments.bathroomsCount', { n: apartment.apartmentDetails.bathrooms }) }}
                  &middot;
                  {{ $t('apartments.guestsCount', { n: apartment.apartmentDetails.maxGuests }) }}
                </p>
                <p class="apartment-card__supplier">
                  {{ apartment.supplier?.companyName }}
                  <a-tag v-if="apartment.supplier?.isVerified" color="green" class="apartment-card__verified">{{ $t('common.verified') }}</a-tag>
                </p>
                <p class="apartment-card__location">
                  <EnvironmentOutlined />
                  {{ apartment.location }}
                </p>
                <p class="apartment-card__description">{{ apartment.description }}</p>
                <div v-if="apartment.apartmentDetails?.amenities?.length" class="apartment-card__amenities">
                  <a-tag v-for="amenity in apartment.apartmentDetails.amenities" :key="amenity" color="blue">{{ amenity }}</a-tag>
                </div>
              </div>
            </NuxtLink>

            <div class="apartment-card__action">
              <template v-if="unitPriceFor(apartment) != null">
                <div class="apartment-card__price">₭ {{ formatPrice(unitPriceFor(apartment)) }} {{ $t('common.perNight') }}</div>
                <div class="apartment-card__price-note">{{ $t('hotels.priceIncludesTax') }}</div>
              </template>
              <template v-else>
                <div class="apartment-card__price-note">{{ $t('apartments.noAvailability') }}</div>
              </template>

              <a-button type="primary" size="large" :disabled="unitPriceFor(apartment) == null" @click="handleBookNow(apartment)">
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
import { coverImageFor, defaultImageForType } from '~/utils/serviceImages'

const { t } = useI18n()
const bannerImage = defaultImageForType('APARTMENT')
const bookingStore = useBookingStore()
const router = useRouter()
const route = useRoute()

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

// Same curated, non-exhaustive amenity list as pages/hotels/index.vue --
// ApartmentDetails.amenities is a free-form String[], not an enforced enum.
const amenityOptions = ['WiFi', 'Pool', 'Breakfast', 'Gym', 'Spa', 'Parking', 'Air Conditioning']

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
// date range must always accompany an apartment search for prices to come
// back at all -- see ApartmentSearchDto/ApartmentsService.search on the
// backend. Seeded from the homepage SearchForm's ?location=&checkInDate=&
// checkOutDate= query params when present, same convention as
// pages/hotels/index.vue.
const filters = reactive({
  location: route.query.location ?? '',
  priceRange: [0, 5000000],
  checkInDate: route.query.checkInDate ?? '',
  checkOutDate: route.query.checkOutDate ?? '',
  bedrooms: undefined,
  maxGuests: undefined,
  amenities: [],
  sortBy: 'price_asc'
})

function runSearch() {
  bookingStore.searchApartments({
    location: filters.location || undefined,
    checkInDate: filters.checkInDate,
    checkOutDate: filters.checkOutDate,
    minPrice: filters.priceRange[0] || undefined,
    maxPrice: filters.priceRange[1] || undefined,
    bedrooms: filters.bedrooms || undefined,
    maxGuests: filters.maxGuests || undefined,
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

// Hands the selected dates to /apartments/:id via query params, same
// convention as pages/hotels/index.vue's own detailsLink().
function detailsLink(apartment) {
  return {
    path: `/apartments/${apartment.id}`,
    query: filters.checkInDate && filters.checkOutDate
      ? { startDate: filters.checkInDate, endDate: filters.checkOutDate }
      : undefined
  }
}

function handleBookNow(apartment) {
  bookingStore.selectedService = apartment
  bookingStore.bookingData.startDate = filters.checkInDate
  bookingStore.bookingData.endDate = filters.checkOutDate
  router.push('/checkout')
}
</script>

<style scoped>
.apartments-page {
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

/* Apartment list */
.apartment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.apartment-card {
  display: flex;
  gap: 20px;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.apartment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

.apartment-card__link {
  display: flex;
  flex: 1;
  min-width: 0;
  gap: 20px;
  color: inherit;
  text-decoration: none;
}

.apartment-card__image {
  flex: 0 0 280px;
  width: 280px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

.apartment-card__body {
  flex: 1;
  min-width: 0;
}

.apartment-card__name {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.apartment-card__facts {
  font-size: 13px;
  color: #475569;
  margin-bottom: 6px;
}

.apartment-card__supplier {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
}

.apartment-card__amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.apartment-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 12px;
}

.apartment-card__description {
  font-size: 13px;
  color: #94a3b8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.apartment-card__action {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  text-align: right;
  gap: 4px;
}

.apartment-card__price {
  font-size: 20px;
  font-weight: 700;
  color: #1e40af;
}

.apartment-card__price-note {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}

/* Mobile: stack card content vertically */
@media (max-width: 767px) {
  .apartments-page {
    padding: 24px 16px;
  }

  .filter-card {
    position: static;
    margin-bottom: 20px;
  }

  .apartment-card {
    flex-direction: column;
  }

  .apartment-card__link {
    flex-direction: column;
  }

  .apartment-card__image {
    width: 100%;
    height: 180px;
  }

  .apartment-card__action {
    flex: none;
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }

  .apartment-card__action .ant-btn {
    width: 100%;
  }
}
</style>
