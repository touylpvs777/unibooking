<template>
  <div class="admin-dashboard">
    <h1 class="admin-dashboard__title">ພາບລວມລະບົບ</h1>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :sm="12" :md="8">
        <a-card :loading="isLoading" class="stat-card">
          <a-statistic
            title="ຈຳນວນຜູ້ໃຊ້ທັງໝົດ"
            :value="stats?.totalUsers ?? 0"
            :value-style="{ color: '#14294f', fontWeight: 700 }"
          >
            <template #prefix>
              <TeamOutlined class="stat-card__icon stat-card__icon--blue" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card :loading="isLoading" class="stat-card">
          <a-statistic
            title="ຈຳນວນການຈອງທັງໝົດ"
            :value="stats?.totalBookings ?? 0"
            :value-style="{ color: '#14294f', fontWeight: 700 }"
          >
            <template #prefix>
              <ScheduleOutlined class="stat-card__icon stat-card__icon--gold" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card :loading="isLoading" class="stat-card">
          <a-statistic
            title="ລາຍຮັບລວມ (ຈາກການຈອງທີ່ຢືນຢັນ/ສຳເລັດແລ້ວ)"
            :value="formattedRevenue"
            :value-style="{ color: '#166534', fontWeight: 700 }"
          >
            <template #prefix>
              <DollarCircleOutlined class="stat-card__icon stat-card__icon--green" />
            </template>
            <template #suffix>ກີບ</template>
          </a-statistic>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card :loading="isLoading" class="stat-card">
          <a-statistic
            title="ຄະແນນລີວິວສະເລ່ຍ"
            :value="formattedAverageRating"
            :value-style="{ color: '#14294f', fontWeight: 700 }"
          >
            <template #prefix>
              <StarOutlined class="stat-card__icon stat-card__icon--gold" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-alert
      v-if="error"
      type="error"
      :message="error"
      show-icon
      class="admin-dashboard__error"
    />

    <a-card :loading="isLoading" :bordered="false" class="status-breakdown-card">
      <template #title>Bookings by Status</template>

      <div v-for="status in STATUS_ORDER" :key="status" class="status-breakdown__row">
        <div class="status-breakdown__label">
          <span>{{ STATUS_LABEL_MAP[status] }}</span>
          <span class="status-breakdown__count">{{ stats?.bookingsByStatus?.[status] ?? 0 }}</span>
        </div>
        <a-progress
          :percent="statusPercent(status)"
          :stroke-color="STATUS_COLOR_MAP[status]"
          :show-info="false"
        />
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { TeamOutlined, ScheduleOutlined, DollarCircleOutlined, StarOutlined } from '@ant-design/icons-vue'
import { API_ADMIN_STATS } from '~/utils/api'

definePageMeta({ layout: 'admin' })

// AdminStats from GET /admin/stats: { totalUsers, totalBookings,
// totalRevenue, averageRating, bookingsByStatus }
const stats = ref(null)
const isLoading = ref(true)
const error = ref(null)

const formattedRevenue = computed(() => new Intl.NumberFormat('lo-LA').format(stats.value?.totalRevenue ?? 0))
const formattedAverageRating = computed(() =>
  stats.value?.averageRating != null ? stats.value.averageRating.toFixed(1) : '–'
)

// Same BookingStatus set/order as pages/supplier/index.vue's own breakdown.
const STATUS_ORDER = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
const STATUS_LABEL_MAP = {
  PENDING: 'ລໍຖ້າຊຳລະ',
  CONFIRMED: 'ຢືນຢັນແລ້ວ',
  COMPLETED: 'ສຳເລັດ',
  CANCELLED: 'ຍົກເລີກ'
}
const STATUS_COLOR_MAP = {
  PENDING: '#d4af37',
  CONFIRMED: '#2563eb',
  COMPLETED: '#16a34a',
  CANCELLED: '#dc2626'
}

function statusPercent(status) {
  const total = stats.value?.totalBookings ?? 0
  return total === 0 ? 0 : Math.round(((stats.value?.bookingsByStatus?.[status] ?? 0) / total) * 100)
}

async function fetchStats() {
  isLoading.value = true
  error.value = null

  try {
    const { $unibookingApi } = useNuxtApp()
    const { data } = await $unibookingApi.get(API_ADMIN_STATS)
    stats.value = data
  } catch {
    error.value = 'ບໍ່ສາມາດດຶງຂໍ້ມູນສະຖິຕິໄດ້'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchStats)
</script>

<style scoped>
.admin-dashboard__title {
  margin: 0 0 24px;
  color: #14294f;
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

.admin-dashboard__error {
  margin-top: 24px;
}

.status-breakdown-card {
  margin-top: 24px;
  border-radius: 12px;
}

.status-breakdown__row {
  margin-bottom: 16px;
}

.status-breakdown__row:last-child {
  margin-bottom: 0;
}

.status-breakdown__label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #334155;
  margin-bottom: 6px;
}

.status-breakdown__count {
  font-weight: 700;
  color: #14294f;
}
</style>
