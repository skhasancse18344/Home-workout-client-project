import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext/AuthProvider";

const Navbar = () => {
  const { checkAuth, logout ,user} = useContext(AuthContext);
  const menuItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
    </>
  );
  return (
    <div className="navbar  text-workout-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Logo
        </Link>
      </div>

      <div className="navbar-end">
        <div className=" hidden lg:flex ">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="dropdown dropdown-end  ">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar bg-workout-primary"
          >
            <div className="w-10 rounded-full  text-workout-secondary">
              <FaUserCircle className="w-full text-4xl m-auto"></FaUserCircle>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content  rounded-box w-52"
          >
            {!checkAuth.isAuth ? (
              <>
                {" "}
                <li>
                  <Link to={"/Login"}>Sign In</Link>
                </li>
                <li>
                  <Link to={"/Register"}>Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <a href="#" onClick={((e) => e.preventDefault(), logout)}>
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
