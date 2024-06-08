import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { RiAdvertisementLine } from 'react-icons/ri'
import useAxios from '../../../../../Hooks/useAxios';
import toast from 'react-hot-toast';
import axios from 'axios';
import useData from '../../../../../Hooks/useData';
import { useQuery } from '@tanstack/react-query';


// imgbb api url
const imgApi = import.meta.env.VITE_IMAGE_API;
const imgApiUrl = `https://api.imgbb.com/1/upload?key=${imgApi}`;

const Advertisement = () => {
  const [spinner, setSpinner] = useState(false);
  const axiosSecure = useAxios();
  const {user} = useData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const {data:Ads=[], refetch} = useQuery({
    queryKey: ['ads'],
    enabled: user!=null,
    queryFn: async() => {
      const res = await axiosSecure.get(`/ads/${user?.uid}`);
      return res.data;
    }
  })


  const addAd = async(data) => {
    setSpinner(true);
    const res = await axios.post(
      imgApiUrl,
      { image: data.AdImage[0] },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data?.success) {
      const AdData = {
        name: data.medicineName,
        description: data.description,
        AdImage: res.data?.data?.display_url,
        sellerUid: user?.uid,
        sellerEmail: user?.email,
        status: 'not added'
      };
      axiosSecure.post(`/addAd`, AdData).then((res) => {
        if (res.data.insertedId) {
          setSpinner(false);
          toast.success("Ad requested successfully.");
          document.getElementById("my_modal_12").close();
          refetch();
          reset();
        }
      });
    }
  }


  return (
    <div className='w-11/12 mx-auto space-y-7 mt-20'>
      <h1 className='boska font-bold text-6xl'>Request Ad</h1>
      <button onClick={() => document.getElementById('my_modal_12').showModal()} className='btn bg-theme hover:bg-theme text-white'><RiAdvertisementLine className='text-2xl'/> Request</button>

      <div>
        <table className="w-full rounded-tr-3xl rounded-tl-3xl">
          {/* head */}
          <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
            <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
              <td className="text-xs md:text-base">Image</td>
              <td className="text-xs md:text-base">Description</td>
              <td className="text-xs md:text-base">Status</td>
            </tr>
          </tbody>
          <tbody className="divide-y">
            {/* row 1 */}
            {Ads.map((item, i) => {
              return (
                <>
                  <tr key={i} className="*:p-3">
                    <td className="text-base">
                      <img
                        src={item?.AdImage}
                        alt=""
                        className="size-8 md:size-16 object-cover"
                      />
                    </td>
                    <td className="text-xs md:text-base">{item?.description}</td>
                    <td className={`text-xs md:text-base ${item?.status === 'added' ? 'text-green-400' : 'text-red-400'}`}>{item?.status}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>


      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_12" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative space-y-6">
          {/* form start */}
          <form action="" className="flex-1">
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold">Medicine Name</h3>
              <input
                type="text"
                {...register("medicineName", { required: true })}
                placeholder="Name"
                className="focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
              />
              {errors.medicineName?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold">Ad Description</h3>
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
              <h3 className="text-xl font-semibold mt-7">Ad Banner Image</h3>
              <input
                type="file"
                {...register("AdImage", { required: true })}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
              {errors.AdImage?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            {/* submit button */}
            <label htmlFor="" className="space-y-4">
              <button
                onClick={handleSubmit(addAd)}
                className="w-full p-4 cursor-pointer bg-theme font-semibold rounded-lg text-base text-white mt-6"
              >
                {spinner ? (
                  <span className="loading loading-spinner loading-md text-white"></span>
                ) : (
                  "Request"
                )}
              </button>
            </label>
          </form>
          {/* form end */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Advertisement