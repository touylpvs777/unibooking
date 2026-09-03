<template>
  <div class="write-review">
    <template v-if="!authStore.isAuthenticated">
      <a-alert type="info" show-icon :message="$t('reviews.loginPrompt')">
        <template #action>
          <NuxtLink to="/login"><a-button size="small" type="primary">{{ $t('nav.login') }}</a-button></NuxtLink>
        </template>
      </a-alert>
    </template>

    <!-- Eligibility (a COMPLETED booking for this service) is enforced by
         the backend, not pre-checked here -- POST /reviews returns 403 with
         a clear message if the user hasn't completed a booking for this
         serviceId yet, or has already reviewed it. Duplicating that check
         client-side would just be a second source of truth to drift from it. -->
    <a-form v-else layout="vertical" :model="form" @finish="handleSubmit">
      <a-form-item :label="$t('reviews.ratingLabel')" required>
        <a-rate v-model:value="form.rating" />
      </a-form-item>

      <a-form-item :label="$t('reviews.commentLabel')">
        <a-textarea v-model:value="form.comment" :maxlength="1000" show-count :rows="4" :placeholder="$t('reviews.commentPlaceholder')" />
      </a-form-item>

      <a-alert v-if="reviewsStore.error" type="error" show-icon :message="reviewsStore.error" class="write-review__error" />

      <a-button type="primary" html-type="submit" :loading="reviewsStore.isSubmitting" :disabled="!form.rating">
        {{ $t('reviews.submitButton') }}
      </a-button>
    </a-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useAuthStore } from '~/stores/auth'
import { useReviewsStore } from '~/stores/reviews'

const props = defineProps({
  serviceId: { type: String, required: true }
})
const emit = defineEmits(['submitted'])

const { t } = useI18n()
const authStore = useAuthStore()
const reviewsStore = useReviewsStore()

const form = reactive({ rating: 0, comment: '' })

async function handleSubmit() {
  try {
    await reviewsStore.submitReview({
      serviceId: props.serviceId,
      rating: form.rating,
      comment: form.comment
    })
    message.success(t('reviews.thankYouMessage'))
    form.rating = 0
    form.comment = ''
    emit('submitted')
  } catch {
    // reviewsStore.error is set and shown above (e.g. "no completed booking for this service yet")
  }
}
</script>

<style scoped>
.write-review__error {
  margin-bottom: 16px;
}
</style>
