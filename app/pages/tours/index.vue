<template>
  <div class="container">
    <ModuleBanner
      :image="bannerImage"
      :title="$t('home.services.attractions.title')"
      :subtitle="$t('home.services.attractions.description')"
    />

    <a-card class="filter-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="12" :md="5">
          <label class="field-label">{{ $t('search.locationLabel') }}</label>
          <a-input v-model:value="filters.location" size="large" :placeholder="$t('hotels.locationPlaceholder')" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="5">
          <label class="field-label">{{ $t('explore.categoryTitle') }}</label>
          <a-input v-model:value="filters.category" size="large" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="4">
          <label class="field-label">{{ $t('serviceDetail.difficultyLabel') }}</label>
          <a-select v-model:value="filters.difficulty" size="large" style="width: 100%" allow-clear :placeholder="$t('common.allOption')">
            <a-select-option v-for="level in difficultyOptions" :key="level" :value="level">{{ difficultyLabel(level) }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :sm="12" :md="4">
          <label class="field-label">{{ $t('tours.startDateLabel') }}</label>
          <a-input v-model:value="filters.startDate" type="date" size="large" />
        </a-col>
        <a-col :xs="24" :sm="12" :md="3">
          <label class="field-label">{{ $t('serviceDetail.groupSizeLabel') }}</label>
          <a-input-number v-model:value="filters.groupSize" size="large" style="width: 100%" :min="1" :max="50" />
        </a-col>
        <a-col :xs="24" :md="3" class="filter-card__search-col">
          <a-button type="primary" block size="large" :loading="bookingStore.isLoading" @click="runSearch">
            {{ $t('common.search') }}
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-spin :spinning="bookingStore.isLoading">
      <a-empty v-if="!bookingStore.isLoading && !bookingStore.services.length" :description="$t('tours.noResults')" />

      <a-row v-else :gutter="[24, 24]">
        <a-col v-for="tour in bookingStore.services" :key="tour.id" :xs="24" :md="12" :lg="8">
          <a-card hoverable class="tour-card">
            <template #cover>
              <!-- coverImageFor(tour) guarantees the image shown here is this
                   specific tour's own cover photo (or the TOUR-type default),
                   never another listing's or the homepage hero's art. -->
              <NuxtLink :to="detailsLink(tour)" class="tour-card__cover-link">
                <img :src="coverImageFor(tour)" :alt="tour.name" class="tour-card__image" />
              </NuxtLink>
            </template>

            <NuxtLink :to="detailsLink(tour)" class="tour-card__link">
              <h3 class="tour-card__name">{{ tour.name }}</h3>
              <div v-if="tour.tourDetails" class="tour-card__facts">
                <a-tag color="gold">{{ tour.tourDetails.durationDays }} {{ $t('serviceDetail.daysUnit') }}</a-tag>
                <a-tag color="blue">{{ tour.tourDetails.category }}</a-tag>
                <a-tag>{{ difficultyLabel(tour.tourDetails.difficulty) }}</a-tag>
              </div>
              <p class="tour-card__location">
                <EnvironmentOutlined />
                {{ tour.location }}
              </p>
              <p class="tour-card__price">
                <template v-if="unitPriceFor(tour) != null">
                  {{ formatPrice(unitPriceFor(tour)) }} {{ $t('common.kip') }} {{ $t('tours.priceUnit') }}
                </template>
                <template v-else>{{ $t('tours.noAvailability') }}</template>
              </p>
            </NuxtLink>

            <a-button type="primary" block :disabled="unitPriceFor(tour) == null" @click="handleBookNow(tour)">
              {{ $t('common.bookNow') }}
            </a-button>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
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

const bannerImage = defaultImageForType('TOUR')

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

const difficultyOptions = ['EASY', 'MODERATE', 'HARD']
const DIFFICULTY_KEY_MAP = { EASY: 'easy', MODERATE: 'moderate', HARD: 'hard' }
function difficultyLabel(level) {
  return t(`common.difficulties.${DIFFICULTY_KEY_MAP[level] ?? level}`, level)
}

// A tour is a fixed-departure package, not a stay you check in/out of -- one
// startDate is all GET /tours/search needs (see TourSearchDto). startDate
// starts empty so SSR and the pre-hydration client render the same thing
// (same reasoning as pages/hotels/index.vue's checkInDate).
const filters = reactive({
  location: route.query.location ?? '',
  category: '',
  difficulty: undefined,
  startDate: '',
  groupSize: undefined
})

function runSearch() {
  bookingStore.searchTours({
    location: filters.location || undefined,
    category: filters.category || undefined,
    difficulty: filters.difficulty,
    startDate: filters.startDate || undefined,
    groupSize: filters.groupSize,
    sortBy: 'price_asc'
  })
}

onMounted(() => {
  if (!filters.startDate) {
    filters.startDate = isoDate(new Date())
  }
  runSearch()
})

function unitPriceFor(tour) {
  const entry = tour.inventory?.find((row) => row.date?.slice(0, 10) === filters.startDate) ?? tour.inventory?.[0]
  return entry ? Number(entry.price) : null
}

// Hands the selected departure date to /tours/:id (pages/tours/[id].vue,
// backed by components/ServiceDetail/DetailView.vue) via query params, same
// convention as pages/transport/index.vue's own detailsLink() -- a tour is a
// single fixed-date package, so startDate doubles as both startDate and
// endDate (mirrors handleBookNow below).
function detailsLink(tour) {
  return {
    path: `/tours/${tour.id}`,
    query: filters.startDate ? { startDate: filters.startDate, endDate: filters.startDate } : undefined
  }
}

function handleBookNow(tour) {
  bookingStore.selectedService = tour
  bookingStore.bookingData.startDate = filters.startDate
  bookingStore.bookingData.endDate = filters.startDate
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

.tour-card {
  border-radius: 12px;
  overflow: hidden;
}

.tour-card__cover-link {
  display: block;
}

.tour-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.tour-card__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.tour-card__name {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.tour-card__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.tour-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 13px;
  margin: 8px 0 4px;
}

.tour-card__price {
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
