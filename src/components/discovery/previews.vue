<template lang="html">
  <div class="container">
    <div @click="scrollPreviews(-1)" class="arr_left">
      <i class="fas fa-chevron-left"></i>
    </div>
    <div class="movies_container" ref='mov'>
      <preview v-for="r in this.filteredResults" :data="r"></preview>
    </div>
    <div @click="scrollPreviews(1)" class="arr_left">
      <i class="fas fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
import preview from '@/components/preview.vue'

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
  components: {
    preview
  },
  methods: {
    scrollPreviews(direction) { // move scroll by (width + margin) of movie preview
      let value = document.querySelector('.movie_preview').offsetWidth;
      value += parseInt(window.getComputedStyle(document.querySelector('.movie_preview')).getPropertyValue('margin-left')) * 2;
      this.$refs.mov.scrollBy(value * direction, 0);
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

    }

}

@media (min-width: $rwdTablet) {}
@media (min-width: $rwdTabletLandscape) {}
@media (min-width: $rwdLaptop) {}
@media (min-width: $rwdDesktop) {}
</style>
