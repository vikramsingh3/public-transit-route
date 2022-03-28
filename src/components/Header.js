import React from "react";
import BrandLogo from "../assets/brand-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-amber-300 px-5 py-4  flex items-center justify-between ">
      <Link
        to="/"
        className="flex items-center text-green-600 hover:text-green-700"
      >
        <img
          src={BrandLogo}
          alt="Brand Logo"
          className="h-8 mr-5 hover:rotate-180 transition duration-500"
        ></img>
        <span className=" text-lg font-bold">Public Transit Route</span>
      </Link>
      <Link
        to="/create-route"
        className="bg-green-600 hover:bg-green-700 px-3 py-2 text-white rounded font-semibold"
      >
        Create new route
      </Link>
    </div>
  );
};

export default Header;
