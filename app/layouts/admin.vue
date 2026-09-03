<template>
  <a-layout v-if="isAuthorized" class="admin-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      breakpoint="lg"
      :trigger="null"
      class="admin-sider"
    >
      <NuxtLink to="/" class="admin-sider__logo">
        <img src="/images/unibooking-logo.png" alt="UniBooking" class="admin-sider__logo-img">
        <span v-if="!collapsed" class="admin-sider__logo-text">{{ $t('layouts.adminLabel') }}</span>
      </NuxtLink>

      <!-- ClientOnly: Ant Design Vue's Menu measures DOM nodes that don't
           exist during SSR (same AMenu/Overflow/ResizeObserver hydration
           issue documented on the desktop nav in layouts/default.vue). This
           layout only ever reaches the a-layout it's inside of once
           isAuthorized flips true post-mount (see the script below), so it
           isn't hydrated against server markup either way -- wrapped anyway
           to keep every a-menu in the app on the same safe pattern. -->
      <ClientOnly>
        <a-menu
          theme="dark"
          mode="inline"
          :selected-keys="[activeKey]"
          class="admin-sider__menu"
        >
          <a-menu-item key="dashboard">
            <NuxtLink to="/admin">
              <DashboardOutlined />
              <span>{{ $t('layouts.dashboard') }}</span>
            </NuxtLink>
          </a-menu-item>
          <a-menu-item key="bookings">
            <NuxtLink to="/admin/bookings">
              <ScheduleOutlined />
              <span>{{ $t('layouts.bookings') }}</span>
            </NuxtLink>
          </a-menu-item>
          <a-menu-item key="users">
            <NuxtLink to="/admin/users">
              <TeamOutlined />
              <span>{{ $t('layouts.users') }}</span>
            </NuxtLink>
          </a-menu-item>
        </a-menu>
      </ClientOnly>
    </a-layout-sider>

    <a-layout class="admin-shell">
      <a-layout-header class="admin-header">
        <a-button type="text" class="admin-header__collapse-btn" @click="collapsed = !collapsed">
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>

        <div class="admin-header__user">
          <a-avatar size="small">{{ userInitial }}</a-avatar>
          <span class="admin-header__name">{{ authStore.fullName }}</span>
          <a-button size="small" danger @click="handleLogout">{{ $t('nav.logout') }}</a-button>
        </div>
      </a-layout-header>

      <a-layout-content class="admin-content">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>

  <div v-else class="admin-loading">
    <a-spin size="large" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  DashboardOutlined,
  ScheduleOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

// Starts unauthorized on every render (including the very first client
// paint) so an admin-only page never flashes its content to a visitor
// whose role hasn't been confirmed yet -- flips to true only once
// initAuth() has actually settled (see stores/auth.js) and the resolved
// user is confirmed to be ADMIN.
const isAuthorized = ref(false)
const collapsed = ref(false)

const userInitial = computed(() => authStore.fullName?.charAt(0).toUpperCase() ?? '?')

const activeKey = computed(() => {
  if (route.path === '/admin') return 'dashboard'
  if (route.path.startsWith('/admin/bookings')) return 'bookings'
  if (route.path.startsWith('/admin/users')) return 'users'
  return 'dashboard'
})

async function handleLogout() {
  await authStore.logout()
}

// onMounted (not top-level await): a layout isn't guaranteed to sit inside
// a <Suspense> boundary the way a page component is, so this awaits the
// SAME promise plugins/auth.client.js already kicked off on app boot (see
// initAuth()'s caching) inside a lifecycle hook instead -- re-checking role
// against a still-empty authStore.user here is the race that would
// otherwise bounce a genuinely logged-in admin back to /login on every
// hard reload of /admin/*.
onMounted(async () => {
  await authStore.initAuth()

  if (authStore.user?.role !== 'ADMIN') {
    navigateTo('/login')
  } else {
    isAuthorized.value = true
  }
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
}

.admin-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Same navy chrome as the site's header/footer (see layouts/default.vue,
   .site-footer) -- the admin shell reads as part of the same product, not
   a bolted-on Ant Design default. */
.admin-sider {
  background: #14294f !important;
}

.admin-sider :deep(.ant-layout-sider-trigger) {
  background: #0c1c39;
}

.admin-sider__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 64px;
  padding: 0 20px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-sider__logo-img {
  height: 28px;
  width: auto;
  flex-shrink: 0;
}

.admin-sider__logo-text {
  color: #d4af37;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.admin-sider__menu {
  background: transparent;
  border-inline-end: none;
  padding-top: 8px;
}

.admin-sider__menu :deep(.ant-menu-item-selected) {
  background: #d4af37 !important;
  color: #14294f !important;
  font-weight: 600;
}

.admin-sider__menu :deep(.ant-menu-item-selected a) {
  color: #14294f !important;
}

.admin-shell {
  background: transparent;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 20px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.admin-header__collapse-btn {
  font-size: 18px;
}

.admin-header__user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-header__name {
  color: #14294f;
  font-weight: 600;
}

.admin-content {
  padding: 24px;
  min-height: calc(100vh - 64px);
}

@media (max-width: 767px) {
  .admin-header__name {
    display: none;
  }

  .admin-content {
    padding: 16px;
  }
}
</style>
