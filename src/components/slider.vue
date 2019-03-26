<template lang="html">
  <div class="slider">

    <div @click="changeSlide(-1, false)" class="arr_left">
      <i class="fas fa-chevron-left"></i>
    </div>

    <div class="counter_container">
      <div class="counter">
        <div @click="changeSlide(0, true)" class="counter_btn counter_btn-active"></div>
        <div @click="changeSlide(1, true)" class="counter_btn"></div>
        <div @click="changeSlide(2, true)" class="counter_btn"></div>
      </div>
    </div>

    <div @click="changeSlide(1, false)" class="arr_right">
      <i class="fas fa-chevron-right"></i>
    </div>

    <div class="movie_hero" v-for='(m, index) in heroMovies' :style=" index == 0 ? 'opacity: 1' : 'opacity: 0'">
        <router-link :to="{ name: 'movie', params: {id : m.id } }" id='movie'>
          <img :src="'https://image.tmdb.org/t/p/original/' + m.backdrop_path" :alt="m.title">
        </router-link>
      <div class="movie_info">
        <div class="title">
          {{m.title}}
        </div>
        <div class="score">
          {{m.vote_average.toString().length > 1 ? m.vote_average + ' &#9733;' : m.vote_average + '.0 &#9733;'}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'slider',
  data() {
    return {
      activeSlider: 0,
      moveInterval: 0 // <-- Interval
    }
  },
  computed: {
    heroMovies: function() {
      return this.$store.state.sliderMovies;
    }
  },
  methods: {

    changeSlide(num, selected) {
      document.querySelectorAll('.movie_hero')[this.activeSlider].style.opacity = '0';
      document.querySelectorAll('.counter_btn')[this.activeSlider].classList.remove('counter_btn-active');

      if (selected) {
        this.activeSlider = num;
      } else {

        if ((this.activeSlider + num) > 2) {
          this.activeSlider = 0;
        } else if ((this.activeSlider + num) < 0) {
          this.activeSlider = 2;
        } else {
          this.activeSlider += num;
        }

      }

      document.querySelectorAll('.movie_hero')[this.activeSlider].style.opacity = '1';
      document.querySelectorAll('.counter_btn')[this.activeSlider].classList.add('counter_btn-active');
    },

    autoChange() {
      this.changeSlide(1, false);
    }

  },
  mounted() {
    this.moveInterval = setInterval(this.autoChange, 8000);

  },
  beforeDestroy() {
    clearInterval(this.moveInterval);
  }
}
</script>

<style lang="scss" scoped>
.slider {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    user-select: none;
    max-height: 40vh;
    height: 100vw;
    background-color: #123;
    border-top: 2px solid $borderColor;
    border-bottom: 2px solid $borderColor;
    .movie_hero {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s;
        img {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    .movie_info {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 4px;
        bottom: 0;
        left: 0;
        z-index: 4;
    }
    i {
        font-size: 2em;
    }
    .arr_left,
    .arr_right {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 4;
        height: 100%;
        min-width: 50px;
        transition: background-color 0.5s;
        &:hover {
            background-color: rgba(255,255,255,0.1);
        }
    }
    .counter_container {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 100%;
        .counter {
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 4;
            .counter_btn {
                cursor: pointer;
                border: 2px solid $borderColor;
                border-radius: 50%;
                background-color: #123;
                transition: background-color 0.5s;
                width: 18px;
                height: 18px;
                margin: 6px;
            }
            .counter_btn-active {
                background-color: $borderColor;
            }
        }
    }

    .active {
        opacity: 1;
    }
}

@media (min-width: $rwdTablet) {
    .slider {
        i {
            font-size: 2.5em;
        }
    }
}
@media (min-width: $rwdTabletLandscape) {
    .slider {
        max-height: 50vh;
        i {
            font-size: 3em;
        }
    }
}
@media (min-width: $rwdLaptop) {
    .slider {
        max-height: 75vh;
    }
}
@media (min-width: $rwdDesktop) {
    .slider {
        max-height: 85vh;
    }
}
</style>
