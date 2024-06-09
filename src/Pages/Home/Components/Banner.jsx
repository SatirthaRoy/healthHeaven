import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const Banner = () => {

  const axiosSecure = useAxios();
  const {data:addedAds=[]} = useQuery({
    queryKey:['addedAds'],
    queryFn: async() => {
      const res = await axiosSecure.get('/addedAds');
      return res.data;
    }
  })

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
        {addedAds.map((ad, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={ad?.AdImage} alt=""/>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Banner