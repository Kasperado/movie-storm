<template lang="html">
  <section>
    <div class="overview">
      <div class="person_image">
        <img :src="this.results.profile_path" alt="">
      </div>
      <div class="biography">
        <h1>{{ this.results.name }}</h1>
        <span>{{ (this.results.biography != '' ? this.results.biography : 'No biography found') }}</span>
      </div>
    </div>

    <div class="movie_info">
      <div class="main_info">
        <h1>Known for:</h1>
        <previews v-if='this.movies_with.total_results' :results='this.movies_with.results'></previews>
        <div v-else>
          <span>Nothing found</span>
        </div>
      </div>

      <div class="more_info">

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

  </section>
</template>

<script>
import axios from 'axios'

import previews from '@/components/discovery/previews.vue'

export default {
  name: 'person',
  data() {
    return {
      results: {
        profile_path: ''
      },
      movies_with: {
        total_results: 0
      },

    }
  },
  components: {
    previews
  },
  mounted() {
    axios.get(`https://api.themoviedb.org/3/person/${ this.$route.params.id }?${ this.$store.state.api_key }`)
      .then((response) => {
        response.data.profile_path = 'https://image.tmdb.org/t/p/original/' + response.data.profile_path;
        this.results = response.data;
      })
      .catch((e) => {
        console.log(e);
      });

    axios.get(`https://api.themoviedb.org/3/discover/movie?with_crew=${ this.$route.params.id }&${ this.$store.state.api_key }`)
      .then((response) => {
        this.movies_with = response.data;
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
    display: flex;
    flex-direction: column;
}

.overview {
    display: flex;
    align-items: center;

    .person_image {
        width: 20%;
        padding: 12px;
        img {
            margin: auto;
            max-height: 300px;
        }
    }
    .biography {
        text-align: left;
        padding: 12px;
        width: 80%;
        span {
            font-weight: 400;
        }
    }
}

.movie_info {
    border-top: 2px $borderColor solid;
    display: flex;
    flex-direction: row;
    text-align: left;
    width: 100%;
    min-height: 50vh;
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
</style>
