import React, { useEffect, useState } from 'react'
import { FaBuilding, FaEye } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import useAxios from '../Hooks/useAxios';
import useData from '../Hooks/useData';
import toast from 'react-hot-toast';
import useCart from '../Hooks/useCart';
import { useNavigate } from 'react-router-dom';

const Modal =({item, setShowModal}) => {

  useEffect(() => {
    document.getElementById('my_modal_5').showModal()
  })
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative space-y-6">
          <div className='max-h-80 max-w-80 mx-auto'>
            <img src={item?.imageURL} alt="" className='object-cover w-full'/>
          </div>
          <h3 className="font-bold text-lg">{item?.itemName}</h3>
          <h3 className="font-bold text-lg">Generic: <span className='font-medium'>{item?.genericName}</span></h3>
          <p className="py-4">{item?.description}</p>
          <div className='flex items-center gap-4'>
            <span className="font-normal text-base bg-theme rounded-full p-2 text-white flex items-center gap-2"><MdCategory/> {item?.category}</span>
            <span className="font-normal text-base bg-theme rounded-full p-2 text-white flex items-center gap-2"><FaBuilding/> {item?.company}</span>
          </div>
          <h3 className="font-bold text-lg">Price: {item?.discount ? <span className='text-red-300 line-through font-norma'>${item?.price * item?.discount/100 + item?.price}</span> : undefined}  <span className='font-medium'>${item?.price}</span></h3>
          <h3 className="font-bold text-lg">Mass Unit: <span className='font-medium'>{item?.massUnit}</span></h3>
          {/* discount show */}
          {item?.discount ? <span className='bg-red-300 text-white font-normal absolute right-9 top-9 p-2'>-{item?.discount}%</span> : undefined}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

const ShopTable = ({items}) => {
  const [itemData, setItemData] = useState({});
  const navigate = useNavigate();
  const {user} = useData();
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxios();
  const [,refetch] = useCart();
  const onAddClick = (addedItem) => {
    if(!user) {
      return navigate('/join')
    }
    const itemData = {
      itemId: addedItem._id,
      sellerUid: addedItem.sellerUid,
      itemName: addedItem.itemName,
      category: addedItem.category,
      imageURL: addedItem.imageURL,
      price: addedItem.price,
      discount: addedItem.discount,
      quantity: 1,
      userId: user?.uid
    }
    axiosSecure.post('/addcart', itemData)
    .then(res => {
      console.log(res.data)
      if(res.data.insertedId || res.data.modifiedCount) {
        toast.success('Item added successfully.');
        refetch();
      }
    })
  }

  const [sort, setSort] = useState('default');

  let sortedItems = items;

  if(sort === 'price') {
    sortedItems = items.toSorted((a, b) => a.price - b.price);
  }

  return (
    <>
      <div className='flex justify-end gap-4 items-center mb-4'>
        <h2 className='font-semibold text-lg'>Sort By: </h2>
        <select onChange={e => setSort(e.target.value)} value={sort} className='p-2 bg-theme bg-opacity-15 rounded-md'>
          <option value="default">Default</option>
          <option value="price">Price</option>
        </select>
      </div>
      <table className="w-full rounded-tr-3xl rounded-tl-3xl">
        {/* head */}
        <tbody className="bg-theme rounded-tr-full rounded-tl-3xl">
          <tr className="*:p-3 *:text-base *:text-white *:font-semibold *:text-left">
            <td className="text-xs md:text-base">Image</td>
            <td className="text-xs md:text-base">Name</td>
            <td className="text-xs md:text-base">Price</td>
            <td className="text-xs md:text-base">See Details</td>
            <td className="text-xs md:text-base">Add</td>
          </tr>
        </tbody>
        <tbody className="divide-y">
          {/* row 1 */}
          {sortedItems.map((item, i) => {
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
                  <td className="text-xs md:text-base">${item?.price}</td>
                  <td className="text-xs md:text-base">
                    <button onClick={() => {
                      setShowModal(true);
                      setItemData(item);
                    }} className='btn text-white text-xl bg-theme hover:bg-theme'><FaEye/></button>
                  </td>
                  <td className="text-xs md:text-base">
                    <button onClick={() => onAddClick(item)} className='btn text-white text-xl bg-theme hover:bg-theme font-semibold'>Add</button>
                  </td>
                </tr>
      
              </>
            );
          })}
        </tbody>
      </table>
      {/* modal */}
      {showModal && <Modal item={itemData} setShowModal={setShowModal}/>}
    </>
  )
}

export default ShopTable