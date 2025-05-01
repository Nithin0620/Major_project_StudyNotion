import React from "react";
import { useSelector } from "react-redux";

import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import signup from "../../../pages/Signup";

const Template = ({ title, description1, description2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className={`${formType === "signup" ? "mt-9" : "mt-28"} flex flex-col min-h-[calc(100vh-3.5rem)] place-items-center overflow-y-hidden `}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent justify-between gap-y-12 py-12 md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.115rem] leading-[1.625rem] mb-5">
              <span className="text-richblack-100">{description1}</span>
              <div></div>
              <span className="font-tegomin font-semibold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 mt-8 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="pattern"
              width={558}
              height={504}
              loading="lazy"
            />

            <img
              src={image}
              alt="students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
