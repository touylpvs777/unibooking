<template>
  <div class="supplier-bookings">
    <h1 class="supplier-bookings__title">{{ $t('admin.bookingsTitle') }}</h1>

    <a-alert
      v-if="bookingsStore.error"
      type="error"
      :message="bookingsStore.error"
      show-icon
      closable
      class="supplier-bookings__error"
      @close="bookingsStore.error = null"
    />

    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :data-source="bookingsStore.bookings"
        :loading="bookingsStore.isLoading"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'bookingReference'">
            <span class="booking-ref">{{ record.bookingReference }}</span>
          </template>

          <template v-else-if="column.key === 'guest'">
            <div>{{ guestName(record) }}</div>
            <div class="supplier-bookings__guest-email">{{ record.user?.email }}</div>
          </template>

          <template v-else-if="column.key === 'serviceName'">
            {{ serviceName(record) }}
          </template>

          <template v-else-if="column.key === 'date'">
            {{ dateRange(record) }}
          </template>

          <template v-else-if="column.key === 'status'">
            <a-tag :color="statusTagMeta(record.status).color">
              {{ statusTagMeta(record.status).text }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'totalPrice'">
            {{ formatPrice(record.totalPrice) }} {{ $t('common.kip') }}
          </template>

          <template v-else-if="column.key === 'actions'">
            <a-button
              v-if="record.status === 'PENDING'"
              size="small"
              type="primary"
              @click="handleConfirm(record)"
            >
              {{ $t('supplier.confirmBookingButton') }}
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useSupplierBookingsStore } from '~/stores/supplierBookings'

definePageMeta({ layout: 'supplier', middleware: ['supplier'] })

const { t } = useI18n()
const bookingsStore = useSupplierBookingsStore()

const columns = computed(() => [
  { title: t('common.columns.bookingReference'), key: 'bookingReference' },
  { title: t('common.columns.guest'), key: 'guest' },
  { title: t('common.columns.service'), key: 'serviceName' },
  { title: t('common.columns.date'), key: 'date' },
  { title: t('common.columns.status'), key: 'status' },
  { title: t('common.columns.totalPrice'), key: 'totalPrice' },
  { title: t('common.columns.actions'), key: 'actions' }
])

// Same BookingStatus mapping as pages/admin/bookings.vue and
// pages/supplier/index.vue's own recent-reservations widget.
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

function guestName(record) {
  const user = record.user
  if (!user) return '-'
  return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email
}

// One BookingItem per night (see BookingsService.createBooking), all
// against the same Service -- items[0]'s service represents the whole
// booking either way.
function serviceName(record) {
  return record.items?.[0]?.inventoryPricing?.service?.name ?? '-'
}

// Nights aren't necessarily returned in date order -- sort defensively
// before reading the first/last as check-in/check-out.
function dateRange(record) {
  const dates = (record.items ?? [])
    .map((item) => item.inventoryPricing?.date)
    .filter(Boolean)
    .sort()
  if (dates.length === 0) return '-'

  const checkIn = dates[0].slice(0, 10)
  const checkOut = dates[dates.length - 1].slice(0, 10)
  return checkIn === checkOut ? checkIn : `${checkIn} → ${checkOut}`
}

// No PATCH endpoint for booking status exists in the backend yet -- honest
// placeholder, same "not ready yet" pattern as the inventory page's Edit
// button and checkout.vue's disabled payment channels.
function handleConfirm() {
  message.info(t('common.notReadyYet'))
}

onMounted(() => bookingsStore.fetchBookings())
</script>

<style scoped>
.supplier-bookings__title {
  margin: 0 0 24px;
  color: #14294f;
}

.supplier-bookings__error {
  margin-bottom: 16px;
}

.supplier-bookings__guest-email {
  font-size: 12px;
  color: #64748b;
}

.booking-ref {
  font-family: monospace;
  font-weight: 600;
}
</style>
