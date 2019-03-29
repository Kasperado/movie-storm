<template>
<section>
  <slider></slider>
  <discovery :text="homeThemes[0]" :reverse='true' :results='homeResults[0]'></discovery>
  <discovery :text="homeThemes[1]" :reverse='false' :results='homeResults[1]'></discovery>
  <discovery :text="homeThemes[2]" :reverse='true' :results='homeResults[2]'></discovery>
</section>
</template>

<script>
import {
  mapState
} from 'vuex';

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
