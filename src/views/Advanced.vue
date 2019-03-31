<template lang="html">
  <section>

    <p>name search, newest, by date/year, by actors, </p>
    <input type="search" v-model='searchValue' v-on:keyup.enter='handleInput' placeholder="Advanced search">

    <p style="font-size: 28px;">Search results:</p>
    <searchResults :data='this.results.results' />
  </section>
</template>

<script>
import axios from 'axios'

import searchResults from '@/components/searchResults.vue'

export default {
  name: 'advancedSearch',
  components: {
    searchResults
  },
  data() {
    return {
      results: {
        results: []
      },
      searchValue: ''
    }
  },
  methods: {

    handleInput() {
      if (this.searchValue !== '') {
        axios.get(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${this.searchValue}&${ this.$store.state.api_key }&page=${ (this.$route.params.page || 1) }`)
          .then((response) => {
            this.results = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.results = [];
      }
    }

  }
}

/*
api_key=80ce5140be88a1814f46d46b0daf8b4b

/trending/{media_type}/{time_window}

all	Include all movies, TV shows and people in the results as a global trending list.
movie	Show the trending movies in the results.
tv	Show the trending TV shows in the results.
person	Show the trending people in the results.

Time Window	Description
day	View the trending list for the day.
week	View the trending list for the week.
*/
</script>

<style lang="scss" scoped>
section {
    min-height: 80vh;
}

input {
    min-width: 200px;
    width: 10vw;
    margin: auto;
    padding: 10px;
    border-radius: 16px;
    border: none;
    transition: border 0.4s;
    background-color: #191817;
    border: 2px solid $borderColor;
    color: white;
    font-style: italic;
    &:focus {
        outline: none;
        border: 2px solid $borderColorHover;
    }
}

.results_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: auto;
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
