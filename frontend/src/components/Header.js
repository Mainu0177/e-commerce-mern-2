import React from 'react'
import Logo from './Logo'

import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-white'>
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
              <div className='text-3xl cursor-pointer'>
                <FaRegCircleUser />
              </div>
              <div className='text-2xl cursor-pointer relative'>
                <span className=''>
                  <FaShoppingCart />
                </span>
                  <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-4'>
                    <p className='text-sm'>0</p>
                  </div>
              </div>
              <div>
              <Link to='/login' className='bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700'>Login</Link>
            </div>
            </div>
        </div>
    </header>
  )
}

export default Header