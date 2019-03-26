// vue.config.js
module.exports = {
   publicPath: "/",
   css: {
    loaderOptions: {
      sass: {
        data: `@import "@/vars.scss";`
      }
    }
  }
}
