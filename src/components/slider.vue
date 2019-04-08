<template lang="html">
  <div class="slider">

    <div @click="changeSlide(-1, false)" class="arr_left">
      <i class="fas fa-chevron-left"></i>
    </div>

    <div class="counter_container">
      <div class="counter">
        <div v-for='(btn, index) in this.heroMovies' @click="changeSlide(index, true)" :class="'counter_btn ' + (index == 0 ? 'counter_btn-active' : '')" :key="'counter' + index"></div>
      </div>
    </div>

    <div @click="changeSlide(1, false)" class="arr_right">
      <i class="fas fa-chevron-right"></i>
    </div>

    <div class="movie_hero" v-for='(r, index) in heroMovies' :style=" index == 0 ? 'opacity: 1' : 'opacity: 0'" :key="r.id">
        <router-link :to="{ name: 'details', params: {type: getCategory(r), id : r.id } }" :id='getCategory(r)'>
          <img :src="'https://image.tmdb.org/t/p/original/' + r.backdrop_path" :alt="r.title || r.name">
        </router-link>
      <div class="movie_info">
        <div class="title">
          {{r.title || r.name}}
        </div>
        <div class="info">
          {{ getType(r) + " | " + (r.vote_average + (Number.isInteger(r.vote_average) ?  '.0' : '') + ' &#9733;')}}
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

    getCategory(r) {
      if (r.title != null) { // Movie ?
        return 'movie';
      } else if (r.first_air_date != null) { // TV Series ?
        return 'tv';
      } else { // Person
        return 'person';
      }
    },

    getType(r) {
      if (r.title != null) {
        return 'Movie';
      } else {
        return 'TV series';
      }
    },

    changeSlide(num, selected) {
      document.querySelectorAll('.movie_hero')[this.activeSlider].style.opacity = '0';
      document.querySelectorAll('.counter_btn')[this.activeSlider].classList.remove('counter_btn-active');

      if (selected) {
        this.activeSlider = num;
      } else {

        if ((this.activeSlider + num) > (this.heroMovies.length - 1)) {
          this.activeSlider = 0;
        } else if ((this.activeSlider + num) < 0) {
          this.activeSlider = (this.heroMovies.length - 1);
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
    text-align: left;
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
        .movie_info {
            position: absolute;
            bottom: 0;
            left: 0;
            margin: 16px;
            z-index: 4;
            .title {
                font-size: 20px;
                text-shadow: 2px 2px black;
            }
            .info {
                font-size: 12px;
                text-shadow: 2px 2px black;
            }
        }
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
        padding: 8px;
        transition: background-color 0.5s;
        &:hover {
            background-color: rgba(255,255,255,0.1);
        }
    }
    .counter_container {
        display: none;
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
        max-height: 55vh;
        .movie_hero {
            .movie_info {
                margin: 20px;
                .title {
                    font-size: 28px;

                }
                .info {
                    font-size: 15px;
                }
            }
        }

        i {
            font-size: 2.5em;
        }
    }
}
@media (min-width: $rwdTabletLandscape) {

    .slider {
        max-height: 65vh;
        .movie_hero {
            .movie_info {
                margin: 20px;
                .title {
                    font-size: 36px;
                }
                .info {
                    font-size: 16px;
                }
            }
        }
        .counter_container {
            display: flex;
        }
        i {
            font-size: 3em;
        }
    }
}
@media (min-width: $rwdLaptop) {
    .slider {
        max-height: 75vh;
        .movie_hero {
            .movie_info {
                margin: 20px;
                .title {
                    font-size: 42px;
                }
                .info {
                    font-size: 18px;
                }
            }
        }
    }
}
@media (min-width: $rwdDesktop) {

    .slider {
        max-height: 85vh;
        .movie_hero {
            .movie_info {
                margin: 28px;
                .title {
                    font-size: 48px;
                }
                .info {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
