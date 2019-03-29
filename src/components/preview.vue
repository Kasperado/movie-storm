<template lang="html">
  <div class="movie_preview">
    <router-link :to="{ name: getCategory(r), params: {id : r.id } }">
      <img :src="'https://image.tmdb.org/t/p/w500/'+(r.poster_path || r.profile_path)" :alt="r.title || r.original_name" title='Click for view'>
    </router-link>
    <span>{{r.title || r.name ||  r.original_name}}</span>
    <div class="year" v-if='r.gender || r.release_date || r.first_air_date'>
      {{ getYear(r) || (r.gender == 1 ? 'Female' : 'Male') }}
    </div>
    <div class="score" v-if='r.vote_average || r.known_for_department'>
      {{  getJob(r) || (r.vote_average + (Number.isInteger(r.vote_average) ?  '.0' : '') + ' &#9733;')}}
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
  computed: {
    r: function() {
      return this.data;
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

    getJob(r) {
      if (r.known_for_department == 'Acting') {
        return r.gender == 1 ? 'Actress' : 'Actor';
      } else if (r.known_for_department == 'Directing') {
        return r.gender == 1 ? 'Directress' : 'Director';
      } else if (r.known_for_department != null) {
        return r.known_for_department;
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
</style>
