import "./App.css";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Outlet/>
    </div>
  );
}

export default App;
  