import { createBrowserRouter } from "react-router-dom";
import App from "./App";  
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "signup",
        element: <OpenRoute><Signup /></OpenRoute>
      },
      {
        path: "login",
        element: <OpenRoute><Login /></OpenRoute>
      },
      {
        path: "forgot-password",
        element: <OpenRoute><ForgotPassword /></OpenRoute>
      },
      {
        path: "update-password/:id",
        element: <OpenRoute><UpdatePassword /></OpenRoute>
      },
      {
        path: "verify-email",
        element: <OpenRoute><VerifyEmail /></OpenRoute>
      }
    ]
  }
]);

export default router;