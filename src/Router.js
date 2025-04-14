import { createBrowserRouter } from "react-router-dom";
import App from "./App";  
import Home from "./pages/Home";
import NotFound from "./components/core/HomePage/NotFound";

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
         }
      ]
   }
]);

export default router;  