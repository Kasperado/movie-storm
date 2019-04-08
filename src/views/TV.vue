<template lang="html">
    <section v-if="this.results.name">
      <div class="parallax" :style="'background-image: url('+this.results.backdrop_path+');'">
        <span>{{ this.results.name }}</span>
      </div>

      <div class="movie_info">
        <div class="main_info">

          <div class="overview">
            <h1>Overview</h1>
            <div>{{ this.results.overview }}</div>
          </div>

          <div class="cast" v-if='this.people'>
            <h1>Cast</h1>
            <previews v-if='this.people.cast.length' :results='this.people.cast'></previews>
            <span v-else>No cast found</span>
          </div>

        </div>

        <div class="more_info">

          <div class="score">
              <h2>Score:</h2>
            <span>{{ (this.results.vote_average + (Number.isInteger(this.results.vote_average) ?  '.0' : '' ) + ' &#9733;') +" out of "+ this.results.vote_count +" votes."}}</span>
          </div>

          <div class="genres">
            <h2>Genres:</h2>
            <span>{{ getGenres(this.results.genres) }}</span>
          </div>

          <div class="companies">
              <h2>Producers:</h2>
            <span v-for='(c, index) in this.results.production_companies'  :key='c.name'>{{ (index == 0 ? c.name :  ', ' + c.name)}}</span>
          </div>

          <div class="date">
              <h2>First episode aired:</h2>
            <span>{{ this.results.first_air_date }}</span>
          </div>

          <div class="seasons">
              <h2>Seasons:</h2>
            <p v-for='s in this.results.seasons'  :key='s.name'>{{ s.name +" [ "+s.episode_count+"EP ]"}}</p>
          </div>

        </div>

      </div>

      <afterInfo :reviews_results='this.reviews' :similar_results='this.similar'  />

    </section>
</template>

<script>
import axios from 'axios'

import previews from '@/components/discovery/previews.vue'
import afterInfo from '@/components/afterInfo/this.vue'

export default {
  name: 'movies',
  components: {
    previews,
    afterInfo
  },
  data() {
    return {
      results: {
        backdrop_path: '',
      },
      people: null,
      similar: [],
      reviews: []
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

    //Get movie details
    axios.get(`https://api.themoviedb.org/3/tv/${ this.$route.params.id }?${ this.$store.state.api_key }`)
      .then((response) => {
        response.data.backdrop_path = 'https://image.tmdb.org/t/p/original/' + response.data.backdrop_path;
        this.results = response.data;
      })
      .catch(() => {

      });
    //Get tv people
    axios.get(`https://api.themoviedb.org/3/tv/${ this.$route.params.id }/credits?${ this.$store.state.api_key }`)
      .then((response) => {
        this.people = response.data;
      })
      .catch(() => {

      });
    //Get reviews for movie
    axios.get(`https://api.themoviedb.org/3/tv/${ this.$route.params.id }/reviews?${ this.$store.state.api_key }`)
      .then((response) => {
        this.reviews = response.data.results;
      })
      .catch(() => {

      });
    //Get similar movies
    axios.get(`https://api.themoviedb.org/3/tv/${ this.$route.params.id }/similar?${ this.$store.state.api_key }`)
      .then((response) => {
        this.similar = response.data.results;
      })
      .catch(() => {

      });

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

@media (min-width: $rwdTablet) {
    .movie_info {
        flex-direction: row;
        text-align: left;
        .main_info {
            width: 65%;
            padding: 14px;
            .overview {
                margin: inherit;
                width: 80%;
            }
        }
        .more_info {
            padding: 14px;
            width: 35%;
            border: none;
            border-left: 2px $borderColor solid;
        }
    }
}
@media (min-width: $rwdTabletLandscape) {
    .parallax {
        min-height: 90vh;
    }

    .movie_info {

        .main_info {
            width: 70%;
        }
        .more_info {
            padding: 14px;
            width: 30%;
            border: none;
            border-left: 2px $borderColor solid;
        }
    }
}
@media (min-width: $rwdLaptop) {}
@media (min-width: $rwdDesktop) {}
</style>
