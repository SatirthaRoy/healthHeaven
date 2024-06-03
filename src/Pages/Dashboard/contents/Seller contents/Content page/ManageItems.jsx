import React, { useState } from "react";
import DashboardSectionTitle from "../../../../../Shared components/DashboardSectionTitle";
import { useForm } from "react-hook-form";
import useData from "../../../../../Hooks/useData";
import useAxios from "../../../../../Hooks/useAxios";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import SellerTable from "../components/SellerTable";

// imgbb api url
const imgApi = import.meta.env.VITE_IMAGE_API;
const imgApiUrl = `https://api.imgbb.com/1/upload?key=${imgApi}`;

const ManageItems = () => {
  const axiosSecure = useAxios();
  const { user } = useData();
  // load categories data
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      console.log(res.data);
      return res.data;
    },
  });

  const {data:shopItems = []} = useQuery({
    queryKey: ['shopItems'],
    enabled: user != null,
    queryFn: async() => {
      const res = await axiosSecure.get(`/shop?id=${user.uid}`);
      return res.data;
    }
  })

  const companies = [
    "Health Heaven",
    "Acme Pharmaceuticals",
    "My Health",
    "HealthCorp",
    "MediLife",
    "Wellness Works",
    "Nature's Best",
    "BioCare",
    "PureHealth",
    "GreenPharma",
    "Vitality"
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [spinner, setSpinner] = useState();

  const onSubmit = async (data) => {
    console.log(data);
    // set spinner to true
    setSpinner(true);
    // host image on imgbb using its api
    const res = await axios.post(
      imgApiUrl,
      { image: data.photo[0] },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data?.success) {
      const ItemData = {
        sellerUid: user.uid,
        itemName: data.itemName,
        genericName: data.genericName,
        description: data.description,
        category: data.category,
        company: data.company,
        imageURL: res.data?.data?.display_url,
        price: Number(data.price),
        massUnit: data.unit,
        discount: Number(data.discount),
      };
      axiosSecure.post("/addtoshop", ItemData).then((res) => {
        if (res.data.insertedId) {
          setSpinner(false);
          toast.success("Item added successfully.");
          reset();
          document.getElementById("my_modal_5").close();
        }
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto space-y-10 py-20">
      <DashboardSectionTitle title="Manage Your Medicines" />

      <div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl md:text-4xl boska font-semibold">Your Total Items: {shopItems.length}</h1>
          {/* add medicine button */}
          
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="p-4 rounded-lg font-semibold text-white bg-theme hover:bg-theme btn"
          >
            Add Medicine
          </button>
        </div>
      </div>

      {/* a table will be here */}
      <SellerTable items={shopItems}/>



      {/* modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          {/* modal content goes here */}
          <form action="" className="flex-1">
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold">Item Name</h3>
              <input
                type="text"
                {...register("itemName", { required: true })}
                placeholder="Enter item name"
                className="focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
              />
              {errors.itemName?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Generic Name</h3>
              <input
                type="text"
                {...register("genericName", { required: true })}
                placeholder="Enter generic name"
                className="focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
              />
              {errors.description?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Short Description</h3>
              <textarea
                type="text"
                {...register("description", { required: true })}
                placeholder="Description"
                className="focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Image</h3>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Category</h3>
              <select
                className="w-full p-4 border-text border-b"
                {...register("category", { required: true })}
                name="category"
                id=""
              >
                {categories.map((category, i) => (
                  <option key={i} value={category?.categoryName}>
                    {category?.categoryName}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Company</h3>
              <select
                className="w-full p-4 border-text border-b"
                {...register("company", { required: true })}
                name="company"
                id=""
              >
                {companies.map((company, i) => <option key={i} value={company}>{company}</option>)}
              </select>
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Item Mass Unit(mg/ml)</h3>
              <select {...register("unit", { required: true })}
                className="w-full p-4 border-text border-b"
              >
                <option value="mg">mg</option>
                <option value="ml">ml</option>
              </select>
              {errors.unit?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Per Unit Price</h3>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="price"
                className="focus:border-b focus:border-theme focus:outline-none border-b border-black w-full pl-4 py-4 text-base font-normal"
              />
              {errors.price?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">
                Discount Percentage
              </h3>
              <input
                type="number"
                defaultValue={0}
                {...register("discount", { required: true })}
                placeholder="Discount percentage"
                className="focus:border-b focus:border-theme focus:outline-none border-b border-black w-full pl-4 py-4 text-base font-normal"
              />
              {errors.discount?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            {/* submit button */}
            <label htmlFor="" className="space-y-4">
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full p-4 cursor-pointer bg-theme font-semibold rounded-lg text-base text-white mt-6"
              >
                {spinner ? (
                  <span className="loading loading-spinner loading-md text-white"></span>
                ) : (
                  "Add Item"
                )}
              </button>
            </label>
          </form>
          <div className="absolute top-0 right-0 modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">X</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageItems;
