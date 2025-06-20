import React from 'react'

import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869", 
  },
]

const ContactDetails = () => {
  return (
    <div className='flex  gap-1 flex-col'>
      {contactDetails.map((element,i)=>{
         let Icon = Icon1[element.icon] || Icon3[element.icon] || Icon2[element.icon] ;

         return(
            <div className='flex flex-col gap-[2px] p-8 text-sm  text-richblack-200' key={i}>
               <div className='flex flex-row items-center gap-3'>
                  <Icon size={25}/>
                  <h1 className='text-lg font-semibold text-richblack-5'>
                     {element?.heading}
                  </h1>
               </div>

               <p className='font-medium'>{element?.description}</p>
               <p className='font-semi'>{element?.details}</p>
            </div>
         )
       })}
    </div>
  )
}

export default ContactDetails
