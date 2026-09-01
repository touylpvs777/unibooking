<template>
  <div class="register-page">
    <a-card class="register-card" :bordered="false">
      <h1 class="register-title">ສະໝັກສະມາຊິກ</h1>

      <a-form ref="formRef" layout="vertical" :model="form" @finish="handleSubmit">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="12">
            <a-form-item
              label="ຊື່"
              name="firstName"
              :rules="[{ required: true, message: 'ກະລຸນາປ້ອນຊື່' }]"
            >
              <a-input v-model:value="form.firstName" size="large" placeholder="ຊື່" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-item
              label="ນາມສະກຸນ"
              name="lastName"
              :rules="[{ required: true, message: 'ກະລຸນາປ້ອນນາມສະກຸນ' }]"
            >
              <a-input v-model:value="form.lastName" size="large" placeholder="ນາມສະກຸນ" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item
          label="ອີເມວ"
          name="email"
          :rules="[
            { required: true, message: 'ກະລຸນາປ້ອນອີເມວ' },
            { type: 'email', message: 'ຮູບແບບອີເມວບໍ່ຖືກຕ້ອງ' }
          ]"
        >
          <a-input v-model:value="form.email" size="large" placeholder="you@example.com" />
        </a-form-item>

        <a-form-item
          label="ລະຫັດຜ່ານ"
          name="password"
          :rules="[
            { required: true, message: 'ກະລຸນາປ້ອນລະຫັດຜ່ານ' },
            { min: 8, message: 'ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ' }
          ]"
        >
          <a-input-password
            v-model:value="form.password"
            size="large"
            placeholder="••••••••"
            @change="revalidateConfirmPassword"
          />
        </a-form-item>

        <a-form-item
          label="ຢືນຢັນລະຫັດຜ່ານ"
          name="confirmPassword"
          :rules="[{ validator: validateConfirmPassword, trigger: 'change' }]"
        >
          <a-input-password v-model:value="form.confirmPassword" size="large" placeholder="••••••••" />
        </a-form-item>

        <a-alert
          v-if="authStore.error"
          type="error"
          show-icon
          :message="authStore.error"
          class="register-error"
        />

        <a-button
          type="primary"
          size="large"
          html-type="submit"
          block
          :loading="authStore.isLoading"
        >
          ສະໝັກສະມາຊິກ
        </a-button>

        <p class="register-login-hint">
          ມີບັນຊີແລ້ວ?
          <NuxtLink to="/login">ເຂົ້າສູ່ລະບົບ</NuxtLink>
        </p>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

// Nuxt/Pinia auto-imports: reactive, ref, useAuthStore, useRouter
const authStore = useAuthStore()
const router = useRouter()

const formRef = ref(null)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

async function validateConfirmPassword(_rule, value) {
  if (!value) {
    return Promise.reject('ກະລຸນາຢືນຢັນລະຫັດຜ່ານ')
  }
  if (value !== form.password) {
    return Promise.reject('ລະຫັດຜ່ານບໍ່ຕົງກັນ')
  }
  return Promise.resolve()
}

// Password and its confirmation are validated independently by antd, so
// without this, fixing the password field after a mismatch error leaves
// the (still-typed-first) confirmation field showing a stale error.
function revalidateConfirmPassword() {
  if (form.confirmPassword) {
    formRef.value?.validateFields(['confirmPassword'])
  }
}

async function handleSubmit() {
  try {
    await authStore.register({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName
    })
    message.success('ສະໝັກສະມາຊິກສຳເລັດ! ກະລຸນາເຂົ້າສູ່ລະບົບ.')
    router.push('/login')
  } catch {
    // authStore.error ຖືກຕັ້ງຄ່າແລ້ວພາຍໃນ store ແລະສະແດງຜ່ານ a-alert ຂ້າງເທິງ
  }
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 64px - 70px - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f9ff;
  padding: 24px 0;
}

.register-card {
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(2, 132, 199, 0.15);
}

.register-title {
  text-align: center;
  color: #0c4a6e;
  margin-bottom: 24px;
}

.register-error {
  margin-bottom: 16px;
}

.register-login-hint {
  text-align: center;
  margin: 16px 0 0;
  color: rgba(0, 0, 0, 0.65);
}
</style>
