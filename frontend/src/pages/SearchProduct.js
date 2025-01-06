import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common/urlIntigration'


const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)


    console.log("query", query.search)

    const fetchProduct = async () =>{
        setLoading(true);
        const response = await fetch(SummaryApi.productSearch.url+query.search);
        const dataResponse = await response.json();
        setLoading(false);

        setData(dataResponse.data);

        console.log('dateResponse', dataResponse)
    }

    useEffect(() =>{
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
        {
            loading  && (
                <p className='text-lg text-center'>Loading ...</p>
            )
        }
        <p>Search Results : {data.length}</p>

        {
            data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No product found ...</p>
            )
        }

        {
            data.length !==0 && !loading && (
                data.map((product,index) =>{
                    return (
                        
                    )
                })
            )
        }
    </div>
  )
}

export default SearchProduct