<template>
<div id="app">
  <navbar :navWidth="1600" title="Movie Storm" :navElements="[{name: 'Home', url: '/'},{name: 'Discover', url: '/discover'}]" :backgroundOnScroll="false" v-on:inputTrigger="handleInput($event)" mobileSrc="@/assets/hamburger.svg">
  </navbar>
  <loading></loading>
  <router-view :key="$route.fullPath" />
  <contact></contact>
</div>
</template>

<script>
import navbar from '@/components/navbar.vue'
import loading from '@/components/loading.vue'
import contact from '@/components/contact.vue'

export default {
  name: 'app',
  components: {
    navbar,
    loading,
    contact
  }
}
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
