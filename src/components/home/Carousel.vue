<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <a href="javascript:void(0)" class="carousel__item">
        <img src="@/assets/images/carousel/pot_1.jpg" alt="" />
      </a>
    </swiper-slide>
    <swiper-slide>
      <a href="javascript:void(0)" class="carousel__item">
        <img src="@/assets/images/carousel/pot_2.jpg" alt="" />
      </a>
    </swiper-slide>
    <swiper-slide>
      <a href="javascript:void(0)" class="carousel__item">
        <img src="@/assets/images/carousel/pot_3.jpg" alt="" />
      </a>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>
