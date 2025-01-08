import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common/urlIntigration';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () =>{
    const response  = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
    console.log("get all product", dataResponse)
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
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data = {product} key = {index+"allproduct"} fetchdata = {fetchAllProduct} />
            )
          })
        }
      </div>


      {/* Upload product components */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
        )
      }
      
    </div>
  )
}

export default AllProducts