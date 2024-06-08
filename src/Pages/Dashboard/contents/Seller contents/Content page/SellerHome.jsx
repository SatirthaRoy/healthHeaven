import React from 'react'
import useGetSolds from '../../../../../Hooks/useGetSolds'

const SellerHome = () => {

  const sellerSolds = useGetSolds();
  const pendings = sellerSolds.filter(sell => sell.status === 'pending');
  const paid = sellerSolds.filter(sell => sell.status === 'paid');
  const totalRevenue = sellerSolds.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const paidRevenue = paid.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
  const pendingRevenue = pendings.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)

  return (
    <div className='w-11/12 mx-auto space-y-10'>
      <h1 className='text-center font-bold boska text-6xl'>Seller's Homepage</h1>
      <div>
        <table className="w-full rounded-tr-3xl rounded-tl-3xl">
          {/* head */}
          <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
            <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
              <td className="text-xs md:text-base">Paid Revenue</td>
              <td className="text-xs md:text-base">Pending Revenue</td>
              <td className="text-xs md:text-base">Total Revenue</td>
            </tr>
          </tbody>
          <tbody className="divide-y">
            {/* row 1 */}
            <tr className="*:p-3">
              <td className="text-base">${paidRevenue}</td>
              <td className="text-base">${pendingRevenue}</td>
              <td className="text-base">${totalRevenue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SellerHome