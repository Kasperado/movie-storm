<template>
<div id="app">
  <navbar :navWidth="1600" title="Movie Storm" :navElements="[{name: 'Discover', url: '/'},{name: 'Advanced Search', url: '/advanced'}]" :backgroundOnScroll="false" v-on:inputTrigger="handleInput($event)" mobileSrc="@/assets/hamburger.svg">
  </navbar>
  <loading></loading>
  <router-view v-if='axiosDone' :key="$route.fullPath" />
  <contact></contact>
</div>
</template>

<script>
import axios from 'axios'

import navbar from '@/components/navbar.vue'
import loading from '@/components/loading.vue'
import contact from '@/components/contact.vue'

export default {
  name: 'app',
  components: {
    navbar,
    loading,
    contact
  },
  data() {
    return {
      axiosDone: false
    }
  },
  methods: {

    axiosReady() {
      if (this.$store.getters.isReady) {
        this.axiosDone = true;
      }
    }

  },
  mounted() {

    let allTypes = ['movie', 'tv', 'person']; // 'all' was removed because it repeated types

    for (let i = 0; i < 3; i++) {

      let rand = Math.floor(Math.random() * allTypes.length);
      let type = allTypes[rand];
      allTypes.splice(rand, 1); // Delete one value so it won't repeat

      let time = ['day', 'week'][Math.floor(Math.random() * 2)];
      let theme = '';
      ("Trending " + type + " " + time);

      switch (type) {
        case 'movie':
          theme += 'Trending movies ';
          break;
        case 'tv':
          theme += 'Trending TV series ';
          break;
        case 'person':
          theme += 'Trending people ';
          break;
        default:
      }

      theme += time == 'day' ? ' of the day' : ' of the week';
      this.$store.commit('addHomeThemes', theme);

      axios.get(`https://api.themoviedb.org/3/trending/${type}/${time}?${ this.$store.state.api_key }`)
        .then((response) => {
          let r = response.data.results;
          console.log(response.headers);
          this.$store.commit('addHomeResults', {
            r,
            i
          });
          if (type == 'movie' || type == 'tv') {
            this.$store.commit('addSliderMovie', response.data.results.slice(Math.max(20 - 2, 1)));
          }
          this.axiosReady();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
}

/*
TO DOs

MBDb APIs

https://api.themoviedb.org/3  <-- base

api_key=80ce5140be88a1814f46d46b0daf8b4b

Image base for poster background

https://image.tmdb.org/t/p/w500/mKBP1OCgCG0jw8DwVYlnYqVILtc.jpg
https://image.tmdb.org/t/p/original/{{imgPath}}
*/
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: $borderColor;
    transition: color 0.5s;
    &:hover {
        color: $borderColorHover;
    }
}

i {
    color: $borderColor;
    transition: color 0.5s;
    &:hover {
        color: $borderColorHover;
    }
}

@media (min-width: $rwdTablet) {
    i {
        font-size: 2.5em;
    }
}
@media (min-width: $rwdTabletLandscape) {
    i {
        font-size: 3em;
    }
}

body,
html {
    padding: 0;
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    // Mozilla
    scrollbar-color: $borderColor black;
    scrollbar-width: thin;
}

::-webkit-scrollbar {
    width: 6px;
    z-index: 6;
}

/* Track */
::-webkit-scrollbar-track {
    background-color: #1a1b1c;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: $borderColor;
}

::selection {
    color: white;
    background: $borderColor;
}

#app {
    background-color: $background;
    min-height: 100vh;
    color: white;
    text-align: center;
}
</style>
