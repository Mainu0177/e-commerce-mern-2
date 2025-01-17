import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayBDTCurrency from '../helpers/displayeCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context/context';

const HorizontalCardProduct = ({category, heading}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadingList = new Array(13).fill(null);

    // const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)
    
    const handleAddToCart = async (e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData = async () =>{
        setLoading(true)
        const categoryProduct = fetchCategoryWiseProduct(category);
        setLoading(false)

        setData(categoryProduct?.data)
    }

    useEffect(() =>{
        fetchData()

    })

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollRight -= 300
    }

  return (
    <div className='container mx-auto px-4 my-6 relative'>

        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button className='bg-slate-100 rounded-full shadow-md p-1 absolute left-0 hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
            <button className='bg-slate-100 rounded-full shadow-md p-1 absolute right-0 hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
            {
                loading ? (
                    loadingList.map(() =>{
                        return (
                            <div className='w-full mix-w-[280px] md:min-w-[320px] max-w-[280px] md:man-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]'>
                                </div>
                                <div>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>

                                    </h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        
                                    </div>
                                    <button className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product, index) =>{
                        return (
                            <Link to={"product/"+product?._id} className='w-full mix-w-[280px] md:min-w-[320px] max-w-[280px] md:man-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product.productImage[0]} alt='category' className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
                                <div>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{displayBDTCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayBDTCurrency(product?.price)}</p>
                                        
                                    </div>
                                    <button className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
            }
        </div>
    </div>
  )
}

export default HorizontalCardProduct