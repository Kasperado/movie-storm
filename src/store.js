import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_key: 'api_key=80ce5140be88a1814f46d46b0daf8b4b',
    ready: false,
    sliderMovies: [],
    homeResults: [],
    homeThemes: []
  },
  mutations: {
    readyUp (state){
      state.ready = true;
    },
    addSliderMovie(state, m) {
      state.sliderMovies.push(...m);
    },
    addHomeResults(state, payload) {
      state.homeResults[payload.i] = payload.r;
    },
    addHomeThemes(state, t) {
      state.homeThemes.push(t);
    }

  },
  actions: {

  }
})
