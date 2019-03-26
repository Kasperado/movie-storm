import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import store from './store'

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)

Vue.use(Router)

Vue.prototype.$activateLoading = function (event) {
  if(this.$route.name != event.target.parentElement.id && this.$route.name != event.target.id)
      document.querySelector('.loading').style.opacity = '1';
  }

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/advanced',
      name: 'advanced',
      component: () => import('./views/Advanced.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('./views/Movies.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  setTimeout(() => { next() }, 250)
})

router.afterEach(() => {
  document.querySelector('.loading').style.opacity = '0';
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
