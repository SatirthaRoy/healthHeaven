import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../Hooks/useAxios';
import ShopTable from '../../Shared components/ShopTable';
import { Spinner } from '@material-tailwind/react';

const ShopByCategory = () => {
  const axiosSecure = useAxios();
  const {category} = useParams();
  const queryClient = useQueryClient();
  const {data:categoryItems=[], isLoading} = useQuery({
    queryKey: ['categoryItems'],
    queryFn: async() => {
      const res = await axiosSecure.get(`/shop/category/${category}`)
      return res.data;
    }
  })
 
  useEffect(() => {
    return () => queryClient.removeQueries({queryKey: ['categoryItems']})
  }, [queryClient]) 

  return (
    <div className='mt-52 space-y-10 w-11/12 mx-auto'>
      <h1 className='text-6xl boska font-semibold'>{category} Products</h1>
      {isLoading ? <Spinner className='mx-auto size-14'/> : <ShopTable items={categoryItems}/>}
    </div>
  )
  
}

export default ShopByCategory