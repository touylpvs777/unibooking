<template>
  <div class="blogs-page">
    <!-- Hero -->
    <section class="page-hero">
      <img src="/images/gd_image_6.webp" alt="Elephants at a forest watering hole, Laos" class="page-hero__img">
      <div class="page-hero__scrim" aria-hidden="true" />
      <div class="page-hero__content">
        <span class="page-hero__tag">{{ $t('blogs.heroTag') }}</span>
        <h1 class="page-hero__title">{{ $t('blogs.heroTitle') }}</h1>
        <p class="page-hero__subtitle">{{ $t('blogs.heroSubtitle') }}</p>
      </div>
    </section>

    <div class="container">
      <a-row :gutter="[24, 24]" class="posts-grid">
        <a-col v-for="post in posts" :key="post.titleKey" :xs="24" :sm="12" :md="8">
          <a-card :bordered="false" class="post-card">
            <template #cover>
              <div class="post-card__image-wrap">
                <img :src="post.image" :alt="$t(post.titleKey)" class="post-card__image">
                <a-tag color="gold" class="post-card__badge">{{ $t('blogs.comingSoonBadge') }}</a-tag>
              </div>
            </template>
            <h3 class="post-card__title">{{ $t(post.titleKey) }}</h3>
            <p class="post-card__excerpt">{{ $t(post.excerptKey) }}</p>
          </a-card>
        </a-col>
      </a-row>

      <a-empty
        :description="$t('blogs.emptyDescription')"
        class="posts-grid__more"
      />
    </div>
  </div>
</template>

<script setup>
const posts = [
  { titleKey: 'blogs.post1Title', excerptKey: 'blogs.post1Excerpt', image: '/images/gd_image_7.webp' },
  { titleKey: 'blogs.post2Title', excerptKey: 'blogs.post2Excerpt', image: '/images/gd_image_16.png' },
  { titleKey: 'blogs.post3Title', excerptKey: 'blogs.post3Excerpt', image: '/images/gd_image_44.webp' }
]
</script>

<style scoped>
.blogs-page {
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

/* Post cards */
.posts-grid {
  margin-bottom: 24px;
}

.post-card {
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

.post-card__image-wrap {
  position: relative;
  height: 180px;
}

.post-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
}

.post-card__title {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px;
  line-height: 1.4;
}

.post-card__excerpt {
  font-size: 13px;
  line-height: 1.7;
  color: #64748b;
  margin: 0;
}

.posts-grid__more {
  margin: 48px 0;
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
