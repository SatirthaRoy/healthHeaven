import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
  return (
    <div className='w-11/12 mx-auto h-[75vh] mt-44 rounded-3xl'>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation= {true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://png.pngtree.com/png-clipart/20230519/original/pngtree-vegetables-and-fruits-health-products-medical-industry-web-banner-png-image_9164845.png" alt=""/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://png.pngtree.com/png-clipart/20230519/original/pngtree-vegetables-and-fruits-health-products-medical-industry-web-banner-png-image_9164845.png" alt=""/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://png.pngtree.com/png-clipart/20230519/original/pngtree-vegetables-and-fruits-health-products-medical-industry-web-banner-png-image_9164845.png" alt=""/>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner