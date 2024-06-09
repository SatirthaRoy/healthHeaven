import React, { useState } from 'react'
import useData from '../../../../../Hooks/useData';
import useAxios from '../../../../../Hooks/useAxios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const Query = () => {

  const axiosSecure = useAxios();
  const {user} = useData();
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {data:myQueries=[], refetch} = useQuery({
    queryKey: ['myQueries'],
    enabled: user != null,
    queryFn: async() => {
      const res = await axiosSecure.get(`/query/${user?.uid}`);
      return res.data;
    }
  })

  const addQuery = (data) => {
    setSpinner(true);
    const queryData = {
      question: data?.question,
      userName: user.displayName,
      photoURL: user?.photoURL,
      userId: user?.uid,
      replies: []
    }
    axiosSecure.post('/query', queryData)
    .then(res => {
      if(res.data.insertedId) {
        setSpinner(false);
        reset();
        document.getElementById("my_modal_13").close();
        toast.success('Query added.');
        refetch();
      }
    })
  }


  return (
    <div className='w-11/12 mx-auto mt-20 space-y-10'>
      <h1 className='font-bold text-6xl boska text-center'>My Queries</h1>
      <button onClick={() => document.getElementById('my_modal_13').showModal()} className='btn bg-theme hover:bg-theme text-white'>Add Query</button>
      {/* table */}
      <div>
        <table className="w-full rounded-tr-3xl rounded-tl-3xl">
          {/* head */}
          <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
            <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
              <td className="text-xs md:text-base">Sl no.</td>
              <td className="text-xs md:text-base">Question</td>
              <td className="text-xs md:text-base">Replies</td>
            </tr>
          </tbody>
          <tbody className="divide-y">
            {/* row 1 */}
            {myQueries.map((item, i) => {
              return (
                <>
                  <tr key={i} className="*:p-3">
                    <td className="text-base">{i+1}</td>
                    <td className="text-xs md:text-base">{item?.question}</td>
                    <td className="text-xs md:text-base">{item?.replies.length}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>


      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_13" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative space-y-6">
          {/* form start */}
          <form action="" className="flex-1">
            <label htmlFor="" className="space-y-4">
              <h3 className="text-xl font-semibold">Question</h3>
              <input
                type="text"
                {...register("question", { required: true })}
                placeholder="Your Question"
                className="focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
              />
              {errors.question?.type === "required" && (
                <p className="text-red-400">This field is required.</p>
              )}
            </label>
            {/* submit button */}
            <label htmlFor="" className="space-y-4">
              <button
                onClick={handleSubmit(addQuery)}
                className="w-full p-4 cursor-pointer bg-theme font-semibold rounded-lg text-base text-white mt-6"
              >
                {spinner ? (
                  <span className="loading loading-spinner loading-md text-white"></span>
                ) : (
                  "Add Query"
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

export default Query