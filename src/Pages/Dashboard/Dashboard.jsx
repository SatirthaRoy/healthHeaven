import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { FaHome, FaShoppingBag } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useData from '../../Hooks/useData'
import useAxios from '../../Hooks/useAxios'
import SellerContents from './contents/SellerContents'
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
  const axiosSecure = useAxios();
  const {user} = useData();

  const {data:role=''} = useQuery({
    queryKey: ['role'],
    enabled: user != null,
    queryFn: async() => {
      const res = await axiosSecure.get(`/users?id=${user?.uid}`)
      return res.data?.role;
    }
  })

  return (
    <div className='flex justify-start bg-[#F6F6F6]'>
      <Toaster
        position="top-center"
        reverseOrder={false}
      /> 
      <div className="drawer lg:drawer-open max-w-0 lg:max-w-80">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="text-4xl drawer-button lg:hidden fixed top-4 left-4"><GiHamburgerMenu /></label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-theme text-base-content *:p-1 space-y-2">
            {/* close drawer */}
            <label htmlFor="my-drawer-2" className="text-4xl drawer-button lg:hidden absolute top-6 right-4"><RxCross1/></label>
            {/* Sidebar content here */}
            <h1 className='text-9xl boska font-black text-white'>HH</h1>
            {/* add dashboard content according to role */}
            {/* {admin ? <AdminContent/> : <UserContent/>} */}
            { role === 'seller' && <SellerContents/> }
            {/* navigations */}
            <div className='divider before:bg-white after:bg-white'></div>
            <NavLink to='/' className={({isActive}) => isActive ? 'text-white cinzel flex gap-4 items-center text-base' : `cinzel flex gap-4 items-center text-base`}><FaHome className='text-2xl'/>home</NavLink>
            <NavLink to='/menu' className={({isActive}) => isActive ? 'text-white cinzel flex gap-4 items-center text-base' : `cinzel flex gap-4 items-center text-base`}><GiHamburgerMenu className='text-2xl'/>menu</NavLink>
            <NavLink to='/shop' className={({isActive}) => isActive ? 'text-white cinzel flex gap-4 items-center text-base' : `cinzel flex gap-4 items-center text-base`}><FaShoppingBag className='text-2xl' />shop</NavLink>
            <NavLink  className={({isActive}) => isActive ? 'text-white cinzel flex gap-4 items-center text-base' : `cinzel flex gap-4 items-center text-base`}><MdEmail className='text-2xl'/>contact</NavLink>
          </ul>
        
        </div>
      </div>


      <div className='w-full flex items-center justify-center'>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default Dashboard