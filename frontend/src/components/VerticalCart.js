import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import scrollTop from '../helpers/scrollTop';
import displayBDTCurrency from '../helpers/displayeCurrency';
import Context from '../context/context';
import addToCart from '../helpers/addToCart';


const VerticalCart = ({loading, data = []}) => {

    const loadingList = new Array(13).fill(null);

    const { fetchUserAddToCart } = useContext(Context)
    
    const handleAddToCart = async (e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit, minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
        
    { loading ? (
        loadingList.map((product) =>{
            return (
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>
                    <div className='bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] animate-pulse flex justify-center items-center'>
                        <img src={product.productImage[0]} alt='category' className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                    </div>
                    <div className='p-4 grid w-full gap-2'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full p-1'>

                        </h2>
                        <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                        <div className='flex gap-3 w-full'>
                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                            
                        </div>
                        <button className=' text-white px-3 py-1 rounded-full w-full bg-slate-200'></button>
                    </div>
                </div>
            )
        })
    ) : (
        data.map((product, index) =>{
            return (
                <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:man-w-[320px] bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-48 p-2 min-w-[280px] md:min-w-[145px] animate-pulse flex justify-center items-center'>
                        <img src={product?.productImage[0]} alt='category' className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                    </div>
                    <div className='p-4 grid w-full gap-2'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse rounded-full p-1'>{product?.productName}</h2>
                        <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'>{product?.category}</p>
                        <div className='flex gap-3 w-full'>
                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'>{displayBDTCurrency(product?.sellingPrice)}</p>
                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'>{displayBDTCurrency(product?.price)}</p>
                            
                        </div>
                        <button className='bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full w-full' onClick={(e) => handleAddToCart(e,product?._id)}>Add to Cart</button>
                    </div>
                </Link>
            )
        })
    )
    }
</div>
  )
}

export default VerticalCart