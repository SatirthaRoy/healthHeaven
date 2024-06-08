import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import useCart from '../../Hooks/useCart'


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const Checkout = () => {

  const [cart] = useCart();

  const totalPrice = cart.reduce((ac, curr) => curr.price*curr.quantity + ac, 0);

  return (
    <div className='mt-40 w-11/12 mx-auto space-y-10'>
      {/* <SectionTitle title='Checkout'/> */}
      <h1 className='text-4xl md:text-7xl font-semibold boska text-center'>Checkout</h1>
      <div className='md:w-1/2 w-11/12 mx-auto border border-theme rounded-xl p-8 bg-theme bg-opacity-5 space-y-10'>
        <div className='divide-y space-y-6'>
          {cart.map((item, i) => {
            return (
              <p key={i} className='text-xs md:text-base grid grid-cols-3 gap-3 w-full'><span className='overflow-x-scroll md:overflow-x-hidden'>{item.itemName}</span> <span>${item.price}x{item.quantity}</span><span>${(item.price * item.quantity).toFixed(2)}</span></p>
            )
          })}
          <p className='grid grid-cols-3'><span className='col-start-2 text-lg'>Total: </span><span>${totalPrice.toFixed(2)}</span></p>
        </div>
        <Elements stripe={stripePromise}>
          <h1 className='text-center font-semibold text-xl'>Payment</h1>
          <CheckoutForm totalPrice= {totalPrice}/>
        </Elements>
      </div>
    </div>
  )
}

export default Checkout