<template lang="">
  <div>
    <div class="container py-3">
      <div class="row">
        <HotProduct />
      </div>
    </div>
  </div>
</template>
<script>
import HotProduct from "../../components/home/HotProduct.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    HotProduct,
  },
  setup(props) {
    return {
      HotProduct,
    };
  },
});
</script>
