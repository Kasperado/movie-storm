<template lang="html">
<footer>
  <div class="contact_information">
    <p>Website created by <a href="https://karolbos.net" target="_blank">Karol Boś</a></p>
    <p>API provided by <a href="https://www.themoviedb.org/" target="_blank">TMDb</a></p>
  </div>
  <div class="credit">
    <a href="https://www.themoviedb.org/" target="_blank"><img src="@/assets/TMDb.png" alt="TMDb Logo"></a>
  </div>
</footer>
</template>

<script>
export default {
  name: "footerComponent"
}
</script>

<style lang="scss" scoped>
footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 10vh;
    background-color: $navColor;
    border-top: 2px $borderColor solid;
    div {
        img {
            max-height: 96px;
            padding: 8px;
        }
    }
}

@media (min-width: $rwdTablet) {
    footer {
        flex-direction: row;
        div {
            width: 50%;
        }
    }
}
</style>
