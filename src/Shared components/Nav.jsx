import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { FaBook, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useData from "../Hooks/useData";
import useCart from "../Hooks/useCart";

const Nav = () => {
  const { user, logOut } = useData();
  const [openNav, setOpenNav] = useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const [cart] = useCart();

  const navList = (
    <ul className="*:font-normal *:text-text *:text-xl mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `flex items-center text-theme` : `flex items-center`
          }
        >
          Home
        </NavLink>
      </Typography>

      <Typography as="li" variant="small" color="blue-gray" className="p-1">
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? `flex items-center text-theme` : `flex items-center`
          }
        >
          Shop
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1">
        <NavLink
          to="/dashboard/mycart"
          className={({ isActive }) =>
            isActive ? `flex items-center text-theme` : `flex items-center`
          }
        >
          <div className="text-4xl relative">
            <FaShoppingCart />
            <div className="absolute top-0 -right-5 badge bg-theme text-white">
              +{cart.length}
            </div>
          </div>
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1">
        <select
          defaultValue={1}
          className="select select-ghost w-full max-w-xs"
        >
          <option disabled value={1}>
            Language
          </option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </select>
      </Typography>
    </ul>
  );

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%)] mt-0 mx-0">
      <Navbar className=" bg-white border-b-2 fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            className="mr-4 cursor-pointer py-1.5 cinzel text-3xl font-black text-[#44c2fd] boska"
          >
            Health <br />
            Heaven
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            {user ? (
              <div>
                <details className="dropdown">
                  <summary className="m-1 btn p-0 rounded-full">
                    <div className="size-12 rounded-full">
                      <img
                        src={user?.photoURL}
                        alt=""
                        className="size-12 rounded-full"
                      />
                    </div>
                  </summary>
                  <ul className="p-2 -left-20 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40">
                    <li>
                      <a>
                        <FaUser /> Update Profile
                      </a>
                    </li>
                    <li>
                      <NavLink to='/dashboard'
                        className={({ isActive }) =>
                          isActive
                            ? `flex items-center text-theme`
                            : `flex items-center`
                        }
                      >
                        <FaBook /> Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => logOut()}
                        className="text-white font-semibold btn btn-error"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </details>
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <Link to="/join">
                  <Button
                    variant="text"
                    size="sm"
                    className="lg:inline-block bg-theme hover:bg-theme text-white px-5 py-3"
                  >
                    <span>Join Us</span>
                  </Button>
                </Link>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          {/* if the user is logged in */}
          {/* {user ? (
            <div className="flex justify-center items-center gap-5">
              <div className="size-12 rounded-full">
                <img
                  src=""
                  alt=""
                  className="w-full size-12 rounded-full object-cover"
                />
              </div>
              <Button
                variant="text"
                size="sm"
                className="lg:inline-block bg-orange-900 text-white px-5 py-3"
                onClick={() => logOut().then(() => console.log("signed OUT"))}
              >
                <span>Log Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-x-1">
              <Link to="/login">
                <Button
                  fullWidth
                  variant="text"
                  size="sm"
                  className="bg-yellow-800 text-white px-5 py-3"
                >
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  fullWidth
                  variant="text"
                  size="sm"
                  className="bg-orange-900 text-white px-5 py-3"
                >
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          )} */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Nav;
