import { Outlet, ScrollRestoration } from "react-router-dom";
import Nav from "./Shared components/Nav";
import Footer from "./Shared components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
      <ScrollRestoration />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
