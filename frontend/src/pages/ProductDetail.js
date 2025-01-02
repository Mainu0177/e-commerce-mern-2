import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SummeryApi from '../common/urlIntigration'

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
  const [loading, setLoading] = useState(false)

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
  }

  console.log("data", data)
  useEffect(() =>{
    fetchProductDetails()
  }, [])
  return (
    <div>ProductDetail</div>
  )
}

export default ProductDetail


