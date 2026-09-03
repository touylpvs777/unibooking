<template>
  <div class="visa-guide">
    <button
      type="button"
      :class="['visa-guide-trigger', `visa-guide-trigger--${variant}`]"
      :aria-label="$t('visaGuide.modalTitle')"
      @click="openModal"
    >
      <IdcardOutlined />
      <span class="visa-guide-trigger__label">{{ $t('visaGuide.triggerLabel') }}</span>
    </button>

    <Teleport to="body">
      <Transition name="visa-modal">
        <div
          v-if="isOpen"
          class="visa-modal-overlay"
          @click.self="closeModal"
        >
          <div
            class="visa-modal"
            role="dialog"
            aria-modal="true"
            :aria-label="$t('visaGuide.modalTitle')"
          >
            <div class="visa-modal__header">
              <h2 class="visa-modal__title">{{ $t('visaGuide.modalTitle') }}</h2>
              <button
                type="button"
                class="visa-modal__close"
                :aria-label="$t('common.close')"
                @click="closeModal"
              >
                <CloseOutlined />
              </button>
            </div>

            <div class="visa-modal__tabs" role="tablist">
              <button
                v-for="tab in visaTabs"
                :key="tab.key"
                type="button"
                role="tab"
                class="visa-modal__tab"
                :class="{ 'is-active': tab.key === activeTabKey }"
                :aria-selected="tab.key === activeTabKey"
                @click="activeTabKey = tab.key"
              >
                <component :is="tab.icon" class="visa-modal__tab-icon" />
                <span>{{ tab.label }}</span>
              </button>
            </div>

            <Transition name="visa-panel" mode="out-in">
              <div :key="activeTab.key" class="visa-modal__panel">
                <div class="visa-modal__panel-header">
                  <span class="visa-modal__panel-icon">
                    <component :is="activeTab.icon" />
                  </span>
                  <h3 class="visa-modal__panel-heading">{{ activeTab.heading }}</h3>
                </div>

                <p class="visa-modal__panel-desc">{{ activeTab.description }}</p>

                <ul class="visa-modal__panel-list">
                  <li v-for="(bullet, index) in activeTab.bullets" :key="index">{{ bullet }}</li>
                </ul>

                <div class="visa-modal__notice">
                  <InfoCircleOutlined class="visa-modal__notice-icon" />
                  <p>{{ $t('visaGuide.disclaimer') }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { CarryOutOutlined, CloseOutlined, FolderOpenOutlined, IdcardOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

// 'dark' (default) is white-on-navy for the site-wide header (see
// app/layouts/default.vue); 'light' is dark-on-white for the homepage's own
// glass pill navbar (see app/pages/index.vue), which has no dark backdrop.
const props = defineProps({
  variant: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light'].includes(value)
  }
})

const { t } = useI18n()

const visaTabs = computed(() => [
  {
    key: 'eVisa',
    label: t('visaGuide.tabs.eVisa'),
    icon: IdcardOutlined,
    heading: t('visaGuide.eVisa.heading'),
    description: t('visaGuide.eVisa.description'),
    bullets: [
      t('visaGuide.eVisa.bullet1'),
      t('visaGuide.eVisa.bullet2'),
      t('visaGuide.eVisa.bullet3')
    ]
  },
  {
    key: 'voa',
    label: t('visaGuide.tabs.voa'),
    icon: CarryOutOutlined,
    heading: t('visaGuide.voa.heading'),
    description: t('visaGuide.voa.description'),
    bullets: [
      t('visaGuide.voa.bullet1'),
      t('visaGuide.voa.bullet2'),
      t('visaGuide.voa.bullet3')
    ]
  },
  {
    key: 'documents',
    label: t('visaGuide.tabs.documents'),
    icon: FolderOpenOutlined,
    heading: t('visaGuide.documents.heading'),
    description: t('visaGuide.documents.description'),
    bullets: [
      t('visaGuide.documents.bullet1'),
      t('visaGuide.documents.bullet2'),
      t('visaGuide.documents.bullet3')
    ]
  }
])

const activeTabKey = ref('eVisa')
const activeTab = computed(() => visaTabs.value.find((tab) => tab.key === activeTabKey.value) ?? visaTabs.value[0])

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

function handleKeydown(event) {
  if (event.key === 'Escape' && isOpen.value) closeModal()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Trigger: styled to match .lang-switcher in app/layouts/default.vue so it
   blends into the existing dark header rather than looking bolted on. The
   "light" variant instead matches .glass-navbar__link's colors (see
   app/pages/index.vue), for use inside the homepage's own glass pill navbar,
   which has no dark backdrop to sit on. */
.visa-guide-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color 0.2s ease;
}

.visa-guide-trigger--dark {
  padding: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
}

.visa-guide-trigger--dark:hover {
  color: #ffffff;
}

.visa-guide-trigger--light {
  padding: 10px 20px;
  color: rgba(38, 44, 61, 0.55);
  font-size: 14px;
  font-weight: 500;
}

.visa-guide-trigger--light:hover {
  color: rgba(38, 44, 61, 0.8);
}

.visa-guide-trigger__label {
  white-space: nowrap;
}

/* --- Modal: clean white card, blurred dark overlay behind it --- */
.visa-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.visa-modal {
  position: relative;
  width: min(720px, 100%);
  max-height: 88vh;
  overflow-y: auto;
  padding: 28px 32px 32px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.visa-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.visa-modal__title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
}

.visa-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #6b7280;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.visa-modal__close:hover {
  background: #f3f4f6;
  color: #111827;
}

/* Tabs: light grey track, active tab fills with the guide's dark green accent */
.visa-modal__tabs {
  display: flex;
  gap: 4px;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 14px;
  background: #f3f4f6;
}

.visa-modal__tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}

.visa-modal__tab:hover:not(.is-active) {
  color: #374151;
}

.visa-modal__tab.is-active {
  background: #14532d;
  color: #ffffff;
  box-shadow: 0 6px 14px rgba(20, 83, 45, 0.3);
}

.visa-modal__tab-icon {
  font-size: 15px;
  flex-shrink: 0;
}

.visa-modal__panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.visa-modal__panel-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(20, 83, 45, 0.1);
  color: #14532d;
  font-size: 15px;
}

.visa-modal__panel-heading {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.visa-modal__panel-desc {
  margin: 0 0 16px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
}

.visa-modal__panel-list {
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.visa-modal__panel-list li {
  position: relative;
  padding-left: 20px;
  color: #374151;
  font-size: 14px;
  line-height: 1.6;
}

.visa-modal__panel-list li::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #14532d;
}

/* Info/warning box: warm grey, matches the reference design's disclaimer panel */
.visa-modal__notice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
  background: #f6f5f1;
}

.visa-modal__notice-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: #4b5563;
  font-size: 15px;
}

.visa-modal__notice p {
  margin: 0;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.6;
}

/* Modal open/close transition: backdrop fade + panel pop */
.visa-modal-enter-active,
.visa-modal-leave-active {
  transition: opacity 0.3s ease;
}

.visa-modal-enter-active .visa-modal,
.visa-modal-leave-active .visa-modal {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.visa-modal-enter-from,
.visa-modal-leave-to {
  opacity: 0;
}

.visa-modal-enter-from .visa-modal,
.visa-modal-leave-to .visa-modal {
  transform: translateY(16px) scale(0.97);
  opacity: 0;
}

/* Tab panel swap: quick crossfade */
.visa-panel-enter-active,
.visa-panel-leave-active {
  transition: opacity 0.2s ease;
}

.visa-panel-enter-from,
.visa-panel-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .visa-modal-overlay {
    padding: 16px;
  }

  .visa-modal {
    padding: 22px 18px 26px;
    border-radius: 18px;
  }

  .visa-modal__tabs {
    gap: 3px;
    padding: 4px;
  }

  .visa-modal__tab {
    flex-direction: column;
    gap: 4px;
    padding: 8px 4px;
    font-size: 10.5px;
    line-height: 1.25;
    white-space: normal;
    text-align: center;
  }

  .visa-modal__tab-icon {
    font-size: 14px;
  }
}
</style>
