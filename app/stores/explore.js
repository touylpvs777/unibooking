import { defineStore } from 'pinia';
import { API_SEARCH_SERVICES } from '../utils/api';

// Same branching shape as the other stores (see stores/inventory.js's
// resolveServiceErrorMessage).
function resolveExploreErrorMessage(err) {
  const status = err.response?.status;
  const data = err.response?.data;

  if (status === 400) {
    const msg = data?.message;
    return Array.isArray(msg) ? msg.join(' ') : msg || 'ຄຳຄົ້ນຫາບໍ່ຖືກຕ້ອງ ກະລຸນາລອງໃໝ່.';
  }
  if (status >= 500) {
    return 'ລະບົບເຊີບເວີຂັດຂ້ອງຊົ່ວຄາວ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ.';
  }
  if (!err.response) {
    return 'ບໍ່ສາມາດເຊື່ອມຕໍ່ຫາເຊີບເວີໄດ້ ກະລຸນາກວດສອບອິນເຕີເນັດ.';
  }
  return data?.message || 'ບໍ່ສາມາດຄົ້ນຫາໄດ້ ກະລຸນາລອງໃໝ່.';
}

export const useExploreStore = defineStore('explore', {
  state: () => ({
    // Service[] from GET /services/search's `data` field -- see
    // unibooking-backend/src/services/services.service.ts's SearchResult.
    // `inventory` (per-night InventoryPricing rows) is only present on
    // these rows when a startDate/endDate range was passed to search() --
    // see its searchCatalog() vs date-range branch.
    services: [],
    meta: { page: 1, limit: 12, total: 0, totalPages: 0 },
    // Starts true (not false) so a fresh page load shows the loading
    // skeleton instead of flashing the "no results" a-empty state during
    // SSR/before onMounted's first search() ever runs -- same reasoning as
    // pages/admin/index.vue's own isLoading ref.
    isLoading: true,
    error: null
  }),

  actions: {
    // `location` is the only free-text filter GET /services/search supports
    // (it's a substring match against Service.location -- there's no
    // name/description search on the backend). `type` is a ServiceType
    // value ('HOTEL' | 'TOUR' | 'CAR_RENTAL' | ...) or omitted for "all".
    // `startDate`/`endDate` (ISO 'YYYY-MM-DD') must both be given or both
    // omitted -- ServicesService.search() 400s otherwise -- and, when
    // given, only services with stock on EVERY night in the range qualify
    // at all (see its own doc comment), so every returned row is really
    // bookable for that range, not just "has some availability".
    async search({ location, type, startDate, endDate, page = 1, limit = 12 } = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_SEARCH_SERVICES, {
          params: {
            location: location || undefined,
            type: type || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            page,
            limit
          }
        });
        this.services = data.data;
        this.meta = data.meta;
      } catch (err) {
        this.error = resolveExploreErrorMessage(err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
