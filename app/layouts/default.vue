<template>
  <a-layout class="site-layout" :class="{ 'site-layout--dark': route.meta.hideSiteHeader }">
    <!-- Header: single green navbar, logo | centered nav | lang + user actions.
         Pages that render their own integrated hero navbar (e.g. the homepage
         floating hero card) set route.meta.hideSiteHeader — this bar then stays
         hidden on desktop (where the hero navbar takes over) but keeps showing
         on mobile, since it's still the only way to reach the hamburger drawer there. -->
    <a-layout-header class="site-header" :class="{ 'site-header--hero-mode': route.meta.hideSiteHeader }">
      <div class="container site-header__inner">
        <NuxtLink to="/" class="logo">
          <img src="/images/unibooking-logo.png" alt="UniBooking" class="logo__img">
        </NuxtLink>

        <!-- Desktop nav: centered, hidden below 768px via CSS.
             ClientOnly avoids the AMenu/Overflow/ResizeObserver SSR hydration crash
             (Ant Design Vue's Menu measures DOM nodes that don't exist during SSR). -->
        <ClientOnly>
          <a-menu
            mode="horizontal"
            :selectable="false"
            class="nav-menu nav-menu--desktop"
          >
            <a-menu-item key="home">
              <NuxtLink to="/">Home</NuxtLink>
            </a-menu-item>
            <a-menu-item key="explore">
              <NuxtLink to="/explore">Explore</NuxtLink>
            </a-menu-item>
            <a-menu-item key="hotels">
              <NuxtLink to="/hotels">Hotels</NuxtLink>
            </a-menu-item>
            <a-menu-item key="transport">
              <NuxtLink to="/transport">Transport</NuxtLink>
            </a-menu-item>
          </a-menu>

          <!-- Static fallback rendered during SSR / before hydration so layout doesn't jump -->
          <template #fallback>
            <div class="nav-menu nav-menu--desktop nav-menu--fallback" />
          </template>
        </ClientOnly>

        <!-- Right-hand actions: lang switcher + user dropdown/login (desktop only) grouped
             together and pushed flush right, plus the hamburger (mobile only) -->
        <div class="site-header__actions">
          <ClientOnly>
            <a-dropdown placement="bottomRight" class="user-menu-wrapper--desktop">
              <a class="lang-switcher" @click.prevent>
                <GlobalOutlined />
                <span class="lang-switcher__label">{{ langStore.current }}</span>
              </a>
              <template #overlay>
                <a-menu @click="({ key }) => handleLangChange(key)">
                  <a-menu-item key="EN">EN</a-menu-item>
                  <a-menu-item key="Lao">Lao</a-menu-item>
                  <a-menu-item key="Thai">Thai</a-menu-item>
                  <a-menu-item key="Cha">Cha</a-menu-item>
                  <a-menu-item key="Vt">Vt</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>

            <a-dropdown v-if="authStore.isAuthenticated" placement="bottomRight" class="user-menu-wrapper--desktop">
              <a class="user-menu" @click.prevent>
                <a-avatar>{{ userInitial }}</a-avatar>
                <span class="user-menu__name">{{ authStore.fullName }}</span>
              </a>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item v-if="canAccessSupplierPortal" key="supplier-portal">
                    <NuxtLink to="/supplier">Supplier Portal</NuxtLink>
                  </a-menu-item>
                  <a-menu-item key="logout">ອອກຈາກລະບົບ</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <template v-else>
              <NuxtLink to="/login" class="login-link user-menu-wrapper--desktop">
                Login
              </NuxtLink>
              <NuxtLink to="/register" class="register-btn user-menu-wrapper--desktop">
                Register
              </NuxtLink>
            </template>
          </ClientOnly>

          <!-- Mobile hamburger: hidden from 768px up via CSS -->
          <a-button
            type="text"
            class="hamburger-btn"
            @click="isDrawerOpen = true"
          >
            <MenuOutlined style="font-size: 20px" />
          </a-button>
        </div>
      </div>
    </a-layout-header>

    <!-- Mobile navigation drawer -->
    <a-drawer
      v-model:open="isDrawerOpen"
      title="UniBooking"
      placement="right"
      width="260"
    >
      <ClientOnly>
        <!-- Lang switcher lives in the desktop navbar's right-hand group (see header
             above); repeated here since it's hidden on mobile along with the rest of
             that group, and the drawer is the only nav surface left below 768px. -->
        <a-dropdown placement="bottomLeft" class="lang-switcher-drawer">
          <a class="lang-switcher" @click.prevent>
            <GlobalOutlined />
            <span class="lang-switcher__label">{{ langStore.current }}</span>
          </a>
          <template #overlay>
            <a-menu @click="({ key }) => handleLangChange(key)">
              <a-menu-item key="EN">EN</a-menu-item>
              <a-menu-item key="Lao">Lao</a-menu-item>
              <a-menu-item key="Thai">Thai</a-menu-item>
              <a-menu-item key="Cha">Cha</a-menu-item>
              <a-menu-item key="Vt">Vt</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <a-menu mode="vertical" :selectable="false" @click="handleDrawerMenuClick">
          <a-menu-item key="home">
            <NuxtLink to="/">Home</NuxtLink>
          </a-menu-item>
          <a-menu-item key="explore">
            <NuxtLink to="/explore">Explore</NuxtLink>
          </a-menu-item>
          <a-menu-item key="hotels">
            <NuxtLink to="/hotels">Hotels</NuxtLink>
          </a-menu-item>
          <a-menu-item key="transport">
            <NuxtLink to="/transport">Transport</NuxtLink>
          </a-menu-item>

          <template v-if="authStore.isAuthenticated">
            <a-menu-item key="profile">
              <NuxtLink to="/profile">{{ authStore.fullName }}</NuxtLink>
            </a-menu-item>
            <a-menu-item v-if="canAccessSupplierPortal" key="supplier-portal">
              <NuxtLink to="/supplier">Supplier Portal</NuxtLink>
            </a-menu-item>
            <a-menu-item key="logout">
              ອອກຈາກລະບົບ
            </a-menu-item>
          </template>
          <template v-else>
            <a-menu-item key="login">
              <NuxtLink to="/login">Login</NuxtLink>
            </a-menu-item>
            <a-menu-item key="register">
              <NuxtLink to="/register">Register</NuxtLink>
            </a-menu-item>
          </template>
        </a-menu>
      </ClientOnly>
    </a-drawer>

    <!-- Content: pages render here. Full-bleed: no horizontal boxing at this level,
         each page/section owns its own background width and .container centering. -->
    <a-layout-content class="site-content" :class="{ 'site-content--dark': route.meta.hideSiteHeader }">
      <slot />
    </a-layout-content>

    <!-- Footer -->
    <a-layout-footer class="site-footer">
      <div class="footer__container footer__top">
        <div class="footer__col footer__col--about">
          <NuxtLink to="/" class="footer__logo">
            <img src="/images/unibooking-logo.png" alt="UniBooking Logo" class="footer__logo-img">
          </NuxtLink>
          <p class="footer__about-text">
            ແພລັດຟອມການຈອງທີ່ພັກ ແລະ ການເດີນທາງແບບຄົບວົງຈອນ ສຳລັບການທ່ອງທ່ຽວທົ່ວປະເທດລາວ
            ດ້ວຍມາດຕະຖານລະດັບພຣີເມ້ຍມ.
          </p>
          <div class="footer__social">
            <a href="#" class="footer__social-icon" aria-label="Facebook"><FacebookFilled /></a>
            <a href="#" class="footer__social-icon" aria-label="Youtube"><YoutubeFilled /></a>

            <!-- Magic Social Share: click the gold FAB to fan the 5 platform
                 icons out into an arc above it (see shareLinks in the script). -->
            <div ref="magicShareRef" class="magic-share" :class="{ 'is-open': isShareOpen }">
              <button
                type="button"
                class="magic-share__toggle"
                :aria-expanded="isShareOpen"
                aria-label="Share UniBooking"
                @click="isShareOpen = !isShareOpen"
              >
                <component :is="isShareOpen ? CloseOutlined : ShareAltOutlined" />
              </button>

              <a
                v-for="item in shareLinks"
                :key="item.label"
                :href="item.href"
                :aria-label="item.label"
                class="magic-share__item"
                :style="{ '--dx': `${item.dx}px`, '--dy': `${item.dy}px` }"
                target="_blank"
                rel="noopener noreferrer"
                :tabindex="isShareOpen ? 0 : -1"
              >
                <component :is="item.icon" />
              </a>
            </div>
          </div>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading">Reservation</h4>
          <ul class="footer__links">
            <li><NuxtLink to="/hotels">ຈອງໂຮງແຮມ</NuxtLink></li>
            <li><NuxtLink to="/transport">ຈອງປີ້ຍົນ</NuxtLink></li>
            <li><NuxtLink to="/transport">ລົດເຊົ່າ ແລະ ລົດຮັບສົ່ງ</NuxtLink></li>
            <li><NuxtLink to="/">ແພັກເກດທົວ</NuxtLink></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading">Partnerships</h4>
          <ul class="footer__links">
            <li><a href="#">ກາຍເປັນຄູ່ຮ່ວມທຸລະກິດ</a></li>
            <li><a href="#">ຮ່ວມມືທຸລະກິດ</a></li>
            <li><a href="#">ໂຄງການແນະນຳລູກຄ້າ</a></li>
            <li><a href="#">API ສຳລັບນັກພັດທະນາ</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading">Manage Booking</h4>
          <ul class="footer__links">
            <li><a href="#">ກວດສອບການຈອງ</a></li>
            <li><a href="#">ຍົກເລີກ / ປ່ຽນແປງ</a></li>
            <li><a href="#">ຄຳຖາມທີ່ພົບເລື້ອຍ</a></li>
            <li><a href="#">ຕິດຕໍ່ພວກເຮົາ</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4 class="footer__heading">Supported By</h4>
          <ul class="footer__links footer__links--badges">
            <li>Travel Partner Network</li>
            <li>Regional Tourism Alliance</li>
            <li>Certified Booking Platform</li>
            <li>Local Tour Operators Guild</li>
          </ul>
        </div>
      </div>

      <div class="footer__container footer__bottom">
        <PaymentMethods />
        <p class="footer__copyright">
          &copy; {{ new Date().getFullYear() }} UniBooking Travel. All rights reserved.
        </p>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  MenuOutlined,
  GlobalOutlined,
  FacebookFilled,
  YoutubeFilled,
  ShareAltOutlined,
  CloseOutlined,
  SendOutlined,
  WhatsAppOutlined,
  InstagramFilled,
  SoundFilled,
  MessageFilled
} from '@ant-design/icons-vue'
import { useAuthStore } from '~/stores/auth'
import { useLangStore } from '~/stores/lang'

const route = useRoute()

// Session restore happens in app/plugins/auth.client.js, before mount
const authStore = useAuthStore()
const langStore = useLangStore()

const userInitial = computed(() => authStore.fullName?.charAt(0).toUpperCase() ?? '?')

// Matches app/middleware/supplier.js's own allowed-roles check -- kept in
// sync manually since this is the only other place role-gates the same
// /supplier area (as a nav link rather than a route guard).
const canAccessSupplierPortal = computed(() => ['SUPPLIER', 'ADMIN'].includes(authStore.user?.role))

const isDrawerOpen = ref(false)

// Magic Social Share menu: a gold FAB in the footer's social row that fans 5
// platform icons out into an upward arc on click (see .magic-share__item's
// --dx/--dy in the CSS, computed here so the geometry lives in one place).
// Telegram/TikTok/Line have no dedicated antd icon, so SendOutlined,
// SoundFilled, and MessageFilled stand in for them.
const isShareOpen = ref(false)
const magicShareRef = ref(null)

const SHARE_ARC_RADIUS = 90 // px
const SHARE_ARC_ANGLES = [-80, -40, 0, 40, 80] // degrees from straight up

function arcOffset(angleDeg) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    dx: SHARE_ARC_RADIUS * Math.sin(rad),
    dy: -SHARE_ARC_RADIUS * Math.cos(rad)
  }
}

const shareLinks = [
  { label: 'Telegram', icon: SendOutlined, href: '#' },
  { label: 'WhatsApp', icon: WhatsAppOutlined, href: '#' },
  { label: 'Instagram', icon: InstagramFilled, href: '#' },
  { label: 'TikTok', icon: SoundFilled, href: '#' },
  { label: 'Line', icon: MessageFilled, href: '#' }
].map((item, index) => ({ ...item, ...arcOffset(SHARE_ARC_ANGLES[index]) }))

function handleShareOutsideClick(event) {
  if (isShareOpen.value && magicShareRef.value && !magicShareRef.value.contains(event.target)) {
    isShareOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleShareOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleShareOutsideClick)
})

function handleLangChange(lang) {
  langStore.setLang(lang)
}

function handleMenuClick({ key }) {
  if (key === 'logout') {
    authStore.logout()
  }
}

// Mobile drawer menu: close the drawer on any tap, and log out if that's what was tapped
function handleDrawerMenuClick({ key }) {
  isDrawerOpen.value = false
  if (key === 'logout') {
    authStore.logout()
  }
}
</script>

<style scoped>
.site-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Landing page only (route.meta.hideSiteHeader): the layout's own Ant Design
   backdrop and content canvas would otherwise show light grey/blue through
   any seam between the page's full-bleed black sections. */
.site-layout--dark {
  background: transparent;
}

/* Shared centered container: full-width bars/sections sit behind this, content stays 1200px-capped */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
}

.lang-switcher {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  cursor: pointer;
}

.lang-switcher:hover {
  color: #ffffff;
}

/* Drawer's copy of the lang switcher (mobile only): sits above the vertical nav
   menu with its own breathing room since a-drawer has no header actions slot */
.lang-switcher-drawer {
  display: block;
  margin: 0 0 16px;
}

.lang-switcher-drawer .lang-switcher {
  color: rgba(0, 0, 0, 0.65);
}

.lang-switcher-drawer .lang-switcher:hover {
  color: rgba(0, 0, 0, 0.88);
}

/* Header: premium dark green, single full-width flexbox bar — logo far left,
   nav centered, lang + login/user grouped far right (see .site-header__actions) */
.site-header {
  width: 100%;
  /* Same dark navy as .site-footer below -- the site's actual "dark blue"
     brand color. Was `transparent`, which worked by accident on the
     homepage (hero-mode hides this bar entirely on desktop; see below) but
     left it invisible-on-white for every other page: white logo/nav text
     over nothing but the page's own light background. */
  background: #14294f;
  height: 64px;
  line-height: 64px;
  border-bottom: 1px solid rgba(197, 160, 89, 0.15);
}

/* Pages with their own integrated hero navbar (see site-header--hero-mode
   binding above) hide this bar on desktop, where the hero navbar takes over;
   it stays visible on mobile since it's still the only hamburger-drawer entry
   point. There, it stays transparent (overriding .site-header's new solid
   background above) so the hero photo shows through behind it, same as today. */
.site-header--hero-mode {
  background: transparent;
}

@media (min-width: 768px) {
  .site-header--hero-mode {
    display: none;
  }
}

.site-header__inner {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo__img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

/* Nav sits in the remaining space and centers itself within it */
.nav-menu {
  flex: 1;
  display: flex;
  justify-content: center;
  border-bottom: none;
  background: transparent;
}

.nav-menu :deep(.ant-menu-item) {
  color: rgba(255, 255, 255, 0.85);
}

.nav-menu :deep(a) {
  color: inherit;
  text-decoration: none;
}

.nav-menu :deep(.ant-menu-item:hover) {
  color: #ffffff;
}

.nav-menu :deep(.ant-menu-item-selected) {
  color: #ffffff;
  font-weight: 600;
}

.nav-menu :deep(.ant-menu-item-selected)::after {
  border-bottom-color: #ffffff !important;
}

/* Reserves the nav's height during SSR/pre-hydration so nothing jumps when ClientOnly swaps in */
.nav-menu--fallback {
  flex: 1;
  height: 64px;
}

.site-header__actions {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.login-link {
  color: #ffffff;
  font-weight: 500;
  text-decoration: none;
}

.register-btn {
  color: #ffffff;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 16px;
  border: 1px solid #c5a059;
  border-radius: 999px;
  line-height: 1.2;
  transition: background 0.3s ease, color 0.3s ease;
}

.register-btn:hover {
  background: #c5a059;
  color: #0a0a0a;
}

.user-menu {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #ffffff;
}

.user-menu__name {
  font-weight: 500;
}

/* Mobile hamburger: hidden on desktop, shown below 768px */
.hamburger-btn {
  display: none;
  color: #ffffff;
}

@media (max-width: 767px) {
  .nav-menu--desktop,
  .user-menu-wrapper--desktop {
    display: none;
  }

  .hamburger-btn {
    display: inline-flex;
    align-items: center;
  }

  .container {
    padding: 0 16px;
  }
}

/* Content: no horizontal padding here by design (full-bleed pages own their own
   background width); pages that need a boxed look supply their own max-width wrapper.
   flex: 1 makes it absorb all remaining height so the footer below always sits at the
   bottom of the viewport on short pages, regardless of the footer's own (now variable) height. */
.site-content {
  flex: 1 0 auto;
  background: #f0f9ff;
}

.site-content--dark {
  background: transparent;
}

/* ============================================================
   Footer: 5-column luxury layout on the dark green/gold theme
   ============================================================ */
.site-footer {
  position: relative;
  flex-shrink: 0;
  background: radial-gradient(circle at 50% -20%, #254aab 0%, #172b5c 60%, #0d1b3e 100%);
  box-shadow: inset 0 20px 40px -20px rgba(0, 0, 0, 0.8);
  border-top: 1px solid rgba(197, 160, 89, 0.15);
  color: rgba(251, 249, 242, 0.7);
  padding: 64px 0 0;
  height: auto;
  line-height: 1.6;
  overflow: hidden;
}

/* Ambient background glow: a slow-breathing gold radial light behind the
   footer content, purely atmospheric (no interaction, no layout impact). */
.site-footer::before {
  content: '';
  position: absolute;
  top: -15%;
  left: 50%;
  width: 65%;
  max-width: 820px;
  aspect-ratio: 1;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.04) 45%, transparent 72%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
  animation: footer-ambient-glow 8s ease-in-out infinite;
}

@keyframes footer-ambient-glow {
  0%,
  100% {
    opacity: 0.55;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.08);
  }
}

/* Rhythmic shimmer: a diagonal white light sweep for a premium/luxury
   feel. ::before is already the ambient gold glow above, so this uses
   ::after instead -- same layering (z-index: 0, behind .footer__container
   at z-index: 1), same non-interactive behavior. */
.site-footer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0) 100%);
  transform: skewX(-25deg);
  pointer-events: none;
  z-index: 0;
  animation: luxuryShimmer 7s infinite ease-in-out;
}

@keyframes luxuryShimmer {
  0% {
    left: -150%;
  }
  30% {
    left: 200%;
  }
  100% {
    left: 200%;
  }
}

.footer__container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.footer__top {
  display: grid;
  grid-template-columns: 1.6fr repeat(4, 1fr);
  gap: 32px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(251, 249, 242, 0.12);
  text-align: left;
}

.footer__logo {
  display: inline-block;
  text-decoration: none;
  margin-bottom: 16px;
}

.footer__logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.footer__about-text {
  font-size: 13px;
  line-height: 1.8;
  color: rgba(251, 249, 242, 0.65);
  max-width: 280px;
  margin-bottom: 20px;
}

.footer__social {
  display: flex;
  gap: 10px;
}

.footer__social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(251, 249, 242, 0.25);
  color: #fbf9f2;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.footer__social-icon:hover {
  background: #c5a059;
  border-color: #c5a059;
  color: #0a0a0a;
}

/* Magic Social Share: a gold FAB that fans 5 platform icons out into an arc
   above it (see --dx/--dy set per-item in the template, computed in the
   script). Sits inline with the Facebook/Youtube icons in .footer__social. */
.magic-share {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.magic-share__toggle {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.6);
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.22), rgba(212, 175, 55, 0.06));
  color: #d4af37;
  font-size: 15px;
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
  animation: magic-share-heartbeat 2.6s ease-in-out infinite;
}

.magic-share__toggle:hover {
  background: #d4af37;
  color: #0b192c;
}

.magic-share.is-open .magic-share__toggle {
  animation: none;
  background: #d4af37;
  color: #0b192c;
  transform: rotate(90deg);
}

/* Heartbeat "lub-dub" pulse on the closed FAB, so it keeps drawing the eye
   without ever looking busy: two quick beats of scale + gold glow, then a
   longer rest before the cycle repeats. */
@keyframes magic-share-heartbeat {
  0%,
  38%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0), 0 0 6px rgba(212, 175, 55, 0.15);
  }
  12% {
    transform: scale(1.1);
    box-shadow: 0 0 0 6px rgba(212, 175, 55, 0.16), 0 0 16px rgba(212, 175, 55, 0.5);
  }
  24% {
    transform: scale(1.04);
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1), 0 0 10px rgba(212, 175, 55, 0.35);
  }
  32% {
    transform: scale(1.1);
    box-shadow: 0 0 0 8px rgba(212, 175, 55, 0), 0 0 18px rgba(212, 175, 55, 0.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  .magic-share__toggle {
    animation: none;
  }

  .site-footer::before {
    animation: none;
  }
}

/* Each item starts collapsed and hidden at the toggle's own center, then
   pops out to its own --dx/--dy offset with a staggered delay when
   .magic-share gains .is-open — see the nth-child delays below. */
.magic-share__item {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(251, 249, 242, 0.25);
  background: #0b192c;
  color: #fbf9f2;
  font-size: 15px;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease, background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.magic-share__item:hover {
  background: #d4af37;
  border-color: #d4af37;
  color: #0b192c;
}

.magic-share.is-open .magic-share__item {
  animation: magic-share-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 1;
  pointer-events: auto;
}

/* Overshoots past its resting arc position before settling, for a springy,
   responsive-feeling pop rather than a flat ease-out. Closing reverses via
   the plain transition on .magic-share__item itself (below). */
@keyframes magic-share-pop {
  0% {
    transform: translate(-50%, -50%) scale(0) rotate(-20deg);
    opacity: 0;
  }
  60% {
    transform: translate(calc(-50% + var(--dx) * 1.1), calc(-50% + var(--dy) * 1.1)) scale(1.15) rotate(8deg);
    opacity: 1;
  }
  100% {
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1) rotate(0deg);
    opacity: 1;
  }
}

.magic-share.is-open .magic-share__item:nth-child(2) {
  animation-delay: 0s;
}

.magic-share.is-open .magic-share__item:nth-child(3) {
  animation-delay: 0.05s;
}

.magic-share.is-open .magic-share__item:nth-child(4) {
  animation-delay: 0.1s;
}

.magic-share.is-open .magic-share__item:nth-child(5) {
  animation-delay: 0.15s;
}

.magic-share.is-open .magic-share__item:nth-child(6) {
  animation-delay: 0.2s;
}

.footer__heading {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #c5a059;
  margin-bottom: 20px;
}

.footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__links a {
  font-size: 13px;
  color: rgba(251, 249, 242, 0.65);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer__links a:hover {
  color: #c5a059;
}

.footer__links--badges li {
  font-size: 12px;
  color: rgba(251, 249, 242, 0.5);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 0;
}

/* Payment method icons now live in the standalone PaymentMethods component. */

.footer__copyright {
  font-size: 12px;
  color: rgba(251, 249, 242, 0.5);
  margin: 0;
}

@media (max-width: 900px) {
  .footer__top {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer__col--about {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer__top {
    grid-template-columns: 1fr;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
