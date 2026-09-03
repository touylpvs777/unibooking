<template>
  <div class="destinations-page">
    <section class="destinations-hero">
      <div class="container">
        <span class="destinations-hero__badge">{{ $t('destinations.badge') }}</span>

        <template v-if="districtInfo">
          <h1 class="destinations-hero__title">{{ $t('destinations.heading', { district: districtInfo.districtName }) }}</h1>
          <p class="destinations-hero__subtitle">
            {{ $t('destinations.subtitle', { province: districtInfo.provinceName, count: attractions.length }) }}
          </p>
        </template>
        <template v-else>
          <h1 class="destinations-hero__title">{{ $t('destinations.emptyTitle') }}</h1>
          <p class="destinations-hero__subtitle">{{ $t('destinations.emptyDesc') }}</p>
          <NuxtLink to="/" class="destinations-hero__cta">
            <ArrowLeftOutlined /> {{ $t('destinations.backHome') }}
          </NuxtLink>
        </template>
      </div>
    </section>

    <section v-if="districtInfo" class="destinations-grid-section">
      <div class="container">
        <div v-if="attractions.length" class="destinations-grid">
          <div v-for="attraction in attractions" :key="attraction.key" class="attraction-card">
            <img v-if="attraction.image" :src="attraction.image" :alt="attractionName(attraction.key)" @error="handleImageError">
            <div v-else class="attraction-card__placeholder">
              <CompassOutlined />
            </div>
            <div class="attraction-card__body">
              <span class="attraction-card__type">{{ $t(`attractions.types.${attraction.type}`) }}</span>
              <h3 class="attraction-card__name">{{ attractionName(attraction.key) }}</h3>
            </div>
          </div>
        </div>
        <p v-else class="destinations-empty-note">{{ $t('destinations.noAttractions') }}</p>

        <NuxtLink to="/" class="destinations-back-link">
          <ArrowLeftOutlined /> {{ $t('destinations.backHome') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowLeftOutlined, CompassOutlined } from '@ant-design/icons-vue'
import { laoProvinces } from '~/data/laoProvinces'
import { laoAttractions } from '~/data/laoAttractions'

const route = useRoute()
const { t } = useI18n()

const districtKey = computed(() => (typeof route.query.district === 'string' ? route.query.district : null))

// Reverse-looks-up which province a district key belongs to, purely to
// render its (and the district's) localized display name -- laoProvinces.js
// itself has no back-reference from district to province.
const districtInfo = computed(() => {
  if (!districtKey.value) return null

  for (const province of laoProvinces) {
    const district = province.districts.find((d) => d.key === districtKey.value)
    if (district) {
      return {
        provinceName: t(`provinces.${province.key}.name`),
        districtName: t(`provinces.${province.key}.districts.${district.key}`)
      }
    }
  }
  return null
})

const attractions = computed(() => (districtKey.value ? laoAttractions[districtKey.value] ?? [] : []))

function attractionName(key) {
  return t(`attractions.${key}.name`)
}

// Same fallback pattern as index.vue's bestOfLaos cards: swap a 404'd/missing
// local image for a generated placeholder instead of a broken-image icon.
function handleImageError(event) {
  event.target.onerror = null
  event.target.src = `https://placehold.co/600x400/14294f/d4af37?text=${encodeURIComponent(event.target.alt || 'UniBooking')}`
}
</script>

<style scoped>
/* Explicit dark background, not inherited: .site-content (see
   app/layouts/default.vue) defaults to a light #f0f9ff on every route
   except the homepage (which opts into transparent via hideSiteHeader), so
   this page needs its own opaque background rather than assuming the dark
   body gradient shows through -- it doesn't, here. */
.destinations-page {
  width: 100%;
  min-height: 60vh;
  padding: 48px 0 80px;
  background: #070c14;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.destinations-hero {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
}

.destinations-hero__badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.12);
  border-radius: 999px;
  padding: 6px 16px;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.destinations-hero__title {
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 10px;
}

.destinations-hero__subtitle {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0;
}

.destinations-hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 12px 26px;
  border-radius: 100px;
  background: linear-gradient(135deg, #d4af37, #c5a059);
  color: #0a0a0a;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.destinations-hero__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.35);
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.attraction-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.attraction-card:hover {
  transform: translateY(-6px);
  border-color: rgba(212, 175, 55, 0.4);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
}

.attraction-card img {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

/* Same "no photo yet" treatment as index.vue's .luxury-card--tinted -- a
   tinted panel with a ghost icon instead of a broken/missing image. */
.attraction-card__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.14), rgba(255, 255, 255, 0.03));
  color: rgba(212, 175, 55, 0.5);
  font-size: 40px;
}

.attraction-card__body {
  padding: 16px 18px 18px;
}

.attraction-card__type {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.12);
  border-radius: 999px;
  padding: 4px 12px;
  margin-bottom: 10px;
}

.attraction-card__name {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
}

.destinations-empty-note {
  text-align: center;
  color: rgba(255, 255, 255, 0.55);
  font-size: 14px;
  margin-bottom: 40px;
}

.destinations-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.25s ease;
}

.destinations-back-link:hover {
  color: #d4af37;
}

@media (max-width: 767px) {
  .destinations-page {
    padding: 32px 0 56px;
  }

  .destinations-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>
