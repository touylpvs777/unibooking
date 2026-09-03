<template>
  <div class="premium-page">
    <!-- Hero -->
    <section class="page-hero">
      <img src="/images/Muaengfuaeng.webp" alt="Luxury lake resort, Laos" class="page-hero__img">
      <div class="page-hero__scrim" aria-hidden="true" />
      <div class="page-hero__content">
        <span class="page-hero__tag">{{ $t('premium.heroTag') }}</span>
        <h1 class="page-hero__title">{{ $t('premium.heroTitle') }}</h1>
        <p class="page-hero__subtitle">{{ $t('premium.heroSubtitle') }}</p>
      </div>
    </section>

    <div class="container">
      <!-- Perks -->
      <a-row :gutter="[24, 24]" class="perks-section">
        <a-col :xs="12" :md="6">
          <a-card :bordered="false" class="perk-card">
            <CrownOutlined class="perk-card__icon" />
            <h3 class="perk-card__title">{{ $t('premium.perkExclusiveTitle') }}</h3>
            <p class="perk-card__text">{{ $t('premium.perkExclusiveText') }}</p>
          </a-card>
        </a-col>
        <a-col :xs="12" :md="6">
          <a-card :bordered="false" class="perk-card">
            <CustomerServiceOutlined class="perk-card__icon" />
            <h3 class="perk-card__title">{{ $t('premium.perkSupportTitle') }}</h3>
            <p class="perk-card__text">{{ $t('premium.perkSupportText') }}</p>
          </a-card>
        </a-col>
        <a-col :xs="12" :md="6">
          <a-card :bordered="false" class="perk-card">
            <StarOutlined class="perk-card__icon" />
            <h3 class="perk-card__title">{{ $t('premium.perkCuratedTitle') }}</h3>
            <p class="perk-card__text">{{ $t('premium.perkCuratedText') }}</p>
          </a-card>
        </a-col>
        <a-col :xs="12" :md="6">
          <a-card :bordered="false" class="perk-card">
            <SafetyCertificateOutlined class="perk-card__icon" />
            <h3 class="perk-card__title">{{ $t('premium.perkVerifiedTitle') }}</h3>
            <p class="perk-card__text">{{ $t('premium.perkVerifiedText') }}</p>
          </a-card>
        </a-col>
      </a-row>

      <!-- Gallery -->
      <section class="showcase-section">
        <span class="section-eyebrow">{{ $t('premium.showcaseEyebrow') }}</span>
        <h2 class="section-title">{{ $t('premium.showcaseTitle') }}</h2>
        <a-row :gutter="[24, 24]" class="showcase-section__grid">
          <a-col :xs="24" :sm="8">
            <div class="showcase-tile">
              <img src="/images/9b15055e-7d8a-4e4d-b1b0-b4d433d8378e.jpeg" alt="High-speed rail through Laos' mountains" class="showcase-tile__img">
              <span class="showcase-tile__caption">{{ $t('premium.showcaseCaption1') }}</span>
            </div>
          </a-col>
          <a-col :xs="24" :sm="8">
            <div class="showcase-tile">
              <img src="/images/gd_image_30.webp" alt="Golden temple roof detail, Luang Prabang" class="showcase-tile__img">
              <span class="showcase-tile__caption">{{ $t('premium.showcaseCaption2') }}</span>
            </div>
          </a-col>
          <a-col :xs="24" :sm="8">
            <div class="showcase-tile">
              <img src="/images/cropped-39.jpg" alt="Patuxay Monument, Vientiane" class="showcase-tile__img">
              <span class="showcase-tile__caption">{{ $t('premium.showcaseCaption3') }}</span>
            </div>
          </a-col>
        </a-row>
      </section>

      <!-- Waitlist -->
      <a-card :bordered="false" class="waitlist-card">
        <a-tag color="gold" class="waitlist-card__tag">{{ $t('premium.waitlistTag') }}</a-tag>
        <h2 class="waitlist-card__title">{{ $t('premium.waitlistTitle') }}</h2>
        <p class="waitlist-card__text">{{ $t('premium.waitlistText') }}</p>
        <a-button type="primary" size="large" @click="handleJoinWaitlist">
          {{ $t('premium.waitlistButton') }}
        </a-button>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'
import {
  CrownOutlined,
  CustomerServiceOutlined,
  StarOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons-vue'

const { t } = useI18n()

// No waitlist endpoint exists yet -- honest placeholder, same "not ready
// yet" pattern as pages/supplier/inventory/index.vue's handleEdit.
function handleJoinWaitlist() {
  message.info(t('common.notReadyYet'))
}
</script>

<style scoped>
.premium-page {
  padding-bottom: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero */
.page-hero {
  position: relative;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 64px;
}

.page-hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10, 20, 40, 0.35) 0%, rgba(10, 20, 40, 0.8) 100%);
}

.page-hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  padding: 0 24px;
}

.page-hero__tag {
  display: inline-block;
  letter-spacing: 2px;
  font-size: 12px;
  font-weight: 700;
  color: #c5a059;
  margin-bottom: 12px;
}

.page-hero__title {
  font-size: 42px;
  font-weight: 800;
  margin: 0 0 12px;
}

.page-hero__subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

/* Shared section bits */
.section-eyebrow {
  display: block;
  letter-spacing: 2px;
  font-size: 12px;
  font-weight: 700;
  color: #c5a059;
  margin-bottom: 8px;
}

.section-title {
  font-size: 26px;
  font-weight: 700;
  color: #14294f;
  margin: 0 0 16px;
}

/* Perks */
.perks-section {
  margin-bottom: 72px;
}

.perk-card {
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  text-align: center;
}

.perk-card__icon {
  font-size: 28px;
  color: #c5a059;
  margin-bottom: 10px;
}

.perk-card__title {
  font-size: 15px;
  font-weight: 700;
  color: #14294f;
  margin: 0 0 6px;
}

.perk-card__text {
  font-size: 12px;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

/* Showcase */
.showcase-section {
  text-align: center;
  margin-bottom: 72px;
}

.showcase-section__grid {
  margin-top: 24px;
  text-align: left;
}

.showcase-tile {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 220px;
}

.showcase-tile__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.showcase-tile::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.55) 100%);
}

.showcase-tile__caption {
  position: absolute;
  left: 16px;
  bottom: 14px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

/* Waitlist */
.waitlist-card {
  text-align: center;
  border-radius: 20px;
  padding: 24px;
  background: radial-gradient(circle at 50% -20%, #254aab 0%, #172b5c 60%, #0d1b3e 100%);
}

.waitlist-card :deep(.ant-card-body) {
  padding: 24px;
}

.waitlist-card__tag {
  margin-bottom: 16px;
}

.waitlist-card__title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
}

.waitlist-card__text {
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
  max-width: 520px;
  margin: 0 auto 24px;
}

@media (max-width: 767px) {
  .page-hero {
    height: 320px;
  }

  .page-hero__title {
    font-size: 30px;
  }
}
</style>
