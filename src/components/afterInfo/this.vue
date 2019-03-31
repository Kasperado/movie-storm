<template lang="html">
  <div class="after_info">
    <reviews :data='this.reviews_results' />
    <similar :data='this.similar_results' />
  </div>
</template>

<script>
import reviews from './reviews.vue'
import similar from './similar.vue'

export default {
  name: 'afterInfo',
  components: {
    reviews,
    similar
  },
  props: {
    reviews_results: {
      default: () => []
    },
    similar_results: {
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.after_info {
    display: flex;
    flex-direction: column;
    border-top: 2px $borderColor solid;
}
</style>
