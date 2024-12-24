import React, { useState } from 'react'

import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({data}) => {
    const [editProduct, setEditProduct] = useState(false)
  return (
        <div className='bg-white p-4 rounded'>
            <img src={data?.productImage[0]} width={120} height={120} alt='productImage' />
            <h1>{data.productName}</h1>

            <div className='w-fit ml-auto p-2 bg-green-100 hover:text-white hover:bg-green-600 rounded-full cursor-pointer text-white' onClick={() => setEditProduct(true)} >
                <MdModeEditOutline />
            </div>

            {
                editProduct && (
                    <AdminEditProduct data={data} onClose={() => setEditProduct(false)} />
                )
            }
        </div>
  )
}

export default AdminProductCard