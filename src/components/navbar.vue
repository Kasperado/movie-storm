<template>
<nav>
  <div class="nav_background">
    <div class="nav_content" :style="{'max-width': navWidth + 'px' }">

      <div class="logo">
        <router-link to='/'>
          <div v-if='logo' class="img_flex">
            <img :src="logoSrc" alt="logo" />
          </div>
          <p>{{ title }}</p>
        </router-link>
      </div>

      <div class="searchbox">
        <input id="searchbox" name="searchbox" placeholder="Search" v-model="searchValue" autocomplete='off' v-on:keyup.enter='submitSearch' />
      </div>

      <ul>
        <li v-for="n in navElements" :key="n.name" @click="toggleMenu">
          <router-link :to='n.url' class="list_link">{{n.name}}</router-link>
        </li>
      </ul>

      <div @click="toggleMenu" class="mobile_menu">
        <img :src="require(`@/assets/hamburger.svg`)" alt="menu">
      </div>

    </div>
  </div>
  <div class="nav_filler"></div>
</nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      navOpen: false,
      navBusy: false,
      searchValue: ''
    }
  },
  props: {
    navWidth: {
      type: Number,
      default: 1000,
    },
    responsiveWidth: {
      type: Number,
      default: 768,
    },
    backgroundOnScroll: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: Boolean,
      default: false,
    },
    logoSrc: String,
    title: {
      type: String,
      default: 'title',
    },
    navElements: Array,
    mobileSrc: {
      type: String,
      default: 'logo.png',
    }
  },
  methods: {

    toggleMenu() {
      if (!this.navBusy && screen.width <= this.responsiveWidth) {
        let timer = 0;
        if (this.navOpen) {

          document.querySelector('.searchbox').classList.remove("searchbox_active");
          [].slice.call(document.querySelectorAll('li'), 0).reverse().forEach((e) => {
            setTimeout(() => {
              e.classList.remove("list_element_active");
            }, timer);
            timer += 100;
          });
        } else {

          document.querySelector('.searchbox').classList.add("searchbox_active");
          document.querySelectorAll('li').forEach((e) => {
            setTimeout(() => {
              e.classList.add("list_element_active");
            }, timer);
            timer += 100;
          });
        }



        this.navBusy = true;

        setTimeout(() => {
          this.navBusy = false;
        }, (timer + 50));
        this.navOpen = !this.navOpen;
      }
    },

    scrollFun() {
      //Closing Nav
      if (this.navOpen && window.innerWidth < this.responsiveWidth) {
        var timer = 0;
        [].slice.call(document.querySelectorAll('li'), 0).reverse().forEach((e) => {
          setTimeout(() => {
            e.classList.remove("list_element_active");
          }, timer);
          timer += 100;
        });
      }

      //Scrolling
      if (!this.backgroundOnScroll || ((document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80) ||
          window.innerWidth < this.responsiveWidth)) {
        document.querySelector('.nav_background').classList.add('navbar_scrolled');
      } else {
        document.querySelector('.nav_background').classList.remove('navbar_scrolled');
      }

    },

    submitSearch() {
      if (this.searchValue !== '') {
        document.querySelector('input').blur();
        this.toggleMenu();
        this.$router.push({
          name: 'search',
          params: {
            value: this.searchValue
          }
        });
      }
    }
  },
  mounted() {
    this.scrollFun();
    document.addEventListener("scroll", this.scrollFun, false);
    window.addEventListener('resize', this.scrollFun, false);
  }
}
</script>

<style lang="scss" scoped>
.searchbox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    margin: auto;
    width: 100%;
    align-items: center;
    background-color: $navColor;
    border-top: 2px $borderColor solid;
    height: $navHeightMobile;
    transition: transform 0.4s;
    transform: translate(0, 100%);
    input {
        min-width: 200px;
        width: 10vw;
        margin: auto;
        padding: 10px;
        border-radius: 16px;
        border: none;
        transition: border 0.4s;
        background-color: #191817;
        border: 2px solid $borderColor;
        color: white;
        font-style: italic;
        &:focus {
            outline: none;
            border: 2px solid $borderColorHover;
        }
    }
}

.nav_filler {
    height: $navHeightMobile;
}

.nav_background {
    z-index: 9;
    user-select: none;
    position: fixed;
    width: 100%;
    margin: auto;
    top: 0;
    a,
    p {
        color: black;
    }
    .nav_content {
        height: $navHeightMobile;
        margin: auto;
        display: flex;
        justify-content: space-between;
        .logo {
            a {
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                .img_flex {
                    height: 100%;
                    img {
                        padding: 10px;
                        height: 100%;
                    }
                }
                p {
                    font-style: italic;
                    font-size: 3vh;
                    font-weight: bold;
                    margin-left: 12px;
                }
            }
        }
        .mobile_menu {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            min-width: 20%;
            img {
                padding: 10px;
            }
        }
    }
}

ul {
    padding: 0;
    margin: 0;
    text-align: center;
    list-style-type: none;
    position: absolute;
    top: calc(100% + 2px);
    transform: translate(100%,0);
    width: 100%;
    align-items: center;
    flex-direction: column;
    li {
        padding: 4px 0;
        width: 100%;
        cursor: pointer;
        border-bottom: 2px solid $borderColor;
        transition: transform 0.4s;
        background-color: $navColor;
        a {
            padding: 8px;
            display: block;
            font-weight: bold;
            font-style: italic;
        }
    }
}

.list_element_active {
    transform: translate(-100%, 0);
}

.searchbox_active {
    transform: translate(0, 0);
}

.navbar_scrolled {
    border-bottom: 2px solid $borderColor;
    background-color: $navColor;
    a,
    p {
        color: $borderColor;
        &:hover {
            color: $borderColorHover;
        }
    }
}

//Anime
.list_link,
.nav_background,
a,
img,
p {
    transition: 0.4s;
}

@media (min-width: $rwdTablet) {
    .searchbox {
        transform: translate(0,0);
        height: auto;
        background: none;
        position: inherit;
        border: none;
        width: auto;
        input {
            max-width: 200px;
        }
    }
}

@media (min-width: $rwdTabletLandscape) {

    .nav_filler {
        height: $navHeight;
    }

    .nav_background .nav_content {
        height: $navHeight;
        .logo a p {
            margin-left: 18px;
        }

        ul {
            display: flex;
            top: 0;
            width: auto;
            position: static;
            flex-direction: row;
            margin-right: 18px;
            transform: translate(0,0);
            li {
                background-color: transparent;
                padding: 0 10px;
                width: auto;
                background-color: inherit;
                border: none;
            }
        }

        .mobile_menu {
            display: none;
        }

    }

}

@media (min-width: $rwdLaptop) {}
@media (min-width: $rwdDesktop) {}
</style>
