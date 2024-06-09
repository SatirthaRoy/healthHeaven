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
                <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1480204119.1717804800&semt=ais_user" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-text">Dipto Roy</h1>
          </div>
          <h1 className="text-xl font-medium bg-theme bg-opacity-10 p-4 rounded-xl">The website is well-organized, and finding products is easy with the search function. Each product page has detailed information, which helps me make informed decisions. The health tools, like the are added bonuses. Delivery has always been timely, and the products are reliable. Overall, a fantastic experience!
          </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5 text-start">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-theme ring-offset-base-100 ring-offset-2">
                <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-text">Himu</h1>
          </div>
          <h1 className="text-xl font-medium bg-theme bg-opacity-10 p-4 rounded-xl">
          Navigating HealthHeaven is a breeze. The website is well-organized, and finding products is easy with the search function. Each product page has detailed information, which helps me make informed decisions. The health tools, like the BMI calculator and symptom checker, are added bonuses. Delivery has always been timely, and the products are reliable. Overall, a fantastic experience!
          </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5 text-start">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-theme ring-offset-base-100 ring-offset-2">
                <img src='https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg' />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-text">Satirtha Roy</h1>
          </div>
          <h1 className="text-xl font-medium bg-theme bg-opacity-10 p-4 rounded-xl">The health tools, like the BMI calculator and symptom checker, are added bonuses. Delivery has always been timely.
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