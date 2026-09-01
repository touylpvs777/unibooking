<template>
  <div>
    <section class="hero-section">
      <div class="hero-card" @mouseenter="stopHeroAutoplay" @mouseleave="startHeroAutoplay">
        <HeroSlider :slides="heroSlides" :active-index="heroSlide" class="hero-card__slider" />
        <div class="hero-card__scrim" aria-hidden="true" />

        <header class="glass-navbar-wrap">
          <NuxtLink to="/" class="glass-navbar-wrap__logo">
            <img src="/images/unibooking-logo.png" alt="UniBooking" class="glass-navbar-wrap__logo-img">
          </NuxtLink>

          <!-- Single pill-shaped nav: the neumorphic outer shadow lives on
               .glass-navbar only, items stay transparent, and .glass-navbar__indicator
               slides beneath whichever item is active (see moveGlassIndicatorTo). -->
          <ClientOnly>
            <nav class="glass-navbar">
              <ul class="glass-navbar__list">
                <li
                  v-for="(item, index) in heroNavItems"
                  :key="item.key"
                  :ref="(el) => setGlassNavItemRef(el, index)"
                  class="glass-navbar__item"
                  :class="{ 'is-active': activeGlassNavIndex === index }"
                >
                  <a-dropdown v-if="item.key === 'lang'" placement="bottomRight">
                    <a class="glass-navbar__link" @click.prevent="setActiveGlassNav(index)">{{ item.label }}</a>
                    <template #overlay>
                      <a-menu @click="({ key }) => (heroLang = key)">
                        <a-menu-item key="EN">EN</a-menu-item>
                        <a-menu-item key="Lao">Lao</a-menu-item>
                        <a-menu-item key="Thai">Thai</a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                  <NuxtLink v-else-if="item.to" :to="item.to" class="glass-navbar__link" @click="setActiveGlassNav(index)">
                    {{ item.label }}
                  </NuxtLink>
                  <a v-else :href="item.href" class="glass-navbar__link" @click="setActiveGlassNav(index)">
                    {{ item.label }}
                  </a>
                </li>
                <div class="glass-navbar__indicator" :style="glassIndicatorStyle" aria-hidden="true" />
              </ul>
            </nav>

            <template #fallback>
              <div class="glass-navbar glass-navbar--fallback" />
            </template>
          </ClientOnly>
        </header>

        <div class="hero-copy">
          <span class="hero-copy__tag">LANDMARK</span>
          <h1 class="hero-copy__title">{{ heroSlides[heroSlide].title }}</h1>
          <p class="hero-copy__subtitle">{{ heroSlides[heroSlide].subtitle }} · Discover Laos through places worth remembering.</p>
          <a href="#services" class="hero-copy__button">ເລີ່ມຕົ້ນ</a>
        </div>

        <div class="hero-nav-controls">
          <button type="button" aria-label="Previous destination" class="hero-nav-btn" @click="showPreviousHeroSlide">&lt;</button>
          <button type="button" aria-label="Next destination" class="hero-nav-btn" @click="showNextHeroSlide">&gt;</button>
        </div>
      </div>
    </section>

    <div class="search-form-wrapper">
      <BookingSearchForm />
    </div>

    <!-- Modular Travel Solutions: luxury connected node network -->
    <section class="modular-section">
      <div class="container modular-section__inner">
        <!-- Left: copy -->
        <div class="modular-text">
          <span class="modular-badge">MODULAR TRAVEL SOLUTIONS</span>
          <h2 class="modular-title">ການເດີນທາງທີ່ເຊື່ອມຕໍ່ກັນຢ່າງສົມບູນ</h2>
          <p class="modular-desc">
            ປະຢັດເວລາ ແລະ ເພີ່ມຄວາມສະດວກສະບາຍດ້ວຍແພລດຟອມຂອງພວກເຮົາ.
            ເຊື່ອມຕໍ່ການເດີນທາງຂອງທ່ານຕັ້ງແຕ່ສະໜາມບິນ, ລົດໄຟດ່ວນ, ລົດຮັບສົ່ງ, ໂຮງແຮມ
            ຈົນຮອດສະຖານທີ່ທ່ອງທ່ຽວ ໄວ້ໃນບ່ອນດຽວ.
          </p>
        </div>

        <!-- Right: a radial hub-and-spoke ecosystem menu (adapted from
             CodeFronts' "Mission Hub" circular menu, MIT licensed) — six
             clickable modules in orbit (see ecosystemModules in the
             script) around a live center that shows the selected module's
             headline stat. Each module's angle is computed purely in CSS
             from its index (--i) and count (--n); clicking one drives
             selectedModuleId, and the center content swaps with a short
             fade/scale transition. -->
        <div class="ecosystem-container">
          <div class="ecosystem-glow" />

          <fieldset class="ecosystem-fieldset" :style="{ '--n': ecosystemModules.length }">
            <legend class="ecosystem-sr">ເລືອກໝວດໝູ່ລະບົບນິເວດການທ່ອງທ່ຽວ</legend>

            <div class="ecosystem-space">
              <span
                v-for="(module, index) in ecosystemModules"
                :key="`spoke-${module.id}`"
                class="ecosystem-spoke"
                :class="{ 'is-active': module.id === selectedModuleId }"
                :style="{ '--i': index }"
                aria-hidden="true"
              />

              <div
                v-for="(module, index) in ecosystemModules"
                :key="module.id"
                class="ecosystem-module"
                :style="{ '--i': index }"
              >
                <input
                  :id="`ecosystem-${module.id}`"
                  v-model="selectedModuleId"
                  type="radio"
                  name="ecosystem-module"
                  :value="module.id"
                >
                <label :for="`ecosystem-${module.id}`">
                  <component :is="module.icon" class="ecosystem-icon" />
                  <span class="ecosystem-label">{{ module.label }}</span>
                </label>
              </div>

              <div class="ecosystem-core">
                <Transition name="ecosystem-core-fade" mode="out-in">
                  <div :key="activeModule.id" class="ecosystem-core__content">
                    <em class="ecosystem-core__label">{{ activeModule.label }}</em>
                    <strong class="ecosystem-core__stat">{{ activeModule.stat }}</strong>
                    <span class="ecosystem-core__delta">{{ activeModule.delta }}</span>
                  </div>
                </Transition>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </section>

    <!-- Services grid: premium fintech-style app grid -->
    <section class="services-grid-section">
      <div class="services-grid-section__shape services-grid-section__shape--one" />
      <div class="services-grid-section__shape services-grid-section__shape--two" />

      <div class="container services-grid-section__inner">
        <div class="services-grid-header">
          <span class="services-grid-header__badge">ບໍລິການຂອງພວກເຮົາ</span>
          <h2 class="services-grid-header__title">ເລືອກບໍລິການ</h2>
          <p class="services-grid-header__subtitle">
            ຄົ້ນພົບບໍລິການດິຈິຕອລທີ່ຫຼາກຫຼາຍຂອງພວກເຮົາທີ່ອອກແບບມາເພື່ອຕອບສະໜອງຄວາມຕ້ອງການເດີນທາງຂອງທ່ານ
          </p>
        </div>

        <a-row v-if="isServicesLoading" :gutter="[24, 24]" role="status" aria-busy="true">
          <span class="services-sr">ກຳລັງໂຫຼດບໍລິການ...</span>
          <a-col v-for="(tint, i) in serviceSkeletonTints" :key="i" :xs="24" :sm="12" :lg="8">
            <div class="grid-card grid-card--skeleton" aria-hidden="true">
              <div class="services-sk services-sk--icon" :style="{ '--sk-tint': tint }" />
              <div class="services-sk services-sk--title" :style="{ '--sk-tint': tint }" />
              <div class="services-sk services-sk--desc" :style="{ '--sk-tint': tint }" />
              <div class="services-sk services-sk--desc services-sk--desc-short" :style="{ '--sk-tint': tint }" />
            </div>
          </a-col>
        </a-row>

        <a-row v-else :gutter="[24, 24]">
          <a-col v-for="item in serviceGridItems" :key="item.title" :xs="24" :sm="12" :lg="8">
            <div class="grid-card">
              <div class="grid-card__icon">
                <component :is="item.icon" class="grid-card__icon-glyph" />
              </div>
              <h3 class="grid-card__title">{{ item.title }}</h3>
              <p class="grid-card__desc">{{ item.description }}</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </section>

    <!-- Value proposition: minimalist gold-icon feature strip -->
    <section class="value-section">
      <div class="container value-section__inner">
        <div v-for="item in valueProps" :key="item.title" class="value-card">
          <div class="value-card__icon">
            <component :is="item.icon" />
          </div>
          <h3 class="value-card__title">{{ item.title }}</h3>
          <p class="value-card__desc">{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Best of Laos: curated experience categories -->
    <section class="best-of-section">
      <div class="container">
        <div class="luxury-header">
          <span class="luxury-header__label">CURATED FOR YOU</span>
          <h2 class="luxury-header__title">BEST OF LAOS</h2>
        </div>

        <div class="best-of-grid">
          <NuxtLink
            v-for="item in bestOfLaos"
            :key="item.title"
            to="/tour-detail"
            class="luxury-card"
            :class="{ 'luxury-card--tinted': !item.image }"
          >
            <img v-if="item.image" :src="item.image" :alt="item.title" @error="handleImageError">
            <component :is="item.icon" v-else class="luxury-card__ghost-icon" />
            <div class="luxury-card__overlay">
              <span class="luxury-card__title">{{ item.title }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Top Destinations: editorial photo mosaic -->
    <section class="destinations-section">
      <div class="container">
        <div class="luxury-header">
          <span class="luxury-header__label">EXPLORE THE KINGDOM</span>
          <h2 class="luxury-header__title">TOP DESTINATIONS</h2>
        </div>

        <TopDestinations />
      </div>
    </section>

    <!-- Tour Categories: curated category grid with premium image cards -->
    <section class="tour-categories-section">
      <div class="container">
        <div class="tour-categories-header">
          <h2 class="tour-categories-header__title">ປະເພດທົວ</h2>
          <a href="#" class="tour-categories-header__link">
            ເບິ່ງລາຍການທັງໝົດ
            <ArrowRightOutlined class="tour-categories-header__link-icon" />
          </a>
        </div>

        <div class="tour-categories-grid">
          <NuxtLink
            v-for="category in tourCategories"
            :key="category.title"
            :to="{ path: '/tour-detail', query: { category: category.title } }"
            class="tour-category-card"
          >
            <div class="tour-category-card__bg" :style="{ backgroundImage: `url(${category.image})` }" />
            <div class="tour-category-card__scrim" />
            <span class="tour-category-card__badge">{{ category.title }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Media & social proof -->
    <section class="media-section">
      <div class="container">
        <div class="luxury-header">
          <span class="luxury-header__label">FOLLOW OUR JOURNEY</span>
          <h2 class="luxury-header__title">Our Latest Videos</h2>
        </div>

        <!-- YouTube-style video thumbnail grid -- fetched from GET /videos/latest
             (see useVideosStore), sorted createdAt DESC, capped to 8 for the 4x2 layout -->
        <a-spin :spinning="videosStore.isLoading">
          <div class="video-grid">
            <VideoCard
              v-for="video in videosStore.videos"
              :key="video.id"
              :video="video"
              @play="openVideo"
            />
          </div>
        </a-spin>
      </div>
    </section>

    <!-- Luxury video lightbox: plays the clicked video's YouTube embed full-screen -->
    <Teleport to="body">
      <div v-if="isVideoModalOpen" class="video-modal" @click.self="closeVideo">
        <button type="button" class="video-modal__close" aria-label="Close" @click="closeVideo">
          <CloseOutlined />
        </button>
        <div class="video-modal__player">
          <iframe
            v-if="currentVideo"
            :src="`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&start=${currentVideo.start}&end=${currentVideo.end}`"
            title="Video player"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, h, nextTick, onMounted, onUnmounted } from 'vue'
import {
  BankOutlined,
  CarOutlined,
  SendOutlined,
  CompassOutlined,
  CameraOutlined,
  SafetyCertificateOutlined,
  CrownOutlined,
  CreditCardOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  CustomerServiceOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import { useAuthStore } from '~/stores/auth'
import { useVideosStore } from '~/stores/videos'

// Hides the persistent site header on desktop (see site-header--hero-mode in
// app/layouts/default.vue) since the floating hero card below carries its own
// integrated navbar there; the site header still shows on mobile for its drawer.
definePageMeta({ hideSiteHeader: true })

const authStore = useAuthStore()
const heroLang = ref('Lao')

// --- Glass navbar: sliding indicator ----------------------------------
// heroNavItems is a computed list (not a static array) because two of its
// entries -- the lang label and the login/profile link -- depend on
// reactive state (heroLang, authStore.isAuthenticated), so the DOM node
// widths the indicator measures can change out from under it.
const heroNavItems = computed(() => [
  { key: 'home', label: 'Home', to: '/' },
  { key: 'about', label: 'About Us', href: '#' },
  { key: 'premium', label: 'Premium', href: '#' },
  { key: 'blogs', label: 'Blogs', href: '#' },
  { key: 'lang', label: `🌐 ${heroLang.value}` },
  { key: 'explore', label: 'Explore', href: '#services' },
  authStore.isAuthenticated
    ? { key: 'login', label: authStore.fullName, to: '/profile' }
    : { key: 'login', label: 'Login', to: '/login' }
])

const glassNavItemRefs = ref([])
const activeGlassNavIndex = ref(0)
const glassIndicatorStyle = ref({ left: '0px', top: '0px', width: '0px', height: '0px' })

function setGlassNavItemRef(el, index) {
  if (el) glassNavItemRefs.value[index] = el
}

// Reads the target <li>'s offsetWidth/offsetLeft (both already relative to
// .glass-navbar__list, its nearest positioned ancestor) and mirrors them
// onto the indicator; the CSS transition on left/width is what animates it.
function moveGlassIndicatorTo(index) {
  const el = glassNavItemRefs.value[index]
  if (!el) return
  glassIndicatorStyle.value = {
    left: `${el.offsetLeft}px`,
    top: `${el.offsetTop}px`,
    width: `${el.offsetWidth}px`,
    height: `${el.offsetHeight}px`
  }
}

function setActiveGlassNav(index) {
  activeGlassNavIndex.value = index
  nextTick(() => moveGlassIndicatorTo(index))
}

function handleGlassNavResize() {
  moveGlassIndicatorTo(activeGlassNavIndex.value)
}

const heroSlide = ref(0)
const heroSlides = [
  { index: 0, title: 'ປະຕູໄຊ', subtitle: 'Vientiane', image: '/images/patuxay.jpeg' },
  { index: 1, title: 'ພະທາດຫຼວງ', subtitle: 'Vientiane', image: '/images/phathartlaung.jpeg' },
  { index: 2, title: 'ນ້ຳຕົກຕາດກວາງຊີ', subtitle: 'Luang Prabang', image: '/images/Tardkaungse.png' },
  { index: 3, title: 'ວັງວຽງ', subtitle: 'Vang Vieng', image: '/images/hero-bg.jpg' },
  { index: 4, title: 'ວັດພູ', subtitle: 'Champasak', image: '/images/Wat-Phu-Laos.jpg' },
  { index: 5, title: 'ຄອນພະເພັງ', subtitle: 'Champasak', image: '/images/khonephapheng.jpg' },
  { index: 6, title: 'ເມືອງງອຍ', subtitle: 'Luang Prabang', image: '/images/Muaengngoy.jpg' }
]

// Hero navigation is plain state now -- there's no Swiper instance behind
// it since the thumbnail strip (the only thing that ever needed Swiper
// here) was removed; HeroSlider just reacts to heroSlide changing.
function showPreviousHeroSlide() {
  heroSlide.value = (heroSlide.value - 1 + heroSlides.length) % heroSlides.length
}

function showNextHeroSlide() {
  heroSlide.value = (heroSlide.value + 1) % heroSlides.length
}

// --- Autoplay ---------------------------------------------------------
// Plain `let`, not `ref`: this only ever holds a setInterval id for
// internal bookkeeping and is never read from the template, so making it
// reactive would just be unnecessary Vue tracking overhead.
const HERO_AUTOPLAY_INTERVAL_MS = 3000
let heroAutoplayTimer = null

function startHeroAutoplay() {
  // Guards against stacking a second interval if this is ever called
  // while one is already running (e.g. a quick mouseleave/mouseenter).
  stopHeroAutoplay()
  heroAutoplayTimer = setInterval(showNextHeroSlide, HERO_AUTOPLAY_INTERVAL_MS)
}

function stopHeroAutoplay() {
  if (heroAutoplayTimer !== null) {
    clearInterval(heroAutoplayTimer)
    heroAutoplayTimer = null
  }
}

onMounted(startHeroAutoplay)
// Without this, navigating away from the page (Nuxt is an SPA-style
// router) would leave this interval running forever in the background --
// a classic memory leak.
onUnmounted(stopHeroAutoplay)

onMounted(() => {
  nextTick(() => moveGlassIndicatorTo(activeGlassNavIndex.value))
  window.addEventListener('resize', handleGlassNavResize)
})
onUnmounted(() => window.removeEventListener('resize', handleGlassNavResize))

// Accurate, real-world icons (Material Symbols glyphs, Apache-2.0) for the nodes
// antd doesn't cover precisely — a real airplane (not SendOutlined's paper plane),
// a bed/building for hotels, crossed fork+knife for restaurants, and a cocktail
// glass for entertainment venues. CarOutlined/CameraOutlined below are close
// enough matches already and stay as antd icons.
function makeGlyphIcon(pathData) {
  return {
    render: () => h('svg', { viewBox: '0 0 24 24', width: '1em', height: '1em', fill: 'currentColor' }, [
      h('path', { d: pathData })
    ])
  }
}

const FlightIcon = makeGlyphIcon('M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z')
const HotelIcon = makeGlyphIcon('M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z')
const RestaurantIcon = makeGlyphIcon('M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z')
const CocktailIcon = makeGlyphIcon('M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7 5.66 5h12.69l-1.78 2H7.43z')

// Radial hub-and-spoke ecosystem menu (adapted from CodeFronts' "Mission
// Hub" circular menu, MIT licensed: https://codefronts.com/navigation/
// css-circular-menus/mission-hub/). Each module's position around the ring
// is computed entirely in CSS from its index (--i) and the total count
// (--n) — see .ecosystem-module in <style> — so there's no JS trig/percent
// math here at all. stat/delta are placeholder headline figures for the
// center display; swap them for real numbers when available.
const ecosystemModules = [
  {
    id: 'airport',
    icon: FlightIcon,
    label: 'ສະໜາມບິນ',
    stat: '24/7',
    delta: 'ບໍລິການຕະຫຼອດ 24 ຊົ່ວໂມງ'
  },
  {
    id: 'car-rental',
    icon: CarOutlined,
    label: 'ລົດຮັບສົ່ງ / ລົດເຊົ່າ',
    stat: '50+',
    delta: 'ຄັນລົດພ້ອມໃຫ້ບໍລິການ'
  },
  {
    id: 'hotel',
    icon: HotelIcon,
    label: 'ໂຮງແຮມ - ຣີສອດ',
    stat: '150+',
    delta: 'ໂຮງແຮມ ແລະ ຣີສອດທີ່ຄັດສັນ'
  },
  {
    id: 'restaurant',
    icon: RestaurantIcon,
    label: 'ຮ້ານອາຫານ',
    stat: '200+',
    delta: 'ຮ້ານອາຫານທົ່ວທຸກແຂວງ'
  },
  {
    id: 'attraction',
    icon: CameraOutlined,
    label: 'ສະຖານທີ່ທ່ອງທ່ຽວ',
    stat: '80+',
    delta: 'ສະຖານທີ່ທ່ອງທ່ຽວຍອດນິຍົມ'
  },
  {
    id: 'entertainment',
    icon: CocktailIcon,
    label: 'ສະຖານທີ່ບັນເທີງ',
    stat: '30+',
    delta: 'ຈຸດບັນເທີງຍາມຄ່ຳຄືນ'
  }
]

const selectedModuleId = ref(ecosystemModules[0].id)
const activeModule = computed(
  () => ecosystemModules.find((module) => module.id === selectedModuleId.value) ?? ecosystemModules[0]
)

const serviceGridItems = [
  {
    icon: BankOutlined,
    title: 'ຈອງໂຮງແຮມ & ຣີສອດ',
    description: 'ຊອກຫາ ແລະ ຈອງທີ່ພັກທົ່ວປະເທດລາວ'
  },
  {
    icon: SendOutlined,
    title: 'ຈອງປີ້ຍົນ',
    description: 'ປີ້ຍົນພາຍໃນ ແລະ ຕ່າງປະເທດ'
  },
  {
    icon: CarOutlined,
    title: 'ລົດຮັບ-ສົ່ງ & ເຊົ່າລົດ',
    description: 'ບໍລິການລົດຮັບສົ່ງສະໜາມບິນ ແລະ ລົດເຊົ່າ'
  },
  {
    icon: CameraOutlined,
    title: 'ສະຖານທີ່ທ່ອງທ່ຽວ',
    description: 'ຈອງປີ້ເຂົ້າຊົມສະຖານທີ່ທ່ອງທ່ຽວຍອດຮິດ'
  },
  {
    icon: SafetyCertificateOutlined,
    title: 'ປະກັນໄພການເດີນທາງ',
    description: 'ເດີນທາງອຸ່ນໃຈດ້ວຍປະກັນໄພຄຸ້ມຄອງ'
  },
  {
    icon: CompassOutlined,
    title: 'ແພັກເກດທົວ',
    description: 'ທົວຄົບວົງຈອນ ຈັດກຽມທຸກຢ່າງໃຫ້ທ່ານ'
  }
]

// Brief shimmer skeleton on mount so the services grid doesn't pop in blank
// while its (future API-backed) data resolves -- tints give each card the
// same faint gold-on-dark variation the finished cards will have.
const isServicesLoading = ref(true)
const serviceSkeletonTints = [
  'rgba(212, 175, 55, 0.16)',
  'rgba(197, 160, 89, 0.12)',
  'rgba(212, 175, 55, 0.20)',
  'rgba(255, 255, 255, 0.08)',
  'rgba(197, 160, 89, 0.16)',
  'rgba(212, 175, 55, 0.12)'
]
onMounted(() => {
  setTimeout(() => {
    isServicesLoading.value = false
  }, 900)
})

const valueProps = [
  {
    icon: CrownOutlined,
    title: 'Best Products & Experiences',
    desc: 'ຄັດສັນສະເພາະປະສົບການ ແລະ ບໍລິການທີ່ດີທີ່ສຸດ'
  },
  {
    icon: CreditCardOutlined,
    title: 'Payment Options',
    desc: 'ຮອງຮັບການຊຳລະຫຼາກຫຼາຍຊ່ອງທາງ ປອດໄພ ແລະ ວ່ອງໄວ'
  },
  {
    icon: ThunderboltOutlined,
    title: 'Seamless Booking',
    desc: 'ຈອງງ່າຍ ພຽງສອງສາມຄລິກ ບໍ່ຫຍຸ້ງຍາກ'
  },
  {
    icon: GlobalOutlined,
    title: 'Covering All of Laos',
    desc: 'ຄອບຄຸມທຸກແຂວງທົ່ວປະເທດລາວ'
  },
  {
    icon: CustomerServiceOutlined,
    title: 'Service-Oriented Support',
    desc: 'ທີມງານພ້ອມໃຫ້ບໍລິການທ່ານຕະຫຼອດ 24 ຊົ່ວໂມງ'
  }
]

// A category without an `image` falls back to a tinted gradient + ghost icon
// instead (see .luxury-card--tinted in <style>, and the v-else branch below) --
// kept for any future category added here without dedicated photography yet.
//
// train-ticket.jpg / car-rental.jpg don't exist in public/images/ yet -- these
// two cards 404 until real photos land at those exact paths, at which point
// @error="handleImageError" (below) swaps in a placeholder instead of a
// broken image. Deliberately not substituted with one of the existing Laos
// landscape photos: those are all destination/nature shots, and reusing one
// here (e.g. a waterfall behind "Car Rentals") would be the "unrelated
// destination photo" this file's own previous comment already called out as
// worth avoiding.
const bestOfLaos = [
  { title: 'River Cruise', image: '/images/Muaengngoy.jpg' },
  { title: 'Train Ticketing', image: '/images/train-ticket.jpg' },
  { title: 'Car Rentals', image: '/images/car-rental.jpg' }
]

const tourCategories = [
  { title: 'ADVENTURES & SPORTS', image: '/images/khonephapheng.jpg' },
  { title: 'PILGRIMAGE TOURS', image: '/images/Wat-Phu-Laos.jpg' },
  { title: 'CYCLING TOURS', image: '/images/Muaengngoy.jpg' }
]

// "Our Latest Videos" grid: fetched from the backend (GET /videos/latest,
// sorted createdAt DESC, capped to 8) instead of hardcoded here -- see
// useVideosStore and VideoCard.vue for the fetch + per-card fallback logic.
const videosStore = useVideosStore()
onMounted(() => videosStore.fetchLatestVideos(8))

// Shared @error handler for hardcoded local /images/* references elsewhere on
// this page (bestOfLaos cards): swaps a 404'd local image for an external
// placeholder instead of leaving a broken-image icon and a red 404 in the
// console. onerror is cleared first so a failing placeholder request can't
// loop back into this handler forever.
function handleImageError(event) {
  event.target.onerror = null
  event.target.src = `https://placehold.co/600x400/14294f/d4af37?text=${encodeURIComponent(event.target.alt || 'UniBooking')}`
}

const isVideoModalOpen = ref(false)
const currentVideo = ref(null)

function openVideo(video) {
  currentVideo.value = video
  isVideoModalOpen.value = true
}

function closeVideo() {
  isVideoModalOpen.value = false
  currentVideo.value = null
}
</script>

<style scoped>
/* Shared centered container: sections own full-width backgrounds, this caps the content at 1200px */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* ============================================================
   Hero: single floating card — full-bleed background image with a
   dark gradient overlay (left, for the copy block; bottom, for the
   carousel strip). Navbar, copy block, and carousel are each
   absolutely positioned within it.
   ============================================================ */
.hero-section {
  width: 100%;
  padding: 0;
  background: transparent;
}

.hero-card {
  width: 100%;
  height: 85vh;
  min-height: 640px;
  margin: 0;
  position: relative;
  overflow: hidden;
  background: #0a0a0a; /* fallback while HeroSlider's images load */
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6);
}

/* Photo layer -- 3D slice/blinds transition between destinations, sitting
   behind the scrim below and everything else in the card. */
.hero-card__slider {
  z-index: 0;
}

/* Left-side scrim keeps the copy block legible; bottom-side scrim keeps
   the carousel thumbnails legible — both painted over HeroSlider's photo
   as their own layer so the slice transition can animate independently. */
.hero-card__scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  /* Lighter and tighter than before -- text now carries its own text-shadow
     (see .hero-copy__tag/__title/__subtitle) so the scrim only needs to
     take the edge off contrast, not fully darken the photo to be legible. */
  background:
    linear-gradient(100deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.32) 22%, rgba(0, 0, 0, 0.08) 40%, rgba(0, 0, 0, 0) 55%),
    linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.22) 16%, rgba(0, 0, 0, 0) 32%);
}

/* Left copy block — strictly left-aligned, pinned to the upper area of the
   card so it never reaches down into the carousel strip at the bottom. */
.hero-copy {
  position: absolute;
  top: 130px;
  left: 6%;
  z-index: 4;
  width: min(440px, 40%);
  color: #fff;
  text-align: left;
}

.hero-copy__tag {
  display: block;
  color: #d8bc7b;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7);
}

.hero-copy__title {
  margin: 14px 0 12px;
  color: #fff;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.05;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9), 0 4px 18px rgba(0, 0, 0, 0.7);
}

.hero-copy__subtitle {
  max-width: 390px;
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
  font-size: 16px;
  line-height: 1.6;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7);
}

/* Same frosted-glass texture as .glass-navbar__indicator (see the navbar
   styles below), tinted with the button's own gold instead of white so the
   base color survives the blur. */
.hero-copy__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  margin-top: 26px;
  padding: 13px 28px;
  border-radius: 100px;
  background: rgba(197, 160, 89, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow:
    inset 0 0 0 rgba(255, 255, 255, 0.1),
    inset -3px -3px 6px rgba(0, 0, 0, 0.3),
    inset 0 0 9px rgba(255, 255, 255, 0.2),
    inset 2px 4px 8px rgba(255, 255, 255, 0.4),
    inset -6px -12px 18px rgba(0, 0, 0, 0.2),
    0 6px 12px rgba(0, 0, 0, 0.3);
  color: #0a0a0a;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.25s ease, transform 0.25s ease;
}

.hero-copy__button:hover {
  background: rgba(216, 188, 123, 0.85);
  color: #0a0a0a;
  transform: translateY(-2px);
}

/* Bottom-right of the hero card, clear of the copy block and navbar. */
.hero-nav-controls {
  position: absolute;
  right: 32px;
  bottom: 32px;
  z-index: 6;
  display: flex;
  gap: 8px;
}

.hero-nav-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.hero-nav-btn:hover {
  background: #c5a059;
  border-color: #c5a059;
}

/* Original white search card, pulled up to overlap the hero's bottom edge.
   Kept shy of .hero-nav-controls (bottom:32px, 32px tall -- occupies the
   32-64px band above the hero's bottom edge): -20px leaves a clear ~12px
   gap instead of burying the arrows under the card. */
.search-form-wrapper {
  position: relative;
  z-index: 50;
  width: 100%;
  max-width: 1200px;
  margin: -20px auto 0;
}

/* Same frosted-glass texture as .glass-navbar__indicator (see the navbar
   styles below), tinted with the card's own navy instead of white so the
   base color survives the blur. */
.search-form-wrapper :deep(.search-form.ant-card) {
  background: rgba(20, 41, 79, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow:
    inset 0 0 0 rgba(255, 255, 255, 0.1),
    inset -3px -3px 6px rgba(0, 0, 0, 0.3),
    inset 0 0 9px rgba(255, 255, 255, 0.2),
    inset 2px 4px 8px rgba(255, 255, 255, 0.4),
    inset -6px -12px 18px rgba(0, 0, 0, 0.2),
    0 6px 12px rgba(0, 0, 0, 0.3);
}

/* Floats over the top of the card. Hidden below 768px -- the persistent
   site header (with the hamburger drawer) is what mobile visitors use
   instead (see site-header--hero-mode). */
.glass-navbar-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 30px 50px;
  z-index: 10;
}

.glass-navbar-wrap__logo {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  text-decoration: none;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
}

.glass-navbar-wrap__logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

/* The wrapper: single pill container, neumorphic outer shadow lives here
   only -- items and the indicator sit on top of this surface. */
.glass-navbar {
  /* Absolutely centered on the header wrapper (already `position: absolute`,
     so it's the containing block here) -- this way the pill sits dead
     center of the hero card regardless of the logo's width, instead of
     drifting right the way `justify-content: space-between` pushed it. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  padding: 6px;
  background: linear-gradient(145deg, #f0f0f3, #ffffff);
  box-shadow:
    8px 8px 16px rgba(0, 0, 0, 0.2),
    -8px -8px 16px rgba(255, 255, 255, 0.7);
}

.glass-navbar__list {
  position: relative;
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2px;
}

/* Items stay fully transparent -- no background, padding-background, or
   shadow of their own -- so the glass indicator reads as sliding beneath
   them rather than being layered under a competing surface. */
.glass-navbar__item {
  position: relative;
  z-index: 1;
}

.glass-navbar__link {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  color: rgba(38, 44, 61, 0.55);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.25s ease;
}

.glass-navbar__link:hover {
  color: rgba(38, 44, 61, 0.8);
}

.glass-navbar__item.is-active .glass-navbar__link {
  color: #262c3d;
  font-weight: 700;
}

/* The slider: glassmorphic pill that animates to the active item's
   offsetLeft/offsetWidth (see moveGlassIndicatorTo in the script). */
.glass-navbar__indicator {
  position: absolute;
  z-index: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #f5f5f5, #ffffff);
  border: 1px solid rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow:
    inset 0 0 0 rgba(0, 0, 0, 0.1),
    inset -3px -3px 6px rgba(0, 0, 0, 0.25),
    inset 0 0 9px rgba(255, 255, 255, 0.3),
    inset 2px 4px 8px rgba(255, 255, 255, 1),
    inset -6px -12px 18px rgba(0, 0, 0, 0.25),
    0 6px 6px rgba(0, 0, 0, 0.4);
  transition: left 0.45s cubic-bezier(0.65, 0, 0.35, 1),
    width 0.45s cubic-bezier(0.65, 0, 0.35, 1),
    top 0.45s cubic-bezier(0.65, 0, 0.35, 1);
  pointer-events: none;
}

.glass-navbar--fallback {
  width: 520px;
  max-width: 100%;
  height: 44px;
}

@media (max-width: 767px) {
  .glass-navbar-wrap {
    display: none;
  }
}

@media (max-width: 1200px) {
  .hero-copy {
    width: min(380px, 46%);
  }

  .hero-copy__title {
    font-size: 2.5rem;
  }
}

@media (max-width: 900px) {
  .hero-card {
    height: auto;
    min-height: 0;
    padding-top: 100px;
    padding-bottom: 24px;
  }

  /* Extra flat darkening layered over the usual left/bottom gradients --
     mobile stacks the copy block directly over the photo instead of
     beside it, so it needs more uniform contrast than desktop does.
     Lighter than before, same reasoning as the desktop scrim above:
     text-shadow now does most of the legibility work. */
  .hero-card__scrim {
    background:
      linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      linear-gradient(100deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.32) 22%, rgba(0, 0, 0, 0.08) 40%, rgba(0, 0, 0, 0) 55%),
      linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.22) 16%, rgba(0, 0, 0, 0) 32%);
  }

  .hero-copy {
    position: relative;
    top: 0;
    left: 0;
    width: auto;
    max-width: none;
    padding: 0 24px;
    margin-bottom: 32px;
  }

  .hero-nav-controls {
    right: 16px;
    bottom: 16px;
  }

  /* Arrows here occupy the 16-48px band above the hero's bottom edge --
     shrink the overlap further so the card doesn't creep back under them. */
  .search-form-wrapper {
    margin-top: -10px;
  }
}

/* Services grid */
/* ============================================================
   Modular Travel Solutions: luxury connected node network.
   Pure CSS — no JS-driven activation state; the SVG lines and
   nodes are always "on," with a subtle animated dash flow and
   a gentle per-node float for a living, premium feel.
   ============================================================ */
.modular-section {
  position: relative;
  width: 100%;
  padding: 100px 0;
  overflow: hidden;
  background: transparent;
}

/* Blurred nature photo backdrop. Scaled up slightly so the blur filter never
   reveals a sharp edge, and kept a separate layer from the dark scrim below
   so the blur/darken can be tuned independently. */
.modular-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/images/Muaengfuaeng.webp') center / cover no-repeat;
  filter: blur(6px);
  transform: scale(1.1);
  z-index: 0;
}

/* Dark green scrim over the photo — this is what makes white text/gold accents
   readable regardless of how busy the underlying image is. */
.modular-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 26, 51, 0.82), rgba(6, 14, 30, 0.75));
  z-index: 0;
}

.modular-section__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.modular-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #ffffff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  padding: 6px 18px;
  text-transform: uppercase;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 20px;
}

.modular-title {
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1.3;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 20px;
}

.modular-desc {
  font-size: 15px;
  line-height: 1.9;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  max-width: 480px;
  margin-bottom: 0;
}

/* Radial hub-and-spoke ecosystem menu, adapted from CodeFronts' "Mission
   Hub" circular menu (MIT). Re-skinned to this file's existing cyberpunk/
   glass theme (deep slate/navy + neon cyan) instead of the demo's own
   palette; positions come from container-query units + CSS trig, not
   JS-computed percentages, so the whole thing stays fluid at any size. */
.ecosystem-container {
  position: relative;
  width: 100%;
  max-width: 460px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  --eco-cyan: #2dd4bf;
}

/* Deep slate/navy glass backdrop panel the whole diagram floats on */
.ecosystem-container::before {
  content: '';
  position: absolute;
  inset: 6%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(13, 20, 35, 0.6) 0%, rgba(8, 12, 22, 0.32) 60%, transparent 78%);
  border: 1px solid rgba(45, 212, 191, 0.1);
  z-index: 0;
  pointer-events: none;
}

/* Soft static cyan glow centered behind the diagram — pure ambience, no motion */
.ecosystem-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(45, 212, 191, 0.18) 0%, rgba(0, 0, 0, 0.08) 45%, transparent 75%);
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
}

/* Groups the whole radial menu; container-type turns the cqi units below
   into "percent of this element's own width" so labels/gaps/the core all
   scale together instead of needing separate breakpoint overrides. */
.ecosystem-fieldset {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  container-type: inline-size;
}

/* Visually hidden but still announced — the fieldset's accessible name */
.ecosystem-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.ecosystem-space {
  position: relative;
  width: 100%;
  height: 100cqi;
  display: grid;
  place-items: center;
  --r: 36cqi;
}

/* Faint connecting spokes from the core out to each module, drawn at the
   exact angle CSS derives from that module's index (--i) and the total
   count (--n) — see .ecosystem-module below, which uses the same --a. */
.ecosystem-spoke {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: var(--r);
  height: 1px;
  --a: calc((360deg / var(--n)) * var(--i) - 90deg);
  rotate: var(--a);
  transform-origin: 0% 50%;
  background: linear-gradient(90deg, rgba(45, 212, 191, 0.55), rgba(45, 212, 191, 0));
  opacity: 0.3;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.ecosystem-spoke.is-active {
  opacity: 0.95;
}

/* Each module sits at the same angle as its spoke; cos()/sin() place it on
   the ring purely in CSS from --i/--n, so there's no per-node JS math. */
.ecosystem-module {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  --a: calc((360deg / var(--n)) * var(--i) - 90deg);
  translate: calc(cos(var(--a)) * var(--r) - 50%) calc(sin(var(--a)) * var(--r) - 50%);
}

/* Native radio input drives selection + keyboard/arrow-key navigation
   between modules; visually hidden in favor of its styled label. */
.ecosystem-module input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}

.ecosystem-module label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 21cqi;
  min-width: 80px;
  max-width: 98px;
  padding: 14px 8px;
  background: linear-gradient(155deg, rgba(17, 26, 46, 0.75), rgba(8, 12, 22, 0.85));
  border: 1px solid rgba(45, 212, 191, 0.2);
  border-radius: 18px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.ecosystem-module label:hover {
  transform: translateY(-6px);
  border-color: rgba(45, 212, 191, 0.5);
}

.ecosystem-module input:checked + label {
  background: linear-gradient(160deg, rgba(45, 212, 191, 0.2), rgba(8, 12, 22, 0.9));
  border-color: var(--eco-cyan);
  box-shadow:
    0 0 0 1px rgba(45, 212, 191, 0.55),
    0 12px 28px -8px rgba(20, 184, 166, 0.55),
    0 0 24px rgba(20, 184, 166, 0.35);
}

.ecosystem-module input:focus-visible + label {
  outline: 2px solid var(--eco-cyan);
  outline-offset: 3px;
}

.ecosystem-icon {
  font-size: 22px;
  color: #e6fffb;
  text-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
}

.ecosystem-module input:checked + label .ecosystem-icon {
  color: var(--eco-cyan);
}

.ecosystem-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.015em;
  line-height: 1.4;
  color: #cffafe;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

/* Core: a glass disc showing the selected module's headline stat. Content
   is swapped by Vue (see activeModule in the script); the fade/scale swap
   itself is a <Transition>, not manual JS animation. */
.ecosystem-core {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 34cqi;
  height: 34cqi;
  min-width: 122px;
  min-height: 122px;
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  background: linear-gradient(155deg, rgba(15, 23, 42, 0.85), rgba(6, 10, 20, 0.92));
  border: 1px solid rgba(45, 212, 191, 0.4);
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(45, 212, 191, 0.25),
    0 0 34px rgba(20, 184, 166, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
}

.ecosystem-core__content {
  display: grid;
  justify-items: center;
  gap: 4px;
  padding: 0 14px;
  text-align: center;
}

.ecosystem-core__label {
  font-style: normal;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(45, 212, 191, 0.85);
}

.ecosystem-core__stat {
  font-size: clamp(22px, 7cqi, 34px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-shadow: 0 0 16px rgba(45, 212, 191, 0.4);
}

.ecosystem-core__delta {
  font-size: 11px;
  line-height: 1.4;
  color: #cffafe;
  max-width: 20ch;
}

.ecosystem-core-fade-enter-active,
.ecosystem-core-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.22s ease;
}

.ecosystem-core-fade-enter-from,
.ecosystem-core-fade-leave-to {
  opacity: 0;
  transform: scale(0.94);
}

@media (prefers-reduced-motion: reduce) {
  .ecosystem-module label,
  .ecosystem-spoke,
  .ecosystem-core-fade-enter-active,
  .ecosystem-core-fade-leave-active {
    transition-duration: 0.01s;
  }
}

/* Services grid: premium fintech-style app grid */
.services-grid-section {
  position: relative;
  overflow: hidden;
  width: 100%;
  background: transparent;
  padding: 80px 0;
}

/* Faint rotated blurred squares for texture */
.services-grid-section__shape {
  position: absolute;
  border-radius: 32px;
  transform: rotate(20deg);
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
}

.services-grid-section__shape--one {
  top: -60px;
  right: 8%;
  width: 260px;
  height: 260px;
  background: rgba(197, 160, 89, 0.14);
}

.services-grid-section__shape--two {
  bottom: -80px;
  left: 6%;
  width: 220px;
  height: 220px;
  background: rgba(255, 255, 255, 0.06);
  transform: rotate(-15deg);
}

.services-grid-section__inner {
  position: relative;
  z-index: 1;
}

.services-grid-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
}

.services-grid-header__badge {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  color: #c5a059;
  background: rgba(197, 160, 89, 0.12);
  border-radius: 999px;
  padding: 6px 16px;
  margin-bottom: 16px;
}

.services-grid-header__title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
}

.services-grid-header__subtitle {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.65);
}

/* Premium dark glass card: frosted surface with a gold accent on hover */
.grid-card {
  height: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.3s ease;
}

.grid-card:hover {
  transform: translateY(-6px);
  border-color: #d4af37;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(212, 175, 55, 0.25);
}

.grid-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  margin: 0 auto;
  background: rgba(212, 175, 55, 0.12);
  transition: background 0.3s ease;
}

.grid-card:hover .grid-card__icon {
  background: rgba(212, 175, 55, 0.2);
}

.grid-card__icon-glyph {
  font-size: 28px;
  color: #d4af37;
}

.grid-card__title {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 16px;
  margin-bottom: 6px;
}

.grid-card__desc {
  font-size: 13px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0;
}

/* Services grid shimmer skeleton -- shown briefly on mount in place of the
   real grid-card content while data resolves. */
.services-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.grid-card--skeleton {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.services-sk {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: var(--sk-tint, rgba(255, 255, 255, 0.08));
}

.services-sk::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.16) 50%, transparent 70%);
  animation: services-sk-shimmer 1.9s ease-in-out infinite;
}

@keyframes services-sk-shimmer {
  100% {
    transform: translateX(100%);
  }
}

.services-sk--icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  margin: 0 auto;
}

.services-sk--title {
  width: 60%;
  height: 17px;
  border-radius: 6px;
  margin-top: 20px;
}

.services-sk--desc {
  width: 85%;
  height: 12px;
  border-radius: 6px;
  margin-top: 12px;
}

.services-sk--desc-short {
  width: 55%;
  margin-top: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .services-sk::after {
    animation: none;
    opacity: 0;
  }
}

/* Mobile: shrink hero card radius and sections to fit smaller viewports */
@media (max-width: 767px) {
  .container {
    padding: 0 16px;
  }

  .hero-copy__title {
    font-size: 2rem;
  }

  .modular-section {
    padding: 64px 0;
    text-align: center;
  }

  .modular-section__inner {
    grid-template-columns: 1fr;
  }

  .modular-desc {
    max-width: none;
    margin-left: auto;
    margin-right: auto;
  }

  /* Most sizing below is already fluid (cqi units, derived from
     .ecosystem-container's own width), so mobile only needs to shrink the
     container and nudge the px floors that keep the core/labels legible
     at very small sizes — not a full parallel set of fixed dimensions. */
  .ecosystem-container {
    max-width: 300px;
  }

  .ecosystem-space {
    --r: 38cqi;
  }

  .ecosystem-core {
    min-width: 104px;
    min-height: 104px;
  }

  /* The descriptive sentence doesn't fit legibly inside a ~104px circle
     alongside the label + big stat number — drop it on the smallest
     screens rather than let it clip against the circular edge; the label
     + stat alone still read as a clear headline. */
  .ecosystem-core__delta {
    display: none;
  }

  .ecosystem-module label {
    min-width: 72px;
    padding: 12px 6px;
    gap: 6px;
  }

  .ecosystem-icon {
    font-size: 18px;
  }

  .ecosystem-label {
    font-size: 10px;
  }

  .services-grid-section {
    padding: 64px 0;
  }
}

/* ============================================================
   Luxury OTA sections: value proposition, Best of Laos,
   Top Destinations, Media & Social. Brand palette:
   teal-glow gradient (see app.vue's fixed body background) / #111826, gold #c5a059, white text.
   ============================================================ */
.value-section {
  width: 100%;
  background: transparent;
  padding: 72px 0;
}

.value-section__inner {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
}

.value-card {
  text-align: center;
}

.value-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border: 1px solid rgba(197, 160, 89, 0.35);
  border-radius: 50%;
  color: #c5a059;
  font-size: 26px;
  transition: background 0.3s ease, color 0.3s ease;
}

.value-card:hover .value-card__icon {
  background: #c5a059;
  color: #0a0a0a;
}

.value-card__title {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
}

.value-card__desc {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0;
}

/* Shared section heading for the luxury sections below */
.luxury-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 40px;
}

.luxury-header__label {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #c5a059;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.luxury-header__title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #ffffff;
  margin-bottom: 0;
}

/* Shared luxury card: used by Best of Laos + Top Destinations grids.
   Best of Laos cards are <NuxtLink>s (anchors), so display:block/color/
   text-decoration are reset here to keep the box + hover behavior identical
   to a plain div. */
/* Soft gold glow border — keeps photo tiles crisply separated from the
   dark background so the image itself reads clearly. */
.luxury-card {
  position: relative;
  display: block;
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  min-height: 240px;
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(197, 160, 89, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 18px rgba(197, 160, 89, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.luxury-card:hover {
  transform: translateY(-5px);
  border-color: rgba(197, 160, 89, 0.85);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.7), 0 0 28px rgba(197, 160, 89, 0.4);
}

.luxury-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.luxury-card__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  padding: 24px 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.92), transparent 65%);
}

.luxury-card__title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

.luxury-card__subtitle {
  font-size: 12px;
  letter-spacing: 1px;
  color: #d9c9a3;
  margin-top: 4px;
}

/* No-photo category variant: gradient fill + ghost icon instead of an image */
.luxury-card--tinted {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #111826, #1e2a3a);
}

.luxury-card__ghost-icon {
  font-size: 64px;
  color: rgba(197, 160, 89, 0.4);
}

/* Best of Laos: 3-up category strip */
.best-of-section {
  width: 100%;
  background: transparent;
  padding: 80px 0;
}

.best-of-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Top Destinations section wrapper — the mosaic grid itself now lives in
   the standalone TopDestinations component. */
.destinations-section {
  width: 100%;
  background: transparent;
  padding: 80px 0;
}

/* Tour Categories: curated category grid with premium image cards */
.tour-categories-section {
  width: 100%;
  background: transparent;
  padding: 80px 0;
}

.tour-categories-header {
  text-align: center;
  margin: 0 auto 40px;
}

.tour-categories-header__title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #ffffff;
  margin-bottom: 12px;
}

.tour-categories-header__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #c5a059;
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(197, 160, 89, 0.5);
  transition: color 0.3s ease, border-color 0.3s ease;
}

.tour-categories-header__link:hover {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.7);
}

.tour-categories-header__link-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.tour-categories-header__link:hover .tour-categories-header__link-icon {
  transform: translateX(4px);
}

.tour-categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Cards are <NuxtLink>s (anchors); reset the browser's default inline/underlined/blue-link
   styling so they still behave as plain block grid items. */
.tour-category-card {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  border-radius: 20px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  border: 1px solid rgba(197, 160, 89, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 18px rgba(197, 160, 89, 0.25);
  cursor: pointer;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.tour-category-card:hover {
  border-color: rgba(197, 160, 89, 0.85);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7), 0 0 28px rgba(197, 160, 89, 0.4);
}

/* Separate layer from the badge so the image scale-up never moves the text */
.tour-category-card__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
}

.tour-category-card:hover .tour-category-card__bg {
  transform: scale(1.05);
}

.tour-category-card__scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.08) 45%, transparent 70%);
  pointer-events: none;
}

.tour-category-card__badge {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  display: inline-block;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(197, 160, 89, 0.5);
  border-radius: 8px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

/* Media & social */
.media-section {
  width: 100%;
  background: transparent;
  padding: 80px 0;
}

/* YouTube-style thumbnail grid: 4 across on desktop */
.video-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}

/* Individual card styling (thumbnail, play icon, gradient overlay,
   title/duration) now lives in VideoCard.vue -- only the grid and the
   lightbox it opens stay here. */

/* ============================================================
   Video lightbox: full-screen player launched from a video card
   ============================================================ */
.video-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 24px;
}

.video-modal__player {
  position: relative;
  width: min(1100px, 90vw);
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.video-modal__player iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-modal__close {
  position: absolute;
  top: 28px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 22px;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.video-modal__close:hover {
  background: #c5a059;
  color: #0a0a0a;
  transform: rotate(90deg);
}

/* Tablet: trim the 5/4-column grids down before they get cramped */
@media (max-width: 1024px) and (min-width: 768px) {
  .value-section__inner {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .value-section {
    padding: 56px 0;
  }

  .value-section__inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .best-of-section,
  .destinations-section,
  .media-section,
  .tour-categories-section {
    padding: 56px 0;
  }

  .best-of-grid {
    grid-template-columns: 1fr;
  }

  .tour-categories-header__title {
    font-size: 1.75rem;
  }

  .tour-categories-grid {
    grid-template-columns: 1fr;
  }

  .video-modal__close {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
}
</style>
