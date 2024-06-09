import React from 'react'
import useData from './Hooks/useData'
import { Navigate } from 'react-router-dom'
import { Spinner } from '@material-tailwind/react'

const Private = ({children}) => {

  const {user, loading} = useData()


  if(loading) {
    return <div className='grid place-content-center mt-40'>
      <Spinner color="blue" className='size-44'/>
    </div>
  }

  if(user) {
    return children
  }

  return <Navigate to='/join'></Navigate>

}

export default Private