import { assets } from "@/assets";
import React from "react";
import { Link } from "react-router-dom";

const WishList = () => {
  return (
    <Link to="/wishList" className="relative">
      <img
        src={assets.wishList}
        className="w-6 min-w-6 bg-none"
        alt="Wish Icon"
      />
    </Link>
  );
};

export default WishList;
