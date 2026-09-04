<template>
  <div class="module-banner">
    <img :src="image" :alt="title" class="module-banner__image">
    <div class="module-banner__scrim" aria-hidden="true" />
    <div class="module-banner__content">
      <h1 class="module-banner__title">{{ title }}</h1>
      <p v-if="subtitle" class="module-banner__subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
// Shared hero banner for every module listing page (Hotels, Transport,
// Flights, Cars, Tours, Insurance) -- `image` is always a real static asset
// path from public/images/ (see utils/serviceImages.js's defaultImageForType,
// which every caller uses to pick it), so the banner never depends on a
// remote/mock image service to render.
defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<style scoped>
.module-banner {
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 24px;
}

.module-banner__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.module-banner__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 15, 26, 0.88) 0%, rgba(10, 15, 26, 0.4) 55%, rgba(10, 15, 26, 0.05) 100%);
}

.module-banner__content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  color: #ffffff;
}

.module-banner__title {
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 6px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.module-banner__subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.92);
  max-width: 560px;
  margin-bottom: 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

@media (max-width: 767px) {
  .module-banner {
    height: 180px;
    border-radius: 12px;
    margin-bottom: 16px;
  }

  .module-banner__content {
    padding: 20px;
  }

  .module-banner__title {
    font-size: 22px;
  }

  .module-banner__subtitle {
    font-size: 13px;
  }
}
</style>
