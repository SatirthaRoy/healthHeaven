import React, { useState } from "react";
import HelemetTitle from "../../Shared components/HelemetTitle";
import SectionTitle from "../../Shared components/SectionTitle";
import useData from "../../Hooks/useData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

// imgbb api url
const imgApi = import.meta.env.VITE_IMAGE_API;
const imgApiUrl = `https://api.imgbb.com/1/upload?key=${imgApi}`;
const UpdateProfile = () => {
  const [spinner, setSpinner] = useState();
  const {auth, user} = useData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    // set spinner to true
    setSpinner(true);
    // host image on imgbb using its api
    const res = await axios.post(
      imgApiUrl,
      { image: data.photoURL[0] },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (res.data?.success) {
      updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: res.data?.data?.display_url
      })
      .then(() => {
        toast.success('profile updated.');
        setSpinner(false);
      })
      .catch(e => {
        toast.error(e.message);
        setSpinner(false);
      })
    }

  }

  return (
    <div>
      <HelemetTitle title="Update Profile || HH" />
      <SectionTitle title="Update Profile" />
      <form className="lg:w-1/2 md:w-3/4 w-11/12 mx-auto">
        <label htmlFor="" className="space-y-4">
          <h3 className="text-xl font-semibold">User Name</h3>
          <input
            type="text"
            {...register("displayName")}
            placeholder="Enter Your Name"
            className="focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal"
          />
        </label>
        <label htmlFor="" className="space-y-4">
          <h3 className="text-xl font-semibold mt-7">Photo</h3>
          <input
            type="file"
            {...register("photoURL")}
            className="file-input file-input-bordered file-input-info w-full max-w-xs"
          />
        </label>
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
    </div>
  );
};

export default UpdateProfile;
