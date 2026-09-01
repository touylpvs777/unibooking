import { defineStore } from 'pinia';
import { API_LATEST_VIDEOS } from '../utils/api';

const getInitialState = () => ({
  videos: [],
  isLoading: false,
  error: null
});

export const useVideosStore = defineStore('videos', {
  state: () => getInitialState(),

  actions: {
    // ດຶງວິດີໂອລ່າສຸດ (GET /videos/latest, ຮຽງຕາມ createdAt DESC) -- public, ບໍ່ຕ້ອງລັອກອິນ
    async fetchLatestVideos(limit = 8) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_LATEST_VIDEOS, { params: { limit } });
        this.videos = data;
      } catch (err) {
        this.error = 'ບໍ່ສາມາດດຶງວິດີໂອໄດ້';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
