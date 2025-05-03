import {toast} from "react-hot-toast"
import {setLoading , setToken} from "../../reducer/slices/authSlice"
import {resetCart} from "../../reducer/slices/cartSlice"
import {setUser} from "../../reducer/slices/profileSlice"
import {apiConnector} from "../apiConnector"
import {endpoints} from "../apis"

const {
   SENDOTP_API,
   SIGNUP_API,
   LOGIN_API,
   RESETPASSTOKEN_API,
   RESETPASSWORD_API,
}= endpoints;

export function sendOtp(email, navigate) {
   return async(dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
         console.log("Sending OTP request to:", SENDOTP_API); // Add this log
         const response = await apiConnector("POST", SENDOTP_API, {
            email,
            checkUserPresent: true,
         })
         console.log("SENDOTP API RESPONSE............", response)

         if (!response?.data) {
            throw new Error("No response from server")
         }

         if (!response.data.success) {
            throw new Error(response.data.message)
         }

         toast.success("OTP sent Successfully")
         navigate("/verify-email")
      }
      catch(error) {
         console.log("SENDOTP API ERROR.....", error)
         // More detailed error logging
         if (error.response) {
            // Server responded with error
            console.log("Error response:", error.response.data);
            toast.error(error.response.data.message || "Server error occurred");
         } else if (error.request) {
            // Request made but no response
            console.log("No response received:", error.request);
            toast.error("No response from server. Please check your connection.");
         } else {
            // Error in request setup
            console.log("Error in request:", error.message);
            toast.error(error.message || "Could not send OTP");
         }
      }
      finally {
         dispatch(setLoading(false))
         toast.dismiss(toastId)
      }
   }
}

export function signUp(
   accountType,
   firstName,
   lastName,
   email,
   password,
   confirmPassword,
   otp,
   navigate
){
   return async(dispatch)=>{
      const toastId=toast.loading("Loading..");
      dispatch(setLoading(true))
      try{
         const response = await apiConnector("POST",SIGNUP_API,{
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
         })
         console.log("SIGNUP API RESPONSE............", response)

         if(!response.data.success){
            throw new Error(response.data.message)
         }

         toast.success("SignUp Successful")
         navigate("/login")
      }
      catch(e){
         console.log("SIGNUP API ERROR............", e)
         toast.error("SignUp Failed")
         navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
   }
}


export function login(
   email,password,navigate
){
   return async(dispatch)=>{
      const toastId=toast.loading("Loading..");
      dispatch(setLoading(true))
      try{
         const response = await apiConnector("POST",LOGIN_API,{
            email,password
         })
         console.log("LOGIN API RESPONSE............", response)

         if(!response.data.success){
            throw new Error(response.data.message)
         }

         toast.success("LogIn Successful")
         dispatch(setToken(response.data.token))

         localStorage.setItem("token",JSON.stringify(response.data.token))

         const userImage = response.data?.user?.image ? response.data.user.image 
                           : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
         
         dispatch(setUser({...response.data.user , image:userImage}))
         
         navigate("/dashboard/my-profile")
      }
      catch(e){
         console.log("LogIn API ERROR............", e)
         toast.error("LogIn Failed")
         navigate("/LogIn")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
   }
}


export function logout (navigate){
   return async (dispatch)=>{
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())

      localStorage.removeItem("token")
      localStorage.removeItem("user")

      toast.success("Logged Out")

      navigate("/")
   }
}

export function getPasswordResetToken(email , setEmailsent){
   return async(dispatch)=>{
      dispatch(setLoading(true))

      try{
         const response = await apiConnector("POST",RESETPASSTOKEN_API,{email})

         console.log("RESET PASSWORD TOKEN RESPONSE....", response);

         if(!response.data.success){
            throw new Error(response.data.message)
         }
         toast.success("Reset Email Sent");
         setEmailsent(true)
      }
      catch(e) {
         console.log("RESET PASSWORD TOKEN Error", e);
         toast.error("Failed to send email");
      }
      dispatch(setLoading(false));
   }
}


export function resetPassword(password,confirmPassword , token){
   return async (dispatch)=>{
      dispatch(setLoading(true))

      try{
         const response = await apiConnector("POST" , RESETPASSTOKEN_API, {password,confirmPassword,token});

         console.log("RESET Password RESPONSE ... ", response);

         if(!response.data.success) {
            throw new Error(response.data.message);
         }
    
         toast.success("Password has been reset successfully");
      }
      catch(e) {
         console.log("RESET PASSWORD TOKEN Error", e);
         toast.error("Unable to reset password");
      }
      dispatch(setLoading(false));
   }
}