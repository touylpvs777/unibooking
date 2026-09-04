<template>
  <div class="top-destinations">
    <div
      v-for="(item, index) in destinations"
      :key="item.title"
      class="top-destinations__item"
      :class="{ 'top-destinations__item--feature': index === 0 }"
    >
      <img :src="item.image" :alt="item.title" class="top-destinations__img">
      <div class="top-destinations__overlay">
        <span class="top-destinations__title">{{ item.title }}</span>
        <span class="top-destinations__subtitle">{{ item.subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { t } = useI18n()

const destinations = computed(() => [
  { title: t('topDestinations.vangVieng.title'), subtitle: t('topDestinations.vangVieng.subtitle'), image: '/images/hero-bg.jpg' },
  { title: t('topDestinations.luangPrabang.title'), subtitle: t('topDestinations.luangPrabang.subtitle'), image: '/images/Tardkaungse.png' },
  { title: t('topDestinations.vientiane.title'), subtitle: t('topDestinations.vientiane.subtitle'), image: '/images/patuxay.jpeg' },
  { title: t('topDestinations.champasak.title'), subtitle: t('topDestinations.champasak.subtitle'), image: '/images/Wat-Phu-Laos.jpg' },
  { title: t('topDestinations.pakse.title'), subtitle: t('topDestinations.pakse.subtitle'), image: '/images/khonephapheng.jpg' }
])
</script>

<style scoped>
.top-destinations {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 20px;
  column-gap: 2rem;
  height: 600px;
}

.top-destinations__item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  min-height: 0;
  min-width: 0;
}

.top-destinations__item--feature {
  grid-column: span 2;
  grid-row: span 2;
}

.top-destinations__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.top-destinations__item:hover .top-destinations__img {
  transform: scale(1.1);
}

.top-destinations__overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.92), transparent 65%);
}

.top-destinations__title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

.top-destinations__subtitle {
  font-size: 12px;
  letter-spacing: 1px;
  color: #d9c9a3;
  margin-top: 4px;
}

.top-destinations__item--feature .top-destinations__title {
  font-size: 26px;
}

@media (max-width: 1024px) and (min-width: 768px) {
  .top-destinations {
    grid-template-columns: repeat(2, 1fr);
  }

  .top-destinations__item--feature {
    grid-column: span 2;
    grid-row: span 1;
  }
}

@media (max-width: 767px) {
  .top-destinations {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 220px);
    height: auto;
  }

  .top-destinations__item--feature {
    grid-column: span 1;
    grid-row: span 1;
  }
}
</style>
