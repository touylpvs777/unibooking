<template>
  <a-layout v-if="isAuthorized" class="supplier-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      breakpoint="lg"
      :trigger="null"
      class="supplier-sider"
    >
      <NuxtLink to="/" class="supplier-sider__logo">
        <img src="/images/unibooking-logo.png" alt="UniBooking" class="supplier-sider__logo-img">
        <span v-if="!collapsed" class="supplier-sider__logo-text">Supplier</span>
      </NuxtLink>

      <!-- ClientOnly: see layouts/admin.vue for why -- AMenu measures DOM
           nodes that don't exist during SSR, and this layout only ever
           renders once isAuthorized flips true post-mount anyway. -->
      <ClientOnly>
        <a-menu
          theme="dark"
          mode="inline"
          :selected-keys="[activeKey]"
          class="supplier-sider__menu"
        >
          <a-menu-item key="dashboard">
            <NuxtLink to="/supplier">
              <DashboardOutlined />
              <span>Dashboard</span>
            </NuxtLink>
          </a-menu-item>
          <a-menu-item key="inventory">
            <NuxtLink to="/supplier/inventory">
              <AppstoreOutlined />
              <span>Manage Inventory</span>
            </NuxtLink>
          </a-menu-item>
          <a-menu-item key="bookings">
            <NuxtLink to="/supplier/bookings">
              <ScheduleOutlined />
              <span>Recent Bookings</span>
            </NuxtLink>
          </a-menu-item>
        </a-menu>
      </ClientOnly>
    </a-layout-sider>

    <a-layout class="supplier-shell">
      <a-layout-header class="supplier-header">
        <a-button type="text" class="supplier-header__collapse-btn" @click="collapsed = !collapsed">
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>

        <div class="supplier-header__user">
          <a-avatar size="small">{{ userInitial }}</a-avatar>
          <span class="supplier-header__name">{{ authStore.fullName }}</span>
          <a-button size="small" danger @click="handleLogout">ອອກຈາກລະບົບ</a-button>
        </div>
      </a-layout-header>

      <a-layout-content class="supplier-content">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>

  <div v-else class="supplier-loading">
    <a-spin size="large" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  DashboardOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

// Starts unauthorized on every render, same as layouts/admin.vue's
// isAuthorized -- the supplier middleware (app/middleware/supplier.js)
// already redirects unauthorized visitors away, but that check is
// client-only (see its own comment), so this withholds the actual
// sidebar/dashboard markup until that same check has resolved here too,
// closing the gap instead of trusting the middleware's timing alone.
const isAuthorized = ref(false)
const collapsed = ref(false)

const userInitial = computed(() => authStore.fullName?.charAt(0).toUpperCase() ?? '?')

const activeKey = computed(() => {
  if (route.path.startsWith('/supplier/inventory')) return 'inventory'
  if (route.path.startsWith('/supplier/bookings')) return 'bookings'
  return 'dashboard'
})

async function handleLogout() {
  await authStore.logout()
}

onMounted(async () => {
  await authStore.initAuth()

  const allowedRoles = ['SUPPLIER', 'ADMIN']
  if (!authStore.user || !allowedRoles.includes(authStore.user.role)) {
    navigateTo('/login')
  } else {
    isAuthorized.value = true
  }
})
</script>

<style scoped>
.supplier-layout {
  min-height: 100vh;
}

.supplier-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Same navy/gold chrome as the admin portal (layouts/admin.vue) and the
   site header/footer -- reads as one product, not a bolted-on theme. */
.supplier-sider {
  background: #14294f !important;
}

.supplier-sider :deep(.ant-layout-sider-trigger) {
  background: #0c1c39;
}

.supplier-sider__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 64px;
  padding: 0 20px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.supplier-sider__logo-img {
  height: 28px;
  width: auto;
  flex-shrink: 0;
}

.supplier-sider__logo-text {
  color: #d4af37;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.supplier-sider__menu {
  background: transparent;
  border-inline-end: none;
  padding-top: 8px;
}

.supplier-sider__menu :deep(.ant-menu-item-selected) {
  background: #d4af37 !important;
  color: #14294f !important;
  font-weight: 600;
}

.supplier-sider__menu :deep(.ant-menu-item-selected a) {
  color: #14294f !important;
}

.supplier-shell {
  background: transparent;
}

.supplier-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.supplier-header__collapse-btn {
  font-size: 18px;
}

.supplier-header__user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.supplier-header__name {
  color: #14294f;
  font-weight: 600;
}

.supplier-content {
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: #f0f9ff;
}

@media (max-width: 767px) {
  .supplier-header__name {
    display: none;
  }

  .supplier-content {
    padding: 16px;
  }
}
</style>
