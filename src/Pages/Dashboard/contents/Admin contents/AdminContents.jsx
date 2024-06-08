import React from 'react'
import { FaBook, FaHome, FaUser } from 'react-icons/fa'
import { PiUsersThreeFill } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

const AdminContents = () => {
  return (
    <>
      <NavLink to='/dashboard/adminhome' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaHome className='text-2xl'/>admin's Home</NavLink>
      <NavLink to='/dashboard/manageusers' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaUser className='text-2xl'/>Manage Users</NavLink>
      <NavLink to='/dashboard/mycart' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaBook className='text-2xl'/>Payment History</NavLink>
      <NavLink to='/dashboard/allusers' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><PiUsersThreeFill className='text-2xl' />Ask For Advertisement</NavLink>
    </>
  )
}

export default AdminContents