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
    routeName: '',
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
          }
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
    max-width: 600px;
    margin: auto;
    .go {
        margin: 12px;
        background-color: $borderColor;
        width: 120px;
        border-radius: 4px;
        cursor: pointer;
    }
    i {
        font-size: 2em;
        padding: 8px;
        color: white;
    }
    .disabled {
        background-color: gray;
        pointer-events: none;
    }
}
</style>
