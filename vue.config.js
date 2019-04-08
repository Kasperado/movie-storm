// vue.config.js
module.exports = {
   publicPath: "/views/movie-storm/",
   css: {
    loaderOptions: {
      sass: {
        data: `@import "@/vars.scss";`
      }
    }
  }
}
