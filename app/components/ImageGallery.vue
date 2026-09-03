<template>
  <div class="bento-gallery">
    <div class="bento-gallery__card bento-gallery__card--large">
      <img src="/images/Wat-Phu-Laos.jpg" :alt="$t('imageGallery.watPhu')" class="bento-gallery__img">
      <div class="bento-gallery__overlay">
        <span class="bento-gallery__caption">{{ $t('imageGallery.watPhu') }}</span>
      </div>
    </div>
    <div class="bento-gallery__card">
      <img src="/images/patuxay.jpeg" :alt="$t('imageGallery.patuxay')" class="bento-gallery__img">
      <div class="bento-gallery__overlay">
        <span class="bento-gallery__caption">{{ $t('imageGallery.patuxay') }}</span>
      </div>
    </div>
    <div class="bento-gallery__card">
      <img src="/images/phathartlaung.jpeg" :alt="$t('imageGallery.phaThatLuang')" class="bento-gallery__img">
      <div class="bento-gallery__overlay">
        <span class="bento-gallery__caption">{{ $t('imageGallery.phaThatLuang') }}</span>
      </div>
    </div>
    <div class="bento-gallery__card">
      <img src="/images/khonephapheng.jpg" :alt="$t('imageGallery.khonePhapheng')" class="bento-gallery__img">
      <div class="bento-gallery__overlay">
        <span class="bento-gallery__caption">{{ $t('imageGallery.khonePhapheng') }}</span>
      </div>
    </div>
    <div class="bento-gallery__card">
      <img src="/images/Muaengngoy.jpg" :alt="$t('imageGallery.muangNgoi')" class="bento-gallery__img">
      <div class="bento-gallery__overlay">
        <span class="bento-gallery__caption">{{ $t('imageGallery.muangNgoi') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  height: 600px;
  width: 100%;
}

.bento-gallery__card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  grid-column: span 1;
  grid-row: span 1;
}

.bento-gallery__card--large {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.bento-gallery__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.bento-gallery__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.65) 100%);
}

.bento-gallery__caption {
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}
</style>
