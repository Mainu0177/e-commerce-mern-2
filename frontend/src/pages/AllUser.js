import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { MdOutlineEdit } from "react-icons/md";


import SummaryApi from '../common/urlIntigration'
import ChangeUserRole from '../components/ChangeUserRole';

const AllUser = () => {
  const [allUsers, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email : '',
    name : '',
    _id : '',
    role : ''
  })

  const fetchAllUsers = async () =>{
    const fetchData = await fetch(SummaryApi.all_users.url, {
      method : SummaryApi.all_users.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json()

    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }

    if(dataResponse.error){
      setAllUsers(dataResponse.message)
    }
    
  }

  useEffect(() =>{
    fetchAllUsers()
  }, [])
  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>St.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((el,index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>
                    <button className='bg-slate-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      onClick={() =>{
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                        }}>
                      <MdOutlineEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUser