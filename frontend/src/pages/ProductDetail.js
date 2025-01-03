import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

import SummeryApi from '../common/urlIntigration'
import displayBDTCurrency from '../helpers/displayeCurrency';
import VarticalCardProduct from '../components/VarticalCardProduct';

const ProductDetail = () => {
  const [data, setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description: "",
    price : "",
    sellingPrice : "",
  })
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x : 0,
    y : 0,
  })

  const [zoomImage, setZoomImage] = useState(false)

  const params = useParams();

  console.log("product id", params)

  const fetchProductDetails = async () =>{
    setLoading(true)
    const response = await fetch(SummeryApi.productDetails.url, {
      method : SummeryApi.productDetails.method,
      headers : {
        "Content-Type" : "application/jsonh"
      },
      body : JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  console.log("data", data)
  useEffect(() =>{
    fetchProductDetails()
  }, [])

  const handleMouseEnterProduct = (imageURL) =>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
  setZoomImage(true)
    const {left, top, width, height } = e.target.getBoundingClient();
    console.log("coordinate", left, top, height, width)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    
    setZoomImageCoordinate({
      x, y
    })
  },[zoomImageCoordinate])

  const handleZoomLeaveImage = () =>{
    setZoomImage(false)
  }

  return (
    <div className='container mx-autop-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        
        {/* proudct image */}
        <div className='h-86 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-white'>
            <img src={activeImage} alt='' className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleZoomLeaveImage} />

            {/* product zoom */}
            {
            zoomImage && (
              <div className='hidden lg:block absolute min-h-[400px] min-w-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                className='w-full h-full mix-blend-multiply min-w-[500px] min-h-[400px] scale-125'
                style={{
                  backgroundImage : `url(${activeImage})`,
                  backgroundRepeat : 'no-repeat',
                  backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                >
                </div>
              </div>
              )
            }

          </div>
          <div className='h-full'>
            {
              loading ? (
                <div className='flex ga-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map(el =>{
                      return (
                        <div className='bg-slate-200 h-20 w-20 rounded animate-pulse'>

                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex ga-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL,index)=>{
                      return (
                        <div className='bg-slate-200 h-20 w-20 rounded p-1' key={imgURL}>
                          <img src={imgURL} alt='' className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* product details */}
        {
          loading ? (
            <div className='grid gap-1  w-full lg:h-6'>
            <p className='bg-red-200 animate-pulse mx-2 text-red-600 rounded-full inline-block h-6 w-full lg:h-8'></p>
            <h2 className='text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full lg:h-6'>

            </h2>
            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8'></p>

            <div className='text-red-600 bg-slate-200 h-6 animate-pulse flex items-center gap-1 w-full lg:h-8'>
              
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse w-full lg:h-8'>
              <p className='text-red-600 w-full bg-slate-200 lg:h-8'></p>
              <p className='text-slate-400 line-through bg-slate-200 w-full lg:h-8'></p>
            </div>

            <div className='flex items-center gap-3 my-2'>
              <button className='h-6 bg-slate-200 rounded gap-3 my-2 w-full lg:h-8'></button>
              <button className='h-6 bg-slate-200 rounded gap-3 my-2 w-full lg:h-8'></button>
            </div>

            <div className='w-full'>
              <p className='text-slate-600 font-medium my-1 h-6 animate-pulse bg-slate-200 counded w-full lg:h-8'></p>
              <p className='h-10 bg-slate-200 rounded animate-pulse w-full lg:h-8'></p>
            </div>
        </div>
          ) : (
            <div className='flex flex-col gap-1'>
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
            <p className='capitalize text-slate-400'>{data?.category}</p>

            <div className='text-red-600 flex items-center gap-1'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{displayBDTCurrency(data.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayBDTCurrency(data.price)}</p>
            </div>

            <div className='flex items-center gap-3 my-2'>
              <button className='border border-red-600 px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
              <button className='border border-red-600 px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'>Add To Cart</button>
            </div>

            <div>
              <p className='text-slate-600 font-medium my-1'>Description :</p>
              <p>{data?.description}</p>
            </div>
        </div>
          )
        }

      </div>

      {
        data.category && (
          <VarticalCardProduct category={data?.category} heading="Recommended Product" />
        )
      }



    </div>
  )
}

export default ProductDetail


