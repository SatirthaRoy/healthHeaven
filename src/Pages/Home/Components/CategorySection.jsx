import React, { useEffect, useState } from 'react'
import SectionTitle from '../../../Shared components/SectionTitle'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../../Hooks/useAxios'


const CategoryCard = ({category}) => {
  const axiosSecure = useAxios();
  const [items, setItems] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/category/${category?.categoryName}`)
    .then(res => setItems(res.data))
  }, [])
  return(
    <div 
    style={{
      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.8) 100%), url(${category?.categoryImage})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat no-repeat',
      }} className='relative h-80 rounded-3xl bg-cover p-10 hover:scale-105 transition-all cursor-pointer'>
      <span className='text-2xl text-text p-3 border bg-white bg-opacity-85'>{items.length}</span>
      <div className='text-white grid place-content-end h-full'>
        <div>
          <h3 className='text-5xl boska'>{category?.categoryName}</h3>
        </div>
      </div>
    </div>
  )
}

const CategorySection = () => {
  const axiosSecure = useAxios();
  const  {data:categories=[]} = useQuery({
    queryKey: ['categories'],
    queryFn: async() => {
      const res = await axiosSecure.get('/categories');
      return res.data;
    }
  })
  return (
    <div className='space-y-10 mt-28'>
      <SectionTitle title='Categories' phrase='Discover a Wide Range of Trusted Medicines and Healthcare Products from Top Vendors'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow'>
        {categories.map((category, i) => <CategoryCard key={i} category={category}/>)}
      </div>
    </div>
  )
}

export default CategorySection