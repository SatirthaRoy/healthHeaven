import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../Hooks/useAxios';
import useData from '../../Hooks/useData';
import { useQuery } from '@tanstack/react-query';
import { useReactToPrint } from 'react-to-print';

const Invoice = () => {
  const {transactionId} = useParams();
  const axioSecure = useAxios();
  const {user} = useData();
  const {data:soldData=[]} = useQuery({
    queryKey: ['soldData'],
    enabled: transactionId != undefined,
    queryFn: async() => {
      const res = await axioSecure.get(`/soldData?uid=${user?.uid}&transactionId=${transactionId}`);
      return res.data;
    }
  })
  const componentToPrint = useRef();
  const generatePdf = useReactToPrint({
    content: () => componentToPrint.current,
    documentTitle: 'invoice',
  })

  const totalPrice = soldData.reduce((ac, curr) => curr.price*curr.quantity + ac, 0);

  return (
    <div className='mt-40 w-11/12 mx-auto'>
      <h1 className='text-6xl font-bold boska text-center'>INVOICE</h1>
      {/* print this */}
      <div ref={componentToPrint} className='pt-28'>
        <div className='text-black p-4 w-full md:w-3/4 lg:w-1/2 mx-auto rounded-2xl border border-theme bg-theme bg-opacity-5'>
          <h1 className='text-9xl text-center boska font-bold text-theme'>HH</h1>
          <div className='space-y-5 divide-y'>
            {soldData.map((item, i) => {
              return (
                <p key={i} className='text-xs md:text-base grid grid-cols-3 gap-3 w-full'><span className='overflow-x-scroll md:overflow-x-hidden'>{item.itemName}</span> <span>${item.price}x{item.quantity}</span><span>${(item.price * item.quantity).toFixed(2)}</span></p>
              )
            })}
            <p className='grid grid-cols-3'><span className='col-start-2 text-lg'>Total: </span><span>${totalPrice.toFixed(2)}</span></p>
            <h3 className='text-2xl text-center'>TransactionID: <span className='font-semibold '> {transactionId}</span></h3>
          </div>
        </div>
      </div>
          {/* print button */}
      <button onClick={generatePdf} className='mt-11 btn bg-theme hover:bg-theme text-white block mx-auto'>Print</button>  
    </div>
  )
}

export default Invoice