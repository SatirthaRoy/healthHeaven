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
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import useData from "../../../Hooks/useData";
import toast from "react-hot-toast";
import useCart from "../../../Hooks/useCart";

const Slider = () => {
  const axiosSecure = useAxios();
  const {user} = useData();
  const [, refetch] = useCart();
  const {data:discounts=[]} = useQuery({
    queryKey: ['discounts'],
    queryFn: async() => {
      const res = await axiosSecure.get(`/shop/discounts`)
      return res.data;
    }
  })

  const onAddClick = (addedItem) => {
    const itemData = {
      itemId: addedItem._id,
      sellerUid: addedItem.sellerUid,
      itemName: addedItem.itemName,
      category: addedItem.category,
      imageURL: addedItem.imageURL,
      price: addedItem.price,
      discount: addedItem.discount,
      quantity: 1,
      userId: user?.uid
    }
    axiosSecure.post('/addcart', itemData)
    .then(res => {
      if(res.data.insertedId || res.data.modifiedCount) {
        toast.success('Item added successfully.');
        refetch();
      }
    })
  }

  return (
    <Swiper
    slidesPerView={window.innerWidth > 750 ? 3 :'auto'}
    spaceBetween={30}
    freeMode={true}
    grabCursor={true}
    navigation={true}
    pagination={{type: 'progressbar'}}
    modules={[FreeMode, Navigation, Pagination]}
    className="mySwiper h-96 w-full"
  >
    {discounts.map((discount, i) => {
      return (
        <SwiperSlide key={i}>
          <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5">
            <div className="size-52 mx-auto">
              <img src={discount?.imageURL} alt="" className="object-contain h-auto"/>
            </div>
            <h1 className="text-start text-2xl font-semibold text-text">{discount?.itemName}</h1>
            <h1 className="text-start font-medium text-xl"><span className="line-through font-normal text-red-300">${discount?.price * discount?.discount/100 + discount?.price}</span>  <span>${discount?.price}</span> <span className="bg-theme text-white font-normal text-base p-2 ml-5">-{discount?.discount}% off</span></h1>

            <div className="flex w-full flex-col"><button onClick={() => onAddClick(discount)} className="bg-theme text-white font-semibold p-3 btn hover:bg-theme">Add to cart</button></div>
          </div>
        </SwiperSlide>
      )
    })}

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
