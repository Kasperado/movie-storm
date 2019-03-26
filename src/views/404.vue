<template lang="html">
  <section>
    <p>Error 404</p>
    <p>The address you are trying to access is invalid!</p>
  </section>
</template>

<script>
export default {
  name: '404'
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 90vh;
    p {
        font-size: 40px;
        &:first-child {
            color: $borderColor;
        }
    }
}
</style>
