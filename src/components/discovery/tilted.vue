<template lang="html">
    <div class="tilt" ref="tiltedpls">
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
    height: 120px;
    position: relative;
    border-top: 2px solid $borderColor;
    border-bottom: 2px solid $borderColor;
    margin: 2% 0;
    span {
        font-size: 1.5em;
    }
    /*img {
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }*/
}
</style>
