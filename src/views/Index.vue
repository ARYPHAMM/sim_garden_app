<template>
  <Header />
  <div>
    <RouterView />
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";

import { defineComponent } from "vue";
import Header from "../components/Header.vue";
export default defineComponent({
  components: {
    Header,
  },
  setup(props) {
    return {
      Header,
    };
  },
});
</script>
