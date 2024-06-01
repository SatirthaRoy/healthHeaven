import React from 'react'
import Banner from './Components/Banner'
import CategorySection from './Components/CategorySection'
import Discount from './Components/Discount'
import Queries from './Components/Queries'
import Review from './Components/Customer review/Review'
import Whychoose from './Components/Whychoose'

const Home = () => {
  return (
    <div>
      <Banner/>
      <div className='w-11/12 mx-auto'>
        <CategorySection/>
        <Discount/>
        <Queries/>
        <Review/>
        <Whychoose/>
      </div>
    </div>
  )
}

export default Home