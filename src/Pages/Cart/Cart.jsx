import React from 'react'
import useCart from '../../Hooks/useCart'
import useAxios from '../../Hooks/useAxios'
import useData from '../../Hooks/useData'
import { MdDelete } from 'react-icons/md'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { IoBagCheckOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { ImCross } from 'react-icons/im'


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
    const data = {
      itemId: item.itemId,
      userId: user?.uid,
      sellerUid: item?.sellerUid
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44c2fd",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/delete?itemId=${item.itemId}&sellerUid=${item.sellerUid}&userId=${user.uid}`, data)
        .then(res => {
          if(res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been removed.",
              icon: "success"
            });
          }
        })
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
                    <button onClick={() => onClick('increase', item)} className='btn text-white text-xl bg-theme hover:bg-theme font-semibold'><FaPlus/></button>
                    <button disabled={item.quantity === 1} onClick={() => onClick('decrease', item)} className='btn text-white text-xl bg-theme hover:bg-theme font-semibold'><FaMinus/></button>
                    <button onClick={() => onDelete(item)} className='btn text-xl bg-red-400 hover:bg-red-400 font-semibold'><MdDelete className='text-white text-xl'/></button>
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
  const navigate = useNavigate();
  return (
    <div className='mt-40 w-11/12 mx-auto space-y-7'>
      <h1 className='text-7xl boska font-bold'>My Cart</h1>
      {cart.length ? <><button onClick={() => navigate('/checkout')} className='btn bg-theme hover:bg-theme text-white '>Checkout<IoBagCheckOutline className='text-2xl'/></button>
      <div>
        <CartTable items={cart} refetch={refetch}/>
      </div></> : <h1 className='text-4xl font-semibold flex items-center gap-3'><span><ImCross className='text-4xl text-red-500'/></span> No items in cart</h1>}
      
    </div>
  )
}

export default Cart