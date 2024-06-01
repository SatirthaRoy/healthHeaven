import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import useData from '../../Hooks/useData';

const Login = ({setLogin}) => {

  const {setUser} = useData();
  const { register, handleSubmit, formState: {errors} } = useForm();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className='h-full'>
      <div className='w-11/12 mx-auto flex justify-center items-center md:flex-row flex-col py-10 px-4 lg:px-24'>
        <div className='flex-1'>
          <img src='/join.jpg' alt="" className='flex-1'/>
        </div>
        
        <div className='flex-1 space-y-8 md:px-8 px-4'>
          <h1 className='text-4xl font-bold text-center'>Login</h1>
          <form action="" className='flex-1' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="" className='space-y-4'>
              <h3 className='text-xl font-semibold'>Email</h3>
              <input type="email" {...register('email', {required: true})} placeholder='Enter your email' className='focus:outline-none focus:border-b focus:border-theme border-b border-b-black w-full pl-4 py-4 text-base font-normal'/>
              {errors.email?.type === 'required' && <p className='text-red-400'>This field is required.</p>}
            </label>
            <label htmlFor="" className='space-y-4'>
              <h3 className='text-xl font-semibold mt-7'>Password</h3>
              <input type="password" {...register('password', {required: true})} placeholder='Enter your password' className='focus:border-b focus:border-theme focus:outline-none border-b border-black w-full pl-4 py-4 text-base font-normal'/>
              {errors.password?.type === 'required' && <p className='text-red-400'>This field is required.</p>}
            </label>
            <label htmlFor="" className='space-y-4'>
              <input type="submit" value='Login' className='w-full p-4 cursor-pointer bg-theme font-semibold rounded-lg text-base text-white mt-6'/>
            </label>
          </form>
          <p className='text-theme text-center text-xl font-medium'>New here? <span onClick={() => setLogin(false)} className='font-semibold cursor-pointer'>Create a New Account</span></p>
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

export default Login