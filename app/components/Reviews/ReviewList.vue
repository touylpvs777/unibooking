<template>
  <div class="review-list">
    <div class="review-list__summary">
      <div class="review-list__score">{{ reviewsStore.averageRating?.toFixed(1) ?? '–' }}</div>
      <div>
        <a-rate disabled :value="reviewsStore.averageRating ?? 0" allow-half class="review-list__rate" />
        <p class="review-list__count">{{ $t('reviews.count', { count: reviewsStore.reviewCount }) }}</p>
      </div>
    </div>

    <a-spin :spinning="reviewsStore.isLoading">
      <a-empty v-if="!reviewsStore.isLoading && !reviewsStore.reviews.length" :description="$t('reviews.noReviews')" />

      <div v-else class="review-list__items">
        <div v-for="review in reviewsStore.reviews" :key="review.id" class="review-item">
          <div class="review-item__header">
            <span class="review-item__name">{{ review.user.displayName }}</span>
            <a-rate disabled :value="review.rating" class="review-item__rate" />
          </div>
          <p class="review-item__date">{{ formatDate(review.createdAt) }}</p>
          <p v-if="review.comment" class="review-item__comment">{{ review.comment }}</p>
        </div>
      </div>

      <div v-if="reviewsStore.meta && reviewsStore.meta.page < reviewsStore.meta.totalPages" class="review-list__more">
        <a-button :loading="reviewsStore.isLoading" @click="loadMore">{{ $t('reviews.loadMore') }}</a-button>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useReviewsStore } from '~/stores/reviews'
import { formatDate } from '~/utils/date'

const props = defineProps({
  serviceId: { type: String, required: true }
})

const reviewsStore = useReviewsStore()

onMounted(() => {
  if (props.serviceId) reviewsStore.fetchReviews(props.serviceId)
})

// Detail pages are SPA-navigated -- if the component is reused for a
// different serviceId without remounting, re-fetch instead of showing
// stale reviews for the previous service.
watch(() => props.serviceId, (id) => {
  if (id) reviewsStore.fetchReviews(id)
})

function loadMore() {
  reviewsStore.fetchReviews(props.serviceId, {
    page: reviewsStore.meta.page + 1,
    limit: reviewsStore.meta.limit
  })
}

</script>

<style scoped>
.review-list__summary {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.review-list__score {
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}

.review-list__rate {
  font-size: 16px;
}

.review-list__count {
  margin: 4px 0 0;
  color: #64748b;
  font-size: 13px;
}

.review-list__items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-item {
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.review-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.review-item__name {
  font-weight: 600;
  color: #0f172a;
}

.review-item__rate {
  font-size: 13px;
}

.review-item__date {
  margin: 2px 0 8px;
  font-size: 12px;
  color: #94a3b8;
}

.review-item__comment {
  margin: 0;
  color: #334155;
  line-height: 1.6;
}

.review-list__more {
  text-align: center;
  margin-top: 16px;
}
</style>
