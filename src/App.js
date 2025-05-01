import "./App.css";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Common/Navbar"

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <div className="z-50 fixed top-0 w-full bg-transparent bg-richblack-800 backdrop-blur-md mb-11"><Navbar/></div>
      <Outlet/>
    </div>
  );
}

export default App;
  