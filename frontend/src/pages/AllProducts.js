import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  return (
    <div className=''>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h1 className='font-bold text-lg'>All Products</h1>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 rounded-full hover:text-white transition-all py-1 px-3' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>
      {/* Upload product components */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} />
        )
      }
      
    </div>
  )
}

export default AllProducts