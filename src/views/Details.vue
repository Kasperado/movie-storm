<template lang="html">
  <section v-if="this.results.id">

    <div class="parallax" :style="'background-image: url(' + this.results.backdrop_path + ');'" v-if="this.$route.params.type != 'person'">
      <span>{{ this.results.title || this.results.name }}</span>
    </div>

    <div class="intro_person" v-else>
      <div class="person_image">
        <img :src="this.results.profile_path" alt="">
      </div>
      <div class="biography">
        <h1>{{ this.results.name }}</h1>
        <span>{{ (this.results.biography != '' ? this.results.biography : 'No biography found') }}</span>
      </div>
    </div>






    <div class="movie_info">

      <div class="main_info" v-if="this.$route.params.type != 'person'">
        <div class="overview">
          <h1>Overview</h1>
          <div>{{ this.results.overview }}</div>
        </div>

        <div class="cast" v-if='this.people'>
          <h1>Cast</h1>
          <previews :results='this.people.cast'></previews>
        </div>
      </div>

      <div class="main_info" v-else>
        <div class="as_cast">
          <h1>Known for being in:</h1>
          <previews v-if='this.movies_with_as_cast.total_results' :results='this.movies_with_as_cast.results'></previews>
          <div v-else>
            <span>Nothing found</span>
          </div>
        </div>
        <div class="as_crew">
          <h1>Known for working on:</h1>
          <previews v-if='this.movies_with_as_crew.total_results' :results='this.movies_with_as_crew.results'></previews>
          <div v-else>
            <span>Nothing found</span>
          </div>
        </div>
      </div>

      <div class="more_info" v-if="this.$route.params.type != 'person'">
        <div class="score">
            <h2>Score:</h2>
          <span>{{ (this.results.vote_average + (Number.isInteger(this.results.vote_average) ?  '.0' : '' ) + ' &#9733;') +" out of "+ this.results.vote_count +" votes."}}</span>
        </div>

        <div class="genres">
          <h2>Genres:</h2>
          <span>{{ getGenres(this.results.genres) }}</span>
        </div>

        <div class="runtime" v-if="this.$route.params.type == 'movie'">
          <h2>Runtime:</h2>
          <span>{{ this.results.runtime + " minutes" }}</span>
        </div>

        <div class="companies">
            <h2>Producers:</h2>
          <span v-for='(c, index) in this.results.production_companies' :key='c.name'>{{ (index == 0 ? c.name :  ', ' + c.name)}}</span>
        </div>

        <div class="date" v-if="this.$route.params.type == 'movie'">
            <h2>Release date:</h2>
          <span>{{ this.results.release_date }}</span>
        </div>

        <div class="date" v-if="this.$route.params.type == 'tv'">
            <h2>First episode aired:</h2>
          <span>{{ this.results.first_air_date }}</span>
        </div>

        <div class="seasons" v-if="this.$route.params.type == 'tv'">
            <h2>Seasons:</h2>
          <p v-for='s in this.results.seasons'  :key='s.name'>{{ s.name +" [ "+s.episode_count+"EP ]"}}</p>
        </div>
      </div>
      <div class="more_info" v-else>

        <div class="department">
            <h2>Department:</h2>
            <span>{{ this.results.known_for_department }}</span>
        </div>

        <div class="birthplace">
            <h2>Place of birth:</h2>
            <span>{{ (this.results.place_of_birth || 'Unknown') }}</span>
        </div>

        <div class="date">
            <h2>Lifetime:</h2>
            <span>{{ this.results.birthday + " - " + (this.results.deathday || 'Today')}}</span>
        </div>

      </div>

    </div>

    <afterInfo :reviews_results='this.reviews' :similar_results='this.similar' v-if="this.$route.params.type != 'person'"/>
  </section>
</template>

<script>
import axios from 'axios'

import previews from '@/components/discovery/previews.vue'
import afterInfo from '@/components/afterInfo/this.vue'

export default {
  name: 'detailsData',
  components: {
    previews,
    afterInfo
  },
  data() {
    return {
      results: {
        backdrop_path: '',
        profile_path: ''
      },
      people: null,
      similar: [],
      reviews: [],
      movies_with_as_cast: {
        total_results: 0
      },
      movies_with_as_crew: {
        total_results: 0
      }
    }
  },
  methods: {

    getGenres(genres) {

      let gs = '';
      genres.forEach((g, index) => {
        gs += g.name;
        if (index < genres.length - 1) {
          gs += ', ';
        }
      });
      return gs;
    },

  },
  mounted() {

    if (this.$route.params.type == 'movie' || this.$route.params.type == 'tv') {

      //Get details
      axios.get(`https://api.themoviedb.org/3/${ this.$route.params.type }/${ this.$route.params.id }?${ this.$store.state.api_key }`)
        .then((response) => {
          response.data.backdrop_path = 'https://image.tmdb.org/t/p/original/' + response.data.backdrop_path;
          this.results = response.data;
        })
        .catch(() => {});

      //Get people
      axios.get(`https://api.themoviedb.org/3/${ this.$route.params.type }/${ this.$route.params.id }/credits?${ this.$store.state.api_key }`)
        .then((response) => {
          this.people = response.data;
        })
        .catch(() => {});

      //Get reviews
      axios.get(`https://api.themoviedb.org/3/${ this.$route.params.type }/${ this.$route.params.id }/reviews?${ this.$store.state.api_key }`)
        .then((response) => {
          this.reviews = response.data.results;
        })
        .catch(() => {});

      //Get similar
      axios.get(`https://api.themoviedb.org/3/${ this.$route.params.type }/${ this.$route.params.id }/similar?${ this.$store.state.api_key }`)
        .then((response) => {
          this.similar = response.data.results;
        })
        .catch(() => {});

    } else {

      axios.get(`https://api.themoviedb.org/3/person/${ this.$route.params.id }?${ this.$store.state.api_key }`)
        .then((response) => {
          response.data.profile_path = 'https://image.tmdb.org/t/p/original/' + response.data.profile_path;
          this.results = response.data;
        })
        .catch(() => {});

      axios.get(`https://api.themoviedb.org/3/discover/movie?with_cast=${ this.$route.params.id }&${ this.$store.state.api_key }`)
        .then((response) => {
          this.movies_with_as_cast = response.data;
        })
        .catch(() => {});

      axios.get(`https://api.themoviedb.org/3/discover/movie?with_crew=${ this.$route.params.id }&${ this.$store.state.api_key }`)
        .then((response) => {
          this.movies_with_as_crew = response.data;
        })
        .catch(() => {});

    }

  }
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    flex-direction: column;
}

.parallax {
    min-height: 88vh;
    background-attachment: fixed;
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    span {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 36px;
        margin: 12px;
        text-shadow: 2px 2px black;
    }
}

.intro_person {
    display: flex;
    align-items: center;
    flex-direction: column;
    .person_image {
        width: 100%;
        padding: 18px;
        img {
            margin: auto;
            max-width: 100%;
            max-height: 500px;
        }
    }
    .biography {
        text-align: center;
        padding: 12px;
        width: 100%;
        span {
            font-weight: 400;
        }
    }
}

.movie_info {
    border-top: 2px $borderColor solid;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    span {
        font-weight: 400;
    }
    .main_info {
        width: 100%;
        padding: 8px;
        .overview {
            width: 90%;
            margin: auto;
            font-weight: 400;
        }
    }
    .more_info {
        padding: 8px;
        width: 100%;
        border-top: 2px $borderColor solid;
        .companies {
            img {
                max-width: 30%;
            }
        }
    }
}

@media (min-width: $rwdTabletLandscape) {

    .parallax {
        min-height: 90vh;
    }

    .intro_person {
        flex-direction: row;
        .person_image {
            width: 20%;
            padding: 18px;
            img {
                margin: auto;
                max-width: 100%;
                max-height: 500px;
            }
        }
        .biography {
            width: 80%;
        }
    }

    .movie_info {
        flex-direction: row;
        text-align: left;
        .main_info {
            width: 70%;
            padding: 14px;
            .overview {
                margin: inherit;
                width: 80%;
            }
        }
        .more_info {
            padding: 14px;
            width: 30%;
            border: none;
            border-left: 2px $borderColor solid;
        }
    }

}
</style>
