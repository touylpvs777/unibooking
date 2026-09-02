<template>
  <div v-if="isAuthorized" class="container">
    <!-- Guarded by middleware/auth.js + this page's own isAuthorized gate below (see script) -->
    <a-card class="profile-header" :bordered="false">
      <div class="profile-header__inner">
        <a-avatar :size="64">{{ userInitial }}</a-avatar>
        <div>
          <h1 class="profile-header__name">{{ authStore.fullName }}</h1>
          <p class="profile-header__email">{{ authStore.user?.email }}</p>
        </div>
      </div>

      <a-button danger @click="handleLogout">
        ອອກຈາກລະບົບ
      </a-button>
    </a-card>

    <a-card class="profile-tabs-card">
      <a-tabs default-active-key="history">
        <!-- Tab 1: Booking History -->
        <a-tab-pane key="history" tab="ປະຫວັດການຈອງ">
          <a-table
            :columns="historyColumns"
            :data-source="bookingStore.bookingHistory"
            :loading="bookingStore.isLoading"
            :pagination="false"
            row-key="id"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'serviceName'">
                {{ firstItem(record)?.inventoryPricing?.service?.name || '-' }}
              </template>
              <template v-else-if="column.key === 'date'">
                {{ formatDate(firstItem(record)?.inventoryPricing?.date) }}
              </template>
              <template v-else-if="column.key === 'status'">
                <a-tag :color="statusTagMeta(record.status).color">
                  {{ statusTagMeta(record.status).text }}
                </a-tag>
              </template>
              <template v-else-if="column.key === 'totalPrice'">
                {{ formatPrice(record.totalPrice) }} ກີບ
              </template>
              <template v-else-if="column.key === 'action'">
                <a-button type="link" @click="handleViewDetail(record)">
                  ເບິ່ງລາຍລະອຽດ
                </a-button>
                <a-button v-if="record.status === 'COMPLETED'" type="link" @click="handleWriteReview(record)">
                  ຂຽນຣີວິວ
                </a-button>
              </template>
            </template>
          </a-table>
        </a-tab-pane>

        <!-- Tab 2: Personal Info -->
        <a-tab-pane key="info" tab="ຂໍ້ມູນສ່ວນຕົວ">
          <a-descriptions :column="1" bordered size="middle">
            <a-descriptions-item label="ຊື່">{{ authStore.fullName }}</a-descriptions-item>
            <a-descriptions-item label="ອີເມວ">{{ authStore.user?.email }}</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- Booking Detail Modal -->
    <a-modal
      v-model:open="isModalVisible"
      title="ລາຍລະອຽດການຈອງ"
      :footer="null"
    >
      <a-descriptions v-if="selectedBooking" :column="1" bordered size="middle">
        <a-descriptions-item label="ລະຫັດການຈອງ">{{ selectedBooking.bookingReference }}</a-descriptions-item>
        <a-descriptions-item label="ຊື່ບໍລິການ">{{ firstItem(selectedBooking)?.inventoryPricing?.service?.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="ວັນທີ">{{ formatDate(firstItem(selectedBooking)?.inventoryPricing?.date) }}</a-descriptions-item>
        <a-descriptions-item label="ຈຳນວນ (ຫ້ອງ/ບ່ອນນັ່ງ)">
          {{ totalUnits(selectedBooking) }}
        </a-descriptions-item>
        <a-descriptions-item label="ລາຄາລວມ">{{ formatPrice(selectedBooking.totalPrice) }} ກີບ</a-descriptions-item>
        <a-descriptions-item label="ສະຖານະ">
          <a-tag :color="statusTagMeta(selectedBooking.status).color">
            {{ statusTagMeta(selectedBooking.status).text }}
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>

      <div class="modal-actions">
        <a-button @click="isModalVisible = false">ປິດ</a-button>
      </div>
    </a-modal>

    <!-- Write Review Modal -->
    <a-modal
      v-model:open="isReviewModalVisible"
      title="ຂຽນຣີວິວ"
      :footer="null"
    >
      <p v-if="reviewingBooking" class="review-modal__service">
        {{ firstItem(reviewingBooking)?.inventoryPricing?.service?.name }}
      </p>
      <ReviewsWriteReviewForm
        v-if="reviewingServiceId"
        :service-id="reviewingServiceId"
        @submitted="isReviewModalVisible = false"
      />
    </a-modal>
  </div>

  <div v-else class="profile-loading">
    <a-spin size="large" />
  </div>
</template>

<script setup>
// The actual check now lives in middleware/auth.js (skips on the server --
// see its own comment for why a hard refresh here previously always
// bounced to /login even when already logged in). isAuthorized below is
// this page's own client-side half of the same belt-and-suspenders
// pattern used by layouts/admin.vue and layouts/supplier.vue, so a hard
// refresh never flashes real booking history before that check resolves.
definePageMeta({ middleware: ['auth'] })

// Nuxt/Pinia auto-imports: computed, onMounted, ref, useAuthStore, useBookingStore, navigateTo
const authStore = useAuthStore()
const bookingStore = useBookingStore()

const isAuthorized = ref(false)
const userInitial = computed(() => authStore.fullName?.charAt(0).toUpperCase() ?? '?')

onMounted(async () => {
  await authStore.initAuth()

  if (!authStore.isAuthenticated) {
    navigateTo('/login')
    return
  }

  isAuthorized.value = true
  bookingStore.fetchBookingHistory()
})

const historyColumns = [
  { title: 'ລະຫັດການຈອງ', dataIndex: 'bookingReference', key: 'bookingReference' },
  { title: 'ຊື່ບໍລິການ', key: 'serviceName' },
  { title: 'ວັນທີ', key: 'date' },
  { title: 'ລາຄາລວມ', dataIndex: 'totalPrice', key: 'totalPrice' },
  { title: 'ສະຖານະ', dataIndex: 'status', key: 'status' },
  { title: 'ຈັດການ', key: 'action' }
]

// ແປ status ຈາກ backend (Prisma BookingStatus: PENDING/CONFIRMED/CANCELLED/COMPLETED) ເປັນສີ+ຂໍ້ຄວາມ Lao
const STATUS_TAG_MAP = {
  PENDING: { color: 'warning', text: 'ລໍຖ້າຊຳລະ' },
  CONFIRMED: { color: 'processing', text: 'ຢືນຢັນແລ້ວ' },
  COMPLETED: { color: 'success', text: 'ສຳເລັດ' },
  CANCELLED: { color: 'error', text: 'ຍົກເລີກ' }
}

function statusTagMeta(status) {
  return STATUS_TAG_MAP[status] || { color: 'default', text: status }
}

function formatPrice(value) {
  return new Intl.NumberFormat('lo-LA').format(value || 0)
}

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('lo-LA')
}

// GET /bookings/me nests everything under items[].inventoryPricing.service --
// a booking can have multiple items, but the summary table/modal here only
// surfaces the first one.
function firstItem(booking) {
  return booking?.items?.[0]
}

function totalUnits(booking) {
  return booking?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
}

function handleLogout() {
  authStore.logout()
  navigateTo('/')
}

// Booking detail modal
const isModalVisible = ref(false)
const selectedBooking = ref(null)

function handleViewDetail(record) {
  selectedBooking.value = record
  isModalVisible.value = true
}

// Write Review modal -- only offered for COMPLETED bookings (see the
// action column above); POST /reviews still re-verifies this server-side
// (a completed booking for this serviceId, not yet reviewed), this button
// is just when it makes sense to offer the form at all.
const isReviewModalVisible = ref(false)
const reviewingBooking = ref(null)
const reviewingServiceId = computed(() => firstItem(reviewingBooking.value)?.inventoryPricing?.service?.id)

function handleWriteReview(record) {
  reviewingBooking.value = record
  isReviewModalVisible.value = true
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.profile-loading {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-header {
  margin-bottom: 24px;
}

.profile-header :deep(.ant-card-body) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.profile-header__inner {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-header__name {
  margin: 0;
  color: #0c4a6e;
}

.profile-header__email {
  margin: 0;
  color: #64748b;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.review-modal__service {
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16px;
}
</style>
