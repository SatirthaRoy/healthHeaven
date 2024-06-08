import React from 'react'
import { FaHome, FaUser } from 'react-icons/fa'
import { MdCategory, MdOutlinePayments } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const AdminContents = () => {
  return (
    <>
      <NavLink to='/dashboard/adminhome' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaHome className='text-2xl'/>admin's Home</NavLink>
      <NavLink to='/dashboard/manageusers' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaUser className='text-2xl'/>Manage Users</NavLink>
      <NavLink to='/dashboard/managecategory' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><MdCategory className='text-2xl'/>Manage Category</NavLink>
      <NavLink to='/dashboard/paymentmanage' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><MdOutlinePayments className='text-2xl' />Payment Management</NavLink>
      <NavLink to='/dashboard/report' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><MdOutlinePayments className='text-2xl' />Sales Report</NavLink>
    </>
  )
}

export default AdminContents