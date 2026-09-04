<template>
  <div class="cars-page">
    <ModuleBanner
      :image="bannerImage"
      :title="$t('home.services.transport.title')"
      :subtitle="$t('home.services.transport.description')"
    />

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
            <p class="filter-block__label">{{ $t('cars.priceRangeLabel') }}</p>
            <a-slider
              v-model:value="filters.priceRange"
              range
              :min="0"
              :max="2000000"
              :step="50000"
            />
            <div class="filter-block__price-display">
              ₭ {{ formatPrice(filters.priceRange[0]) }} - ₭ {{ formatPrice(filters.priceRange[1]) }}
            </div>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('cars.pickupDateLabel') }}</p>
            <a-space direction="vertical" style="width: 100%">
              <a-input v-model:value="filters.pickupDate" type="date" size="large" />
              <a-input v-model:value="filters.returnDate" type="date" size="large" />
            </a-space>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('serviceDetail.vehicleTypeLabel') }}</p>
            <a-select v-model:value="filters.vehicleType" size="large" style="width: 100%" allow-clear :placeholder="$t('hotels.allTypes')">
              <a-select-option v-for="type in vehicleTypeOptions" :key="type" :value="type">{{ vehicleTypeLabel(type) }}</a-select-option>
            </a-select>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('serviceDetail.transmissionLabel') }}</p>
            <a-select v-model:value="filters.transmission" size="large" style="width: 100%" allow-clear :placeholder="$t('hotels.allTypes')">
              <a-select-option v-for="type in transmissionOptions" :key="type" :value="type">{{ transmissionLabel(type) }}</a-select-option>
            </a-select>
          </div>

          <a-divider />

          <div class="filter-block">
            <p class="filter-block__label">{{ $t('cars.minSeatsLabel') }}</p>
            <a-input-number v-model:value="filters.minSeatingCapacity" size="large" style="width: 100%" :min="1" :max="20" />
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
          <h2 class="results-header__count">{{ $t('cars.resultsCount', { count: bookingStore.servicesMeta?.total ?? 0 }) }}</h2>
        </div>

        <a-empty v-if="!bookingStore.isLoading && !bookingStore.services.length" :description="$t('cars.noResults')" />

        <div v-else class="car-list">
          <div v-for="car in bookingStore.services" :key="car.id" class="car-card">
            <!-- coverImageFor(car) guarantees the image shown here is this
                 specific vehicle's own cover photo (or the CAR_RENTAL-type
                 default), never another listing's or the homepage hero's art. -->
            <NuxtLink :to="detailsLink(car)" class="car-card__link">
              <img :src="coverImageFor(car)" :alt="car.name" class="car-card__image" />

              <div class="car-card__body">
                <h3 class="car-card__name">{{ car.name }}</h3>
                <div v-if="car.carRentalDetails" class="car-card__facts">
                  <a-tag color="blue">{{ vehicleTypeLabel(car.carRentalDetails.vehicleType) }}</a-tag>
                  <a-tag color="purple">{{ transmissionLabel(car.carRentalDetails.transmission) }}</a-tag>
                  <a-tag>{{ car.carRentalDetails.seatingCapacity }} {{ $t('serviceDetail.peopleUnit') }}</a-tag>
                </div>
                <p class="car-card__supplier">
                  {{ car.supplier?.companyName }}
                  <a-tag v-if="car.supplier?.isVerified" color="green" class="car-card__verified">{{ $t('common.verified') }}</a-tag>
                </p>
                <p class="car-card__location">
                  <EnvironmentOutlined />
                  {{ car.location }}
                </p>
                <p class="car-card__description">{{ car.description }}</p>
              </div>
            </NuxtLink>

            <div class="car-card__action">
              <template v-if="unitPriceFor(car) != null">
                <div class="car-card__price">₭ {{ formatPrice(unitPriceFor(car)) }} {{ $t('cars.priceUnit') }}</div>
              </template>
              <template v-else>
                <div class="car-card__price-note">{{ $t('cars.noAvailability') }}</div>
              </template>

              <a-button type="primary" size="large" :disabled="unitPriceFor(car) == null" @click="handleBookNow(car)">
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
const bookingStore = useBookingStore()
const router = useRouter()
const route = useRoute()

const bannerImage = defaultImageForType('CAR_RENTAL')

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

const vehicleTypeOptions = ['SEDAN', 'SUV', 'VAN', 'PICKUP', 'MOTORBIKE']
const transmissionOptions = ['MANUAL', 'AUTOMATIC']

const VEHICLE_TYPE_KEY_MAP = { SEDAN: 'sedan', SUV: 'suv', VAN: 'van', PICKUP: 'pickup', MOTORBIKE: 'motorbike' }
function vehicleTypeLabel(type) {
  return t(`common.vehicleTypes.${VEHICLE_TYPE_KEY_MAP[type] ?? type}`, type)
}

const TRANSMISSION_KEY_MAP = { MANUAL: 'manual', AUTOMATIC: 'automatic' }
function transmissionLabel(type) {
  return t(`common.transmissions.${TRANSMISSION_KEY_MAP[type] ?? type}`, type)
}

// Car rentals are a multi-day service (pickup -> return), same shape as a
// hotel stay -- see GET /car-rentals/search on unibooking-backend.
// pickupDate/returnDate start empty so SSR and the pre-hydration client
// render the same thing (same reasoning as pages/hotels/index.vue's
// checkInDate/checkOutDate).
const filters = reactive({
  location: route.query.location ?? '',
  priceRange: [0, 2000000],
  pickupDate: '',
  returnDate: '',
  vehicleType: undefined,
  transmission: undefined,
  minSeatingCapacity: undefined
})

function runSearch() {
  bookingStore.searchCarRentals({
    location: filters.location || undefined,
    pickupDate: filters.pickupDate,
    returnDate: filters.returnDate,
    minPrice: filters.priceRange[0] || undefined,
    maxPrice: filters.priceRange[1] || undefined,
    vehicleType: filters.vehicleType,
    transmission: filters.transmission,
    minSeatingCapacity: filters.minSeatingCapacity,
    sortBy: 'price_asc'
  })
}

onMounted(() => {
  if (!filters.pickupDate) {
    const today = new Date()
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    filters.pickupDate = isoDate(today)
    filters.returnDate = isoDate(tomorrow)
  }
  runSearch()
})

function unitPriceFor(car) {
  const entry = car.inventory?.find((row) => row.date?.slice(0, 10) === filters.pickupDate) ?? car.inventory?.[0]
  return entry ? Number(entry.price) : null
}

// Hands the selected dates to /cars/:id (pages/cars/[id].vue, backed by
// components/ServiceDetail/DetailView.vue) via query params, same convention
// as pages/hotels/index.vue's own detailsLink().
function detailsLink(car) {
  return {
    path: `/cars/${car.id}`,
    query: filters.pickupDate && filters.returnDate
      ? { startDate: filters.pickupDate, endDate: filters.returnDate }
      : undefined
  }
}

function handleBookNow(car) {
  bookingStore.selectedService = car
  bookingStore.bookingData.startDate = filters.pickupDate
  bookingStore.bookingData.endDate = filters.returnDate
  router.push('/checkout')
}
</script>

<style scoped>
.cars-page {
  background: #f8fafc;
  padding: 40px 24px;
  border-radius: 16px;
}

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

.car-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.car-card {
  display: flex;
  gap: 20px;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.car-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

.car-card__link {
  display: flex;
  flex: 1;
  min-width: 0;
  gap: 20px;
  color: inherit;
  text-decoration: none;
}

.car-card__image {
  flex: 0 0 280px;
  width: 280px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

.car-card__body {
  flex: 1;
  min-width: 0;
}

.car-card__name {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.car-card__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.car-card__supplier {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
}

.car-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 12px;
}

.car-card__description {
  font-size: 13px;
  color: #94a3b8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.car-card__action {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  text-align: right;
  gap: 4px;
}

.car-card__price {
  font-size: 20px;
  font-weight: 700;
  color: #1e40af;
}

.car-card__price-note {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}

@media (max-width: 767px) {
  .cars-page {
    padding: 24px 16px;
  }

  .filter-card {
    position: static;
    margin-bottom: 20px;
  }

  .car-card {
    flex-direction: column;
  }

  .car-card__link {
    flex-direction: column;
  }

  .car-card__image {
    width: 100%;
    height: 180px;
  }

  .car-card__action {
    flex: none;
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }

  .car-card__action .ant-btn {
    width: 100%;
  }
}
</style>
