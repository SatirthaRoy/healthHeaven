import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react'
import useAxios from '../../../../../Hooks/useAxios';
import { useReactToPrint } from 'react-to-print';
import { FaPrint } from 'react-icons/fa';

const SalesReport = () => {
  const axiosSecure = useAxios();
  const {data:sold=[]} = useQuery({
    queryKey: ['sold'],
    queryFn: async() => {
      const res = await axiosSecure.get('/allsold');
      return res.data;
    }
  });

  // print funtionality
  const componentToPrint = useRef();
  const generatePdf = useReactToPrint({
    content: () => componentToPrint.current,
    documentTitle: 'Sales report',
  })

  return (
    <div className='w-11/12 mx-auto mt-20 space-y-9'>
      <h1 className='text-6xl boska font-bold text-center'>Sales Report</h1>
      <button onClick={generatePdf} className='btn bg-theme hover:bg-theme text-white'><FaPrint/> Print</button>
      <div className='overflow-x-scroll'>
        <table ref={componentToPrint} className="w-full rounded-tr-3xl rounded-tl-3xl">
            {/* head */}
            <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
              <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
                <td className="text-xs md:text-base">SL no.</td>
                <td className="text-xs md:text-base">Medicine Name</td>
                <td className="text-xs md:text-base">Seller uid</td>
                <td className="text-xs md:text-base">Buyer uid</td>
                <td className="text-xs md:text-base">Price</td>
              </tr>
            </tbody>
            <tbody className="divide-y">
              {/* row 1 */}
              {sold.map((item, i) => {
                return (
                  <>
                    <tr key={i} className="*:p-3">
                      <td className="text-base">{i+1}</td>
                      <td className="text-xs md:text-base">{item.itemName}</td>
                      <td className="text-xs md:text-base">{item?.sellerUid}</td>
                      <td className={`text-xs md:text-base`}>{item?.userId}</td>
                      <td className="text-xs md:text-base">${item?.price}x{item?.quantity}</td>
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

export default SalesReport