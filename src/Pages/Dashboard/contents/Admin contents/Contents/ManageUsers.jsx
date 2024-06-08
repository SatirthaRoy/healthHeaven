import React, { useState } from 'react'
import useAxios from '../../../../../Hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Td from './Td';

const ManageUsers = () => {

  const axioSecure = useAxios();
  const {data:users=[]} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axioSecure.get('/allusers');
      return res.data;
    }
  })

  return (
    <div className='w-11/12 mx-auto space-y-9'>
      <h1 className='text-6xl font-bold boska'>Manage Users</h1>
      <div>
      <table className="w-full rounded-tr-3xl rounded-tl-3xl">
        {/* head */}
        <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
          <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
            <td className="text-xs md:text-base">SL no.</td>
            <td className="text-xs md:text-base">Name</td>
            <td className="text-xs md:text-base">Email</td>
            <td className="text-xs md:text-base">Role</td>
          </tr>
        </tbody>
        <tbody className="divide-y">
          {/* row 1 */}
          {users.map((user, i) => {
            return (
              <>
                <tr key={i} className="*:p-3">
                  <td className="text-base">{i+1}</td>
                  <td className="text-xs md:text-base">{user?.name}</td>
                  <td className="text-xs md:text-base">{user?.email}</td>
                  <Td user={user}/>
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

export default ManageUsers