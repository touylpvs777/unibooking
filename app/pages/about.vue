<template>
  <div class="about-page">
    <!-- Hero -->
    <section class="page-hero">
      <img src="/images/gd_image_8.webp" alt="Wat Xieng Thong, Luang Prabang" class="page-hero__img">
      <div class="page-hero__scrim" aria-hidden="true" />
      <div class="page-hero__content">
        <span class="page-hero__tag">OUR STORY</span>
        <h1 class="page-hero__title">About UniBooking</h1>
        <p class="page-hero__subtitle">Connecting travelers to the real Laos -- one booking at a time.</p>
      </div>
    </section>

    <div class="container">
      <!-- Story -->
      <a-row :gutter="[48, 32]" class="story-section">
        <a-col :xs="24" :md="12" class="story-section__text">
          <span class="section-eyebrow">WHO WE ARE</span>
          <h2 class="section-title">Built in Laos, for Laos travel</h2>
          <p class="section-body">
            UniBooking started with a simple idea: booking a trip across Laos --
            hotels, tours, car rentals, and everything in between -- shouldn't
            mean juggling five different websites. We bring every part of your
            journey into one platform, backed by local suppliers who know the
            country best.
          </p>
          <p class="section-body">
            From the golden temples of Luang Prabang to the rolling hills of
            Xieng Khouang, we work directly with hotels, tour operators, and
            drivers across the country so every booking supports a local
            business.
          </p>
        </a-col>
        <a-col :xs="24" :md="12">
          <img src="/images/pralartsavung%20kao.jpg" alt="Royal Palace grounds, Luang Prabang" class="story-section__img">
        </a-col>
      </a-row>

      <!-- Stats -->
      <a-row :gutter="[24, 24]" class="stats-section">
        <a-col :xs="12" :md="6">
          <a-statistic title="Destinations Covered" :value="18" suffix="ແຂວງ" />
        </a-col>
        <a-col :xs="12" :md="6">
          <a-statistic title="Local Partners" :value="200" suffix="+" />
        </a-col>
        <a-col :xs="12" :md="6">
          <a-statistic title="Happy Travelers" :value="10000" suffix="+" />
        </a-col>
        <a-col :xs="12" :md="6">
          <a-statistic title="Customer Support" value="24/7" />
        </a-col>
      </a-row>

      <!-- Gallery -->
      <section class="gallery-section">
        <span class="section-eyebrow">THE LANDSCAPE WE BOOK</span>
        <h2 class="section-title">A country worth discovering</h2>
        <a-row :gutter="[24, 24]" class="gallery-section__grid">
          <a-col :xs="24" :sm="12">
            <div class="gallery-tile">
              <img src="/images/thonghaiheen.jpg" alt="Plain of Jars, Xieng Khouang" class="gallery-tile__img">
              <span class="gallery-tile__caption">Plain of Jars, Xieng Khouang</span>
            </div>
          </a-col>
          <a-col :xs="24" :sm="12">
            <div class="gallery-tile">
              <img src="/images/gd_image_33.webp" alt="Rural highlands of Laos" class="gallery-tile__img">
              <span class="gallery-tile__caption">Rural highlands, Northern Laos</span>
            </div>
          </a-col>
        </a-row>
      </section>

      <!-- Values -->
      <a-row :gutter="[24, 24]" class="values-section">
        <a-col :xs="24" :md="8">
          <a-card :bordered="false" class="value-card">
            <CompassOutlined class="value-card__icon" />
            <h3 class="value-card__title">Our Mission</h3>
            <p class="value-card__text">Make booking travel across Laos as easy as booking anywhere else in the world.</p>
          </a-card>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-card :bordered="false" class="value-card">
            <TeamOutlined class="value-card__icon" />
            <h3 class="value-card__title">Our Community</h3>
            <p class="value-card__text">Every listing comes from a real local supplier -- hotels, guides, and drivers we work with directly.</p>
          </a-card>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-card :bordered="false" class="value-card">
            <SafetyCertificateOutlined class="value-card__icon" />
            <h3 class="value-card__title">Our Promise</h3>
            <p class="value-card__text">Transparent pricing, verified suppliers, and real support whenever you need it.</p>
          </a-card>
        </a-col>
      </a-row>

      <!-- CTA -->
      <section class="cta-section">
        <h2 class="cta-section__title">Ready to start exploring?</h2>
        <NuxtLink to="/explore">
          <a-button type="primary" size="large">Explore Services</a-button>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup>
import { CompassOutlined, TeamOutlined, SafetyCertificateOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.about-page {
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
  background: linear-gradient(180deg, rgba(10, 20, 40, 0.35) 0%, rgba(10, 20, 40, 0.75) 100%);
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

.section-body {
  font-size: 14px;
  line-height: 1.9;
  color: #64748b;
  margin-bottom: 16px;
}

/* Story */
.story-section {
  align-items: center;
  margin-bottom: 72px;
}

.story-section__img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
}

/* Stats */
.stats-section {
  text-align: center;
  padding: 32px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  margin-bottom: 72px;
}

.stats-section :deep(.ant-statistic-title) {
  color: #64748b;
}

.stats-section :deep(.ant-statistic-content) {
  color: #14294f;
  font-weight: 700;
}

/* Gallery */
.gallery-section {
  text-align: center;
  margin-bottom: 72px;
}

.gallery-section__grid {
  margin-top: 24px;
  text-align: left;
}

.gallery-tile {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 260px;
}

.gallery-tile__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-tile__caption {
  position: absolute;
  left: 16px;
  bottom: 14px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.gallery-tile::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.55) 100%);
}

/* Values */
.values-section {
  margin-bottom: 72px;
}

.value-card {
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  text-align: center;
}

.value-card__icon {
  font-size: 32px;
  color: #c5a059;
  margin-bottom: 12px;
}

.value-card__title {
  font-size: 17px;
  font-weight: 700;
  color: #14294f;
  margin: 0 0 8px;
}

.value-card__text {
  font-size: 13px;
  line-height: 1.7;
  color: #64748b;
  margin: 0;
}

/* CTA */
.cta-section {
  text-align: center;
  padding: 48px 24px;
}

.cta-section__title {
  font-size: 22px;
  font-weight: 700;
  color: #14294f;
  margin-bottom: 20px;
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
