import React from 'react'
import SectionTitle from '../../Shared components/SectionTitle'
import useShop from '../../Hooks/useShop'
import ShopTable from '../../Shared components/ShopTable';
import HelemetTitle from '../../Shared components/HelemetTitle';

const Shop = () => {

  const shopItems = useShop();

  return (
    <div className='w-11/12 mx-auto mt-40'>
      <HelemetTitle title='Shop || HH'/>
      <SectionTitle title='Shop'/>
      <ShopTable items={shopItems}/>
    </div>
  )
}

export default Shop