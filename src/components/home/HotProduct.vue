<template lang="">
  <div class="col-12">
    <h3 class="text-center text-uppercase">Sản phẩm nổi bật</h3>
  </div>
  <div class="col-12">
    <div class="row">
      <div class="col-md-3 col-12 mb-3 px-0" v-for="(item, index) in 8">
        <ProductItem class="mx-2 pb-3 bg-white rounded shadow-sm" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import ProductItem from "../../components/product/ProductItem.vue";
export default defineComponent({
  components: {
    ProductItem,
  },
  setup(props) {
    return {
      ProductItem,
    };
  },
});
</script>
