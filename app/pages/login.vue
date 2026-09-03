<template>
  <div class="login-wrapper">
    <div class="glass-card">
      <div class="header">
        <h1 class="title">UniBooking</h1>
        <p class="subtitle">{{ $t('login.subtitle') }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="form-container">
        <div class="input-group">
          <label>{{ $t('common.emailLabel') }}</label>
          <div class="input-wrapper">
            <span class="icon">📧</span>
            <input type="email" placeholder="you@example.com" required />
          </div>
        </div>

        <div class="input-group">
          <label>{{ $t('common.passwordLabel') }}</label>
          <div class="input-wrapper">
            <span class="icon">🔒</span>
            <input type="password" placeholder="••••••••" required />
          </div>
        </div>

        <div class="forgot-password">
          <a href="#">{{ $t('login.forgotPassword') }}</a>
        </div>

        <button type="submit" class="login-btn">{{ $t('login.submitButton') }}</button>
      </form>

      <div class="footer">
        <p>{{ $t('login.noAccount') }} <a href="#" class="register-link">{{ $t('nav.register') }}</a></p>
        
        <div class="language-selector">
          <button class="lang-btn">EN</button>
          <button class="lang-btn active">ລາວ</button>
          <button class="lang-btn">ไทย</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogin(event?: Event) {
  // Placeholder login handler — replace with real auth logic
  event?.preventDefault()
  // After successful login redirect (example)
  router.push('/').catch(() => {})
}
</script>

<style scoped>
/* ຕັ້ງຄ່າພື້ນຫຼັງທຳມະຊາດເຕັມຈໍ */
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* ສາມາດປ່ຽນ Link ຮູບທຳມະຊາດອື່ນໆໄດ້ບ່ອນນີ້ */
  background-image: url('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  font-family: 'Phetsarath OT', sans-serif; /* ຟອນພາສາລາວ */
}

/* ສະຕາຍກ່ອງແກ້ວ (Glassmorphism) */
.glass-card {
  background: rgba(40, 40, 40, 0.6); /* ສີພື້ນດຳໂປ່ງໃສ */
  backdrop-filter: blur(12px); /* ເຮັດໃຫ້ມົວ (ເບລີ) */
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2); /* ຂອບສີຂາວຈາງໆ */
  border-radius: 24px;
  padding: 40px 30px;
  width: 100%;
  max-width: 420px;
  color: white;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 14px;
  color: #e0e0e0;
  margin: 0;
}

/* ການຈັດການຊ່ອງປ້ອນຂໍ້ມູນ */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #f0f4ff; /* ສີພື້ນຊ່ອງປ້ອນຂໍ້ມູນ */
  border-radius: 12px;
  padding: 0 15px;
  height: 48px;
}

.icon {
  font-size: 16px;
  margin-right: 10px;
  opacity: 0.6;
}

.input-wrapper input {
  border: none;
  background: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 15px;
  color: #333;
}

/* ປຸ່ມລືມລະຫັດຜ່ານ */
.forgot-password {
  text-align: right;
  margin-top: -10px;
}

.forgot-password a {
  color: #e0e0e0;
  font-size: 13px;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

/* ປຸ່ມເຂົ້າສູ່ລະບົບ */
.login-btn {
  background: linear-gradient(135deg, #4F75FF 0%, #3B5BDB 100%); /* ປຸ່ມສີຟ້າໄລ່ລະດັບສີ */
  color: white;
  border: none;
  border-radius: 12px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 117, 255, 0.4);
}

.login-btn:hover {
  opacity: 0.9;
}

/* ສ່ວນທ້າຍ (Footer) */
.footer {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
}

.register-link {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

/* ປຸ່ມປ່ຽນພາສາ */
.language-selector {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
  background: white;
  padding: 5px;
  border-radius: 20px;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
}

.lang-btn {
  background: transparent;
  border: none;
  color: #555;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
  font-weight: bold;
}

.lang-btn.active {
  background: #3B5BDB;
  color: white;
}
</style>