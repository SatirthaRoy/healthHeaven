import React from 'react'
import { Navigate } from 'react-router-dom';
import useRole from './Hooks/useRole';
import { Spinner } from '@material-tailwind/react';

const SellerPrivate = ({children}) => {
  const [role, isLoading] = useRole();

  if(isLoading) {
    return <div className='grid place-content-center mt-40'>
    <Spinner color="blue" className='size-44'/>
  </div>
  }

  if(role === 'seller') {
    return children;
  }

  return <Navigate to='/'></Navigate>
}

export default SellerPrivate