import React from 'react'
import useAxios from '../../../../../Hooks/useAxios'
import useData from '../../../../../Hooks/useData';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
  const axiosSecure = useAxios();
  const {user} = useData();
  const {data: payments=[]} = useQuery({
    queryKey: ['userPayments'],
    enabled: user != null,
    queryFn: async() =>{
      const res = await axiosSecure.get(`/getpayments/${user?.uid}`);
      return res.data;
    }
  })
  return (
    <div className='w-11/12 mx-auto space-y-10'>
      <h1 className='text-6xl font-bold boska text-center'>Payment history</h1>
      <div>
        <table className="w-full rounded-tr-3xl rounded-tl-3xl">
          {/* head */}
          <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
            <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
              <td className="text-xs md:text-base">SL no.</td>
              <td className="text-xs md:text-base">TransactionId</td>
              <td className="text-xs md:text-base">Total Price</td>
              <td className="text-xs md:text-base">Status</td>
            </tr>
          </tbody>
          <tbody className="divide-y">
            {/* row 1 */}
            {payments.map((payment, i) => {
              return (
                <>
                  <tr key={i} className="*:p-3">
                    <td className="text-base">{i+1}</td>
                    <td className="text-xs md:text-base">{payment?.transactionId}</td>
                    <td className="text-xs md:text-base">${payment?.totalPrice}</td>
                    <td className={`${payment?.status === 'pending' ? 'text-red-400' : 'text-green-400'} text-xs md:text-base`}>{payment?.status}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentHistory