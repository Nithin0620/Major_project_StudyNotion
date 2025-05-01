import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sentOtp } from "../../../Services/operations/authAPI";
import { setSignupData } from "../../../reducer/slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../Common/Tab";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("password Do not match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));

    dispatch(sentOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    {
      id: 1,
      tabName: "student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="overflow-y-hidden">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnChange} className="flex w-full flex-col gap-y-4">
        <div className="flex flex-col gap-y-4">
          
            <div className="flex gap-4">
               <lable>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  First Name<sup className="text-pink-100">*</sup>
                  </p>
                  <input
                  type="text"
                  required
                  name="firstName"
                  value={firstName}
                  onChange={handleOnChange}
                  placeholder="Enter First Name"
                  style={{
                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
               </lable>

               <lable>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Last Name<sup className="text-pink-100">*</sup>
                  </p>
                  <input
                  type="text"
                  required
                  name="lastName"
                  value={lastName}
                  onChange={handleOnChange}
                  placeholder="Enter Last Name"
                  style={{
                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />
               </lable>

            </div>

          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-300">*</sup>
            </p>
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>

          <div className="flex gap-4">
            <label className="relative w-full">
               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
               Create Password <sup className="text-pink-300">*</sup>
               </p>
               <input
               type={showPassword ? "text" : "password"}
               required
               name="password"
               value={password}
               onChange={handleOnChange}
               placeholder="Enter Password"
               style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
               }}
               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
               />

               <span
               onClick={() => setShowPassword((prev) => !prev)}
               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
               >
               {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
               ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
               )}
               </span>
            </label>

            <label className="relative w-full">
               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
               Confirm Password <sup className="text-pink-300">*</sup>
               </p>
               <input
               type={showConfirmPassword ? "text" : "password"}
               required
               name="confirmPassword"
               value={confirmPassword}
               onChange={handleOnChange}
               placeholder="Confirm Password"
               style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
               }}
               className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
               />

               <span
               onClick={() => setShowPassword((prev) => !prev)}
               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
               >
               {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
               ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
               )}
               </span>
            </label>
          </div>

          
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
