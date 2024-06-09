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
import useGetQueries from "../../../Hooks/useGetQueries";
import { Link, useNavigate } from "react-router-dom";

const Slider = () => {
  const queries = useGetQueries();
  console.log(queries);
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
      {queries.map((query, i) => {
        return (
          <SwiperSlide key={i}>
           <Link to={`/queries/${query._id}`}>
             <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5 text-start">
               <div className="flex items-center gap-4">
                 <div className="avatar">
                   <div className="w-16 rounded-full ring ring-theme ring-offset-base-100 ring-offset-2">
                     <img src={query?.photoURL} />
                   </div>
                 </div>
                 <h1 className="text-2xl font-semibold text-text">Satirtha Roy</h1>
               </div>
               <h1 className="text-xl font-medium">
                 <span className="font-bold">
                   Question: {query?.question}
                 </span>
               </h1>
             </div>
           </Link>
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
};

const Queries = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-28 space-y-10">
      <SectionTitle
        title="Queries"
        phrase="Have Questions? Get Expert Assistance and Quick Answers Here"
      />
      <Slider />
      <button onClick={() => navigate('/allqueries')} className="mx-auto block btn hover:bg-theme text-white font-semibold bg-theme rounded-2xl">
        See all
      </button>
    </div>
  );
};

export default Queries;
