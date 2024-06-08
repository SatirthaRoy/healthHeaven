import React from 'react'
import { FaBook, FaHome, FaListUl } from 'react-icons/fa'
import { RiAdvertisementLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const SellerContents = () => {
  return (
    <>
      <NavLink to='/dashboard/sellerhome' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaHome className='text-2xl'/>Seller's Home</NavLink>
      <NavLink to='/dashboard/manageitems' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaListUl className='text-2xl'/>Manage Medicines</NavLink>
      <NavLink to='/dashboard/soldhistory' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaBook className='text-2xl'/>Payment History</NavLink>
      <NavLink to='/dashboard/advertisement' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><RiAdvertisementLine className='text-2xl' />Ask For Advertisement</NavLink>
    </>
  )
}

export default SellerContents