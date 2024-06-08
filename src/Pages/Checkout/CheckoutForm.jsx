import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import useAxios from '../../Hooks/useAxios';
import useData from '../../Hooks/useData';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

const CheckoutForm = ({totalPrice}) => {
  const [cart, refetch] = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const axioSecure = useAxios();
  const {user} = useData();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if(totalPrice > .5) {
      axioSecure.post('/create-payment-intent', {price: totalPrice})
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
    }
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!stripe || !elements) {
      return
    }
    // get card element
    const card = elements.getElement(CardElement);
    if(card === null) {
      return
    }

    // use card with other stripe js api
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if(error) {
      console.log('payment error', error);
      setErrorMsg(error.message);
    } else {
      setErrorMsg('')
    }


    const {paymentIntent, error:cardConfirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details : {
          name: user.displayName || 'annonymus',
          email: user?.email || 'no email'
        }
      }
    })

    if(cardConfirmError) {
      console.log(cardConfirmError);
    } else {
      if(paymentIntent.status === 'succeeded') {
        const soldData = cart.map((cartItem => {
          cartItem.transactionId = paymentIntent.id;
          cartItem.status = 'pending'
          return cartItem;
        }))
        // payment management data
        const paymentManagementData = {
          transactionId: paymentIntent.id,
          status: 'pending',
          totalPrice: totalPrice,
          cartItems: cart.map(cartItem => {
            return {
              itemId: cartItem.itemId,
              sellerUid: cartItem.sellerUid
            }
          })
        }

        // insert data to payments collection
        axioSecure.post('/payments', paymentManagementData)

        // insert data to sold collection
        axioSecure.post('/sold', soldData)
        .then(res => {
          if(res.data.insertedCount) {
            axioSecure.delete(`/cart/${user?.uid}`)
            .then(res => {
              if(res.data.deletedCount) {
                toast.success('Payment done.');
                refetch();
                navigate(`/invoice/${paymentIntent.id}`);
              }
            })
          }
        })

      }
    }

  }

  return (
    <form onSubmit={handleSubmit} className='space-y-10 flex flex-col'>
      <CardElement
         options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
              padding: '16px'
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className= 'btn bg-theme hover:bg-theme text-white' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      {errorMsg && <p className='text-red-400'>{errorMsg}</p>}
    </form>
  )
}

export default CheckoutForm