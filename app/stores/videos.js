import { defineStore } from 'pinia';
import { API_LATEST_VIDEOS } from '../utils/api';

const getInitialState = () => ({
  videos: [],
  isLoading: false,
  error: null
});

// ວິດີໂອສຳຮອງ (Laos scenery Shorts) -- used only when the API is unreachable
// or the Video table is empty, so the homepage grid never renders blank.
// Shape matches VideoDto from the backend (see videos.service.ts).
const FALLBACK_VIDEOS = [
  { title: 'ຕາດກວາງຊີ ຫຼວງພະບາງ', youtubeId: 'YH-kzdM4ANo', duration: '0:30' },
  { title: 'ລ່ອງເຮືອແມ່ນ້ຳຂອງ', youtubeId: 'gTGt6U_xfMo', duration: '0:15' },
  { title: 'ທ່ຽວປາກເຊ', youtubeId: 'iCdHPjVww5M', duration: '0:20' },
  { title: 'ນະຄອນຫຼວງວຽງຈັນ', youtubeId: '0KIkqkm-jBs', duration: '0:15' },
  { title: 'ວັງວຽງ ມົນສະເໜ່ທຳມະຊາດ', youtubeId: 'U9jiyr0OGjI', duration: '0:25' },
  { title: 'ວັດຊຽງທອງ', youtubeId: 'ZZZdBUGlcfE', duration: '0:20' },
  { title: 'ກິດຈະກຳຜະຈົນໄພ ວັງວຽງ', youtubeId: '9vw4bnH2z4Y', duration: '0:28' },
  { title: 'ທຳມະຊາດຕາດກວາງຊີ', youtubeId: 'YCpIpIsouzE', duration: '0:22' }
].map((video) => {
  const [minutes, seconds] = video.duration.split(':').map(Number);
  return {
    id: video.youtubeId,
    title: video.title,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
    youtubeId: video.youtubeId,
    duration: video.duration,
    start: 0,
    end: minutes * 60 + seconds
  };
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
        this.videos = data.length > 0 ? data : FALLBACK_VIDEOS.slice(0, limit);
      } catch (err) {
        this.error = 'ບໍ່ສາມາດດຶງວິດີໂອໄດ້';
        this.videos = FALLBACK_VIDEOS.slice(0, limit);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
