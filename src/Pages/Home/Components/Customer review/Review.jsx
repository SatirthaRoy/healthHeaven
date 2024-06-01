import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import SectionTitle from "../../../../Shared components/SectionTitle";

const Slider = () => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={30}
      freeMode={true}
      grabCursor={true}
      navigation={true}
      pagination={{ type: "progressbar" }}
      modules={[FreeMode, Navigation, Pagination]}
      className="mySwiper h-96 w-full"
    >
      <SwiperSlide>
        <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5 text-start">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-theme ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-text">Satirtha Roy</h1>
          </div>
          <h1 className="text-xl font-medium bg-theme bg-opacity-10 p-4 rounded-xl">
          Navigating HealthHeaven is a breeze. The website is well-organized, and finding products is easy with the search function. Each product page has detailed information, which helps me make informed decisions. The health tools, like the BMI calculator and symptom checker, are added bonuses. Delivery has always been timely, and the products are reliable. Overall, a fantastic experience!
          </h1>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

const Review = () => {
  return (
    <div className="mt-24 space-y-16">
      <SectionTitle title='Customer reviews' phrase='What our Customers think!'/>
      <Slider/>
    </div>
  )
}

export default Review