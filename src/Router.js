// routerConfig.js
import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Error from "./pages/Error"
import MyProfile from "./components/core/Dashboard/MyProfile"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import { ACCOUNT_TYPE } from "./utils/constants"
import { useSelector } from "react-redux"
import Settings from "./components/core/Dashboard/Settings"
import Cart from "./components/core/Dashboard/Cart"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import AddCourse from "./components/core/Dashboard/AddCourse"
import MyCourses from "./components/core/Dashboard/MyCourses"
import EditCourse from "./components/core/Dashboard/EditCourse"
import Instructor from "./components/core/Dashboard/Instructor"
import ViewCourse from "./pages/ViewCourse"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails"

function DashboardWrapper() {
  const user = useSelector((state) => state.profile.user)

  const baseRoutes = [
    { path: "my-profile", element: <MyProfile /> },
    { path: "settings", element: <Settings /> },
  ]

  const studentRoutes = [
    { path: "cart", element: <Cart /> },
    { path: "enrolled-courses", element: <EnrolledCourses /> },
  ]

  const instructorRoutes = [
    { path: "add-course", element: <AddCourse /> },
    { path: "my-courses", element: <MyCourses /> },
    { path: "instructor", element: <Instructor /> },
    { path: "edit-course/:courseId", element: <EditCourse /> },
  ]

  return {
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      ...baseRoutes,
      ...(user?.accountType === ACCOUNT_TYPE.STUDENT ? studentRoutes : []),
      ...(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? instructorRoutes : []),
    ],
  }
}

function ViewCourseWrapper() {
  const user = useSelector((state) => state.profile.user)

  return {
    element: (
      <PrivateRoute>
        <ViewCourse />
      </PrivateRoute>
    ),
    children:
      user?.accountType === ACCOUNT_TYPE.STUDENT
        ? [
            {
              path: "view-course/:courseId/section/:sectionId/sub-section/:subSectionId",
              element: <VideoDetails />,
            },
          ]
        : [],
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "courses/:courseId", element: <CourseDetails /> },
      { path: "catalog/:catalogName", element: <Catalog /> },
      {
        path: "login",
        element: (
          <OpenRoute>
            <Login />
          </OpenRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <OpenRoute>
            <Signup />
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
      DashboardWrapper(),
      ViewCourseWrapper(),
      { path: "*", element: <Error /> },
    ],
  },
])

export default router
