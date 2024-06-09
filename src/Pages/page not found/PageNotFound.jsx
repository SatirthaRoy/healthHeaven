import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-screen bg-theme grid place-content-center text-white gap-14'>
      <h1 className='text-9xl font-bold text-center'>404</h1>
      <h1 className='text-7xl font-bold text-center'>PAGE NOT FOUND</h1>
      <button onClick={() => navigate('/')} className='btn bg-theme hover:bg-theme rounded-full text-white'>HOME</button>
    </div>
  )
}

export default PageNotFound