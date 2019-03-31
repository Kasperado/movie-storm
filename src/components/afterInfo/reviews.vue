<template lang="html">
  <div class="movie_reviews" v-if='this.data.length'>
    <h1>Reviews:</h1>
    <div class="review" v-for="r in this.data">
      <div class="user_info">
        <span>{{ r.author }}</span>
        <a class="user_id" :href="r.url" target="_blank"><span>{{ r.id }}</span></a>
      </div>
      <div class="review_content">
        <span>{{ r.content }}</span>
      </div>
    </div>
  </div>

  <div v-else>
    <h1>No Reviews</h1>
  </div>
</template>

<script>
export default {
  name: 'reviews',
  props: {
    data: {
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.movie_reviews {
    display: flex;
    flex-direction: column;
    width: 100%;
    .review {
        display: flex;
        flex-direction: column;
        width: 95%;
        max-width: 1200px;
        margin: auto;
        .user_info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            border-bottom: 2px $borderColor solid;
            background-color: $navColor;
            margin-top: 12px;
            .user_id {
                display: none;
            }
        }
        .review_content {
            background-color: $navColor;
            font-weight: 400;
            padding: 8px;
            text-align: left;
        }
    }
}

@media (min-width: $rwdTablet) {

    .movie_reviews {
        .review {
            width: 80%;
            .user_info {
                .user_id {
                    display: block;
                    font-size: 12px;
                }
            }
            .review_content {
                padding: 0 8px;
            }
        }
    }

}
@media (min-width: $rwdTabletLandscape) {}
@media (min-width: $rwdLaptop) {}
@media (min-width: $rwdDesktop) {}
</style>
