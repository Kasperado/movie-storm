// vue.config.js
module.exports = {
   publicPath: "/storm/",
   css: {
    loaderOptions: {
      sass: {
        data: `@import "@/vars.scss";`
      }
    }
  }
}
