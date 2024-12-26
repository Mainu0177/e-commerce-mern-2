import React, { useEffect, useState } from 'react'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        // image1,
        // image2,
        // image3,
        // image4,
    ]
    const mobileImages = [
    //     mobileImage1,
    //     mobileImage2,
    //     mobileImage3,
    //     mobileImage4,
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }
    const preveImage = () =>{
        if(currentImage !== 0){
            setCurrentImage(preve => preve -1)
        }
    }
    
    useEffect(() =>{
        const interval = setInterval(() =>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)
        return () => clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded overflow-hidden'>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
            <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                <div className=' flex justify-between w-full text-4xl'>
                    <button onClick={preveImage} className='bg-slate-100 rounded-full shadow-md p-1'><FaAngleLeft /></button>
                    <button onClick={nextImage} className='bg-slate-100 rounded-full shadow-md p-1'><FaAngleRight /></button>
                </div>
            </div>

            {/* desktop and tablet version */}
            <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopImages.map((imageURL, index) =>{
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src="https://cdn.pixabay.com/photo/2017/02/20/12/26/banner-2082331_640.png" className='w-full h-full object-cover' alt='Banner' />
                            </div>
                        )
                    })
                }
            </div>

            {/* mobile version */}
            <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImages.map((imageURL, index) =>{
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src="https://cdn.pixabay.com/photo/2017/02/20/12/26/banner-2082331_640.png" className='w-full h-full' alt='Banner' />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    </div>
  )
}

export default BannerProduct