<template lang="html">
  <div class="results_container" v-if='this.data.length > 0'>
    <preview v-for="r in this.filteredResults" :data="r" :key='r.id'></preview>
  </div>
  <div v-else>
    <span>Nothing found</span>
  </div>
</template>

<script>
import preview from '@/components/preview.vue'

export default {
  name: "searchResults",
  components: {
    preview
  },
  props: {
    data: {
      default: () => []
    }
  },
  computed: {
    filteredResults: function() {
      return this.data.filter((r) => {
        return (r.poster_path || r.profile_path) != null;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.results_container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: auto;
}

@media (min-width: $rwdTablet) {
    .results_container {
        width: 95%;
    }
}
@media (min-width: $rwdTabletLandscape) {
    .results_container {
        width: 90%;
    }
}
@media (min-width: $rwdLaptop) {
    .results_container {
        width: 85%;
    }
}
@media (min-width: $rwdDesktop) {
    .results_container {
        width: 80%;
    }
}
</style>
