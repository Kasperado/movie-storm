<template lang="html">
  <section>

    <p>name search, newest, by date/year, by actors, </p>
    <input type="search" v-model='searchValue' @input='handleInput()'>

    <p style="font-size: 28px;">Search results:</p>
    <previews v-if='searchValue' :results='this.results'></previews>
  </section>
</template>

<script>
import axios from 'axios'
import debounce from 'lodash.debounce'

import previews from '@/components/discovery/previews.vue'

export default {
  name: 'advancedSearch',
  components: {
    previews
  },
  data() {
    return {
      results: [],
      searchValue: ''
    };
  },
  methods: {
    handleInput: debounce(function(ev) {
      if (ev !== '') {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=80ce5140be88a1814f46d46b0daf8b4b&language=en-US&page=1&include_adult=false&query=
${this.searchValue}`)
          .then((response) => {
            this.results = response.data.results;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.results = [];
      }
    }, 500)
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
</style>
