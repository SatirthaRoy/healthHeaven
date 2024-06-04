import React from 'react'
import SectionTitle from '../../Shared components/SectionTitle'
import ShopTable from './Components/ShopTable'
import useShop from '../../Hooks/useShop'

const Shop = () => {

  const shopItems = useShop();

  return (
    <div className='w-11/12 mx-auto mt-40'>
      <SectionTitle title='Shop'/>
      <ShopTable items={shopItems}/>
    </div>
  )
}

export default Shop