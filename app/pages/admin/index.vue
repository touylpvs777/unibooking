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
            title="ລາຍຮັບລວມ (ຈາກການຈອງທີ່ຢືນຢັນແລ້ວ)"
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
    </a-row>

    <a-alert
      v-if="error"
      type="error"
      :message="error"
      show-icon
      class="admin-dashboard__error"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { TeamOutlined, ScheduleOutlined, DollarCircleOutlined } from '@ant-design/icons-vue'
import { API_ADMIN_STATS } from '~/utils/api'

definePageMeta({ layout: 'admin' })

// AdminStats from GET /admin/stats: { totalUsers, totalBookings, totalRevenue }
const stats = ref(null)
const isLoading = ref(true)
const error = ref(null)

const formattedRevenue = computed(() => new Intl.NumberFormat('lo-LA').format(stats.value?.totalRevenue ?? 0))

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
</style>
