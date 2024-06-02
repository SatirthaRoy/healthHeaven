import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home/Home";
import App from "../App";
import Join from "../Pages/Login Register/Join";
import Dashboard from "../Pages/Dashboard/Dashboard";

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
        
      }
    ]
  }
])