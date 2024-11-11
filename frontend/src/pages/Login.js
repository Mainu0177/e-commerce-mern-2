import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FaUserGraduate } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common/urlIntigration';
import { toast } from 'react-toastify';
import Context from '../context/context';


const Login = () => {
    const [shoPassword, setShoPassword] = useState(false);
    const [data, setData] = useState({
        email : '',
        password : '',
    })
    const navigate = useNavigate();
    const { fetchUserDetails } = useContext(Context)

    const handleChange = (e) =>{
        const {name, value} = e.target

        setData((preve) =>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method: SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()
        
        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            // fetchUserAddToCart()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }
    console.log('data login', data)
    return (
    <section id ='login' className=''>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 text-7xl mx-auto'>
                    <FaUserGraduate />
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
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
                            <div className='cursor-pointer text-xl' onClick={() => setShoPassword((preve) => !preve)}>
                                <span className=''>
                                    {
                                        shoPassword ? (<FaEyeSlash />) : (<FaEye />)
                                    }
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='ml-auto w-fit block hover:underline hover:text-red-500'>
                            Forgot password ?
                        </Link>
                    </div>
                        <button type='submit' className='bg-red-500 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-xl hover:scale-110 transition-all mx-auto block mt-5'>
                            Login
                        </button>
                </form>
                <p className='my-5'>Don`t have account ? <Link className=' text-red-500 hover:text-red-600 hover:underline' to = {'/sign-up'}>Sign Up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login