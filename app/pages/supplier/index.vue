<template>
  <div class="supplier-dashboard">
    <h1 class="supplier-dashboard__title">ພາບລວມຜູ້ໃຫ້ບໍລິການ</h1>

    <a-alert
      v-if="inventoryStore.error || bookingsStore.error"
      type="error"
      :message="inventoryStore.error || bookingsStore.error"
      show-icon
      closable
      class="supplier-dashboard__error"
      @close="inventoryStore.error = bookingsStore.error = null"
    />

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :sm="12" :md="8">
        <a-card :loading="inventoryStore.isLoading" class="stat-card">
          <a-statistic
            title="Total Services"
            :value="totalServices"
            :value-style="{ color: '#14294f', fontWeight: 700 }"
          >
            <template #prefix>
              <AppstoreOutlined class="stat-card__icon stat-card__icon--gold" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card :loading="bookingsStore.isLoading" class="stat-card">
          <a-statistic
            title="Pending Bookings"
            :value="pendingBookingsCount"
            :value-style="{ color: '#14294f', fontWeight: 700 }"
          >
            <template #prefix>
              <ScheduleOutlined class="stat-card__icon stat-card__icon--blue" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card :loading="bookingsStore.isLoading" class="stat-card">
          <a-statistic
            title="Total Revenue"
            :value="formattedTotalRevenue"
            :value-style="{ color: '#166534', fontWeight: 700 }"
          >
            <template #prefix>
              <DollarCircleOutlined class="stat-card__icon stat-card__icon--green" />
            </template>
            <template #suffix>ກີບ</template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-card :bordered="false" class="recent-bookings-card">
      <template #title>
        Recent Reservations
      </template>

      <a-table
        :columns="columns"
        :data-source="recentBookings"
        :loading="bookingsStore.isLoading"
        :pagination="false"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'bookingReference'">
            <span class="booking-ref">{{ record.bookingReference }}</span>
          </template>

          <template v-else-if="column.key === 'guest'">
            <div>{{ guestName(record) }}</div>
            <div class="supplier-dashboard__guest-email">{{ record.user?.email }}</div>
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
            {{ formatPrice(record.totalPrice) }} ກີບ
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { ScheduleOutlined, DollarCircleOutlined, AppstoreOutlined } from '@ant-design/icons-vue'
import { useInventoryStore } from '~/stores/inventory'
import { useSupplierBookingsStore } from '~/stores/supplierBookings'

definePageMeta({ layout: 'supplier', middleware: ['supplier'] })

const inventoryStore = useInventoryStore()
const bookingsStore = useSupplierBookingsStore()

// Same column set as pages/supplier/bookings/index.vue, minus the Actions
// column -- this is a glanceable preview, not another management surface.
const columns = [
  { title: 'ລະຫັດການຈອງ', key: 'bookingReference' },
  { title: 'ແຂກ', key: 'guest' },
  { title: 'ບໍລິການ', key: 'serviceName' },
  { title: 'ວັນທີ', key: 'date' },
  { title: 'ສະຖານະ', key: 'status' },
  { title: 'ລາຄາລວມ', key: 'totalPrice' }
]

// Same BookingStatus mapping as pages/admin/bookings.vue and
// pages/supplier/bookings/index.vue.
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

const totalServices = computed(() => inventoryStore.services.length)

const pendingBookingsCount = computed(
  () => bookingsStore.bookings.filter((booking) => booking.status === 'PENDING').length
)

const totalRevenue = computed(() =>
  bookingsStore.bookings
    .filter((booking) => booking.status === 'CONFIRMED' || booking.status === 'COMPLETED')
    .reduce((sum, booking) => sum + Number(booking.totalPrice), 0)
)

const formattedTotalRevenue = computed(() => new Intl.NumberFormat('lo-LA').format(totalRevenue.value))

// GET /bookings/supplier is already ordered by createdAt desc (see
// BookingsService.findForSupplier), so the first 5 are the most recent.
const recentBookings = computed(() => bookingsStore.bookings.slice(0, 5))

onMounted(() => {
  inventoryStore.fetchServices()
  bookingsStore.fetchBookings()
})
</script>

<style scoped>
.supplier-dashboard__title {
  margin: 0 0 24px;
  color: #14294f;
}

.supplier-dashboard__error {
  margin-bottom: 16px;
}

.stat-card {
  border-radius: 12px;
}

.stat-card__icon {
  margin-right: 8px;
  font-size: 20px;
}

.stat-card__icon--blue {
  color: #2563eb;
}

.stat-card__icon--gold {
  color: #d4af37;
}

.stat-card__icon--green {
  color: #16a34a;
}

.recent-bookings-card {
  margin-top: 24px;
  border-radius: 12px;
}

.supplier-dashboard__guest-email {
  font-size: 12px;
  color: #64748b;
}

.booking-ref {
  font-family: monospace;
  font-weight: 600;
}
</style>
