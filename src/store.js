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
  getters: {
    isReady: state => {
  //console.log(state.sliderMovies.length);
    //  console.log(state.homeResults.length);
    //  console.log(state.homeThemes.length);
      if(state.sliderMovies.length > 3 &&
        state.homeResults.length > 2 &&
        state.homeThemes.length > 2){
      return true;
    } else {
      return false;
    }

    }
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
