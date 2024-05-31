import { Outlet } from "react-router-dom"
import Nav from "./Shared components/Nav"
import Footer from "./Shared components/Footer"


function App() {

  return (
      <div>
        <Nav/>
        <Outlet/>
        <Footer/>
      </div>
  )
}

export default App
