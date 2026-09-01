import { defineStore } from 'pinia';
import { API_SUPPLIER_BOOKINGS } from '../utils/api';

// Same branching shape as the other supplier-portal stores
// (stores/inventory.js's resolveServiceErrorMessage).
function resolveBookingsErrorMessage(err) {
  const status = err.response?.status;
  const data = err.response?.data;

  if (status === 404) {
    return data?.message || 'ບໍ່ພົບໂປຣໄຟລ໌ຜູ້ໃຫ້ບໍລິການສຳລັບບັນຊີນີ້.';
  }
  if (status >= 500) {
    return 'ລະບົບເຊີບເວີຂັດຂ້ອງຊົ່ວຄາວ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ.';
  }
  if (!err.response) {
    return 'ບໍ່ສາມາດເຊື່ອມຕໍ່ຫາເຊີບເວີໄດ້ ກະລຸນາກວດສອບອິນເຕີເນັດ.';
  }
  return data?.message || 'ບໍ່ສາມາດດຶງຂໍ້ມູນການຈອງໄດ້.';
}

export const useSupplierBookingsStore = defineStore('supplierBookings', {
  state: () => ({
    // BookingWithItemsAndUser[] from GET /bookings/supplier -- see
    // unibooking-backend/src/bookings/bookings.service.ts.
    bookings: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchBookings() {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_SUPPLIER_BOOKINGS);
        this.bookings = data;
      } catch (err) {
        this.error = resolveBookingsErrorMessage(err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
