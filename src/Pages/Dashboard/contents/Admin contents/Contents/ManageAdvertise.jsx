import React from 'react'
import useAxios from '../../../../../Hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ManageAdvertise = () => {
  const axiosSecure = useAxios();
  const {data:ads=[]} = useQuery({
    queryKey: ['ads'],
    queryFn: async() => {
      const res = await axiosSecure.get('/ads');
      return res.data;
    }
  })

  const toggleAdded = (id) => {
    axiosSecure.patch(`/adstoggle/${id}`, {})
    .then(res => {
      if(res.data.modifiedCount) {
        toast.success('Ad toggled.');
      }
    })
  }

  return (
    <div className='w-11/12 mx-auto  mt-20 space-y-10 mt-20'>
      <h1 className='text-6xl font-bold boska text-center'>Manage Ads</h1>
      <div className='overflow-x-scroll'>
        <table className="w-full rounded-tr-3xl rounded-tl-3xl">
          {/* head */}
          <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
            <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
              <td className="text-xs md:text-base">Image</td>
              <td className="text-xs md:text-base">Name</td>
              <td className="text-xs md:text-base">Description</td>
              <td className="text-xs md:text-base">Seller email</td>
              <td className="text-xs md:text-base">Status</td>
            </tr>
          </tbody>
          <tbody className="divide-y">
            {/* row 1 */}
            {ads.map((item, i) => {
              return (
                <>
                  <tr key={i} className="*:p-3">
                    <td className="text-base">
                      <img
                        src={item?.AdImage}
                        alt=""
                        className="size-8 md:size-16 object-cover"
                      />
                    </td>
                    <td className="text-xs md:text-base">{item?.name}</td>
                    <td className="text-xs md:text-base">{item?.description}</td>
                    <td className="text-xs md:text-base">{item?.sellerEmail}</td>
                    <td className={`text-xs md:text-base ${item?.status === 'added' ? 'text-green-400' : 'text-red-400'}`}>
                      <input onChange={() => toggleAdded(item?._id)} type="checkbox" className="toggle toggle-info" defaultChecked={item?.status === 'added'} />
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

export default ManageAdvertise