<template lang="html">
  <div class="container">
    <div @click="scrollPreviews(-1)" class="arr_left">
      <i class="fas fa-chevron-left"></i>
    </div>
    <div class="movies_container" ref='mov'>

      <div class="movie_preview" v-for="r in this.filteredResults" :key="r.id">
        <router-link :to="{ name: getCategory(r), params: {id : r.id } }">
          <img :src="'https://image.tmdb.org/t/p/w500/'+(r.poster_path || r.profile_path)" :alt="r.title || r.original_name" title='Click for view'>
        </router-link>
      <span>{{r.title || r.original_name || r.name}}</span>
      <div class="year" v-if='r.gender || r.release_date || r.first_air_date'>
        {{ getYear(r) || (r.gender == 1 ? 'Female' : 'Male') }}
      </div>
      <div class="score" v-if='r.vote_average || r.known_for_department'>
        {{  getJob(r) || (r.vote_average.toString().length > 1 ? r.vote_average + ' &#9733;' : r.vote_average + '.0 &#9733;') }}
      </div>
      </div>

    </div>
    <div @click="scrollPreviews(1)" class="arr_left">
      <i class="fas fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'previews',
  props: {
    results: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredResults: function() {
      return this.results.filter((r) => {
        return (r.poster_path || r.profile_path) != null;
      });
    }
  },
  methods: {
    scrollPreviews(direction) { // move scroll by (width + margin) of movie preview
      let value = document.querySelector('.movie_preview').offsetWidth;
      value += parseInt(window.getComputedStyle(document.querySelector('.movie_preview')).getPropertyValue('margin-left')) * 2;
      this.$refs.mov.scrollBy(value * direction, 0);
    },

    getCategory(r) {
      if (r.title != null) { // Movie ?
        return 'movie';
      } else if (r.first_air_date != null) { // TV Series ?
        return 'tv';
      } else { // Person
        return 'person';
      }
    },

    getJob(r) {
      if (r.known_for_department == 'Acting') {
        return r.gender == 1 ? 'Actress' : 'Actor';
      } else if (r.known_for_department == 'Directing') {
        return r.gender == 1 ? 'Directress' : 'Director';
      } else {
        return null;
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
::-webkit-scrollbar {
    display: none;
}

.container {
    display: flex;
    position: relative;
    margin: auto;
    width: 100%;
    justify-content: space-between;
    .arr_left,
    .arr_right {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 4;
        width: 10%;
        i {
            max-width: 100%;
        }
    }
    .movies_container {
        display: flex;
        overflow: hidden;
        scroll-behavior: smooth;
        flex-shrink: 0;
        width: 80%;
        .movie_preview {
            display: flex;
            flex-shrink: 0;
            position: relative;
            flex-direction: column;
            width: 200px;
            background-color: $navColor;
            margin: 6px;
            span {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 8px 4px;
                height: 100%;
            }
            .score {
                position: absolute;
                top: 0;
                right: 0;
                padding: 4px;
                background-color: rgba(0, 0, 0, 0.5);
            }
            .year {
                position: absolute;
                top: 0;
                left: 0;
                padding: 4px;
                background-color: rgba(0, 0, 0, 0.5);
            }
            img {
                user-select: none;
                max-width: 100%;
                min-height: 300px;

            }
        }
    }

}

@media (min-width: $rwdTablet) {}
@media (min-width: $rwdTabletLandscape) {}
@media (min-width: $rwdLaptop) {

    img {
        cursor: pointer;
        transition: filter 0.4s;
        filter: brightness(0.8);
        &:hover {
            filter: brightness(1.1);
        }
    }
}
@media (min-width: $rwdDesktop) {}
</style>
