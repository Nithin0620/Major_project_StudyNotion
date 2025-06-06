import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div onClick={modalData?.btn2Handler} className='z-[999]'>
      <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white  bg-opacity-10 backdrop-blur-sm'>
         <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
            <p className='text-2xl font-semibold text-richblack-5'>
               {modalData?.text1}
            </p>
            <p className='mt-3 mb-5 leading-6 text-richblack-200'>
               {modalData?.text2}
            </p>

            <div className='flex gap-x-14'>
               <IconBtn
                  onClick={modalData?.btn1Handler}
                  text={modalData?.btn1Text}
               />
               <button className=' cursor-pointer hover:bg-yellow-100 hover:shadow-2xl shadow-yellow-5 hover:scale-95 transition-all duration-300 rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblue-900'
                        onClick={modalData?.btn2Handler}>  
                  {modalData?.btn2Text}
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
