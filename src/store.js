import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_key: 'api_key= <your_key> ', // This is one of PHP variables which will be send to TMDb API to get data
    ready: false,
    sliderMovies: [],
    homeResults: [],
    homeThemes: [],
    movie_genres: [],
    tv_genres: []
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
    },
    addMovieGenres(state, g) {
      state.movie_genres.push(...g);
    },
    addTVGenres(state, g) {
      state.tv_genres.push(...g);
    }
  },
  actions: {

  }
})
