import React from "react";

const SellerTable = ({items}) => {
  
  return (
    <table className="w-full rounded-tr-3xl rounded-tl-3xl">
      {/* head */}
      <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
        <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
          <th></th>
          <td className="text-xs md:text-base">Image</td>
          <td className="text-xs md:text-base">Name</td>
          <td className="text-xs md:text-base">Price</td>
          <td className="text-xs md:text-base">Discount</td>
        </tr>
      </tbody>
      <tbody className="divide-y">
        {/* row 1 */}
        {items.map((item, i) => {
          return (
            <tr key={i} className="*:p-3">
              <th className="text-xs md:text-base">{i + 1}</th>

              <td className="text-base">
                <img
                  src={item?.imageURL}
                  alt=""
                  className="size-8 md:size-16 object-cover"
                />
              </td>
              <td className="text-xs md:text-base">{item?.itemName}</td>
              <td className="text-xs md:text-base">${item?.price}</td>
              <td className="text-xs md:text-base">{item?.discount}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SellerTable;
