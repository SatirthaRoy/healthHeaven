import React from "react";
import SectionTitle from "../../../Shared components/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <Swiper
      slidesPerView={window.innerWidth > 750 ? 3 :'auto'}
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
          <h1 className="text-xl font-medium">
            <span className="font-bold">
              Question: Can I get a prescription filled through your website?
            </span>
          </h1>
          <h1 className="text-start text-xl font-medium text-text">
            <span className="font-bold">Answer: </span>Yes, we offer
            prescription fulfillment services. Upload your prescription during
            the ordering process, and our licensed pharmacists wilasdfsal review and
            process your order.
          </h1>
        </div>
      </SwiperSlide>
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
          <h1 className="text-xl font-medium">
            <span className="font-bold">
              Question: Can I get a prescription filled through your website?
            </span>
          </h1>
          <h1 className="text-start text-xl font-medium text-text">
            <span className="font-bold">Answer: </span>Yes, we offer
            prescription fulfillment services. Upload your prescription during
            the ordering process, and our licensed pharmacists wilasdfsal review and
            process your order.
          </h1>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

const Queries = () => {
  return (
    <div className="mt-28 space-y-10">
      <SectionTitle
        title="Queries"
        phrase="Have Questions? Get Expert Assistance and Quick Answers Here"
      />
      <Slider />
      <button className="mx-auto block p-4 text-white font-semibold bg-theme rounded-2xl">
        See all
      </button>
    </div>
  );
};

export default Queries;
