<template>
  <div class="service-detail-page">
    <a-skeleton v-if="serviceDetailStore.isLoading && !serviceDetailStore.service" active class="service-detail-page__skeleton" />

    <a-result
      v-else-if="serviceDetailStore.error && !serviceDetailStore.service"
      status="404"
      :title="serviceDetailStore.error"
      class="service-detail-page__error"
    >
      <template #extra>
        <NuxtLink to="/explore">
          <a-button type="primary">ກັບໄປໜ້າຄົ້ນຫາ</a-button>
        </NuxtLink>
      </template>
    </a-result>

    <a-row v-else-if="service" :gutter="[32, 32]">
      <!-- Main content -->
      <a-col :xs="24" :md="16">
        <img :src="placeholderImage(service.name)" :alt="service.name" class="service-detail-page__image">

        <a-tag :color="typeTagMeta(service.type).color" class="service-detail-page__type-tag">
          {{ typeTagMeta(service.type).text }}
        </a-tag>

        <h1 class="service-detail-page__title">{{ service.name }}</h1>

        <p class="service-detail-page__location">
          <EnvironmentOutlined />
          {{ service.location }}
        </p>

        <p v-if="service.supplier" class="service-detail-page__supplier">
          {{ service.supplier.companyName }}
          <a-tag v-if="service.supplier.isVerified" color="green">Verified</a-tag>
        </p>

        <h2 class="service-detail-page__section-title">ລາຍລະອຽດ</h2>
        <p class="service-detail-page__description">{{ service.description }}</p>

        <!-- Type-specific details -->
        <template v-if="service.type === 'HOTEL' && service.hotelDetails">
          <h2 class="service-detail-page__section-title">ຂໍ້ມູນທີ່ພັກ</h2>
          <a-descriptions :column="1" bordered size="small" class="service-detail-page__facts">
            <a-descriptions-item label="ລະດັບດາວ">
              <a-rate disabled :value="service.hotelDetails.starRating" />
            </a-descriptions-item>
            <a-descriptions-item label="ປະເພດທີ່ພັກ">{{ service.hotelDetails.propertyType }}</a-descriptions-item>
          </a-descriptions>
          <div v-if="service.hotelDetails.amenities?.length" class="service-detail-page__amenities">
            <a-tag v-for="amenity in service.hotelDetails.amenities" :key="amenity" color="blue">{{ amenity }}</a-tag>
          </div>
        </template>

        <template v-else-if="service.type === 'TOUR' && service.tourDetails">
          <h2 class="service-detail-page__section-title">ຂໍ້ມູນທົວ</h2>
          <a-descriptions :column="1" bordered size="small" class="service-detail-page__facts">
            <a-descriptions-item label="ໄລຍະເວລາ">{{ service.tourDetails.durationDays }} ວັນ</a-descriptions-item>
            <a-descriptions-item label="ໝວດໝູ່">{{ service.tourDetails.category }}</a-descriptions-item>
            <a-descriptions-item label="ລະດັບຄວາມຍາກ">{{ service.tourDetails.difficulty }}</a-descriptions-item>
            <a-descriptions-item label="ຈຳນວນຄົນ (Group Size)">
              {{ service.tourDetails.minGroupSize }} - {{ service.tourDetails.maxGroupSize }} ຄົນ
            </a-descriptions-item>
          </a-descriptions>
        </template>

        <template v-else-if="service.type === 'CAR_RENTAL' && service.carRentalDetails">
          <h2 class="service-detail-page__section-title">ຂໍ້ມູນລົດເຊົ່າ</h2>
          <a-descriptions :column="1" bordered size="small" class="service-detail-page__facts">
            <a-descriptions-item label="ປະເພດລົດ">{{ service.carRentalDetails.vehicleType }}</a-descriptions-item>
            <a-descriptions-item label="ເກຍ">{{ service.carRentalDetails.transmission }}</a-descriptions-item>
            <a-descriptions-item label="ຈຳນວນບ່ອນນັ່ງ">{{ service.carRentalDetails.seatingCapacity }}</a-descriptions-item>
          </a-descriptions>
        </template>
      </a-col>

      <!-- Reservation card -->
      <a-col :xs="24" :md="8">
        <a-card :bordered="false" class="reservation-card">
          <h3 class="reservation-card__title">ການຈອງ</h3>

          <label class="reservation-card__label">ວັນທີ</label>
          <a-range-picker
            v-model:value="selectedDates"
            class="reservation-card__dates"
            :placeholder="['ວັນທີເລີ່ມ', 'ວັນທີສິ້ນສຸດ']"
            @change="handleDatesChange"
          />

          <div v-if="nights > 0" class="reservation-card__price-summary">
            <div class="reservation-card__price-row">
              <span>₭ {{ formatPrice(nightlyPrice) }} x {{ nights }} ຄືນ</span>
              <span>₭ {{ formatPrice(totalPrice) }}</span>
            </div>
            <a-divider class="reservation-card__divider" />
            <div class="reservation-card__price-row reservation-card__price-row--total">
              <span>ລວມທັງໝົດ</span>
              <span>₭ {{ formatPrice(totalPrice) }}</span>
            </div>
          </div>
          <p v-else-if="hasSelectedDates" class="reservation-card__no-price">
            ບໍ່ພົບລາຄາ/ຫ້ອງວ່າງໃນຊ່ວງວັນທີ່ນີ້
          </p>

          <a-button type="primary" size="large" block class="reservation-card__book-btn" @click="handleBookNow">
            Book Now
          </a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { useServiceDetailStore } from '~/stores/serviceDetail'

const route = useRoute()
const serviceDetailStore = useServiceDetailStore()

const service = computed(() => serviceDetailStore.service)

// Pre-filled from the Explore page's ?startDate=&endDate= (see
// pages/explore/index.vue's detailsLink()) when present, otherwise empty
// so the user picks their own -- a-range-picker's v-model needs Dayjs
// instances, not plain ISO strings, hence the dayjs(...) wrap here.
const selectedDates = ref(
  route.query.startDate && route.query.endDate
    ? [dayjs(String(route.query.startDate)), dayjs(String(route.query.endDate))]
    : []
)

function isoDate(value) {
  return value ? value.toISOString().slice(0, 10) : undefined
}

function fetchWithSelectedDates() {
  const [start, end] = selectedDates.value || []
  serviceDetailStore.fetchService(route.params.id, {
    startDate: isoDate(start),
    endDate: isoDate(end)
  })
}

function handleDatesChange() {
  fetchWithSelectedDates()
}

onMounted(fetchWithSelectedDates)

// Backend ServiceType: HOTEL/FLIGHT/TRAIN/BUS/TOUR/CAR_RENTAL/PACKAGE --
// same map as pages/explore/index.vue.
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

function placeholderImage(name) {
  return `https://placehold.co/1000x500/f0f9ff/1e40af?text=${encodeURIComponent(name)}`
}

function formatPrice(value) {
  return new Intl.NumberFormat('lo-LA').format(value || 0)
}

const hasSelectedDates = computed(() => (selectedDates.value?.length ?? 0) === 2)

// GET /services/:id only ever returns InventoryPricing rows that actually
// exist for the requested range -- unlike GET /services/search, it does
// NOT guarantee every night has stock (see ServicesService.findOne vs
// search()), so `nights` can legitimately be less than the number of
// nights requested when part of the range has no pricing set.
const nights = computed(() => service.value?.inventory?.length ?? 0)
const nightlyPrice = computed(() => Number(service.value?.inventory?.[0]?.price ?? 0))
const totalPrice = computed(
  () => (service.value?.inventory ?? []).reduce((sum, row) => sum + Number(row.price), 0)
)

function handleBookNow() {
  if (!hasSelectedDates.value) {
    message.warning('ກະລຸນາເລືອກວັນທີກ່ອນຈອງ')
    return
  }
  // No checkout flow exists yet -- honest placeholder, same "not ready
  // yet" pattern used across the supplier portal.
  message.info('ດຳເນີນການໄປສູ່ການຊຳລະເງິນ... (Proceed to Checkout)')
}
</script>

<style scoped>
.service-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.service-detail-page__skeleton {
  padding: 24px 0;
}

.service-detail-page__error {
  padding: 64px 0;
}

.service-detail-page__image {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 20px;
}

.service-detail-page__type-tag {
  margin-bottom: 8px;
}

.service-detail-page__title {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.service-detail-page__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 8px;
}

.service-detail-page__supplier {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
}

.service-detail-page__section-title {
  font-size: 18px;
  font-weight: 700;
  color: #14294f;
  margin: 24px 0 12px;
}

.service-detail-page__description {
  font-size: 14px;
  line-height: 1.8;
  color: #475569;
}

.service-detail-page__facts {
  margin-bottom: 12px;
}

.service-detail-page__amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.reservation-card {
  position: sticky;
  top: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

.reservation-card__title {
  font-size: 18px;
  font-weight: 700;
  color: #14294f;
  margin-bottom: 16px;
}

.reservation-card__label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #14294f;
  margin-bottom: 8px;
}

.reservation-card__dates {
  width: 100%;
  margin-bottom: 16px;
}

.reservation-card__price-summary {
  margin-bottom: 16px;
}

.reservation-card__price-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #475569;
}

.reservation-card__price-row--total {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.reservation-card__divider {
  margin: 12px 0;
}

.reservation-card__no-price {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 16px;
}

@media (max-width: 767px) {
  .service-detail-page {
    padding: 24px 16px;
  }

  .reservation-card {
    position: static;
    top: auto;
  }
}
</style>
