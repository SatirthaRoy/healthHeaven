import React from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { MdOutlinePayments } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const Usercontents = () => {
  return (
    <>
      <NavLink to='/dashboard/paymenthistory' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><MdOutlinePayments className='text-2xl'/>Payment History</NavLink>
      <NavLink to='/dashboard/queries' className={({isActive}) => isActive ? 'underline flex gap-4 items-center text-base text-white' : `text-white flex gap-4 items-center text-base`}><FaQuestionCircle className='text-2xl'/>My Queries</NavLink>
    </>
  )
}

export default Usercontents