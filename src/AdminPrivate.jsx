import React from 'react'
import useRole from './Hooks/useRole'
import { Navigate } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';

const AdminPrivate = ({children}) => {
  const [role, isLoading] = useRole();

  if(isLoading) {
    return <div className='grid place-content-center mt-40'>
    <Spinner color="blue" className='size-44'/>
  </div>
  }

  if(role === 'admin') {
    return children;
  }

  return <Navigate to='/'></Navigate>
}

export default AdminPrivate