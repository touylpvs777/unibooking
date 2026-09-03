<template>
  <section class="province-explorer">
    <div class="container province-explorer__inner">
      <div class="province-explorer__header">
        <span class="province-explorer__badge">{{ $t('provinceExplorer.badge') }}</span>
        <h2 class="province-explorer__title">{{ $t('provinceExplorer.title') }}</h2>
        <p class="province-explorer__subtitle">{{ $t('provinceExplorer.subtitle') }}</p>
      </div>

      <!-- Toolbox carousel: a contained widget (not edge-to-edge) with arrow
           buttons flanking a horizontally scrollable pill strip. Provinces
           are pre-sorted by tourist popularity (see laoProvinces.js), so the
           top draws are visible without touching the arrows at all. -->
      <div class="province-toolbox">
        <button
          type="button"
          class="province-nav province-nav--left"
          :aria-label="$t('provinceExplorer.scrollLeft')"
          @click="scrollProvinces(-1)"
        >
          <LeftOutlined />
        </button>

        <div
          ref="scrollContainer"
          class="province-scroll"
          role="tablist"
          :aria-label="$t('provinceExplorer.title')"
        >
          <button
            v-for="province in provinces"
            :key="province.key"
            type="button"
            role="tab"
            class="province-pill"
            :class="{ 'is-active': activeProvinceKey === province.key }"
            :aria-selected="activeProvinceKey === province.key"
            @click="selectProvince(province.key)"
          >
            {{ $t(`provinces.${province.key}.name`) }}
          </button>
        </div>

        <button
          type="button"
          class="province-nav province-nav--right"
          :aria-label="$t('provinceExplorer.scrollRight')"
          @click="scrollProvinces(1)"
        >
          <RightOutlined />
        </button>
      </div>

      <!-- District/village chips for whichever province is active -- only
           districts with at least one entry in laoAttractions are shown
           (see visibleDistricts), since a pill for a district with no
           sites would just be a dead end. -->
      <Transition name="district-fade" mode="out-in">
        <div v-if="activeProvince" :key="activeProvinceKey" class="district-panel">
          <span class="district-panel__label">
            {{ $t('provinceExplorer.districtsIn', { province: $t(`provinces.${activeProvinceKey}.name`) }) }}
          </span>
          <div v-if="visibleDistricts.length" class="district-chips">
            <a-tag
              v-for="district in visibleDistricts"
              :key="district.key"
              class="district-chip"
              @click="selectDistrict(district)"
            >
              <EnvironmentOutlined class="district-chip__icon" />
              {{ $t(`provinces.${activeProvinceKey}.districts.${district.key}`) }}
            </a-tag>
          </div>
          <p v-else class="district-panel__empty">{{ $t('provinceExplorer.noDistricts') }}</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EnvironmentOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { laoProvinces } from '~/data/laoProvinces'
import { laoAttractions } from '~/data/laoAttractions'

const router = useRouter()

const provinces = laoProvinces
const activeProvinceKey = ref(provinces[0].key)
const scrollContainer = ref(null)

const activeProvince = computed(
  () => provinces.find((province) => province.key === activeProvinceKey.value) ?? null
)

// Only districts with at least one mapped attraction are worth showing --
// see laoAttractions.js, the single source of truth for "has sites."
const visibleDistricts = computed(
  () => activeProvince.value?.districts.filter((district) => (laoAttractions[district.key]?.length ?? 0) > 0) ?? []
)

// Arrow-click distance, not a full page -- enough to bring 2-3 more pills
// into view per click without the strip jumping so far it loses context.
const PROVINCE_SCROLL_AMOUNT = 300

function scrollProvinces(direction) {
  scrollContainer.value?.scrollBy({ left: direction * PROVINCE_SCROLL_AMOUNT, behavior: 'smooth' })
}

function selectProvince(key) {
  activeProvinceKey.value = key
}

// Takes the user straight to that district's attraction grid instead of just
// filling in the search box -- see pages/destinations/index.vue, which reads
// this same district key back out of the query string.
function selectDistrict(district) {
  router.push({ path: '/destinations', query: { district: district.key } })
}
</script>

<style scoped>
/* Same dark navy/gold premium theme as the rest of index.vue's sections --
   this sits directly on the page's own #070c14 background (see app.vue),
   so unlike .modular-section/.services-grid-section it needs no backdrop
   photo or scrim of its own. */
.province-explorer {
  width: 100%;
  padding: 40px 0 64px;
}

.province-explorer__inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.province-explorer__header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
}

.province-explorer__badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.12);
  border-radius: 999px;
  padding: 6px 16px;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.province-explorer__title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
}

.province-explorer__subtitle {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0;
}

/* Toolbox: a contained glass widget (not edge-to-edge) that centers itself
   below the search bar, arrow buttons flanking the scrollable pill strip. */
.province-toolbox {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 900px;
  margin: 0 auto;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
}

/* Horizontally scrollable pill strip. No visible scrollbar -- the arrow
   buttons are the primary affordance, swiping still works underneath. */
.province-scroll {
  display: flex;
  flex: 1;
  min-width: 0;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.province-scroll::-webkit-scrollbar {
  display: none;
}

.province-nav {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.4);
  background: rgba(212, 175, 55, 0.08);
  color: #d4af37;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.province-nav:hover {
  background: #d4af37;
  border-color: #d4af37;
  color: #0a0a0a;
  transform: scale(1.1);
  box-shadow: 0 0 12px rgba(212, 175, 55, 0.5);
}

.province-nav:active {
  transform: scale(0.94);
}

.province-pill {
  flex: 0 0 auto;
  padding: 10px 22px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
}

.province-pill:hover {
  border-color: rgba(212, 175, 55, 0.5);
  background: rgba(255, 255, 255, 0.09);
  color: #ffffff;
  transform: translateY(-2px);
}

.province-pill.is-active {
  background: linear-gradient(135deg, #d4af37, #c5a059);
  border-color: transparent;
  color: #0a0a0a;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}

/* Active pill keeps its own lift-free glow on hover -- translateY(-2px)
   from .province-pill:hover above still applies, this only strengthens the
   glow so re-hovering the already-active pill doesn't feel like a dead end. */
.province-pill.is-active:hover {
  box-shadow: 0 6px 18px rgba(212, 175, 55, 0.55);
}

.district-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
}

.district-panel__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.85);
}

.district-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.district-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.district-chip:hover {
  border-color: #d4af37;
  color: #ffffff;
}

.district-chip__icon {
  color: #d4af37;
  font-size: 13px;
}

.district-panel__empty {
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
}

.district-fade-enter-active,
.district-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease;
}

.district-fade-enter-from,
.district-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .district-fade-enter-active,
  .district-fade-leave-active {
    transition-duration: 0.01s;
  }
}

@media (max-width: 767px) {
  .province-explorer {
    padding: 32px 0 48px;
  }

  .province-toolbox {
    gap: 8px;
    padding: 10px 10px;
    border-radius: 16px;
  }

  .province-nav {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }
}
</style>
