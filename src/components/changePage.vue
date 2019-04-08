<template lang="html">
  <div class="direction_container" v-if='this.pages'>

    <div :class="'go' + ( (this.$route.params.page || 1) == 1 ? ' disabled' : '')" @click='changePage(-1)'>
      <i class="fas fa-chevron-left"></i>
    </div>
    <div class="page_count">
      {{'Page ' + (this.$route.params.page || 1) +' out of '+ this.pages}}
    </div>
    <div :class="'go' +  ( (this.$route.params.page || 1) >= this.pages ? ' disabled' : '')" @click='changePage(1)'>
      <i class="fas fa-chevron-right"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: "changePage",
  props: {
    routeName: {
      default: ''
    },
    pages: null
  },
  methods: {

    changePage(direction) {
      let currentPage = parseInt(this.$route.params.page) || 1;
      if (currentPage + direction > 0 && currentPage + direction <= this.pages) {
        this.$router.push({
          name: this.routeName,
          params: {
            value: this.$route.params.value,
            page: (currentPage + direction)
          },
          query: this.$route.query,

        });
        window.scrollTo(0, 0);
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.direction_container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 480px;
    margin: auto;
    .go {
        margin: 8px;
        background-color: $borderColor;
        min-width: 60px;
        border-radius: 4px;
        cursor: pointer;
    }
    i {
        font-size: 1.5em;
        padding: 8px;
        color: white;
    }
    .disabled {
        background-color: gray;
        pointer-events: none;
    }
}

@media (min-width: $rwdTablet) {
    .direction_container {
        max-width: 600px;
        .go {
            margin: 12px;
            min-width: 120px;
        }
        i {
            font-size: 2em;
            padding: 8px;
        }
    }
}
</style>
