import React from 'react'
import useGetPayments from '../../../../../Hooks/useGetPayments'
import useAxios from '../../../../../Hooks/useAxios';
import toast from 'react-hot-toast';

const PaymentManagement = () => {
  const [payments, refetch] = useGetPayments();
  const axiosSecure = useAxios();
  const handleAccept = (transactionId) => {
    axiosSecure.patch(`/payment/${transactionId}`, {})
    .then(res => {
      if(res.data.modifiedCount) {
        toast.success('Accepted payment.');
        refetch();
      }
    })
  }

  return (
    <div className='w-11/12 mx-auto space-y-10 mt-20'>
      <h1 className='text-6xl font-bold boska text-center'>Payment Management</h1>
      <div>
        <table className="w-full rounded-tr-3xl rounded-tl-3xl">
          {/* head */}
          <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
            <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
              <td className="text-xs md:text-base">SL no.</td>
              <td className="text-xs md:text-base">TransactionId</td>
              <td className="text-xs md:text-base">Total Price</td>
              <td className="text-xs md:text-base">Status</td>
              <td className="text-xs md:text-base">Action</td>
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
                    <td className="text-xs md:text-base">
                      {payment?.status === 'pending' && <button onClick={() => handleAccept(payment.transactionId)} className='bg-theme btn hover:bg-theme text-white'>Accept</button>}
                    </td>
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

export default PaymentManagement