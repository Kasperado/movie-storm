<template>
<section>
  <slider></slider>
  <discovery v-for="(h, index) in homeResults" :key="'disc'+index" :text="homeThemes[index]" :reverse='index % 2 == 0 ? true : false' :results='h'></discovery>
</section>
</template>

<script>
import slider from '@/components/slider.vue'
import discovery from '@/components/discovery/this.vue'

export default {
  name: 'home',
  components: {
    slider,
    discovery
  },
  computed: {
    homeResults: function() {
      return this.$store.state.homeResults;
    },
    homeThemes: function() {
      return this.$store.state.homeThemes;
    }
  }
}
</script>

<style scoped>
</style>
