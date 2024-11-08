/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FaUserCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageTobase64 from '../helpers/imageTobase64';

const SignUp = () => {
    const [shoPassword, setShoPassword] = useState(false);
    const [shoConfirmPassword, setShoConfirmPassword] = useState(false)
    const [data, setData] = useState({
        name: '',
        email : '',
        password : '',
        confirmPassword : '',
        profilePic : '',

    })

    const handleChange = (e) =>{
        const {name, value} = e.target

        setData((preve) =>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadImage = async (e) =>{
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)

        setData((preve) =>{
            return {
                ...preve,
                profilePic : imagePic
            }
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
    }
    return (
    <section id ='login' className=''>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 text-xl mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src = {data.profilePic}></img> || {<FaUserCircle />}
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                            Upload image
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadImage} />
                        </label>
                    </form>
                </div>
                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Name : </label>
                        <div className='bg-slate-100 p-2 rounded-lg'>
                            <input type='text' placeholder='User email' onChange={handleChange} value={data.email} name='User name' className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2 rounded-lg'>
                            <input type='email' placeholder='User email' onChange={handleChange} value={data.email} name='email' className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 rounded-lg flex'>
                            <input type={ shoPassword ? "" : 'password'} onChange={handleChange} value={data.password} name='password' placeholder='User password' className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={() => setShoPassword((prev) => !prev)}>
                                <span className=''>
                                    {
                                        shoPassword ? (<FaEyeSlash />) : (<FaEye />)
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='grid'>
                        <label>Confirm Password : </label>
                        <div className='bg-slate-100 p-2 rounded-lg flex'>
                            <input type={ shoPassword ? "" : 'password'} onChange={handleChange} value={data.password} name='password' placeholder='User password' className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={() => setShoConfirmPassword((prev) => !prev)}>
                                <span className=''>
                                    {
                                        shoConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)
                                    }
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='ml-auto w-fit block hover:underline hover:text-red-500'>
                            Forgot password
                        </Link>
                    </div>
                        <button type='submit' className='bg-red-500 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-5'>
                            Login
                        </button>
                </form>
                <p className='my-5'>Don`t have account ? <Link className=' text-red-500 hover:text-red-600 hover:underline' to = {'/sign-up'}>Sing Up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignUp