import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common/urlIntigration';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () =>{
    const response  = await fetch(SummaryApi.allProduct.url)
    const dataRespose = await response.json()

    setAllProduct(dataRespose?.data || [])
    console.log("get all product", dataRespose)
  }

  useEffect(() =>{
    fetchAllProduct()
  }, [])


  return (
    <div className=''>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h1 className='font-bold text-lg'>All Products</h1>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 rounded-full hover:text-white transition-all py-1 px-3' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>
      
      {/* all products */}
      <div className='flex items-center gap-5 py-4'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data = {product} key = {index+"allproduct"}  />
            )
          })
        }
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