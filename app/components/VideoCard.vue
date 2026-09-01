<template>
  <div class="video-card" @click="$emit('play', video)">
    <div
      v-if="video.thumbnailUrl"
      class="video-card__thumb"
      :style="{ backgroundImage: `url(${video.thumbnailUrl})` }"
    />
    <!-- No thumbnailUrl is a real, expected state (see Video model), not an
         error -- this fallback replaces the old approach of piping the
         (often Lao-script) title into an external placeholder-image
         service, which had no glyphs for it and rendered as "???". -->
    <div v-else class="video-card__thumb video-card__thumb--fallback" />

    <PlayCircleFilled class="video-card__play" />

    <div class="video-card__meta">
      <span class="video-card__title">{{ video.title }}</span>
      <span class="video-card__duration">{{ video.duration }}</span>
    </div>
  </div>
</template>

<script setup>
import { PlayCircleFilled } from '@ant-design/icons-vue'

defineProps({
  video: { type: Object, required: true }
})

defineEmits(['play'])
</script>

<style scoped>
.video-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  cursor: pointer;
  border: 1px solid rgba(197, 160, 89, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 18px rgba(197, 160, 89, 0.25);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  border-color: rgba(197, 160, 89, 0.85);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6), 0 0 28px rgba(197, 160, 89, 0.4);
}

.video-card__thumb {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.video-card__thumb--fallback {
  background-image: linear-gradient(135deg, #1e293b, #0f172a);
}

.video-card__play {
  position: absolute;
  inset: 0;
  margin: auto;
  z-index: 1;
  width: 48px;
  height: 48px;
  font-size: 48px;
  color: #c5a059;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
  transition: transform 0.3s ease;
}

.video-card:hover .video-card__play {
  transform: scale(1.1);
}

.video-card__meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.92), transparent);
  color: #ffffff;
  font-size: 12px;
}

.video-card__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-card__duration {
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
