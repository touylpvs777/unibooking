import { defineStore } from 'pinia';
import {
  API_MY_SERVICES,
  API_CREATE_HOTEL,
  API_CREATE_TOUR,
  API_CREATE_CAR_RENTAL,
  API_UPLOAD_MULTIPLE,
  apiServiceDeactivate,
  apiServiceImages,
  apiServiceImage
} from '../utils/api';

// Which vertical endpoint creates a Service of this type -- each atomically
// creates the parent Service row plus its own detail row (HotelDetails/
// TourDetails/CarRentalDetails). No generic "type" field is sent to any of
// them; the endpoint itself sets it server-side.
const CREATE_ENDPOINT_BY_TYPE = {
  HOTEL: API_CREATE_HOTEL,
  TOUR: API_CREATE_TOUR,
  CAR_RENTAL: API_CREATE_CAR_RENTAL
};

// Same branching shape as resolveLoginErrorMessage/resolveRegisterErrorMessage
// in stores/auth.js -- 400 is a class-validator failure (array of per-field
// messages), 403/404 cover the ownership/not-found checks in
// ServicesService.assertOwnsService and resolveSupplierId.
function resolveServiceErrorMessage(err) {
  const status = err.response?.status;
  const data = err.response?.data;

  if (status === 400) {
    const msg = data?.message;
    return Array.isArray(msg) ? msg.join(' ') : msg || 'ຂໍ້ມູນທີ່ປ້ອນບໍ່ຖືກຕ້ອງ ກະລຸນາກວດສອບອີກຄັ້ງ.';
  }
  if (status === 403) {
    return data?.message || 'ທ່ານບໍ່ມີສິດເຮັດລາຍການນີ້.';
  }
  if (status === 404) {
    return data?.message || 'ບໍ່ພົບຂໍ້ມູນທີ່ຮ້ອງຂໍ.';
  }
  if (status >= 500) {
    return 'ລະບົບເຊີບເວີຂັດຂ້ອງຊົ່ວຄາວ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ.';
  }
  if (!err.response) {
    return 'ບໍ່ສາມາດເຊື່ອມຕໍ່ຫາເຊີບເວີໄດ້ ກະລຸນາກວດສອບອິນເຕີເນັດ.';
  }
  return data?.message || 'ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່.';
}

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    // ServiceWithDetails[] from GET /services/me -- see
    // unibooking-backend/src/services/services.service.ts.
    services: [],
    isLoading: false,
    isSubmitting: false,
    // Row-level busy flag: the id currently being deactivated, so only
    // that row's Delete button shows a spinner instead of the whole table.
    deactivatingId: null,
    // True while a batch of files is being uploaded + attached to whichever
    // service the Images modal currently has open.
    isUploadingImages: false,
    // The id of the image currently being removed, so only that thumbnail
    // shows a spinner instead of the whole modal.
    removingImageId: null,
    error: null
  }),

  actions: {
    async fetchServices() {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.get(API_MY_SERVICES);
        this.services = data;
      } catch (err) {
        this.error = resolveServiceErrorMessage(err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // `type` is 'HOTEL' | 'TOUR' | 'CAR_RENTAL' (see CREATE_ENDPOINT_BY_TYPE).
    // `payload` must already match that endpoint's own DTO shape exactly --
    // the backend's ValidationPipe has forbidNonWhitelisted: true, so any
    // field from a *different* vertical's DTO 400s instead of being ignored.
    async createService(type, payload) {
      const endpoint = CREATE_ENDPOINT_BY_TYPE[type];
      if (!endpoint) {
        throw new Error(`Unknown service type: ${type}`);
      }

      this.isSubmitting = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.post(endpoint, payload);
        // A freshly created service has no InventoryPricing rows or images
        // yet (both are set separately -- pricing via POST
        // /services/:id/inventory, photos via uploadServiceImages above) --
        // matches what GET /services/me itself returns so the table's
        // `record.inventory?.[0]` / `record.images` lookups need no extra branch.
        this.services.unshift({ inventory: [], images: [], ...data });
        return data;
      } catch (err) {
        this.error = resolveServiceErrorMessage(err);
        throw err;
      } finally {
        this.isSubmitting = false;
      }
    },

    // "Delete" in the UI, a soft-delete on the backend (PATCH .../deactivate
    // sets isActive: false -- see ServicesService.deactivate for why: Service
    // cascades onto InventoryPricing -> BookingItem, so a real delete would
    // destroy actual customers' booking history). Removed from local state
    // on success so it disappears from the table like a real delete would.
    async deactivateService(id) {
      this.deactivatingId = id;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        await $unibookingApi.patch(apiServiceDeactivate(id));
        this.services = this.services.filter((service) => service.id !== id);
      } catch (err) {
        this.error = resolveServiceErrorMessage(err);
        throw err;
      } finally {
        this.deactivatingId = null;
      }
    },

    // Two calls in sequence: raw bytes go to POST /uploads/multiple (no
    // domain link yet), then the URLs it returns get attached to this
    // service via POST /services/:id/images. `files` is a plain array of
    // native File objects (from an <input type="file" multiple"> change
    // event) -- axios serializes each into one multipart field named
    // 'files', matching FilesInterceptor('files', ...) on the backend.
    async uploadServiceImages(serviceId, files) {
      this.isUploadingImages = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const formData = new FormData();
        for (const file of files) formData.append('files', file);

        const { data: uploaded } = await $unibookingApi.post(API_UPLOAD_MULTIPLE, formData);
        const { data: images } = await $unibookingApi.post(apiServiceImages(serviceId), {
          urls: uploaded.map((f) => f.url)
        });

        const service = this.services.find((s) => s.id === serviceId);
        if (service) service.images = [...(service.images || []), ...images];

        return images;
      } catch (err) {
        this.error = resolveServiceErrorMessage(err);
        throw err;
      } finally {
        this.isUploadingImages = false;
      }
    },

    async removeServiceImage(serviceId, imageId) {
      this.removingImageId = imageId;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        await $unibookingApi.delete(apiServiceImage(serviceId, imageId));

        const service = this.services.find((s) => s.id === serviceId);
        if (service) service.images = (service.images || []).filter((img) => img.id !== imageId);
      } catch (err) {
        this.error = resolveServiceErrorMessage(err);
        throw err;
      } finally {
        this.removingImageId = null;
      }
    }
  }
});
