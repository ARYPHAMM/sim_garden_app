<template lang="">
  <div class="col-12 py-3">
    <h3 class="text-center text-uppercase">Góc chia sẻ</h3>
  </div>
  <div class="col-md-6 col-12 px-1">
    <div class="post__top bg-white p-1 shadow-sm">
      <PostItem />
    </div>
  </div>
  <div class="col-md-6 col-12 px-1">
    <div class="post__top bg-white p-1 shadow-sm">
      <PostItem />
    </div>
  </div>

</template>
<script>
import { defineComponent } from "vue";
import PostItem from "../post/PostItem.vue";
export default defineComponent({
  components: {
    PostItem,
  },
  setup(props) {
    return {
      PostItem,
    };
  },
});
</script>
