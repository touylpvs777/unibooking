<template>
  <div class="admin-bookings">
    <h1 class="admin-bookings__title">{{ $t('admin.bookingsTitle') }}</h1>

    <a-alert
      v-if="error"
      type="error"
      :message="error"
      show-icon
      class="admin-bookings__error"
    />

    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :data-source="bookings"
        :loading="isLoading"
        :pagination="pagination"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'bookingReference'">
            <span class="booking-ref">{{ record.bookingReference }}</span>
          </template>

          <template v-else-if="column.key === 'user'">
            <div>{{ fullName(record.user) }}</div>
            <div class="admin-bookings__user-email">{{ record.user?.email }}</div>
          </template>

          <template v-else-if="column.key === 'status'">
            <a-tag :color="statusTagMeta(record.status).color">
              {{ statusTagMeta(record.status).text }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'totalPrice'">
            {{ formatPrice(record.totalPrice) }} {{ $t('common.kip') }}
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { API_ADMIN_BOOKINGS } from '~/utils/api'

definePageMeta({ layout: 'admin' })

const { t } = useI18n()

// AdminBooking[] from GET /admin/bookings?page&limit -- see
// unibooking-backend/src/admin/admin.service.ts's adminBookingInclude.
const bookings = ref([])
const isLoading = ref(true)
const error = ref(null)

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
  showSizeChanger: false
})

const columns = computed(() => [
  { title: t('common.columns.bookingReference'), key: 'bookingReference' },
  { title: t('common.columns.user'), key: 'user' },
  { title: t('common.columns.status'), key: 'status' },
  { title: t('common.columns.totalPrice'), key: 'totalPrice' }
])

// Backend BookingStatus: PENDING/CONFIRMED/CANCELLED/COMPLETED -- same
// mapping as app/pages/profile.vue's own booking history table.
const STATUS_COLOR_MAP = {
  PENDING: 'warning',
  CONFIRMED: 'processing',
  COMPLETED: 'success',
  CANCELLED: 'error'
}

function statusTagMeta(status) {
  return {
    color: STATUS_COLOR_MAP[status] || 'default',
    text: t(`common.bookingStatus.${status.toLowerCase()}`, status)
  }
}

function formatPrice(value) {
  return new Intl.NumberFormat('lo-LA').format(value || 0)
}

function fullName(user) {
  if (!user) return '-'
  return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email
}

async function fetchBookings() {
  isLoading.value = true
  error.value = null

  try {
    const { $unibookingApi } = useNuxtApp()
    const { data } = await $unibookingApi.get(API_ADMIN_BOOKINGS, {
      params: { page: pagination.current, limit: pagination.pageSize }
    })

    bookings.value = data.data
    pagination.total = data.meta.total
  } catch {
    error.value = t('admin.fetchBookingsError')
  } finally {
    isLoading.value = false
  }
}

function handleTableChange(paginationEvent) {
  pagination.current = paginationEvent.current
  fetchBookings()
}

onMounted(fetchBookings)
</script>

<style scoped>
.admin-bookings__title {
  margin: 0 0 24px;
  color: #14294f;
}

.admin-bookings__error {
  margin-bottom: 16px;
}

.admin-bookings__user-email {
  font-size: 12px;
  color: #64748b;
}

.booking-ref {
  font-family: monospace;
  font-weight: 600;
}
</style>
