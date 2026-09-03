<template>
  <div class="admin-users">
    <h1 class="admin-users__title">{{ $t('admin.usersTitle') }}</h1>

    <a-alert
      v-if="error"
      type="error"
      :message="error"
      show-icon
      class="admin-users__error"
    />

    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :data-source="users"
        :loading="isLoading"
        :pagination="{ pageSize: 20 }"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div>{{ fullName(record) }}</div>
            <div class="admin-users__email">{{ record.email }}</div>
          </template>

          <template v-else-if="column.key === 'role'">
            <a-select
              :value="record.role"
              :disabled="isSelf(record) || pendingIds.has(record.id)"
              size="small"
              style="width: 130px"
              @change="(value) => handleRoleChange(record, value)"
            >
              <a-select-option value="CUSTOMER">CUSTOMER</a-select-option>
              <a-select-option value="SUPPLIER">SUPPLIER</a-select-option>
              <a-select-option value="ADMIN">ADMIN</a-select-option>
            </a-select>
          </template>

          <template v-else-if="column.key === 'isActive'">
            <a-switch
              :checked="record.isActive"
              :disabled="isSelf(record) || pendingIds.has(record.id)"
              :checked-children="$t('admin.statusActive')"
              :un-checked-children="$t('admin.statusSuspended')"
              @change="(checked) => handleStatusChange(record, checked)"
            />
          </template>

          <template v-else-if="column.key === 'createdAt'">
            {{ formatDate(record.createdAt) }}
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { API_USERS, apiAdminUpdateUserRole, apiAdminUpdateUserStatus } from '~/utils/api'
import { formatDate } from '~/utils/date'

definePageMeta({ layout: 'admin' })

const { t } = useI18n()
const authStore = useAuthStore()

// SafeUser[] from GET /users (ADMIN-only listing, unibooking-backend/src/users/users.controller.ts)
const users = ref([])
const isLoading = ref(true)
const error = ref(null)
// User ids with a role/status PATCH in flight -- disables their row's
// controls so a second click can't fire before the first one resolves.
const pendingIds = ref(new Set())

const columns = computed(() => [
  { title: t('common.columns.name'), key: 'name' },
  { title: t('admin.roleColumn'), key: 'role' },
  { title: t('common.columns.status'), key: 'isActive' },
  { title: t('admin.joinedColumn'), key: 'createdAt' }
])

function fullName(user) {
  return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email
}

// AdminService rejects both /admin/users/:id/role and /admin/users/:id/status
// when targetUserId === the calling admin's own id -- disabling these
// controls for the admin's own row avoids sending a request guaranteed to 400.
function isSelf(user) {
  return user.id === authStore.user?.id
}

async function fetchUsers() {
  isLoading.value = true
  error.value = null

  try {
    const { $unibookingApi } = useNuxtApp()
    const { data } = await $unibookingApi.get(API_USERS)
    users.value = data
  } catch {
    error.value = t('admin.fetchUsersError')
  } finally {
    isLoading.value = false
  }
}

async function handleRoleChange(record, newRole) {
  const previousRole = record.role
  record.role = newRole // optimistic
  pendingIds.value.add(record.id)

  try {
    const { $unibookingApi } = useNuxtApp()
    await $unibookingApi.patch(apiAdminUpdateUserRole(record.id), { role: newRole })
  } catch {
    record.role = previousRole // revert -- axios interceptor already alerted the error
  } finally {
    pendingIds.value.delete(record.id)
  }
}

async function handleStatusChange(record, checked) {
  const previousStatus = record.isActive
  record.isActive = checked // optimistic
  pendingIds.value.add(record.id)

  try {
    const { $unibookingApi } = useNuxtApp()
    await $unibookingApi.patch(apiAdminUpdateUserStatus(record.id), { isActive: checked })
  } catch {
    record.isActive = previousStatus // revert -- axios interceptor already alerted the error
  } finally {
    pendingIds.value.delete(record.id)
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.admin-users__title {
  margin: 0 0 24px;
  color: #14294f;
}

.admin-users__error {
  margin-bottom: 16px;
}

.admin-users__email {
  font-size: 12px;
  color: #64748b;
}
</style>
