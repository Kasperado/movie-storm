<template lang="html">
  <section>
    <div class="type">
       <p>Choose type</p>
      movie<input type="radio" name="type" value='movie' checked><br>
      tv<input type="radio" name="type" value='tv'>
    </div>

<div class="sort_by">
  Sort by:
  <select>
    <option value="popAsc">Popularity Ascending</option>
    <option value="popDesc">Popularity Descending</option>

    <option value="releaseAsc">Release Date Ascending</option>
    <option value="releaseDesc">Release Date Descending</option>

    <option value="titleAsc">Title Ascending</option>
    <option value="titleDesc">Title Descending</option>

    <option value="voteAvgAsc">Vote Average Ascending</option>
    <option value="voteAvgDesc">Vote Average Descending</option>

    <option value="voteCountAsc">Vote Count Ascending</option>
    <option value="voteCountDesc">Vote Count Descending</option>
  </select>
</div>

<div class="vote_count">
  Choose vote count
  <input type="text" name="vote_count_value" value="100">
  m<input type="radio" name="vote_count" value='more' checked>
  l<input type="radio" name="vote_count" value='less'>
</div>

<div class="vote_avg">
  Choose vote avg
  <input type="text" name="vote_avg_value" value="7.59">
  m<input type="radio" name="vote_avg" value='more' checked>
  l<input type="radio" name="vote_avg" value='less'>
</div>


<div class="runtime">
  Choose runtime
  <input type="text" name="runtime_value" value="120">
  m<input type="radio" name="runtime" value='more' checked>
  l<input type="radio" name="runtime" value='less'>
</div>
<button type="button" name="button" @click='handleInput'>Click to search</button>

    <p style="font-size: 28px;">Search results:</p>
    <searchResults :data='this.results.results' />
    <changePage routeName='discover' :pages='this.results.total_pages' />
  </section>
</template>

<script>
import axios from 'axios'

import searchResults from '@/components/searchResults.vue'
import changePage from '@/components/changePage.vue'

export default {
  name: 'discover',
  components: {
    searchResults,
    changePage
  },
  data() {
    return {
      results: {
        results: []
      },
    }
  },
  methods: {

    handleInput() {

      //get type
      //get sort_by
      // vote_count
      // vote_avg
      //runtime

      axios.get(`https://api.themoviedb.org/3/discover/movie?${ this.$store.state.api_key }&language=en-US&
          query=${this.searchValue}&page=${ (this.$route.params.page || 1) }`)
        .then((response) => {
          this.results = response.data;
        })
        .catch(() => {});
    }
  },
  mounted() {
    if (this.$route.params.value != null) {
      this.handleInput();
    }
  }
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
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

input[type=radio] {
    border: 2px $borderColor solid;
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
