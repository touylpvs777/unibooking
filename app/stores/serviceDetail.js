import { defineStore } from 'pinia';
import { apiServiceDetail } from '../utils/api';

// Same branching shape as the other stores (see stores/explore.js's
// resolveExploreErrorMessage).
function resolveServiceDetailErrorMessage(err) {
  const status = err.response?.status;
  const data = err.response?.data;

  if (status === 404) {
    return data?.message || 'ບໍ່ພົບບໍລິການທີ່ທ່ານຕ້ອງການ.';
  }
  if (status === 400) {
    const msg = data?.message;
    return Array.isArray(msg) ? msg.join(' ') : msg || 'ຄຳຮ້ອງຂໍບໍ່ຖືກຕ້ອງ.';
  }
  if (status >= 500) {
    return 'ລະບົບເຊີບເວີຂັດຂ້ອງຊົ່ວຄາວ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ.';
  }
  if (!err.response) {
    return 'ບໍ່ສາມາດເຊື່ອມຕໍ່ຫາເຊີບເວີໄດ້ ກະລຸນາກວດສອບອິນເຕີເນັດ.';
  }
  return data?.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນບໍລິການໄດ້.';
}

export const useServiceDetailStore = defineStore('serviceDetail', {
  state: () => ({
    // ServiceDetail from GET /services/:id -- see
    // unibooking-backend/src/services/services.service.ts.
    service: null,
    // Starts true so the page shows its skeleton instead of a blank shell
    // during SSR/before onMounted's first fetchService() ever runs -- same
    // reasoning as stores/explore.js's own isLoading default.
    isLoading: true,
    error: null
  }),

  actions: {
    // `startDate`/`endDate` (ISO 'YYYY-MM-DD') are optional and must be
    // given together -- when present, the response's `inventory` carries
    // the matching per-night InventoryPricing rows for that exact range;
    // omitted entirely otherwise (see ServicesService.findOne).
    async fetchService(id, { startDate, endDate } = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(apiServiceDetail(id), {
          params: {
            startDate: startDate || undefined,
            endDate: endDate || undefined
          }
        });
        this.service = data;
      } catch (err) {
        this.error = resolveServiceDetailErrorMessage(err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
