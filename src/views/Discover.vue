<template lang="html">
  <section>
    <div class="type">
      <h1>Choose type</h1>
      <span>Search for </span>
      <select v-model="type" @change='resetGenres'>
        <option value='movie'>Movies</option>
        <option value='tv'>TV shows</option>
      </select>
    </div>

    <div class="sort_by">
      <span>Sort them by:</span>
      <select v-model='sort_by'>
        <option value="popularity.asc">Popularity Ascending</option>
        <option value="popularity.desc">Popularity Descending</option>

        <option value="release_date.asc">Release Date Ascending</option>
        <option value="release_date.desc">Release Date Descending</option>

        <option value="vote_average.asc">Vote Average Ascending</option>
        <option value="vote_average.desc">Vote Average Descending</option>

        <option value="vote_count.asc">Vote Count Ascending</option>
        <option value="vote_count.desc">Vote Count Descending</option>
      </select>
    </div>

    <h2>Fill queries (or leave empty to exclude):</h2>

    <div class="genres">
      <p>Select genres to include in search:</p>

      <div class="genres_container" v-if="type == 'movie'" key='mm'>
        <div @click='editGenres' class="genre_select" v-for='m in genre_list_movie_names' :id='m' :key='m'>
          {{ m }}
        </div>
      </div>

      <div class="genres_container" v-else key='tv'>
        <div @click='editGenres' class="genre_select" v-for='tv in genre_list_tv_names' :id='tv' :key='tv'>
          {{ tv }}
        </div>
      </div>
    </div>

    <div class="vote_count">
      <span>Has number of votes equal or</span>
      <select v-model="vote_count">
        <option value='more'>greater</option>
        <option value='less'>smaller</option>
      </select>
      <span>than</span>
      <input type="number" name="vote_count_value" v-model='vote_count_value' placeholder='From 1 to Infinity'>
    </div>

    <div class="vote_avg">
      <span>Average score is equal or </span>
      <select v-model="vote_avg">
        <option value='more'>greater</option>
        <option value='less'>smaller</option>
      </select>
      <span>than</span>
      <input type="number" name="vote_avg_value" v-model='vote_avg_value' placeholder="From 1 to 10">
    </div>

    <div class="runtime">
      <span v-if="this.type == 'tv'">Episode </span>
      <span v-else>Movie </span>
      <span>runtime (in minutes) is equal or</span>
      <select v-model="runtime">
        <option value='more'>greater</option>
        <option value='less'>smaller</option>
      </select>
      <span>than</span>
      <input type="number" name="runtime_value"  v-model='runtime_value' placeholder="From 1 to Infinity">
    </div>
    <button type="button" name="button" @click='submitSearch'>Click to search</button>

    <p style="font-size: 28px;">Search results:</p>
    <changePage routeName='discover' :pages='this.results.total_results > 0 ? this.results.total_pages : null' />
    <searchResults :data='this.results.results' />
    <changePage routeName='discover' :pages='this.results.total_results > 0 ? this.results.total_pages : null' />
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
      type: 'movie',
      sort_by: 'popularity.desc',
      genres: [],
      vote_count: 'more',
      vote_count_value: '',
      vote_avg: 'more',
      vote_avg_value: '',
      runtime: 'more',
      runtime_value: '',
      results: {
        results: []
      },
      genre_list_movie: [],
      genre_list_tv: []
    }
  },
  computed: {
    genre_list_movie_names: function() {
      return this.genre_list_movie.map((g) => {
        return g.name;
      });
    },
    genre_list_tv_names: function() {
      return this.genre_list_tv.map((g) => {
        return g.name;
      });
    }
  },
  methods: {

    resetGenres() {
      this.genres = [];
    },

    editGenres(event, name) {
      if (name == null) {
        if (event.target.classList.contains('genre_select_active')) {
          event.target.classList.remove('genre_select_active');
          this.genres.splice(this.genres.indexOf(event.target.innerText), 1);
        } else {
          event.target.classList.add('genre_select_active');
          this.genres.push(event.target.innerText);
        }
      } else {
        document.getElementById(name).classList.add('genre_select_active');
      }

    },

    filterInput() {
      let flag = false; // Triggers when something is wrong
      // Genres
      let genre_query = '&with_genres=';
      if (this.genres.length > 0) {
        let tempGenreArr = this.type == 'movie' ? this.genre_list_movie : this.genre_list_tv;

        // Get Ids from Input array
        let tempIdArr = [];
        this.genres.forEach((g) => {
          tempGenreArr.forEach((e) => {
            if (e.name.toLowerCase() == g.toLowerCase())
              tempIdArr.push(e.id)
          });
        });
        genre_query += tempIdArr.join() // Add to query
      } else {
        genre_query = ''; // Remove query, it will be used but it will change nothing
      }

      let vote_count_query = '&vote_count';
      if (this.vote_count_value != '') {

        if (this.vote_count_value < 1) {
          alert("Given vote count must be above 1");
          flag = true;
        }

        if (this.vote_count == 'more') {
          vote_count_query += '.gte=' + this.vote_count_value;
        } else {
          vote_count_query += '.lte=' + this.vote_count_value;
        }

      } else {
        vote_count_query = '';
      }

      let vote_avg_query = '&vote_average';
      if (this.vote_avg_value != '') {

        if (this.vote_avg_value < 1 || this.vote_avg_value > 10) {
          alert("Average score should range from 1 to 10.");
          flag = true;
        }

        if (this.vote_avg == 'more') {
          vote_avg_query += '.gte=' + this.vote_avg_value;
        } else {
          vote_avg_query += '.lte=' + this.vote_avg_value;
        }

      } else {
        vote_avg_query = '';
      }

      let runtime_query = '&with_runtime';
      if (this.runtime_value != '') {

        if (this.runtime_value < 1) {
          alert("Given runtime must be above 1 minute");
          flag = true;
        }

        if (this.runtime == 'more') {
          runtime_query += '.gte=' + this.runtime_value;
        } else {
          runtime_query += '.lte=' + this.runtime_value;
        }

      } else {
        runtime_query = '';
      }

      let addedQuery = genre_query + vote_count_query + vote_avg_query + runtime_query;
      if (!flag) {
        return addedQuery;
      } else {
        return '';
      }

    },

    submitSearch() {
      if (this.filterInput() != '') {
        let sendThis = {};

        sendThis.type = this.type;
        sendThis.sort_by = this.sort_by;

        if (this.genres.length > 0) {
          sendThis.genres = this.genres.join();
        }

        if (this.vote_count_value) {
          sendThis.vote_count = this.vote_count;
          sendThis.vote_count_value = this.vote_count_value;
        }

        if (this.vote_avg_value) {
          sendThis.vote_avg = this.vote_avg;
          sendThis.vote_avg_value = this.vote_avg_value;
        }

        if (this.runtime_value) {
          sendThis.runtime = this.runtime;
          sendThis.runtime_value = this.runtime_value;
        }

        this.$router.push({
          name: 'discover',
          params: {
            page: 1,
          },
          query: sendThis
        });
      }
    },

    genresAxios() {
      if (this.$store.state.movie_genres.length > 0 && this.$store.state.tv_genres.length > 0) {

        this.genre_list_movie = this.$store.state.movie_genres;
        this.genre_list_tv = this.$store.state.tv_genres;
        this.sendQuery();
      } else {

        // Genre list for movies
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?${ this.$store.state.api_key }`)
          .then((response) => {
            this.genre_list_movie = response.data.genres;
            this.$store.commit('addMovieGenres', response.data.genres);
            this.sendQuery();
          })
          .catch(() => {});

        // Genre list for tv
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?${ this.$store.state.api_key }`)
          .then((response) => {
            this.genre_list_tv = response.data.genres;
            this.$store.commit('addTVGenres', response.data.genres);
            this.sendQuery();
          })
          .catch(() => {});

      }
    },

    sendQuery() {
      // If there is query then send axios
      if (this.$route.query.type != null) {

        this.type = this.$route.query.type;
        this.sort_by = this.$route.query.sort_by;
        this.genres = this.$route.query.genres != null ? this.$route.query.genres.split(',') : [];
        this.$nextTick(function() {
          this.genres.forEach((g) => {
            this.editGenres(null, g);
          });
        });
        this.vote_count = this.$route.query.vote_count || 'more';
        this.vote_count_value = this.$route.query.vote_count_value || '';
        this.vote_avg = this.$route.query.vote_avg || 'more';
        this.vote_avg_value = this.$route.query.vote_avg_value || '';
        this.runtime = this.$route.query.runtime || 'more';
        this.runtime_value = this.$route.query.runtime_value || '';

        axios.get(`https://api.themoviedb.org/3/discover/${ this.type }?${ this.$store.state.api_key }&page=${ (this.$route.params.page || 1) }
      &sort_by=${ this.sort_by + this.filterInput() }`)
          .then((response) => {
            this.results = response.data;
          })
          .catch(() => {});
      }

    }

  },
  mounted() {

    // Check if vuex already has genre lists from previous use
    this.genresAxios();

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

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance: textfield;
    /* Firefox */
}

input {
    margin: auto;
    padding: 10px;
    margin: 8px;
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

select {
    padding: 4px;
    margin: 4px;
    background-color: $navColor;
    border: none;
    color: $borderColor;
    font-weight: bold;
    border-radius: 4px;
    outline: none;
    option::selection {
        color: red;
    }
}

.types {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
    label {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 0 8px;
        span {
            padding: 4px;
        }
    }
}

.genres_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    width: 95%;
    margin: auto;
    user-select: none;
    .genre_select {
        padding: 8px;
        border-radius: 24px;
        margin: 4px;
        background-color: $navColor;
        cursor: pointer;
        border: 2px gray solid;
        transition: border 0.4s, background-color 0.4s;
        font-weight: 400;
    }
    .genre_select_active {
        border-color: $borderColor;

    }
}

p,
span {
    font-weight: 400;
}

.results_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: auto;
}

button {
    background-color: $navColor;
    border: 2px $borderColor solid;
    color: $borderColor;
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.4s, border-color 0.4s;
    outline: none;
    &:hover {
        color: $borderColorHover;
        border-color: $borderColorHover;
    }
}

@media (min-width: $rwdTablet) {
    .results_container {
        width: 95%;
    }

    .genres_container {
        width: 90%;
    }
}
@media (min-width: $rwdTabletLandscape) {
    section {
        min-height: 82vh;
    }

    .results_container {
        width: 90%;
    }

    .genres_container {
        width: 80%;
    }
}
@media (min-width: $rwdLaptop) {
    .results_container {
        width: 85%;
    }
    .genres_container {
        width: 65%;
    }
}
@media (min-width: $rwdDesktop) {

    .results_container {
        width: 80%;
    }
    .genres_container {
        width: 55%;
    }
}
</style>
