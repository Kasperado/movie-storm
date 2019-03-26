<template>
<section>
  <slider></slider>
  <discovery v-for='(r,index) in this.homeResults' :key="'discov'+index" :text="homeThemes[index]" :reverse='index%2==0?true:false' :results='homeResults[index]'></discovery>
</section>
</template>

<script>
import slider from '@/components/slider.vue'
import discovery from '@/components/discovery.vue'

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
