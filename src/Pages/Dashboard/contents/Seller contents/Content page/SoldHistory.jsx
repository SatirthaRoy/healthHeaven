import React from 'react'
import useGetSolds from '../../../../../Hooks/useGetSolds'

const SoldHistory = () => {
  const sellerSold = useGetSolds();
  return (
    <div className='w-11/12 mx-auto space-y-10 mt-20'>
      <h1 className='boska text-center text-6xl font-bold'>Payments History</h1>
      <div className='overflow-x-scroll'>
        <table className="w-full rounded-tr-3xl rounded-tl-3xl">
          {/* head */}
          <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
            <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
              <td className="text-xs md:text-base">SL no.</td>
              <td className="text-xs md:text-base">TransactionId</td>
              <td className="text-xs md:text-base">User uid</td>
              <td className="text-xs md:text-base">Total Price</td>
              <td className="text-xs md:text-base">Status</td>
            </tr>
          </tbody>
          <tbody className="divide-y">
            {/* row 1 */}
            {sellerSold.map((payment, i) => {
              return (
                <>
                  <tr key={i} className="*:p-3">
                    <td className="text-base">{i+1}</td>
                    <td className="text-xs md:text-base">{payment?.transactionId}</td>
                    <td className="text-xs md:text-base">{payment?.userId}</td>
                    <td className="text-xs md:text-base">${payment?.price * payment?.quantity}</td>
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

export default SoldHistory