import { createBrowserRouter } from "react-router-dom";
import App from "./App";  
import Home from "./pages/Home";
import NotFound from "./components/core/HomePage/NotFound";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ForgotPassword from "../src/pages/ForgotPassword"
import UpdatePassword from "../src/pages/UpdatePassword"
import VerifyEmail from "../src/pages/VerifyEmail"

const router = createBrowserRouter([
   {
      path:"/",
      element:<App/>,
      children:[
         {
            path:"",
            element:<Home/>
         },
         {
            path:"*",
            element:<NotFound/>
         },
         {
            path : "signup",
            element: <OpenRoute> <Signup/></OpenRoute>
         },
         {
            path : "login",
            element: <OpenRoute> <Login/></OpenRoute>
         },
         {
            path : "forgot-password",
            element:<OpenRoute><ForgotPassword/></OpenRoute>
         },
         {
            path : "update-password/:id",
            element:<OpenRoute><UpdatePassword/></OpenRoute>
         },
         {
            path : "verify-email",
            element:<OpenRoute><VerifyEmail/></OpenRoute>
         }
      ]
   }
]);

export default router;  