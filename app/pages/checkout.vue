<template>
  <div v-if="isAuthorized" class="checkout-page">
    <a-row :gutter="32">
      <!-- Left: contact info + dates/units + payment method -->
      <a-col :xs="24" :lg="16">
        <a-card class="section-card" :bordered="false">
          <h2 class="section-card__title">ຂໍ້ມູນຜູ້ຕິດຕໍ່</h2>

          <!-- Display-only: the booking is tied to the logged-in account
               (POST /bookings reads the user from the JWT cookie), and
               CreateBookingDto has no contact fields to send -- backend's
               ValidationPipe (forbidNonWhitelisted) would 400 on extras.
               Kept here as a pre-filled confirmation, not transmitted. -->
          <a-form layout="vertical" :model="contactInfo">
            <a-row :gutter="16">
              <a-col :xs="24" :sm="12">
                <a-form-item
                  label="ຊື່ ແລະ ນາມສະກຸນ"
                  name="fullName"
                  :rules="[{ required: true, message: 'ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ' }]"
                >
                  <a-input v-model:value="contactInfo.fullName" size="large" disabled />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="12">
                <a-form-item
                  label="ອີເມວ"
                  name="email"
                  :rules="[{ required: true, message: 'ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ' }]"
                >
                  <a-input v-model:value="contactInfo.email" size="large" disabled />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>

        <a-card class="section-card" :bordered="false">
          <h2 class="section-card__title">ວັນທີ່ ແລະ ຈຳນວນ</h2>

          <a-row :gutter="16">
            <a-col :xs="24" :sm="8">
              <label class="field-label">ວັນທີ່ເລີ່ມ</label>
              <a-input v-model:value="bookingStore.bookingData.startDate" type="date" size="large" />
            </a-col>
            <a-col :xs="24" :sm="8">
              <label class="field-label">ວັນທີ່ສິ້ນສຸດ</label>
              <a-input v-model:value="bookingStore.bookingData.endDate" type="date" size="large" />
            </a-col>
            <a-col :xs="24" :sm="8">
              <label class="field-label">ຈຳນວນ (ຫ້ອງ / ບ່ອນນັ່ງ)</label>
              <a-input-number v-model:value="bookingStore.bookingData.units" :min="1" size="large" style="width: 100%" />
            </a-col>
          </a-row>
        </a-card>

        <a-card class="section-card" :bordered="false">
          <h2 class="section-card__title">ຊ່ອງທາງຊຳລະເງິນ</h2>

          <a-radio-group v-model:value="paymentMethod" class="payment-options">
            <a-radio
              v-for="option in paymentOptions"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled"
              class="payment-option"
            >
              <component :is="option.icon" class="payment-option__icon" />
              <span class="payment-option__label">{{ option.label }}</span>
            </a-radio>
          </a-radio-group>
        </a-card>
      </a-col>

      <!-- Right: sticky booking summary -->
      <a-col :xs="24" :lg="8">
        <a-card class="summary-card" :bordered="false">
          <template v-if="!bookingStore.selectedService">
            <a-empty description="ຍັງບໍ່ໄດ້ເລືອກບໍລິການ">
              <a-button type="primary" @click="router.push('/hotels')">
                ກັບໄປໜ້າໂຮງແຮມ
              </a-button>
            </a-empty>
          </template>

          <template v-else>
            <h3 class="summary-card__name">{{ bookingStore.selectedService.name }}</h3>
            <p class="summary-card__location">{{ bookingStore.selectedService.location }}</p>
            <p v-if="bookingStore.bookingData.startDate && bookingStore.bookingData.endDate" class="summary-card__dates">
              <CalendarOutlined />
              {{ bookingStore.bookingData.startDate }} → {{ bookingStore.bookingData.endDate }}
            </p>

            <a-divider />

            <div class="price-row">
              <span>ລາຄາຕໍ່ໜ່ວຍ x {{ bookingStore.bookingData.units }}</span>
              <span>₭ {{ formatPrice(basePrice) }}</span>
            </div>
            <div class="price-row">
              <span>ພາສີ ແລະ ຄ່າທຳນຽມ (10%)</span>
              <span>₭ {{ formatPrice(taxAmount) }}</span>
            </div>

            <a-divider />

            <div class="price-row price-row--total">
              <span>ລາຄາລວມ</span>
              <span class="price-row__total-value">₭ {{ formatPrice(totalWithTax) }}</span>
            </div>

            <a-alert v-if="!bookingStore.isBookingReady" type="warning" show-icon message="ກະລຸນາປ້ອນວັນທີ່ ແລະ ຈຳນວນໃຫ້ຄົບຖ້ວນ" class="ready-alert" />
            <a-alert
              v-if="bookingStore.error"
              type="error"
              show-icon
              closable
              :message="bookingStore.error"
              class="ready-alert"
              @close="bookingStore.error = null"
            />

            <a-button
              type="primary"
              size="large"
              block
              class="confirm-btn"
              :disabled="!bookingStore.isBookingReady || !authStore.isAuthenticated"
              :loading="isSubmitting"
              @click="handleConfirmBooking"
            >
              ຢືນຢັນການຈອງ
            </a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>

    <!-- QR payment flow: the customer pays on their own banking app, away
         from this browser tab, so there's no redirect to carry a result
         back the way Stripe's success_url does -- this polls instead. -->
    <a-modal
      v-model:open="qrModalVisible"
      title="ສະແກນ QR ເພື່ອຊຳລະເງິນ"
      :footer="null"
      :closable="!isPolling"
      :mask-closable="false"
      @cancel="closeQrModal"
    >
      <div class="qr-modal">
        <img v-if="qrImageSrc" :src="qrImageSrc" alt="Payment QR code" class="qr-modal__image">
        <p class="qr-modal__hint">
          ເປີດແອັບທະນາຄານຂອງທ່ານ ແລ້ວສະແກນ QR ນີ້ເພື່ອຊຳລະເງິນ. ໜ້ານີ້ຈະອັບເດດອັດຕະໂນມັດເມື່ອຈ່າຍສຳເລັດ.
        </p>
        <a-spin v-if="isPolling" size="small" />
        <a-button v-if="isPolling" type="text" danger @click="closeQrModal">
          ຍົກເລີກ
        </a-button>
      </div>
    </a-modal>
  </div>

  <div v-else class="checkout-page-loading">
    <a-spin size="large" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { Modal, message } from 'ant-design-vue'
import QRCode from 'qrcode'
import { QrcodeOutlined, CreditCardOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '~/stores/auth'
import { useBookingStore } from '~/stores/booking'

// POST /bookings and POST /payments/checkout both require the auth cookie.
// The actual check now lives in middleware/auth.js (skips on the server --
// see its own comment for why); isAuthorized below is this page's own
// client-side half of the same belt-and-suspenders pattern used by
// layouts/admin.vue and layouts/supplier.vue, so a hard refresh here never
// flashes the real order summary/payment form before that check resolves.
definePageMeta({ middleware: ['auth'] })

const authStore = useAuthStore()
const bookingStore = useBookingStore()
const router = useRouter()

const isAuthorized = ref(false)
const isSubmitting = ref(false)

onMounted(async () => {
  await authStore.initAuth()

  if (!authStore.isAuthenticated) {
    navigateTo('/login')
  } else {
    isAuthorized.value = true
  }
})

const contactInfo = reactive({ fullName: '', email: '' })
watch(
  () => authStore.user,
  (user) => {
    contactInfo.fullName = authStore.fullName
    contactInfo.email = user?.email ?? ''
  },
  { immediate: true }
)

// Maps this page's payment options to unibooking-backend's PaymentMethod
// (see src/payments/gateways/payment-gateway.interface.ts). 'hotel' has no
// backend support -- there's no path to confirm a booking without a
// gateway payment, and letting it through would just hold real inventory
// for 15 minutes (HOLD_MINUTES in bookings.service.ts) before the cron
// auto-cancels it -- so it's shown but disabled rather than silently
// faked as success.
const PAYMENT_METHOD_MAP = { qr: 'LAO_QR_GATEWAY', card: 'STRIPE_CARD' }

const paymentOptions = [
  { value: 'qr', label: 'BCEL One / QR Pay', icon: QrcodeOutlined },
  { value: 'card', label: 'Credit/Debit Card', icon: CreditCardOutlined },
  { value: 'hotel', label: 'Pay at Hotel (coming soon)', icon: HomeOutlined, disabled: true }
]
const paymentMethod = ref('qr')

const basePrice = computed(() => bookingStore.totalPrice)
const taxAmount = computed(() => Math.round(basePrice.value * 0.1))
const totalWithTax = computed(() => basePrice.value + taxAmount.value)

function formatPrice(value) {
  return new Intl.NumberFormat('lo-LA').format(value ?? 0)
}

// QR flow state: the customer completes payment on their own banking app,
// so this page finds out by polling GET /payments/status/:bookingId rather
// than a redirect callback.
const qrModalVisible = ref(false)
const qrImageSrc = ref('')
const isPolling = ref(false)
let pollTimer = null
let pollAttempts = 0
const POLL_INTERVAL_MS = 3000
const MAX_POLL_ATTEMPTS = 100 // ~5 min -- well inside the 15-min booking hold; a payment that lands after this still confirms via the webhook, just without this tab watching for it

function stopPolling() {
  isPolling.value = false
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

function closeQrModal() {
  stopPolling()
  qrModalVisible.value = false
}

function showBookingConfirmedModal() {
  Modal.success({
    title: 'ຊຳລະເງິນສຳເລັດແລ້ວ!',
    content: `ລະຫັດການຈອງ: ${bookingStore.activeBooking.bookingReference}. ຂອບໃຈທີ່ໃຊ້ບໍລິການ UniBooking.`,
    okText: 'ໄປທີ່ໜ້າໂປຣໄຟລ໌',
    onOk: () => {
      bookingStore.resetBooking()
      router.push('/profile')
    }
  })
}

async function pollUntilConfirmed(bookingId) {
  pollAttempts = 0
  isPolling.value = true

  pollTimer = setInterval(async () => {
    pollAttempts += 1
    try {
      const { bookingStatus, paymentStatus } = await bookingStore.getPaymentStatus(bookingId)

      if (bookingStatus === 'CONFIRMED') {
        stopPolling()
        qrModalVisible.value = false
        showBookingConfirmedModal()
        return
      }
      if (bookingStatus === 'CANCELLED' || paymentStatus === 'FAILED') {
        stopPolling()
        qrModalVisible.value = false
        message.error('ການຊຳລະເງິນລົ້ມເຫຼວ ຫຼື ໝົດເວລາ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ')
        return
      }
    } catch {
      // Transient network error -- keep polling, the interceptor already
      // surfaced anything the user needs to see for a hard failure.
    }

    if (pollAttempts >= MAX_POLL_ATTEMPTS) {
      stopPolling()
    }
  }, POLL_INTERVAL_MS)
}

async function handleConfirmBooking() {
  if (!bookingStore.isBookingReady) {
    message.error('ກະລຸນາປ້ອນວັນທີ່ ແລະ ຈຳນວນໃຫ້ຄົບຖ້ວນ')
    return
  }

  const method = PAYMENT_METHOD_MAP[paymentMethod.value]
  if (!method) {
    message.warning('ຊ່ອງທາງນີ້ຍັງບໍ່ພ້ອມໃຊ້ງານ ກະລຸນາເລືອກຊ່ອງທາງອື່ນ')
    return
  }

  isSubmitting.value = true

  try {
    await bookingStore.createBooking()
    const session = await bookingStore.createCheckoutSession(method)

    if (method === 'STRIPE_CARD') {
      // Full redirect to Stripe's hosted checkout page -- card details
      // never touch this app. Stripe sends the browser back to
      // STRIPE_SUCCESS_URL/CANCEL_URL (see .env), which /checkout-result
      // reads to show the final status.
      window.location.href = session.checkoutUrl
      return
    }

    // LAO_QR_GATEWAY: render the provider's QR payload as a scannable
    // image (or use its own hosted image if it already returned one) and
    // start polling for confirmation.
    qrImageSrc.value = session.qrCodeImageUrl
      || (session.qrCodeData ? await QRCode.toDataURL(session.qrCodeData) : '')
    qrModalVisible.value = true
    await pollUntilConfirmed(bookingStore.activeBooking.id)
  } catch {
    // bookingStore.error is set; the axios interceptor already alerted the raw message
  } finally {
    isSubmitting.value = false
  }
}

onUnmounted(stopPolling)
</script>

<style scoped>
.checkout-page {
  background: #f8fafc;
  padding: 40px 24px;
  border-radius: 16px;
}

.checkout-page-loading {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-card {
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  margin-bottom: 24px;
}

.section-card__title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 20px;
}

.field-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

/* Payment method: large selectable blocks instead of plain radios */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.payment-option {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 !important;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.payment-option:hover {
  border-color: #1e40af;
}

.payment-option :deep(.ant-radio) {
  order: -1;
}

.payment-option :deep(span:not(.ant-radio)) {
  display: flex;
  align-items: center;
  width: 100%;
}

.payment-option.ant-radio-wrapper-checked {
  border-color: #1e40af;
  background: rgba(30, 64, 175, 0.04);
}

.payment-option__icon {
  font-size: 22px;
  color: #1e40af;
  margin: 0 12px;
}

.payment-option__label {
  font-size: 15px;
  font-weight: 500;
  color: #0f172a;
}

/* Summary */
.summary-card {
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  position: sticky;
  top: 100px;
}

.summary-card__name {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.summary-card__location {
  font-size: 13px;
  color: #64748b;
}

.summary-card__dates {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748b;
  margin-top: 8px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 10px;
}

.price-row--total {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 20px;
}

.price-row__total-value {
  font-size: 22px;
  color: #1e40af;
}

.ready-alert {
  margin-bottom: 16px;
}

.confirm-btn {
  margin-top: 4px;
}

/* QR payment modal */
.qr-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 8px 0 16px;
  text-align: center;
}

.qr-modal__image {
  width: 220px;
  height: 220px;
  object-fit: contain;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
}

.qr-modal__hint {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

@media (max-width: 991px) {
  .summary-card {
    position: static;
  }
}

@media (max-width: 767px) {
  .checkout-page {
    padding: 24px 16px;
  }
}
</style>
