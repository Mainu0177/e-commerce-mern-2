import { Outlet } from 'react-router-dom'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from './components/Header';
import Footer from './components/Footer';
import SummaryApi from './common/urlIntigration';
import { useEffect } from 'react';
import Context from './context/context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';




function App() {
  const dispatch = useDispatch();


  const fetchUserDetails = async () =>{
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

  console.log(dataResponse);
  
  }


  useEffect(() =>{
    // user details
    fetchUserDetails()

  })

  return (
    <>
    <Context.Provider value = {{
      fetchUserDetails, // user detail fetch
      
    }} >

      <ToastContainer />
    
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
