<template lang="">
  <div>
    <div class="container py-2">
      <div class="row">
        <HotProduct />
      </div>
    </div>
    <div class="bg-white">
      <div class="container py-2">
        <div class="row">
          <Carousel />
        </div>
      </div>
    </div>
    <div class="container py-2">
      <div class="row">
        <NewPost />
      </div>
    </div>
  </div>
</template>
<script>
import HotProduct from "../../components/home/HotProduct.vue";
import NewPost from "../../components/home/NewPost.vue";
import Carousel from "../../components/home/Carousel.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    NewPost,
    HotProduct,
    Carousel,
  },
  setup(props) {
    return {
      NewPost,
      HotProduct,
      Carousel,
    };
  },
});
</script>
