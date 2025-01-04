import React, { useState } from 'react'
import Logo from './Logo'

import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common/urlIntigration';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context/context';


const Header = () => {
  const user = useSelector(state => state?.user?.user)

  const [menuDisplay, setMenuDisplay] = useState(false)
  
  const context = useContext(Context)
  const dispatch = useDispatch()

  const handleLogOut = async () =>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()
    
    if(data.success){
      toast.success(data.message);
      dispatch(setUserDetails(null))
    }
    if(data.error){
      toast.error(data.message)
    }
  }

  console.log("header add to cart count", context)
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className="h-full container mx-auto flex items-center px-4 justify-between">
            <div className="">
                <Link to='/'>
                  <Logo />
                </Link>
            </div>

            <div className=' hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
              <input type='text' placeholder='Search products here...'className='w-full outline-none' />
              <div className='text-lg min-w-[50px] h-8 bg-red-600 flex justify-center items-center rounded-r-full text-white'>
                <GrSearch />
              </div>
            </div>

            <div className='items-center flex gap-7'>
              <div className='relative flex justify-center'>
                {
                  user?._id && (
                    <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=> setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                    </div>
                  )
                }

                {
                  menuDisplay && (
                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                      <nav>
                        {
                          user?.role === ROLE.ADMIN && (
                            <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=> setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                          )
                        }
                      </nav>
                    </div>
                  )
                }
              </div>

              {
                user?._id && (
                  <div className='text-2xl cursor-pointer relative'>
                      <span className=''>
                        <FaShoppingCart />
                      </span>
                    <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-4'>
                      <p className='text-sm'>{context.cartProductCount}</p>
                    </div>
                  </div>
                )
              }

              <div>
                {
                  user?._id ? (<button onClick={handleLogOut} className='bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700'>Log Out</button>)
                  :
                  (<Link to='/login' className='bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700'>Login</Link>)
                }
              
            </div>
            </div>
        </div>
    </header>
  )
}

export default Header