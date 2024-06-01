import React from "react";
import SectionTitle from "../../../Shared components/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <Swiper
    slidesPerView={3}
    spaceBetween={30}
    freeMode={true}
    grabCursor={true}
    navigation={true}
    pagination={{type: 'progressbar'}}
    modules={[FreeMode, Navigation, Pagination]}
    className="mySwiper h-96 w-full"
  >
    <SwiperSlide>
      <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5">
        <div className="size-52 mx-auto">
          <img src="https://cdn01.pharmeasy.in/dam/products_otc/180461/venusia-max-intensive-moisturizing-cream-for-dry-to-very-dry-skin-repairs-smoothens-skin-150g-2-1686118239.jpg" alt="" className="object-contain h-auto"/>
        </div>
        <h1 className="text-start text-2xl font-semibold text-text">Venusia Max</h1>
        <h1 className="text-start font-medium text-xl">$100 <span className="bg-theme text-white font-normal text-base p-2 ml-5">20% off</span></h1>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5">
        <div className="size-52 mx-auto">
          <img src="https://www.albionbd.com/wp-content/uploads/2022/07/Paracetamol-Tablet-1.jpg" alt="" className="object-contain h-auto"/>
        </div>
        
        <h1 className="text-start text-2xl font-semibold text-text">Venusia Max</h1>
        <h1 className="text-start font-medium text-xl">$100 <span className="bg-theme text-white font-normal text-base p-2 ml-5">20% off</span></h1>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5">
        <div className="size-52 mx-auto">
          <img src="https://m.media-amazon.com/images/I/516-R8BLz6L._SL1200_.jpg" alt="" className="object-contain h-auto w-full"/>
        </div>
        
        <h1 className="text-start text-2xl font-semibold text-text">Venusia Max</h1>
        <h1 className="text-start font-medium text-xl">$100 <span className="bg-theme text-white font-normal text-base p-2 ml-5">20% off</span></h1>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5">
        <div className="size-52 mx-auto">
          <img src="https://cdn01.pharmeasy.in/dam/products_otc/180461/venusia-max-intensive-moisturizing-cream-for-dry-to-very-dry-skin-repairs-smoothens-skin-150g-2-1686118239.jpg" alt="" className="object-contain h-auto"/>
        </div>
        <h1 className="text-start text-2xl font-semibold text-text">Venusia Max</h1>
        <h1 className="text-start font-medium text-xl">$100 <span className="bg-theme text-white font-normal text-base p-2 ml-5">20% off</span></h1>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5">
        <div className="size-52 mx-auto">
          <img src="https://www.albionbd.com/wp-content/uploads/2022/07/Paracetamol-Tablet-1.jpg" alt="" className="object-contain h-auto"/>
        </div>
        
        <h1 className="text-start text-2xl font-semibold text-text">Venusia Max</h1>
        <h1 className="text-start font-medium text-xl">$100 <span className="bg-theme text-white font-normal text-base p-2 ml-5">20% off</span></h1>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5">
        <div className="size-52 mx-auto">
          <img src="https://m.media-amazon.com/images/I/516-R8BLz6L._SL1200_.jpg" alt="" className="object-contain h-auto w-full"/>
        </div>
        
        <h1 className="text-start text-2xl font-semibold text-text">Venusia Max</h1>
        <h1 className="text-start font-medium text-xl">$100 <span className="bg-theme text-white font-normal text-base p-2 ml-5">20% off</span></h1>
      </div>
    </SwiperSlide>
  </Swiper>
  )
};

const Discount = () => {
  return (
    <div className="w-full space-y-10 mt-28">
      <SectionTitle
        title="Discounts"
        phrase="Unlock Exclusive Discounts on Top Medicines and Healthcare Products"
      />
      <Slider/>
    </div>
  );
};

export default Discount;
