<template lang="html">
  <section>
    <tilted :text="this.text" :reverse="this.reverse"></tilted>
    <previews :results='this.results'></previews>
  </section>
</template>

<script>
import tilted from '@/components/discovery/tilted.vue'
import previews from '@/components/discovery/previews.vue'

export default {
  name: 'discovery',
  components: {
    tilted,
    previews
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    reverse: {
      type: Boolean,
      default: false
    },
    results: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
section {
    padding: 12px 0;
}
</style>
