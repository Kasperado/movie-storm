<template lang="html">
  <div class="loading">
    <img src="@/assets/loading.svg" alt="Loading...">
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss" scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 99;
    width: 100%;
    top: calc(10vh + 2px);
    height: calc(90vh - 2px);
    background-color: #323334;
    transition: opacity 0.25s;
    opacity: 1;
    pointer-events: none;
    img {
        max-width: 128px;
        max-height: 128px;
    }
}

@media (min-width: $rwdTabletLandscape) {
    .loading {
        top: calc(8vh + 2px);
        height: calc(92vh - 2px);
    }
}
</style>
