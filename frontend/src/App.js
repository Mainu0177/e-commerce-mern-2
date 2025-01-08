import { Outlet } from 'react-router-dom'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from './components/Header';
import Footer from './components/Footer';
import SummaryApi from './common/urlIntigration';
import { useEffect, useState } from 'react';
import Context from './context/context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';




function App() {
  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState(0)


  const fetchUserDetails = async () =>{
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }

  const fetchUserAddToCart = async () =>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    console.log(dataApi)
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() =>{
    // user details
    fetchUserDetails()
    // user Cart products
    fetchUserAddToCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    <Context.Provider value = {{
      fetchUserDetails, // user detail fetch
      cartProductCount,
      fetchUserAddToCart, // current user add to product count

      
    }} >

      <ToastContainer  />
    
        <Header />
          <main className='min-h-[calc(100vh-120px)] pt-16'>
            <Outlet />
          </main>
      <Footer />

    </Context.Provider>
    </>
  );
}

export default App;
