import React, { useState, useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, useLocation } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { IoIosArrowDown } from "react-icons/io"
import { categories } from '../../Services/apis'
import { matchPath } from 'react-router-dom'
import profileDropDown from "../core/Auth/profileDropDown"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { apiConnector } from '../../Services/apiConnector'


const Navbar = () => {
   const {token} = useSelector((state) => state.auth);
   const {user} = useSelector((state) => state.profile);
   const {totalItems} = useSelector((state) => state.cart);
   const location = useLocation();

   const [subLinks, setSubLinks] = useState([]);

   const fetchSublinks = async() => {
      try {
         const result = await apiConnector("GET", categories.CATEGORIES_API);
         console.log("Printing Results", result);
         setSubLinks(result.data.data);
      }
      catch(error) {
         console.log("Could not fetch the category list", error);
      }
   }

   useEffect(() => {
      fetchSublinks();
   }, [])

   function matchRoute(route){
      return matchPath(route, location.pathname);
   }

   return (
      <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 mt-1'>
         <div className='flex w-11/12 max-w-maxContent items-start justify-between'>
            <Link to="/">
               <img src={logo} width={160} height={42} loading='lazy' alt="" className='mt-1'/>
            </Link>

            <nav>
               <ul className='flex gap-x-6 text-richblack-25 mt-[0.50rem]'>
                  {
                     NavbarLinks.map((link , index)=>{
                        return(
                           <li key={index}>
                              {
                                 link.title === "Catalog" ? ( 
                                    <div className='relative flex items-center gap-2 group hover:text-rose-50'>
                                       <p>{link.title}</p>
                                       <IoIosArrowDown />

                                       <div className='invisible absolute left-[50%] translate-x-[-50%]
                                             translate-y-[80%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                             opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                               
                                             <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%]
                                                   h-6 w-6 rotate-45 bg-richblack-5'>
                                             </div>
                                             {
                                                subLinks.length? (
                                                   subLinks.map((subLinks , index)=>{
                                                      return(
                                                         <Link to={`${subLinks.link}`} key={index}>
                                                            <p>{subLinks.title}</p>
                                                         </Link>
                                                      )
                                                   })
                                                ):(<div></div>)
                                             }
                                             </div>
                                    </div>
                                 ) : (
                                    <Link to={link?.path}>
                                    <p className={`${matchRoute(link.path)? "text-yellow-25" : "text-richblack-25"} hover:text-rose-50`}>
                                       {link.title}
                                       </p></Link>
                                 )
                              }
                           </li>
                        )
                     })
                  }
               </ul>
            </nav>



        {/* Login/SignUp/Dashboard */}
         <div className='flex gap-4 items-center '>
            {
               user && user?.accountType !== "Instructor" &&(
                  <Link to="/dashboard/cart" className='relative'>
                     <AiOutlineShoppingCart/>
                     {
                        totalItems > 0&& (
                           <span>
                              {totalItems}
                           </span>
                        )
                     }
                  </Link>
               )
            }
            {
               token === null && (
                  <Link to="/login">
                     <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] hover:bg-[#0d0d0d] text-richblack-100 rounded-md'>
                        Log In
                     </button>
                  </Link>
               )  
            }
            {
               token === null && (
                  <Link to="/signup">
                     <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                        Sign Up
                     </button>
                  </Link>
               )  
            }
            {
               token !==null && <profileDropDown/>
            }
         </div>

         </div>
      </div>
   )
}

export default Navbar
