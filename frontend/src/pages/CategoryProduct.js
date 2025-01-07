import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import VerticalCart from '../components/VerticalCart'
import SummaryApi from '../common/urlIntigration'

const CategoryProduct = () => {
    const params = useParams();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const URLCategory = new URLSearchParams(location.search)
    const urlCategoryListinArry = URLCategory.getAll('category')

    const urlCategoryListObeject = {}
    urlCategoryListinArry.forEach(el =>{
      urlCategoryListObeject[el] = true
    })
    console.log('url category list object', urlCategoryListObeject)
    console.log("url Category list array", urlCategoryListinArry)

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObeject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const fetchData = async () =>{
      setLoading(true)
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        credentials : 'include',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })
      const dataResponse = await response.json()

      setData(dataResponse?.data || [])
      console.log(dataResponse)
    }

    useEffect(() =>{
      fetchData()
    },[filterCategoryList])

    // console.log("", params?.categoryName)

    const handleSelectCategory = (e) =>{
      const { name, value, checked } = e.target
      setSelectCategory((preve) =>{
        return {
          ...preve,
          [value] : checked
        }
      })
      console.log("Select Category", name, value, checked)
    }

    useEffect(() =>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryName =>{
        if(selectCategory[categoryName]){
          return categoryName
        }
        return null
      }).filter(el => el)
      setFilterCategoryList(arrayOfCategory)

      console.log(arrayOfCategory)

      // format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) =>{
        if((arrayOfCategory.length -1 ) === index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      console.log('url Formate', urlFormat.join(''))
      navigate('/product-category?'+urlFormat.join(''))
    },[selectCategory])
  return (
    <div className='container mx-auto'>
        {/* desktop sersion */}

        <div className='hidden lg:grid grid-cols-[280px,1fr]'>
          {/* left side */}
          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {/* sort by */}
            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' />
                  <label>Price - Low to High</label>
                </div>
                <div className='flex items-center  gap-3'>
                  <input type='radio' name='sortBy' />
                  <label>Price - High to Low</label>
                </div>
              </form>
            </div>

            {/* filter by */}
            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

              <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName, index) =>{
                    return (
                      <div className='flex items-center gap-3'>
                        <input type='checkbox' name={'category'} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>
            </div>
          </div>
          {/* right side */}
          <div className='px-4'>
            {/* {
              params?.categoryName && (
                <CategoryWiseProductDisplay category={params?.categoryName} heading={'Recommended Product'} />
              )
            } */}
            <p className='font-medium text-slate-800 text-lg my-2'>Search Result : {data.length}</p>
            <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>              
              {
                data.length !== 0 && !loading && (
                  <VerticalCart data={data} loading={loading} />
                )
              }
            </div>

          </div>
        </div>
    </div>
  )
}

export default CategoryProduct