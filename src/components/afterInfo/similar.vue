<template lang="html">
  <div class="similar_movies" v-if='this.data.length'>
    <h1>You might also like:</h1>
    <previews :results='this.data'></previews>
  </div>

  <div v-else>
    <h1>Nothing Similar Found</h1>
  </div>
</template>

<script>
import previews from '@/components/discovery/previews.vue'

export default {
  name: 'similar',
  components: {
    previews
  },
  props: {
    data: {
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
