import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { GithubAuthProvider, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import useData from '../../Hooks/useData';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';

// imgbb api url
const imgApi = import.meta.env.VITE_IMAGE_API;
const imgApiUrl = `https://api.imgbb.com/1/upload?key=${imgApi}`

const Register = ({setLogin}) => {

  const navigate = useNavigate();

  const axiosSecure = useAxios();

  const {auth, setUser, signUpWithEmail} = useData();
  const { register, handleSubmit, formState: {errors} } = useForm();

  const [spinner, setSpinner] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const onSubmit = async(data) => {
    // set spinner to true
    setSpinner(true);
    // host image on imgbb using its api
    const res = await axios.post(imgApiUrl, {image: data.photo[0]}, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    // if image hosted successfully
    if(res.data?.success) {
      // if success signin with email password
      signUpWithEmail(data.email, data.password)
      .then(result => {
        const userData = {
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password,
          imageUrl: res.data?.data?.display_url,
          uid: result.user?.uid
        }
        updateProfile(auth.currentUser, {
          displayName: userData.name,
          photoURL: userData.imageUrl
        })
        .then(() => {
          // sets user to results-user
          setUser(result.user);
        }).catch(e => console.log('update error: ', e));
        // post user data to database
        axiosSecure.post('/users', userData)
        .then(res => {
          console.log(res.data);
          if(res.data?.insertedId) {
            toast.success('Successfully singed up.');
            // set spinner to false
            setSpinner(false);
            // navigate to home or past state
            navigate('/');
          }
        })
        .catch(e => console.log('sign in error: ',e));
      })
      .catch(e => {
        console.log(e.message);
        setSpinner(false);
        toast.error(e?.message.split('/')[1].replace(')',''));
      })

    }
  }

  return (
    <div className='h-full'>
      <div className='w-11/12 mx-auto flex justify-center items-center md:flex-row-reverse flex-col py-10 px-4 lg:px-24'>
        <div className='flex-1'>
          <img src='/join.jpg' alt="" className='flex-1'/>
        </div>
        
        <div className='flex-1 space-y-8 md:px-8 px-4'>
          <h1 className='text-4xl font-bold text-center'>Register</h1>
          <p className='text-text text-center text-xl font-medium'>Already registered? <span onClick={() => setLogin(true)} className='font-semibold cursor-pointer text-theme'>Sign in now.</span></p>
          <form action="" className='flex-1'>
            <label htmlFor="" className='space-y-4'>
              <h3 className='text-xl font-semibold'>Name</h3>
              <input type="text" {...register('name', {required: true})} placeholder='Enter your name' className='focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal'/>
              {errors.name?.type === 'required' && <p className='text-red-400'>This field is required.</p>}
            </label>
            <label htmlFor="" className='space-y-4'>
              <h3 className='text-xl font-semibold mt-7'>Email</h3>
              <input type="email" {...register('email', {required: true})} placeholder='Enter your email' className='focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal'/>
              {errors.email?.type === 'required' && <p className='text-red-400'>This field is required.</p>}
            </label>
            <label htmlFor="" className='space-y-4'>
              <h3 className='text-xl font-semibold mt-7'>As a user/seller</h3>
              <select className='w-full p-4' defaultValue='user' {...register('role', {required: true})} name="role" id="">
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
              {errors.role?.type === 'required' && <p className='text-red-400'>This field is required.</p>}
            </label>
            <label htmlFor="" className='space-y-4'>
              <h3 className='text-xl font-semibold mt-7'>Image</h3>
              <input type="file" {...register('photo', {required: true})} className="file-input file-input-bordered file-input-info w-full max-w-xs" />
              {errors.photo?.type === 'required' && <p className='text-red-400'>This field is required.</p>}
            </label>
            <label htmlFor="" className='space-y-4'>
              <h3 className='text-xl font-semibold mt-7'>Password</h3>
              <input type="password" {...register('password', {required: true})} placeholder='Enter your password' className='focus:border-b focus:border-theme focus:outline-none border-b border-black w-full pl-4 py-4 text-base font-normal'/>
              {errors.password?.type === 'required' && <p className='text-red-400'>This field is required.</p>}
            </label>
            <label htmlFor="" className='space-y-4'>
              {/* <input type="submit" value='Sign up' className='w-full p-4 cursor-pointer bg-theme font-semibold rounded-lg text-base text-white mt-6'/> */}
              <button onClick={handleSubmit(onSubmit)} className='w-full p-4 cursor-pointer bg-theme font-semibold rounded-lg text-base text-white mt-6'>{spinner ? <span className="loading loading-spinner loading-md text-white"></span> : 'Sign up'}</button>
            </label>
          </form>
          <p className='text-center text-xl font-medium'>Or sign in with</p>
          <div className='flex justify-center gap-10'>
            <div className='cursor-pointer text-2xl border border-[#444444] rounded-full p-3' onClick={() => onIconClick(googleProvider)}><FaGoogle/></div>
            <div className='cursor-pointer text-2xl border border-[#444444] rounded-full p-3'><FaGithub/></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register