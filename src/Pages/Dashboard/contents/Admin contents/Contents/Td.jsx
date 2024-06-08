import React, { useState } from "react";
import useAxios from "../../../../../Hooks/useAxios";
import Swal from "sweetalert2";

const Td = ({user}) => {
  const axioSecure = useAxios();

  const onRoleChange = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axioSecure.patch(`/user/${user?.uid}`, {role: e.target.value})
        .then(res => {
          if(res.data.modifiedCount) {
            Swal.fire({
              title: "Updated!",
              text: "User role has been updated",
              icon: "success"
            });
          }
        })
        .catch(e => console.log('err while changing: ', e));
      } 
    });
  }

  return (
    <td className="text-xs md:text-base">
      <select
        onChange={onRoleChange}
        className="border rounded-lg border-theme"
        defaultValue={user?.role}
      >
        <option value="user">User</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option>
      </select>
    </td>
  );
};

export default Td;
