import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
// import ScrollReveal from './ScrollReveal';
import timelineImage from "../../../assets/Images/TimelineImage.png"


const timeLine = [
   {
      Logo : Logo1,
      heading : "Leadership",
      Description : "Fully commited to the success company",
   },
   {
      Logo : Logo2,
      heading : "Responsibility",
      Description : "Students will always be our top priority",
   },
   {
      Logo : Logo3,
      heading : "Flexibility",
      Description : "The ability to switch is an important skills",
   },
   {
      Logo : Logo4,
      heading : "Solve the problem",
      Description : "Code your way to a solution",
   },
]

const TimelineSection = () => {
  return (
    <div>
      
      <div className='flex flex-row gap-15 items-center'> 
         <div className='w-[53%] flex flex-col gap-5'>
            {
               timeLine.map((element , index)=>{
                  return (
                    <div>
                         <div 
                           key={index}
                           className='flex gap-6'
                        >
                           <div className='w-[60px] h-[60px] bg-teal-100 flex flex-col justify-center bg-rose-50 rounded-full items-center'>
                              <img src={element.Logo} alt="" className='flex flex-col items-center h-[24px]'/>
                           </div>

                           <div>
                              <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                              <p className='text-base'>{element.Description}</p>
                           </div>
                        </div>
                        <div className={` ${index!== 3? ("bg-richblack-25 opacity-70 w-[1px] h-[50px] mt-4 ml-7 mb-[-10px]") : ("")}`}>

                        </div>
                    </div>
                     
                  )
               })
            }
         </div>

         <div className='relative shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
            <img src={timelineImage} alt="" className='object-cover h-fit shadow-[15px_15px_rgba(255,255,255)]'/>

            <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-7 w-[80%]
               left-[50%] translate-x-[-50%] translate-y-[-50%]
            '>
               <div className='flex gap-5 items-center border-caribbeangreen-300 px-7'>
                  <p className='text-3xl font-bold'>10</p>
                  <p className='text-caribbeangreen-300 text-sm ml-3 border-r-2 pr-7'>Years of Experience</p>
               </div>
               <div className='flex gap-5 items-center border-caribbeangreen-300 px-7'>
                  <p className='text-3xl font-bold'>250</p>
                  <p className='text-caribbeangreen-300 text-sm ml-3'>Types of Courses</p>
               </div>

            </div>
         </div>
      </div>
    </div>
  )
}

export default TimelineSection
