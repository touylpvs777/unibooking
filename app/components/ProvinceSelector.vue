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

      <!-- District/village chips for whichever province is active -->
      <Transition name="district-fade" mode="out-in">
        <div v-if="activeProvince" :key="activeProvinceKey" class="district-panel">
          <span class="district-panel__label">
            {{ $t('provinceExplorer.districtsIn', { province: $t(`provinces.${activeProvinceKey}.name`) }) }}
          </span>
          <div class="district-chips">
            <a-tag
              v-for="district in activeProvince.districts"
              :key="district.key"
              class="district-chip"
              :class="{ 'is-selected': selectedDistrictKey === district.key }"
              @click="selectDistrict(district)"
            >
              <EnvironmentOutlined class="district-chip__icon" />
              {{ $t(`provinces.${activeProvinceKey}.districts.${district.key}`) }}
            </a-tag>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { EnvironmentOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { laoProvinces } from '~/data/laoProvinces'

const { t } = useI18n()
const searchLocation = useSearchLocation()

const provinces = laoProvinces
const activeProvinceKey = ref(provinces[0].key)
const selectedDistrictKey = ref(null)
const scrollContainer = ref(null)

const activeProvince = computed(
  () => provinces.find((province) => province.key === activeProvinceKey.value) ?? null
)

// Arrow-click distance, not a full page -- enough to bring 2-3 more pills
// into view per click without the strip jumping so far it loses context.
const PROVINCE_SCROLL_AMOUNT = 300

function scrollProvinces(direction) {
  scrollContainer.value?.scrollBy({ left: direction * PROVINCE_SCROLL_AMOUNT, behavior: 'smooth' })
}

function selectProvince(key) {
  activeProvinceKey.value = key
  selectedDistrictKey.value = null
}

// Populates the shared "Location" state the BookingSearchForm above reads
// from (see useSearchLocation) with this district's name in the current
// locale, then scrolls the search widget into view so the result is
// immediately visible -- the whole point of putting this selector directly
// under the search form.
function selectDistrict(district) {
  selectedDistrictKey.value = district.key
  searchLocation.value = t(`provinces.${activeProvinceKey.value}.districts.${district.key}`)

  if (import.meta.client) {
    document.querySelector('.search-form-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
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
  transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease, border-color 0.25s ease;
}

.province-nav:hover {
  background: #d4af37;
  border-color: #d4af37;
  color: #0a0a0a;
  transform: scale(1.06);
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
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
}

.province-pill:hover {
  border-color: rgba(212, 175, 55, 0.5);
  color: #ffffff;
  transform: translateY(-1px);
}

.province-pill.is-active {
  background: linear-gradient(135deg, #d4af37, #c5a059);
  border-color: transparent;
  color: #0a0a0a;
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
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

.district-chip.is-selected {
  background: rgba(212, 175, 55, 0.18);
  border-color: #d4af37;
  color: #ffffff;
}

.district-chip__icon {
  color: #d4af37;
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
