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
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Private from "../Private";
import PaymentHistory from "../Pages/Dashboard/contents/User contents/Content page/PaymentHistory";

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
        path: '/cart',
        element:<Private><Cart/></Private> 
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
        path: '/checkout',
        element:<Private><Checkout/></Private>
      },
      {
        path: '/join', 
        element: <Join/>
      }
    ]
  },
  {
    path: '/dashboard',
    element:<Private><Dashboard/></Private>,
    children: [
      {
        path: '/dashboard/paymenthistory',
        element: <PaymentHistory/>
      },
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