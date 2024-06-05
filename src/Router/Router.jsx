import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home/Home";
import App from "../App";
import Join from "../Pages/Login Register/Join";
import Dashboard from "../Pages/Dashboard/Dashboard";
import SellerHome from "../Pages/Dashboard/contents/Seller contents/Content page/SellerHome";
import ManageItems from "../Pages/Dashboard/contents/Seller contents/Content page/ManageItems";
import Shop from "../Pages/Shop/Shop";
import ShopByCategory from "../Pages/Shop by category/ShopByCategory";

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
        path: '/shop', 
        element: <Shop/>
      },
      {
        path: '/shop/:category',
        element: <ShopByCategory/>
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