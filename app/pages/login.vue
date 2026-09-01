<template>
  <div class="login-page">
    <a-card class="login-card" :bordered="false">
      <h1 class="login-title">ເຂົ້າສູ່ລະບົບ</h1>

      <a-form layout="vertical" :model="form" @finish="handleSubmit">
        <a-form-item
          label="ອີເມວ"
          name="email"
          :rules="[{ required: true, message: 'ກະລຸນາປ້ອນອີເມວ' }]"
        >
          <a-input v-model:value="form.email" size="large" placeholder="you@example.com" />
        </a-form-item>

        <a-form-item
          label="ລະຫັດຜ່ານ"
          name="password"
          :rules="[{ required: true, message: 'ກະລຸນາປ້ອນລະຫັດຜ່ານ' }]"
        >
          <a-input-password v-model:value="form.password" size="large" placeholder="••••••••" />
        </a-form-item>

        <a-alert
          v-if="authStore.error"
          type="error"
          show-icon
          :message="authStore.error"
          class="login-error"
        />

        <a-button
          type="primary"
          size="large"
          html-type="submit"
          block
          :loading="authStore.isLoading"
        >
          ເຂົ້າສູ່ລະບົບ
        </a-button>

        <p class="login-register-hint">
          ຍັງບໍ່ມີບັນຊີ?
          <NuxtLink to="/register">ສະໝັກສະມາຊິກ</NuxtLink>
        </p>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'

// Nuxt/Pinia auto-imports: reactive, useAuthStore, useRouter
const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

async function handleSubmit() {
  try {
    await authStore.login(form.email, form.password)
    message.success('ເຂົ້າສູ່ລະບົບສຳເລັດ')
    router.push('/')
  } catch {
    // authStore.error ຖືກຕັ້ງຄ່າແລ້ວພາຍໃນ store ແລະສະແດງຜ່ານ a-alert ຂ້າງເທິງ
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 64px - 70px - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f9ff;
}

.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(2, 132, 199, 0.15);
}

.login-title {
  text-align: center;
  color: #0c4a6e;
  margin-bottom: 24px;
}

.login-error {
  margin-bottom: 16px;
}

.login-register-hint {
  text-align: center;
  margin: 16px 0 0;
  color: rgba(0, 0, 0, 0.65);
}
</style>
