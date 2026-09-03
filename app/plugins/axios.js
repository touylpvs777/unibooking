import axios from 'axios';
import { API_LOGIN, API_REGISTER } from '../utils/api';

// A 401 from these two endpoints means "these credentials were rejected,"
// not "your session expired" -- the blanket redirect below must not fire
// for them (see the interceptor's 401 branch).
const AUTH_ENDPOINTS_WITH_EXPECTED_401 = [API_LOGIN, API_REGISTER];

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // 1. ສ້າງ Instance ສຳລັບ UniBooking API
  const unibookingApi = axios.create({
    baseURL: config.public.apiBase,
    // Backend auth is an httpOnly cookie (see AuthController.setAuthCookie),
    // not a bearer token -- withCredentials makes the browser attach/accept
    // that cookie on cross-origin requests (frontend :3000, API :3001).
    // Paired with backend's app.enableCors({ credentials: true, origin: [...] }).
    withCredentials: true,
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*'
      }
    }
  });

  // 2. ດັກຈັບ Response ແລະ Error (ບໍ່ຕ້ອງຕິດ Authorization header ອີກຕໍ່ໄປ -- cookie ໄປເອງອັດຕະໂນມັດ)
  unibookingApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { t } = nuxtApp.$i18n;
      let errorMessage = t('errors.generic');

      if (error.response) {
        const status = error.response.status;
        // A 401 on the login/register call itself means wrong credentials,
        // not an expired session -- the caller (authStore.login/register)
        // already has its own error handling and UI for that, so this
        // interceptor must stay out of the way instead of hard-redirecting
        // to /login (which was wiping that error via a full page reload
        // before it could ever render).
        const isExpectedAuthFailure =
          status === 401 && AUTH_ENDPOINTS_WITH_EXPECTED_401.includes(error.config?.url);

        if (status === 401 && !isExpectedAuthFailure) {
          errorMessage = t('errors.sessionExpired');

          // Cookie ໝົດອາຍຸ/ບໍ່ຖືກຕ້ອງ: ສົ່ງກັບໄປໜ້າ Login
          // (ບໍ່ມີ token ໃນ localStorage ໃຫ້ລ້າງອີກຕໍ່ໄປ -- cookie ຖືກ server ຈັດການ;
          // ການ redirect ແບບ full page load ນີ້ຈະລ້າງ Pinia state ໄປໃນຕົວ)
          if (process.client) {
            window.location.href = '/login';
          }
        }
        else if (status === 403) errorMessage = t('errors.forbidden');
        else if (status === 404) errorMessage = t('errors.notFound');
        else if (status === 422) errorMessage = t('errors.validationError');
        else if (status === 500) errorMessage = t('errors.serverError');

        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = t('errors.networkError');
      }

      // ແຈ້ງເຕືອນ Error (ໃຊ້ alert ໄປກ່ອນ ດຽວເຮົາຄ່ອຍເຊື່ອມ Ant Design) — ຍົກເວັ້ນ 401 ເພາະຈະ redirect ຢູ່ແລ້ວ
      if (process.client && error.response?.status !== 401) {
        alert(errorMessage);
      }

      return Promise.reject(error);
    }
  );

  // 3. ສົ່ງອອກໃຫ້ໃຊ້ງານໄດ້ທົ່ວແອັບພລິເຄຊັນ (ເອີ້ນໃຊ້ຜ່ານ ໂຕແປ $unibookingApi)
  return {
    provide: {
      unibookingApi
    }
  };
});
