import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common/urlIntigration'
import VerticalCart from '../components/VerticalCart'


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query])
  return (
    <div className='container mx-auto p-4'>
        {
            loading  && (
                <p className='text-lg text-center'>Loading ...</p>
            )
        }
        <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

        {
            data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No product found ...</p>
            )
        }

        {
            data.length !==0 && !loading && (
                // data.map((product,index) =>{
                    // return (
                        <VerticalCart loading={loading} data={data} />
                    // )
                // })
            )
        }
    </div>
  )
}

export default SearchProduct