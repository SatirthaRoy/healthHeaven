import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import useAxios from '../../../../../Hooks/useAxios';
import { MdCategory } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


// imgbb api url
const imgApi = import.meta.env.VITE_IMAGE_API;
const imgApiUrl = `https://api.imgbb.com/1/upload?key=${imgApi}`;

const Modal = ({categoryData, setShowModal}) => {
  const axiosSecure = useAxios();
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: categoryData.categoryName
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    // set spinner to true
    setSpinner(true);
    // host image on imgbb using its api
    const res = await axios.post(
      imgApiUrl,
      { image: data.categoryImage[0] },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data?.success) {
      const updatedData = {
        categoryName: data.categoryName,
        categoryImage: res.data?.data?.display_url
      };
      axiosSecure.patch(`/updatecategory/${categoryData._id}`, updatedData).then((res) => {
        if (res.data.modifiedCount) {
          setSpinner(false);
          toast.success("Item added successfully.");
          document.getElementById("my_modal_10").close();
        }
      });
    }
  };


  useEffect(() => {
    document.getElementById('my_modal_10').showModal()
  })

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_10" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative space-y-6">
          {/* form start */}
          <form action="" className="flex-1">
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold">Category Name</h3>
              <input
                type="text"
                {...register("categoryName", { required: true })}
                placeholder="Enter item name"
                className="focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
              />
              {errors.categoryName?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Category Image</h3>
              <input
                type="file"
                {...register("categoryImage", { required: true })}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
              {errors.categoryImage?.type === "required" && (
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
                  "Update"
                )}
              </button>
            </label>
          </form>
          {/* form end */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}



const ManageCategory = () => {
  const axiosSecure = useAxios();
  const [categoryData, setCategoryData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const  {data:categories=[], refetch} = useQuery({
    queryKey: ['categories'],
    queryFn: async() => {
      const res = await axiosSecure.get('/categories');
      return res.data;
    }
  })

  const [spinner, setSpinner] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addCategory = async(data) => {
    console.log(data);
    // set spinner to true
    setSpinner(true);
    // host image on imgbb using its api
    const res = await axios.post(
      imgApiUrl,
      { image: data.categoryImage[0] },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data?.success) {
      const updatedData = {
        categoryName: data.categoryName,
        categoryImage: res.data?.data?.display_url
      };
      axiosSecure.post(`/addcategory`, updatedData).then((res) => {
        if (res.data.insertedId) {
          setSpinner(false);
          toast.success("Item added successfully.");
          document.getElementById("my_modal_10").close();
          refetch();
        }
      });
    }
  }
  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deletecategory/${id}`)
        .then(res => {
          if(res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Deleted successfuly",
              icon: "success"
            });
            refetch();
          }
        })
        .catch(e => console.log('err while changing: ', e));
      } 
    });
  }


  return (
    <div className='w-11/12 mx-auto space-y-9'>
      <h1 className='text-6xl font-bold boska text-center'>Manage Categories</h1>
      <button onClick={() => document.getElementById('my_modal_11').showModal()} className='text-white bg-theme btn hover:bg-theme flex items-center'><MdCategory/>Add Category</button>
      <div>
        <table className="w-full rounded-tr-3xl rounded-tl-3xl">
          {/* head */}
          <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
            <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
              <td className="text-xs md:text-base">SL no.</td>
              <td className="text-xs md:text-base">Category Name</td>
              <td className="text-xs md:text-base">Actions</td>
            </tr>
          </tbody>
          <tbody className="divide-y">
            {/* row 1 */}
            {categories.map((category, i) => {
              return (
                <>
                  <tr key={i} className="*:p-3">
                    <td className="text-base">{i+1}</td>
                    <td className="text-xs md:text-base">{category?.categoryName}</td>
                    <td className="text-xs md:text-base flex gap-3 flex-wrap">
                      <button onClick={() => {
                        setCategoryData(category);
                        setShowModal(true);
                      }} className='btn bg-theme text-white hover:bg-theme'>Edit</button>
                      <button onClick={() => handleDelete(category._id)} className='btn btn-error text-white'>Delete</button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_11" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative space-y-6">
          {/* form start */}
          <form action="" className="flex-1">
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold">Category Name</h3>
              <input
                type="text"
                {...register("categoryName", { required: true })}
                placeholder="Enter category name"
                className="focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
              />
              {errors.categoryName?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold mt-7">Category Image</h3>
              <input
                type="file"
                {...register("categoryImage", { required: true })}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
              {errors.categoryImage?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            {/* submit button */}
            <label htmlFor="" className="space-y-4">
              <button
                onClick={handleSubmit(addCategory)}
                className="w-full p-4 cursor-pointer bg-theme font-semibold rounded-lg text-base text-white mt-6"
              >
                {spinner ? (
                  <span className="loading loading-spinner loading-md text-white"></span>
                ) : (
                  "Add"
                )}
              </button>
            </label>
          </form>
          {/* form end */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>

      {showModal && <Modal categoryData = {categoryData} setShowModal={setShowModal}/>}
    </div>
  )
}

export default ManageCategory