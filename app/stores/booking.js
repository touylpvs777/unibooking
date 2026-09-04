import { defineStore } from 'pinia';
import {
  API_SEARCH_SERVICES,
  API_SEARCH_HOTELS,
  API_SEARCH_TRANSPORT,
  API_SEARCH_TOURS,
  API_SEARCH_CAR_RENTALS,
  API_CREATE_BOOKING,
  API_CREATE_CHECKOUT,
  API_GET_MY_BOOKINGS,
  API_FINTINK_MOCK_WEBHOOK,
  apiPaymentStatus
} from '../utils/api';

// ຄ່າເລີ່ມຕົ້ນ (ໃຊ້ Function ເພື່ອໃຫ້ໄດ້ Object ໃໝ່ທຸກຄັ້ງທີ່ resetBooking() ຖືກເອີ້ນ)
const getInitialState = () => ({
  services: [],
  servicesMeta: null,
  selectedService: null, // real Service row from GET /services/search (has a UUID id, not the old mock hotel object)
  bookingData: {
    startDate: null,
    endDate: null,
    units: 1 // rooms/seats -- CreateBookingDto's only quantity field
  },
  paymentStatus: 'pending',
  activeBooking: null, // BookingWithItems from POST /bookings
  checkoutSession: null, // CheckoutSession from POST /payments/checkout
  bookingHistory: [],
  isLoading: false,
  error: null
});

export const useBookingStore = defineStore('booking', {
  state: () => getInitialState(),

  getters: {
    // ຈອງໄດ້ພຽງແຕ່ເມື່ອມີບໍລິການ (id ຈິງ), ວັນທີ່ເລີ່ມ/ສິ້ນສຸດ ແລະ ຈຳນວນ
    isBookingReady: (state) => {
      return Boolean(
        state.selectedService?.id &&
        state.bookingData.startDate &&
        state.bookingData.endDate &&
        state.bookingData.units > 0
      );
    },

    // ລາຄາຕໍ່ໜ່ວຍ: ດຶງຈາກ inventory ຂອງວັນທີ່ເລືອກ (ລາຄາເປັນລາຍວັນ, ບໍ່ແມ່ນລາຄາຄົງທີ່ຂອງ Service)
    unitPrice: (state) => {
      const inventory = state.selectedService?.inventory;
      if (!inventory?.length) return 0;

      const match = inventory.find((entry) => entry.date?.slice(0, 10) === state.bookingData.startDate);
      return Number(match?.price ?? inventory[0]?.price ?? 0);
    },

    totalPrice(state) {
      return this.unitPrice * (state.bookingData.units || 1);
    }
  },

  actions: {
    // ຄົ້ນຫາບໍລິການ (GET /services/search) -- public, ບໍ່ຕ້ອງລັອກອິນ
    async searchServices({ type, location, startDate, endDate, minPrice, maxPrice, sortBy, page = 1, limit = 20 } = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_SEARCH_SERVICES, {
          params: { type, location, startDate, endDate, minPrice, maxPrice, sortBy, page, limit }
        });

        this.services = data.data;
        this.servicesMeta = data.meta;
        return data;
      } catch (err) {
        this.error = 'ບໍ່ສາມາດດຶງຂໍ້ມູນບໍລິການໄດ້';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ຄົ້ນຫາໂຮງແຮມ (GET /hotels/search) -- starRating/propertyType/amenities
    // ຖືກກອງຢູ່ backend ຜ່ານ HotelDetails relation (ບໍ່ແມ່ນ client-side filter)
    async searchHotels({ location, checkInDate, checkOutDate, minPrice, maxPrice, starRating, propertyType, amenities, sortBy, page = 1, limit = 20 } = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_SEARCH_HOTELS, {
          params: { location, checkInDate, checkOutDate, minPrice, maxPrice, starRating, propertyType, amenities: amenities?.join(','), sortBy, page, limit }
        });

        this.services = data.data;
        this.servicesMeta = data.meta;
        return data;
      } catch (err) {
        this.error = 'ບໍ່ສາມາດດຶງຂໍ້ມູນໂຮງແຮມໄດ້';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ຄົ້ນຫາການເດີນທາງ (GET /transport/search) -- mode: FLIGHT|TRAIN|BUS
    async searchTransport({ mode, origin, destination, departureDate, seatClass, minPrice, maxPrice, sortBy, page = 1, limit = 20 } = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_SEARCH_TRANSPORT, {
          params: { mode, origin, destination, departureDate, seatClass, minPrice, maxPrice, sortBy, page, limit }
        });

        this.services = data.data;
        this.servicesMeta = data.meta;
        return data;
      } catch (err) {
        this.error = 'ບໍ່ສາມາດດຶງຂໍ້ມູນຖ້ຽວການເດີນທາງໄດ້';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ຄົ້ນຫາທົວທ່ອງທ່ຽວ (GET /tours/search) -- startDate ເປັນວັນທີ່ອອກເດີນທາງແບບຄົງທີ່
    // (ບໍ່ແມ່ນ check-in/check-out), category/difficulty/groupSize ຖືກກອງຢູ່ backend
    // ຜ່ານ TourDetails relation (ບໍ່ແມ່ນ client-side filter)
    async searchTours({ location, startDate, minDurationDays, maxDurationDays, category, difficulty, groupSize, minPrice, maxPrice, sortBy, page = 1, limit = 20 } = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_SEARCH_TOURS, {
          params: { location, startDate, minDurationDays, maxDurationDays, category, difficulty, groupSize, minPrice, maxPrice, sortBy, page, limit }
        });

        this.services = data.data;
        this.servicesMeta = data.meta;
        return data;
      } catch (err) {
        this.error = 'ບໍ່ສາມາດດຶງຂໍ້ມູນທົວທ່ອງທ່ຽວໄດ້';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ຄົ້ນຫາລົດເຊົ່າ (GET /car-rentals/search) -- pickupDate/returnDate ຄືກັບ
    // check-in/check-out ຂອງໂຮງແຮມ, vehicleType/transmission/minSeatingCapacity
    // ຖືກກອງຢູ່ backend ຜ່ານ CarRentalDetails relation
    async searchCarRentals({ location, pickupDate, returnDate, vehicleType, transmission, minSeatingCapacity, minPrice, maxPrice, sortBy, page = 1, limit = 20 } = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_SEARCH_CAR_RENTALS, {
          params: { location, pickupDate, returnDate, vehicleType, transmission, minSeatingCapacity, minPrice, maxPrice, sortBy, page, limit }
        });

        this.services = data.data;
        this.servicesMeta = data.meta;
        return data;
      } catch (err) {
        this.error = 'ບໍ່ສາມາດດຶງຂໍ້ມູນລົດເຊົ່າໄດ້';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ສ້າງການຈອງໃໝ່ (POST /bookings) -- ຕ້ອງລັອກອິນ, cookie ໄປພ້ອມ request ໂດຍອັດຕະໂນມັດ
    // ໝາຍເຫດ: CreateBookingDto ຮັບສະເພາະ serviceId/startDate/endDate/units ເທົ່ານັ້ນ
    // (ValidationPipe ຂອງ backend ຕັ້ງ forbidNonWhitelisted -- ຟິວອື່ນຈະເຮັດໃຫ້ 400 ທັນທີ)
    async createBooking() {
      if (!this.isBookingReady) {
        throw new Error('Booking is missing a service, date range, or unit count.');
      }

      this.isLoading = true;
      this.error = null;

      const payload = {
        serviceId: this.selectedService.id,
        startDate: this.bookingData.startDate,
        endDate: this.bookingData.endDate,
        units: this.bookingData.units
      };

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.post(API_CREATE_BOOKING, payload);

        this.activeBooking = data;
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || 'ການຈອງລົ້ມເຫຼວ ກະລຸນາລອງໃໝ່';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ສ້າງ Checkout session ສຳລັບການຈອງທີ່ຫາກໍ່ສ້າງ (POST /payments/checkout)
    // method ຕ້ອງກົງກັບ PaymentMethod ຝັ່ງ backend -- 'STRIPE_CARD' | 'LAO_QR_GATEWAY'
    // (see unibooking-backend/src/payments/gateways/payment-gateway.interface.ts).
    // ຄຳຕອບ: STRIPE_CARD -> { checkoutUrl } ໃຫ້ redirect ໄປໜ້າ Stripe;
    // LAO_QR_GATEWAY -> { qrCodeData / qrCodeImageUrl } ໃຫ້ສະແດງ QR ແລ້ວ poll
    // getPaymentStatus() ຈົນກວ່າຈະຈ່າຍສຳເລັດ (ບໍ່ມີ browser redirect ກັບມາ).
    async createCheckoutSession(method) {
      if (!this.activeBooking?.id) {
        throw new Error('No active booking to check out.');
      }

      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.post(API_CREATE_CHECKOUT, {
          bookingId: this.activeBooking.id,
          method
        });

        this.checkoutSession = data;
        this.paymentStatus = 'processing';
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || 'ບໍ່ສາມາດເລີ່ມການຊຳລະເງິນໄດ້';
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // ໃຊ້ Poll ສະຖານະການຈ່າຍເງິນ (GET /payments/status/:bookingId) -- ສຳລັບ QR
    // flow ທີ່ບໍ່ມີ browser redirect ກັບມາບອກຜົນ (ລູກຄ້າຈ່າຍຜ່ານແອັບທະນາຄານໃນມືຖື).
    async getPaymentStatus(bookingId) {
      const { $unibookingApi } = useNuxtApp();
      const { data } = await $unibookingApi.get(apiPaymentStatus(bookingId));
      return data;
    },

    // Dev/QA-only: simulates the LUD Insurance settlement partner FinTink's
    // payment webhook so the checkout page's QR flow can be exercised
    // end-to-end without a real gateway. The backend hard-404s this route
    // outside development -- see
    // unibooking-backend/src/webhooks/webhooks.controller.ts.
    async simulateMockPayment() {
      if (!this.activeBooking?.id) {
        throw new Error('No active booking to simulate payment for.');
      }

      const { $unibookingApi } = useNuxtApp();
      const { data } = await $unibookingApi.post(API_FINTINK_MOCK_WEBHOOK, {
        bookingId: this.activeBooking.id,
        status: 'SUCCESS'
      });
      return data;
    },

    // ດຶງປະຫວັດການຈອງຂອງຜູ້ໃຊ້ (GET /bookings/me) -- returns BookingWithItems[] ກົງໆ, ບໍ່ຫໍ່ envelope
    async fetchBookingHistory() {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_GET_MY_BOOKINGS);
        this.bookingHistory = data;
      } catch (err) {
        this.error = 'ບໍ່ສາມາດດຶງປະຫວັດການຈອງໄດ້';
      } finally {
        this.isLoading = false;
      }
    },

    // ຣີເຊັດ State ທັງໝົດກັບຄືນສູ່ຄ່າເລີ່ມຕົ້ນ
    resetBooking() {
      Object.assign(this, getInitialState());
    }
  }
});
