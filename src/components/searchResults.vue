<template lang="html">
  <div class="results_container" v-if='this.data'>
    <preview v-for="r in this.filteredResults" :data="r"></preview>
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

</style>
