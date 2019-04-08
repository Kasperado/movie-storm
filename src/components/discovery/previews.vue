<template lang="html">
  <div class="container" v-if='this.results.length'>
    <div @click="scrollPreviews(-1)" class="arr_left">
      <i class="fas fa-chevron-left"></i>
    </div>
    <div class="movies_container" ref='mov'>
      <preview v-for="r in this.filteredResults" :data="r" :key='r.id'></preview>
    </div>
    <div @click="scrollPreviews(1)" class="arr_left">
      <i class="fas fa-chevron-right"></i>
    </div>
  </div>
  <div v-else>
    <p>Nothing found</p>
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
      let containerWidth = document.querySelector('.movies_container').offsetWidth; // Get container width
      let value = document.querySelector('.movie_preview').offsetWidth; // Get preview width
      value += parseInt(window.getComputedStyle(document.querySelector('.movie_preview')).getPropertyValue('margin-left')) * 2; // Add margin
      let valueToScroll = Math.floor(containerWidth / value) * value; // Scroll so much that all visible previews will be scrolled
      this.$refs.mov.scrollBy(valueToScroll * direction, 0); // Scrolling
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
        width: 15%;
        font-size: 2em;
        i {
            max-width: 100%;

        }
    }
    .movies_container {
        display: flex;
        overflow: hidden;
        scroll-behavior: smooth;
        flex-shrink: 0;
        width: 70%;
    }
}

div p {
    font-weight: 400;
}

@media (min-width: $rwdTablet) {
    .container {
        .arr_left,
        .arr_right {
            width: 10%;
            i {
                font-size: 2.5em;
            }
        }
        .movies_container {
            width: 80%;
        }
    }
}
@media (min-width: $rwdTabletLandscape) {
    .container {
        .arr_left,
        .arr_right {
            i {
                font-size: 3em;
            }
        }
    }
}
@media (min-width: $rwdLaptop) {}
@media (min-width: $rwdDesktop) {}
</style>
