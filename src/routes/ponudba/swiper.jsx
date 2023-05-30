import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "./swiper.css";
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();
SwiperCore.use([Navigation, Pagination]);

const SwiperCarousel = () => {
  return (
    <swiper-container>
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper-container>
  );
};

export default SwiperCarousel;
