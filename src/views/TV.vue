<template lang="html">
  <section>
    <p>{{ this.results.name }}</p>
    <img :src="this.results.backdrop_path" alt="">
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'tv',
  data() {
    return {
      results: {
        backdrop_path: ''
      }
    }
  },
  mounted() {
    axios.get(`https://api.themoviedb.org/3/tv/${ this.$route.params.id }?${ this.$store.state.api_key }`)
      .then((response) => {
        response.data.backdrop_path = 'https://image.tmdb.org/t/p/original/' + response.data.backdrop_path;
        this.results = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
</script>

<style lang="scss" scoped>
img {
    max-width: 100%;
}
</style>
