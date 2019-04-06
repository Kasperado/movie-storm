// vue.config.js
module.exports = {
   publicPath: "/s/",
   css: {
    loaderOptions: {
      sass: {
        data: `@import "@/vars.scss";`
      }
    }
  }
}
