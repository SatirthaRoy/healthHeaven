import React from 'react'
import useGetPayments from '../../../../../Hooks/useGetPayments'

const AdminHome = () => {
  const [payments] = useGetPayments();
  const totalSell = payments.reduce((acc, curr) =>  curr.totalPrice + acc,0)
  const paid = payments.filter(p => p.status === 'paid');
  const paidTotal = paid.reduce((acc, curr) =>  curr.totalPrice + acc,0);
  const pending = payments.filter(p => p.status === 'pending');
  const pendingTotal = pending.reduce((acc, curr) =>  curr.totalPrice + acc,0);
  return (
    <div className='w-11/12 mx-auto space-y-10'>
      <h1 className='text-6xl boska font-bold text-center'>Admin's Home</h1>

      <table className="w-full rounded-tr-3xl rounded-tl-3xl">
        {/* head */}
        <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
          <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
            <td className="text-xs md:text-base">Revenue</td>
            <td className="text-xs md:text-base">Paid</td>
            <td className="text-xs md:text-base">Pending</td>
          </tr>
        </tbody>
        <tbody className="divide-y">
          {/* row 1 */}
          <tr className="*:p-3">
            <td className="text-base">${totalSell}</td>
            <td className="text-base">${paidTotal}</td>
            <td className="text-base">${pendingTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AdminHome