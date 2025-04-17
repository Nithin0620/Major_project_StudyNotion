import "./App.css";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Common/Navbar"

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {/* <Navbar/> */}
      <Outlet/>
    </div>
  );
}

export default App;
  