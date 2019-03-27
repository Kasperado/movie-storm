<template lang="html">
    <div class="tilt">
      <span>{{text}}</span>
    </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Text not defined'
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    let deg = 2;
    if (this.reverse) {
      deg *= -1;
    }

    let tilts = document.querySelectorAll('.tilt');
    for (var i = 0; i < tilts.length; i++) {

      if (tilts[i].style.transform == '') {
        tilts[i].style.transform = 'skewY(' + deg + 'deg)';
        tilts[i].children[0].style.transform = 'skewY(' + (-1 * deg) + 'deg)';
        break;
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.tilt {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $navColor;
    color: $borderColor;
    height: 80px;
    position: relative;
    border-top: 2px solid $borderColor;
    border-bottom: 2px solid $borderColor;
    margin: 2% 0;
    span {
        font-size: 1em;
    }
}

@media (min-width: $rwdTablet) {
    .tilt {
        height: 90px;
        span {
            font-size: 1.1em;
        }
    }
}
@media (min-width: $rwdTabletLandscape) {
    .tilt {
        height: 100px;
        span {
            font-size: 1.25em;
        }
    }
}
@media (min-width: $rwdLaptop) {
    .tilt {
        height: 110px;
        span {
            font-size: 1.35em;
        }
    }
}
@media (min-width: $rwdDesktop) {
    .tilt {
        height: 120px;
        span {
            font-size: 1.5em;
        }
    }
}
</style>
