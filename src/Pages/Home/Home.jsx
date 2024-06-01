import React from 'react'
import Banner from './Components/Banner'
import CategorySection from './Components/CategorySection'
import Discount from './Components/Discount'

const Home = () => {
  return (
    <div>
      <Banner/>
      <div className='w-11/12 mx-auto'>
        <CategorySection/>
        <Discount/>
      </div>
    </div>
  )
}

export default Home