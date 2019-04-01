<template lang="html">
  <section>
    <h1>Search results:</h1>

    <searchResults :data='this.results.results' />
    <changePage routeName='search' :pages='this.results.total_results > 0 ? this.results.total_pages : null' />
  </section>
</template>

<script>
import axios from 'axios'

import searchResults from '@/components/searchResults.vue'
import changePage from '@/components/changePage.vue'

export default {
  name: 'Searchbox',
  data() {
    return {
      results: {
        results: []
      }
    };
  },
  components: {
    searchResults,
    changePage
  },
  mounted() {
    //Get movie details
    axios.get(`https://api.themoviedb.org/3/search/multi?${ this.$store.state.api_key }&query=${ this.$route.params.value }&page=${ (this.$route.params.page || 1) }`)
      .then((response) => {
        this.results = response.data;
      })
      .catch(() => {});
  }
}
</script>

<style lang="scss" scoped>
section {
    min-height: 80vh;
}
</style>
