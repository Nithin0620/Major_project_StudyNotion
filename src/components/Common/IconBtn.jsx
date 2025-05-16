import React from 'react'

const IconBtn = ({
   text,
   onClick,
   children,
   disabled,
   outline=false,
   customeClasses,
   type,
}) => {
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`flex hover:bg-yellow-100 hover:shadow-2xl shadow-yellow-5 hover:scale-95 transition-all duration-300 items-center ${
         outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-2 font-semibold text-richblack-900 ${customeClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline ? "text-yellow-50" : "text-richblack-900"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}

export default IconBtn
