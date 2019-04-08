<template lang="html">
  <div class="movie_preview">
    <router-link :to="{ name: 'details', params: {type: getCategory(data), id : data.id } }">
      <img :src="'https://image.tmdb.org/t/p/w500/'+(data.poster_path || data.profile_path)" :alt="data.title || data.original_name" title='Click for view'>
    </router-link>
    <span>{{data.title || data.name ||  data.original_name}}</span>
    <div class="year" v-if='data.gender || data.release_date || data.first_air_date'>
      {{ getYear(data) || (data.gender == 1 ? 'Female' : 'Male') }}
    </div>
    <div class="score" v-if='data.vote_average || data.known_for_department'>
      {{ data.known_for_department  || (data.vote_average + (Number.isInteger(data.vote_average) ?  '.0' : '') + ' &#9733;')}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'preview',
  props: {
    data: {
      default: null
    }
  },
  methods: {

    getCategory(r) {
      if (r.title != null) { // Movie ?
        return 'movie';
      } else if (r.first_air_date != null) { // TV Series ?
        return 'tv';
      } else { // Person
        return 'person';
      }
    },

    getYear(r) {
      if (r.release_date != null || r.first_air_date != null)
        return (r.release_date || r.first_air_date).substring(0, 4);
      else
        return null;
    }
  }
}
</script>

<style lang="scss" scoped>
.movie_preview {
    display: flex;
    flex-shrink: 0;
    position: relative;
    flex-direction: column;
    width: 150px;
    background-color: $navColor;
    margin: 4px;
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 3px;
        height: 100%;
    }
    .score,
    .year {
        position: absolute;
        top: 0;
        padding: 3px;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .score {
        right: 0;
    }
    .year {
        left: 0;
    }
    img {
        user-select: none;
        max-width: 100%;
        min-height: 225px;

    }
}

@media (min-width: $rwdTablet) {

    .movie_preview {
        width: 170px;
        margin: 5px;
        span {
            padding: 6px 3px;
        }
        img {
            min-height: 255px;
        }
    }

}
@media (min-width: $rwdTabletLandscape) {
    .movie_preview {
        width: 180px;
        margin: 6px;
        span {
            padding: 8px 4px;
        }
        img {
            min-height: 270px;
        }
    }

}
@media (min-width: $rwdLaptop) {

    .movie_preview {
        width: 190px;
        img {
            min-height: 285px;
        }
    }

    img {
        cursor: pointer;
        transition: filter 0.4s;
        filter: brightness(0.8);
        &:hover {
            filter: brightness(1.1);
        }
    }
}
@media (min-width: $rwdDesktop) {

    .movie_preview {
        width: 200px;
        img {
            min-height: 300px;
        }
    }

}
</style>
