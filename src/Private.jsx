import React from 'react'
import useData from './Hooks/useData'
import { Navigate } from 'react-router-dom'

const Private = ({children}) => {

  const {user, loading} = useData()


  if(loading) {
    return <div className='text-5xl'>LOADING</div>
  }

  if(user) {
    return children
  }

  return <Navigate to='/join'></Navigate>

}

export default Private