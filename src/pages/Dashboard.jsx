import React from "react";
import Sidebar from "../components/core/Dashboard/sidebar"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {

   const {loading :profileLoading} = useSelector((auth)=> auth.profile)
   const {loading :authLoading} = useSelector((auth)=> auth.auth)


   if(profileLoading || authLoading){
      return (
         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner">

            </div>
         </div>
      )
   }
  return(
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
         <sidebar/>
         <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
               <Outlet/>
            </div>
         </div>
      </div>
   )
};

export default Dashboard;
