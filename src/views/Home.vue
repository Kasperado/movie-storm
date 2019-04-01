<template>
<section>
  <slider />
  <discovery v-for="(h, index) in homeResults" :key="'disc'+index" :text="homeThemes[index]" :reverse='index % 2 == 0 ? true : false' :results='h' />
</section>
</template>

<script>
import axios from 'axios'

import slider from '@/components/slider.vue'
import discovery from '@/components/discovery/this.vue'

export default {
  name: 'home',
  components: {
    slider,
    discovery
  },
  data() {
    return {
      axiosDone: false,
      homeThemes: [],
      homeResults: [],
    }
  },
  methods: {

    axiosReady() {
      this.homeThemes = this.$store.state.homeThemes;
      this.homeResults = this.$store.state.homeResults;
    }

  },
  mounted() {

    if (this.$store.state.homeResults.length == 0) {
      let allTypes = ['movie', 'tv', 'person'];
      let themes = ['Trending movies of the week', 'Trending TV series of the week', 'Trending people of the week'];
      for (let i = 0; i < 3; i++) {

        let type = allTypes[i];

        this.homeThemes.push(themes[i]);
        this.$store.commit('addHomeThemes', themes[i]);

        axios.get(`https://api.themoviedb.org/3/trending/${type}/week?${ this.$store.state.api_key }`)
          .then((response) => {
            let r = response.data.results;
            this.homeResults.splice(i, 0, r);
            this.$store.commit('addHomeResults', {
              r,
              i
            });
            if (type == 'movie' || type == 'tv') {
              this.$store.commit('addSliderMovie', response.data.results.slice(Math.max(20 - 2, 1)));
            }
          })
          .catch(() => {});
      }
    } else {
      this.axiosReady();
    }
  }


}
</script>

<style scoped>
</style>
