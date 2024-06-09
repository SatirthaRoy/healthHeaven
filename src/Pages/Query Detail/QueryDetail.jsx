import React, { useEffect, useState } from "react";
import SectionTitle from "../../Shared components/SectionTitle";
import useAxios from "../../Hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useData from "../../Hooks/useData";
import toast from "react-hot-toast";
import HelemetTitle from "../../Shared components/HelemetTitle";

const QueryDetail = () => {
  const [spinner, setSpinner] = useState(false);
  const {user} = useData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const axiosSecure = useAxios();

  const { data:query={}, refetch } = useQuery({
    queryKey: ["singleQuery"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/queries/${id}`);
      return res.data;
    }
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => queryClient.removeQueries({queryKey: ['singleQuery']})
  }, [queryClient])

  const handleReply = (data) => {
    setSpinner(true);
    const replyData = {
      reply: data?.reply,
      userName: user?.displayName,
      photoURL: user?.photoURL,
      userId: user?.uid
    }
    axiosSecure.put(`/query/${id}/reply`, replyData)
    .then(res => {
      if(res.data.modifiedCount) {
        setSpinner(false);
        toast.success('Reply Added.');
        refetch();
        reset({reply: ''});
      }
    })
  }

  return (
    <div className="w-11/12 mx-auto space-y-10 mt-40">
      <HelemetTitle title='Query || HH'/>
      <SectionTitle title="Question" />
      {/* question */}
      <div className="cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5 text-start">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-theme ring-offset-base-100 ring-offset-2">
              <img src={query?.photoURL} />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-text">
            {query?.userName}
          </h1>
        </div>
        <h1 className="text-xl font-medium">
          <span className="font-bold text-2xl">
            Question: {query?.question}
          </span>
        </h1>
      </div>
      <SectionTitle title="Replies" />
      <div className="space-y-7">
        {query?.replies && query?.replies.map((reply, i) => {
          return (
            <div key={i} className="my-8 cursor-pointer p-4 rounded-lg border shadow-lg hover:border-theme space-y-5 text-start">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-theme ring-offset-base-100 ring-offset-2">
                    <img src={reply?.photoURL} />
                  </div>
                </div>
                <h1 className="text-2xl font-semibold text-text">
                  {reply?.userName}
                </h1>
              </div>
              <h1 className="text-2xl font-bold">
                <span className="font-medium">
                  Replied: {reply?.reply}
                </span>
              </h1>
            </div>
          );
        })}
      </div>

      <label htmlFor="" className="space-y-4">
        <h3 className="text-xl font-semibold  mt-20">Your Reply</h3>
        <textarea
          type="text"
          {...register("reply")}
          placeholder="Your reply"
          className="bg-theme bg-opacity-20 rounded-xl focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
        ></textarea>
        <button onClick={handleSubmit(handleReply
        )} className="btn bg-theme text-white hover:bg-theme">{spinner? <span className="loading loading-spinner loading-md text-white"></span> : 'Reply'}</button>
      </label>
    </div>
  );
};

export default QueryDetail;
