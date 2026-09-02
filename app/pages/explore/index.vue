<template>
  <div class="explore-page">
    <div class="explore-page__header">
      <h1 class="explore-page__title">ຄົ້ນຫາບໍລິການ</h1>
      <p class="explore-page__subtitle">ຄົ້ນຫາທີ່ພັກ, ທົວ ແລະ ລົດເຊົ່າຈາກທົ່ວປະເທດລາວ</p>

      <div class="explore-page__controls">
        <a-input-search
          v-model:value="filters.location"
          size="large"
          placeholder="ຄົ້ນຫາຕາມສະຖານທີ່ (ເຊັ່ນ: Vientiane, Luang Prabang...)"
          allow-clear
          class="explore-page__search"
          @search="runSearch"
        />

        <a-radio-group v-model:value="filters.type" button-style="solid" size="large" @change="runSearch">
          <a-radio-button :value="undefined">ທັງໝົດ</a-radio-button>
          <a-radio-button value="HOTEL">Room</a-radio-button>
          <a-radio-button value="TOUR">Tour</a-radio-button>
          <a-radio-button value="CAR_RENTAL">Car Rental</a-radio-button>
        </a-radio-group>

        <!-- Optional -- price only ever comes back from GET /services/search
             when a date range is given (see priceLabel()'s comment below),
             so picking dates here is what turns "see price in details" into
             a real per-night rate on every card. -->
        <a-range-picker
          v-model:value="filters.dates"
          size="large"
          class="explore-page__dates"
          :placeholder="['ວັນທີເລີ່ມ', 'ວັນທີສິ້ນສຸດ']"
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

    <p v-if="!exploreStore.isLoading && exploreStore.services.length" class="explore-page__count">
      ພົບ {{ exploreStore.meta.total }} ບໍລິການ
    </p>

    <!-- Loading: a skeleton grid matching the real card grid's shape,
         instead of a single centered spinner, so the layout doesn't jump
         once results arrive. -->
    <a-row v-if="exploreStore.isLoading" :gutter="[24, 24]">
      <a-col v-for="n in 8" :key="n" :xs="24" :sm="12" :md="8" :lg="6">
        <a-card :loading="true" class="service-card" />
      </a-col>
    </a-row>

    <a-empty
      v-else-if="!exploreStore.services.length"
      description="ບໍ່ພົບບໍລິການທີ່ຕົງກັບການຄົ້ນຫາ"
      class="explore-page__empty"
    />

    <a-row v-else :gutter="[24, 24]">
      <a-col v-for="service in exploreStore.services" :key="service.id" :xs="24" :sm="12" :md="8" :lg="6">
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
              <a-button type="primary">View Details</a-button>
            </NuxtLink>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { useExploreStore } from '~/stores/explore'

const exploreStore = useExploreStore()

const filters = reactive({
  location: '',
  type: undefined,
  // a-range-picker's v-model is [Dayjs, Dayjs] | [] -- see isoDate() below.
  dates: []
})

// a-range-picker/a-date-picker values are Dayjs instances, which -- like
// native Date -- expose toISOString(). Same helper as
// components/Booking/SearchForm.vue's own isoDate().
function isoDate(value) {
  return value ? value.toISOString().slice(0, 10) : undefined
}

function runSearch() {
  const [start, end] = filters.dates || []
  exploreStore.search({
    location: filters.location,
    type: filters.type,
    startDate: isoDate(start),
    endDate: isoDate(end)
  })
}

onMounted(runSearch)

// Backend ServiceType: HOTEL/FLIGHT/TRAIN/BUS/TOUR/CAR_RENTAL/PACKAGE --
// only HOTEL/TOUR/CAR_RENTAL are filterable from this page's radio group
// (same 3-type convention as the supplier portal's Add Item form), the
// rest are shown here only in case one turns up in unfiltered results.
const TYPE_TAG_MAP = {
  HOTEL: { color: 'blue', text: 'Room' },
  TOUR: { color: 'gold', text: 'Tour' },
  CAR_RENTAL: { color: 'purple', text: 'Car Rental' },
  FLIGHT: { color: 'cyan', text: 'Flight' },
  TRAIN: { color: 'green', text: 'Train' },
  BUS: { color: 'orange', text: 'Bus' },
  PACKAGE: { color: 'default', text: 'Package' }
}

function typeTagMeta(type) {
  return TYPE_TAG_MAP[type] || { color: 'default', text: type }
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

function formatPrice(value) {
  return new Intl.NumberFormat('lo-LA').format(value)
}

// `inventory` is only present on a result when the search itself carried a
// date range (see ServicesService.search's searchCatalog() vs date-range
// branch) -- without one, there's no per-night InventoryPricing to read,
// so this honestly falls back instead of showing a fabricated price.
function priceLabel(service) {
  const entry = service.inventory?.[0]
  return entry ? `₭ ${formatPrice(Number(entry.price))} / ຄືນ` : 'ເບິ່ງລາຄາໃນລາຍລະອຽດ'
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
