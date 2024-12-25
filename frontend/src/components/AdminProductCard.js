import React, { useState } from 'react'

import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayBDTCurrency from '../helpers/displayeCurrency';

const AdminProductCard = ({data, fetchdata}) => {
    const [editProduct, setEditProduct] = useState(false)
  return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} width={120} height={120} alt='productImage' className='object-fill h-full mx-auto' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div className=''>
                    <p className='font-semibold'>
                        {
                            displayBDTCurrency(data.sellingPice)
                        }
                        {data.sellingPice}
                    </p>

                    <div className='w-fit ml-auto p-2 bg-green-100 hover:text-white hover:bg-green-600 rounded-full cursor-pointer text-white' onClick={() => setEditProduct(true)} >
                        <MdModeEditOutline />
                    </div>
                </div>
            </div>

            {
                editProduct && (
                    <AdminEditProduct data={data} onClose={() => setEditProduct(false)} fetchdata = {fetchdata} />
                )
            }
        </div>
  )
}

export default AdminProductCard