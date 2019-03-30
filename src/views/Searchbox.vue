<template lang="html">
  <section>
    <h1>Search results:</h1>
     <div class="results_container" v-if='this.results'>
       <preview v-for="r in this.filteredResults" :data="r"></preview>
     </div>

     <div class="direction_container" v-if='this.results'>

       <div :class="'go' + ( (this.$route.params.page || 1) == 1 ? ' disabled' : '')" @click='changePage(-1)'>
         <i class="fas fa-chevron-left"></i>
       </div>
       <div class="page_count">
         {{'Page ' + this.results.page +' out of '+ this.results.total_pages}}
       </div>
       <div :class="'go' +  (this.$route.params.page >= this.results.total_pages ? ' disabled' : '')" @click='changePage(1)'>
         <i class="fas fa-chevron-right"></i>
       </div>
     </div>
  </section>
</template>

<script>
import axios from 'axios'

import preview from '@/components/preview.vue'

export default {
  name: 'Searchbox',
  data() {
    return {
      results: null
    };
  },
  components: {
    preview
  },
  methods: {

    changePage(direction) {
      let currentPage = parseInt(this.$route.params.page) || 1;
      if (currentPage + direction > 0 && currentPage + direction <= this.results.total_pages) {
        this.$router.push({
          name: 'search',
          params: {
            value: this.$route.params.value,
            page: (currentPage + direction)
          }
        });
        window.scrollTo(0, 0);
      }

    }

  },
  computed: {
    filteredResults: function() {
      return this.results.results.filter((r) => {
        return (r.poster_path || r.profile_path) != null;
      });
    }
  },
  mounted() {
    //Get movie details
    axios.get(`https://api.themoviedb.org/3/search/multi?${ this.$store.state.api_key }&query=${ this.$route.params.value }&page=${ (this.$route.params.page || 1) }`)
      .then((response) => {
        this.results = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
</script>

<style lang="scss" scoped>
section {
    min-height: 80vh;
}

.results_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: auto;
}

.direction_container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 600px;
    margin: auto;
    .go {
        margin: 12px;
        background-color: $borderColor;
        width: 120px;
        border-radius: 4px;
        cursor: pointer;
    }
    i {
        font-size: 2em;
        padding: 8px;
        color: white;
    }
    .disabled {
        background-color: gray;
        pointer-events: none;
    }
}

@media (min-width: $rwdTablet) {
    .results_container {
        width: 95%;
    }
}
@media (min-width: $rwdTabletLandscape) {
    .results_container {
        width: 90%;
    }
}
@media (min-width: $rwdLaptop) {
    .results_container {
        width: 85%;
    }
}
@media (min-width: $rwdDesktop) {
    .results_container {
        width: 80%;
    }
}
</style>
