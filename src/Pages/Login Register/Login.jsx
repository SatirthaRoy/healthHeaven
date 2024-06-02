import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import useData from '../../Hooks/useData';
import useAxios from '../../Hooks/useAxios';

const Login = ({setLogin, setPlayed}) => {

  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [spinner, setSpinner] = useState(false);
  const {setUser, logInWithEmail, signInPop} = useData();
  const { register, handleSubmit, formState: {errors} } = useForm();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const onSubmit = (data) => {
     // set spinner to true
     setSpinner(true);
     logInWithEmail(data.email, data.password)
     .then(result => {
        setUser(result.user);
        toast.success('Successfully logged in');
        setSpinner(false);
        navigate('/');
     })
     .catch(e => {
      console.log('login error: ', e);
      setSpinner(false);
     })
  }

  // google or github login
  const onIconClick = (provider) => {
    signInPop(provider)
    .then(result => {
      setUser(result.user);
      const userData = {
        name: result.user?.displayName,
        email: result.user?.email,
        role: 'user',
        imageUrl: result.user?.photoURL,
        uid: result.user?.uid
      }
      axiosSecure.get(`/users/${userData.uid}`)
      .then(res => {
        if(!res.data?.isInData) {
          axiosSecure.post('/users', userData)
          .then(res => {})
        }
      })
      toast.success('Successfully singed up.');
      navigate('/');
    })
    .catch(e => console.log("signInPop error: ", e));
  }
  
  return (
    <div className='h-full'>
      <div className='w-11/12 mx-auto flex justify-center items-center md:flex-row flex-col py-10 px-4 lg:px-24'>
        <div className='flex-1'>
          <img src='/join.jpg' alt="" className='flex-1'/>
        </div>
        
        <div className='flex-1 space-y-8 md:px-8 px-4'>
          <h1 className='text-4xl font-bold text-center'>Login</h1>
          <p className='text-text text-center text-xl font-medium'>New here? <span onClick={() => {setLogin(false); setPlayed(true);}} className='font-semibold cursor-pointer text-theme'>Create a New Account</span></p>
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
              <button onClick={handleSubmit(onSubmit)} className='w-full p-4 cursor-pointer bg-theme font-semibold rounded-lg text-base text-white mt-6'>{spinner ? <span className="loading loading-spinner loading-md text-white"></span> : 'Login'}</button>
            </label>
          </form>
          <p className='text-center text-xl font-medium'>Or sign in with</p>
          <div className='flex justify-center gap-10'>
            <div className='cursor-pointer text-2xl border border-[#444444] rounded-full p-3' onClick={() => onIconClick(googleProvider)}><FaGoogle/></div>
            <div className='cursor-pointer text-2xl border border-[#444444] rounded-full p-3' onClick={() => onIconClick(githubProvider)}><FaGithub/></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login