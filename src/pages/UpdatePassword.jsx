import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch , useSelector } from 'react-redux'
import { Link , useLocation , useNavigate } from 'react-router-dom'

import {resetPassword} from "../Services/operations/authAPI"


const UpdatePassword = () => {
   const navigate = useNavigate()
   const location = useLocation()
   const dispatch = useDispatch()
   const {loading} = useSelector((state)=> state.auth)
   const [formData , setFormData] = useState({
      password:"",
      confirmPassword:"",
   })

   const [showPassword,setShowPassword] = useState(false)
   const[showConfirmPassword,setShowConfirmPassword] = useState(false)
   const {password,confirmPassword} = formData

   const handleOnChange = (e)=>{
      setFormData((prevData)=>({
         ...prevData,
         [e.target.name]: e.target.value,
      }))
   }

   const handleOnSubmit=(e)=>{
      e.preventDefault()
      const token = location.pathname.split("/").at(-1)
      dispatch(resetPassword(password,confirmPassword,token,navigate))
   }


  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {
         loading? (<div className='spinner'></div>) 
         : (<div className='max-w-[500px] p-4 lg:p-8'>
               <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Choose new Password</h1>

               <p className='my-4 text-[1.125rem] leading-[1.635rem] text-richblack-100'>
                  Almost done. Enter your new password and youre all set.
               </p>

               <form onSubmit={handleOnSubmit}>
                  <lable className="relative">
                     <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        New Password <sup className='text-pink-300'>*</sup>
                     </p>
                     <input
                     required
                     name='password'
                     value={password}
                     type={showPassword?"text" : "password"}
                     onChange={handleOnChange}
                     placeholder='Enter new Password'
                     className='form-style w-full !pr-10'
                     />
                     <span onClick={()=>setShowPassword((prev)=> !prev)}
                        className='absolute right-3 top-[38px] z-10 cursor-pointer '>
                           {showPassword
                           ?(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                           ) : (
                             <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                           )}
                     </span>
                  </lable>


                  <lable className="relative">
                     <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Confirm New Password <sup className='text-pink-300'>*</sup>
                     </p>
                     <input
                     required
                     name='confirmPassword'
                     value={confirmPassword}
                     type={showConfirmPassword?"text" : "password"}
                     onChange={handleOnChange}
                     placeholder='Enter new Password'
                     className='form-style w-full !pr-10'
                     />
                     <span onClick={()=>setShowConfirmPassword((prev)=> !prev)}
                        className='absolute right-3 top-[38px] z-10 cursor-pointer '>
                           {showConfirmPassword
                           ?(<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                           ) : (
                             <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                           )}
                     </span>
                  </lable>

                  <button type='submit' 
                  className='mt-6 flex items-center rounded-xl bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                     Reset Password
                  </button>

               </form>
               
               <div className="mt-6 flex items-center justify-between">
                  <Link to="/login">
                     <p className="flex items-center gap-x-2 text-richblack-5">
                        <BiArrowBack /> Back To Login
                     </p>
                  </Link>
               </div>
         </div>) 
      }
    </div>
  )
}

export default UpdatePassword
