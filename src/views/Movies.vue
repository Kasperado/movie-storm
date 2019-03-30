<template lang="html">
  <section v-if="this.results.title">
    <div class="parallax" :style="'background-image: url('+this.results.backdrop_path+');'">
      <span>{{ this.results.title }}</span>
    </div>

    <div class="movie_info">
      <div class="main_info">

        <div class="overview">
          <h1>Overview</h1>
          <div>{{ this.results.overview }}</div>
        </div>

        <div class="cast" v-if='this.people'>
          <h1>Cast</h1>
          <previews :results='this.people.cast'></previews>
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
          <span v-for='(c, index) in this.results.production_companies'>{{ (index == 0 ? c.name :  ', ' + c.name)}}</span>
        </div>

        <div class="date">
            <h2>Release date:</h2>
          <span>{{ this.results.release_date }}</span>
        </div>

      </div>


    </div>
    <div class="after_info">

      <div class="movie_reviews" v-if='this.reviews.length'>
        <h1>Reviews:</h1>
        <div class="review" v-for="r in this.reviews">
          <div class="user_info">
            <span>{{ r.author }}</span>
            <a :href="r.url" target="_blank"><span>{{ r.id }}</span></a>
          </div>
          <div class="review_content">
            <p>{{ r.content }}</p>
          </div>
        </div>

      </div>
      <div v-else>
        <h1>No Reviews</h1>
      </div>

      <div class="similar_movies" v-if='this.similar'>
        <h1>You might also like:</h1>
        <previews v-if='this.similar.length' :results='this.similar'></previews>
        <p v-else>
          Nothing silimiar found
        </p>
      </div>
    </div>

  </section>
</template>

<script>
import axios from 'axios'

import previews from '@/components/discovery/previews.vue'

export default {
  name: 'movies',
  components: {
    previews
  },
  data() {
    return {
      results: {
        backdrop_path: '',
      },
      people: null,
      similar: null,
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
    axios.get(`https://api.themoviedb.org/3/movie/${ this.$route.params.id }?${ this.$store.state.api_key }`)
      .then((response) => {
        response.data.backdrop_path = 'https://image.tmdb.org/t/p/original/' + response.data.backdrop_path;
        this.results = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
    //Get movie people
    axios.get(`https://api.themoviedb.org/3/movie/${ this.$route.params.id }/credits?${ this.$store.state.api_key }`)
      .then((response) => {
        this.people = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
    //Get reviews for movie
    axios.get(`https://api.themoviedb.org/3/movie/${ this.$route.params.id }/reviews?${ this.$store.state.api_key }`)
      .then((response) => {
        this.reviews = response.data.results;
      })
      .catch((e) => {
        console.log(e);
      });
    //Get similar movies
    axios.get(`https://api.themoviedb.org/3/movie/${ this.$route.params.id }/similar?${ this.$store.state.api_key }`)
      .then((response) => {
        this.similar = response.data.results;
      })
      .catch((e) => {
        console.log(e);
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
    min-height: 90vh;
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
    flex-direction: row;
    text-align: left;
    width: 100%;
    span {
        font-weight: 400;
    }
    .main_info {
        width: 70%;
        padding: 14px;
        .overview {
            width: 80%;
            font-weight: 400;
        }
    }
    .more_info {
        padding: 14px;
        width: 30%;
        border-left: 2px $borderColor solid;
        .companies {
            img {
                max-width: 30%;
            }
        }
    }
}

.after_info {
    border-top: 2px $borderColor solid;
    .movie_reviews {
        display: flex;
        flex-direction: column;
        width: 100%;
        .review {
            display: flex;
            flex-direction: column;
            width: 80%;
            max-width: 1200px;
            margin: auto;

            .user_info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px;
                border-bottom: 2px $borderColor solid;
                background-color: $navColor;
                margin-top: 12px;
            }
            .review_content {
                background-color: $navColor;
                font-weight: 400;
                padding: 0 8px;
                text-align: left;
            }
        }
    }
}
</style>
