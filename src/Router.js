import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";

// Wrapper component that uses Redux hooks
function DashboardWrapper() {
  const user = useSelector((state) => state.profile.user);
  const dashboardChildren = [
    { path: "my-profile", element: <MyProfile /> },
    { path: "settings", element: <Settings /> },
  ];

  if (user?.accountType === ACCOUNT_TYPE.STUDENT) {
    dashboardChildren.push(
      { path: "cart", element: <Cart /> },
      { path: "enrolled-courses", element: <EnrolledCourses /> }
    );
  }

  if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
    dashboardChildren.push(
      { path: "add-course", element: <AddCourse /> }
    );
  }

  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}

export default function RouterConfig() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "signup",
          element: (
            <OpenRoute>
              <Signup />
            </OpenRoute>
          ),
        },
        {
          path: "login",
          element: (
            <OpenRoute>
              <Login />
            </OpenRoute>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          ),
        },
        {
          path: "update-password/:id",
          element: (
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          ),
        },
        {
          path: "verify-email",
          element: (
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          ),
        },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        {
          path: "dashboard",
          element: <DashboardWrapper />,
          children: [
            { path: "my-profile", element: <MyProfile /> },
            { path: "settings", element: <Settings /> },
            { path: "cart", element: <Cart /> },
            { path: "enrolled-courses", element: <EnrolledCourses /> },
            { path: "add-course", element: <AddCourse /> }
          ],
        },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return router;
}
