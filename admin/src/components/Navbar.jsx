import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <>
      <div className="flex items-center py-2 px-[4%] justify-between">
        <h2 className="text-2xl font-semibold font-serif uppercase lg:text-3xl">
          ZARAA.ENT<sup> &trade;</sup>
        </h2>
        <button
          onClick={() => {
            setToken("");
          }}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
