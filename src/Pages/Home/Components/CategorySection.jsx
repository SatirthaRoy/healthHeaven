import React from 'react'
import SectionTitle from '../../../Shared components/SectionTitle'


const CategoryCard = () => {
  return(
    <div 
    style={{
      backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.8) 100%), url(https://hips.hearstapps.com/hmg-prod/images/gh-best-skincare-products-6557978b58b57.png?crop=0.502xw:1.00xh;0.256xw,0&resize=640:*)",
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat no-repeat',
      }} className='relative h-80 rounded-3xl bg-cover p-10 hover:scale-105 transition-all cursor-pointer'>
      {/* <div className='absolute -z-10 overflow-hidden'>
        <img src="https://hips.hearstapps.com/hmg-prod/images/gh-best-skincare-products-6557978b58b57.png?crop=0.502xw:1.00xh;0.256xw,0&resize=640:*" alt="" className='object-cover size-full'/> 
      </div> */}
      <span className='text-2xl text-text p-3 border bg-white bg-opacity-85'>200</span>
      <div className='text-white grid place-content-end h-full'>
        <div>
          <h3 className='text-5xl boska'>SKIN CARE</h3>
        </div>
      </div>
    </div>
  )
}

const CategorySection = () => {
  return (
    <div className='space-y-10 mt-28'>
      <SectionTitle title='Categories' phrase='Discover a Wide Range of Trusted Medicines and Healthcare Products from Top Vendors'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow'>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
      </div>
    </div>
  )
}

export default CategorySection