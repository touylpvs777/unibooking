<template>
  <div class="container">
    <ModuleBanner
      :image="bannerImage"
      :title="$t('home.services.insurance.title')"
      :subtitle="$t('home.services.insurance.description')"
    />

    <a-card class="filter-card" :bordered="false">
      <a-row :gutter="16" align="bottom">
        <a-col :xs="24" :sm="12" :md="6">
          <label class="field-label">{{ $t('search.locationLabel') }}</label>
          <a-input v-model:value="filters.location" size="large" :placeholder="$t('hotels.locationPlaceholder')" allow-clear />
        </a-col>
        <a-col :xs="24" :sm="12" :md="8">
          <label class="field-label">{{ $t('common.columns.date') }}</label>
          <a-range-picker
            v-model:value="filters.dates"
            size="large"
            style="width: 100%"
            :placeholder="[$t('explore.startDatePlaceholder'), $t('explore.endDatePlaceholder')]"
          />
        </a-col>
        <a-col :xs="24" :md="4" class="filter-card__search-col">
          <a-button type="primary" block size="large" :loading="bookingStore.isLoading" @click="runSearch">
            {{ $t('common.search') }}
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-spin :spinning="bookingStore.isLoading">
      <a-empty v-if="!bookingStore.isLoading && !bookingStore.services.length" :description="$t('insurance.noResults')" />

      <a-row v-else :gutter="[24, 24]">
        <a-col v-for="plan in bookingStore.services" :key="plan.id" :xs="24" :sm="12" :lg="8">
          <a-card class="plan-card" :bordered="false" :body-style="{ padding: '16px' }">
            <template #cover>
              <!-- coverImageFor(plan) falls back to the INSURANCE-type default
                   banner photo for every plan -- insurance listings have no
                   per-unit supplier photos (it's not a physical thing to
                   photograph), same reasoning as utils/serviceImages.js's own
                   DEFAULT_SERVICE_IMAGES comment. -->
              <NuxtLink :to="detailsLink(plan)" class="plan-card__cover-link">
                <img :src="coverImageFor(plan)" :alt="plan.name" class="plan-card__image" />
              </NuxtLink>
            </template>

            <NuxtLink :to="detailsLink(plan)" class="plan-card__link">
              <h3 class="plan-card__name">{{ plan.name }}</h3>
              <p class="plan-card__location">
                <EnvironmentOutlined />
                {{ plan.location }}
              </p>
              <p class="plan-card__description">{{ plan.description }}</p>
            </NuxtLink>

            <div class="plan-card__footer">
              <span class="plan-card__price">{{ priceLabel(plan) }}</span>
              <a-button type="primary" @click="handleBookNow(plan)">{{ $t('common.bookNow') }}</a-button>
            </div>
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

const bannerImage = defaultImageForType('INSURANCE')

const filters = reactive({
  location: route.query.location ?? '',
  dates: []
})

function isoDate(value) {
  return value ? value.toISOString().slice(0, 10) : undefined
}

// Insurance has no vertical controller of its own (see
// unibooking-backend/prisma/schema.prisma's ServiceType.INSURANCE comment --
// "generic like PACKAGE, no dedicated details table"), so this goes through
// the generic GET /services/search instead of a dedicated store action, same
// as pages/explore/index.vue does for any type without its own vertical.
// Dates are optional -- a coverage price only comes back when both are set
// (see ServicesService.search's date-range branch).
function runSearch() {
  const [start, end] = filters.dates || []
  bookingStore.searchServices({
    type: 'INSURANCE',
    location: filters.location || undefined,
    startDate: isoDate(start),
    endDate: isoDate(end),
    sortBy: 'price_asc'
  })
}

onMounted(runSearch)

function priceLabel(plan) {
  const entry = plan.inventory?.[0]
  return entry ? `₭ ${formatPrice(Number(entry.price))} ${t('insurance.priceUnit')}` : t('explore.priceSeeDetails')
}

// Hands the selected coverage dates to /insurance/:id
// (pages/insurance/[id].vue, backed by components/ServiceDetail/DetailView.vue)
// via query params, same convention as pages/explore/index.vue's own
// detailsLink().
function detailsLink(plan) {
  const [start, end] = filters.dates || []
  const startDate = isoDate(start)
  const endDate = isoDate(end)
  return {
    path: `/insurance/${plan.id}`,
    query: startDate && endDate ? { startDate, endDate } : undefined
  }
}

function handleBookNow(plan) {
  const [start, end] = filters.dates || []
  bookingStore.selectedService = plan
  bookingStore.bookingData.startDate = isoDate(start) ?? null
  bookingStore.bookingData.endDate = isoDate(end) ?? null
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

.plan-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  height: 100%;
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

.plan-card__cover-link {
  display: block;
}

.plan-card__image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.plan-card__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.plan-card__name {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.plan-card__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 13px;
  margin-bottom: 8px;
}

.plan-card__description {
  font-size: 13px;
  color: #94a3b8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

.plan-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.plan-card__price {
  font-size: 14px;
  font-weight: 700;
  color: #1e40af;
}

@media (max-width: 767px) {
  .container {
    padding: 24px 16px;
  }
}
</style>
