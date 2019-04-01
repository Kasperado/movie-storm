import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import store from './store'

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)

Vue.use(Router)

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
      path: '/discover/:value?/:page?',
      name: 'discover',
      component: () => import('./views/Discover.vue')
    },
    {
      path: '/search/:value/:page?',
      name: 'search',
      component: () => import('./views/Searchbox.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('./views/Movies.vue')
    },{
      path: '/tv/:id',
      name: 'tv',
      component: () => import('./views/TV.vue')
    },{
      path: '/person/:id',
      name: 'person',
      component: () => import('./views/Person.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.state.ready) {
    document.querySelector('.loading').style.opacity = '1';
  } else {
    store.commit('readyUp');
  }

  setTimeout(() => { next() }, 400)
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
