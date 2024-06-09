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
import AdminHome from "../Pages/Dashboard/contents/Admin contents/Contents/AdminHome";
import Invoice from "../Pages/Invoice/Invoice";
import ManageUsers from "../Pages/Dashboard/contents/Admin contents/Contents/ManageUsers";
import ManageCategory from "../Pages/Dashboard/contents/Admin contents/Contents/ManageCategory";
import PaymentManagement from "../Pages/Dashboard/contents/Admin contents/Contents/PaymentManagement";
import SalesReport from "../Pages/Dashboard/contents/Admin contents/Contents/SalesReport";
import ManageAdvertise from "../Pages/Dashboard/contents/Admin contents/Contents/ManageAdvertise";
import SoldHistory from "../Pages/Dashboard/contents/Seller contents/Content page/SoldHistory";
import Advertisement from "../Pages/Dashboard/contents/Seller contents/Content page/Advertisement";
import Query from "../Pages/Dashboard/contents/User contents/Content page/Query";
import Allqueries from "../Pages/AllQueries/Allqueries";
import QueryDetail from "../Pages/Query Detail/QueryDetail";
import UpdateProfile from "../Pages/Update Profile/UpdateProfile";
import AdminPrivate from "../AdminPrivate";
import SellerPrivate from "../SellerPrivate";
import PageNotFound from "../Pages/page not found/PageNotFound";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <PageNotFound/>,
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
        path: '/allqueries',
        element: <Private><Allqueries/></Private>
      },
      {
        path: '/queries/:id',
        element: <Private><QueryDetail/></Private>
      },
      {
        path: '/invoice/:transactionId',
        element: <Private><Invoice/></Private>
      },
      {
        path: '/updateprofile',
        element: <Private><UpdateProfile/></Private>
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
        path: '/dashboard/adminhome',
        element: <AdminPrivate><AdminHome/></AdminPrivate>
      },
      {
        path: '/dashboard/sellerhome',
        element: <SellerPrivate><SellerHome/></SellerPrivate>
      },
      {
        path: '/dashboard/manageitems',
        element: <SellerPrivate><ManageItems/></SellerPrivate>
      },
      {
        path: '/dashboard/soldhistory',
        element: <SellerPrivate><SoldHistory/></SellerPrivate>
      },
      {
        path: '/dashboard/advertisement',
        element: <SellerPrivate> <Advertisement/></SellerPrivate>
      },
      {
        path: '/dashboard/manageusers',
        element: <AdminPrivate><ManageUsers/></AdminPrivate>
      },
      {
        path: '/dashboard/managecategory',
        element: <AdminPrivate><ManageCategory/></AdminPrivate>
      },
      {
        path: '/dashboard/paymentmanage',
        element: <AdminPrivate><PaymentManagement/></AdminPrivate>
      },
      {
        path: '/dashboard/report',
        element: <AdminPrivate><SalesReport/></AdminPrivate>
      },
      {
        path: '/dashboard/advertise',
        element: <AdminPrivate><ManageAdvertise/></AdminPrivate>
      },
      {
        path: '/dashboard/queries',
        element: <Query/>
      }
    ]
  }
])