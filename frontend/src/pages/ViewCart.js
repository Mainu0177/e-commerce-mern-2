import React, { useEffect, useState } from 'react'

import SummaryApi from '../common/urlIntigration'

const ViewCart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async () =>{
        const response = await fetch(SummaryApi.addToCartViewProduct.url,{
            method : SummaryApi.addToCartViewProduct.method,
            credentials : 'include',
            headers : {
                'Content-Type' : 'application/json'
            },            
        })

        const responseData = await response.json()
        if(responseData.success){
            setData(responseData.data)
        }
    }

    useEffect(() =>{
        fetchData()
    },[])

    console.log("cart data", data)

  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg  my-3'>
            {
                data.length === 0 && ! loading && (
                    <p className='bg-white py-5'>No Product found</p>
                )
            }
        </div>
    </div>
  )
}

export default ViewCart