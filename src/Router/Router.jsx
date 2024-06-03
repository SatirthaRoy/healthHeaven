import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home/Home";
import App from "../App";
import Join from "../Pages/Login Register/Join";
import Dashboard from "../Pages/Dashboard/Dashboard";
import SellerHome from "../Pages/Dashboard/contents/Seller contents/Content page/SellerHome";
import ManageItems from "../Pages/Dashboard/contents/Seller contents/Content page/ManageItems";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/join', 
        element: <Join/>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    children: [
      {
        path: '/dashboard/sellerhome',
        element: <SellerHome/>
      },
      {
        path: '/dashboard/manageitems',
        element: <ManageItems/>
      }
    ]
  }
])