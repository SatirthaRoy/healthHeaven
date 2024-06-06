import React from 'react'
import useCart from '../../Hooks/useCart'
import useAxios from '../../Hooks/useAxios'
import useData from '../../Hooks/useData'
import { MdDelete } from 'react-icons/md'
import toast from 'react-hot-toast'


const CartTable = ({items, refetch}) => {
  const {user} = useData();
  const axiosSecure = useAxios();
  const onClick = (action, item) => {
    const data = {
      itemId: item.itemId,
      userId: user?.uid,
      sellerUid: item?.sellerUid
    }
    axiosSecure.patch(`/cart/${action}`, data)
    .then(res => {
      if(res.data.modifiedCount) {
        refetch();
        if(action === 'increase') {
          toast.success('Item added successfuly.');
        } else {
          toast.success('Item removed successfuly.')
        }
      }
    })
  }

  const onDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <table className="w-full rounded-tr-3xl rounded-tl-3xl">
        {/* head */}
        <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
          <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
            <td className="text-xs md:text-base">Image</td>
            <td className="text-xs md:text-base">Name</td>
            <td className="text-xs md:text-base">Price</td>
            <td className="text-xs md:text-base">Quantity</td>
            <td className="text-xs md:text-base">Action</td>
          </tr>
        </tbody>
        <tbody className="divide-y">
          {/* row 1 */}
          {items.map((item, i) => {
            return (
              <>
                <tr key={i} className="*:p-3">
                  <td className="text-base">
                    <img
                      src={item?.imageURL}
                      alt=""
                      className="size-8 md:size-16 object-cover"
                    />
                  </td>
                  <td className="text-xs md:text-base">{item?.itemName}</td>
                  <td className="text-xs md:text-base">${(item?.price * item.quantity).toFixed(2)}</td>
                  <td className="text-xs md:text-base">{item.quantity}</td>
                  <td className="text-xs md:text-base flex items-center gap-4 flex-wrap">
                    <button onClick={() => onClick('increase', item)} className='btn text-white text-xl bg-theme hover:bg-theme font-semibold'>+</button>
                    <button disabled={item.quantity === 1} onClick={() => onClick('decrease', item)} className='btn text-white text-xl bg-theme hover:bg-theme font-semibold'>-</button>
                    <button className='btn text-xl bg-red-400 hover:bg-red-400 font-semibold'><MdDelete className='text-white text-xl'/></button>
                  </td>
                </tr>
      
              </>
            );
          })}
        </tbody>
      </table>
  )
}

const Cart = () => {
  const [cart, refetch] = useCart();
  return (
    <div className='mt-40 w-11/12 mx-auto space-y-7'>
      <h1 className='text-7xl boska font-bold'>My Cart</h1>
      <div>
        <CartTable items={cart} refetch={refetch}/>
      </div>
    </div>
  )
}

export default Cart