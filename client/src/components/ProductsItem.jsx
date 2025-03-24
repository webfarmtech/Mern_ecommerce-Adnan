import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Heart } from "lucide-react";

const ProductsItem = ({ id, name, price, image, totalStock, salePrice }) => {
  const { currency } = useContext(ShopContext);

  const getBadgeText = () => {
    if (totalStock === 0) {
      return "Out of Stock";
    } else if (totalStock <= 10) {
      return `Only ${totalStock} left!`;
    }
    return null;
  };

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="border hover:scale-110">
        <div className="relative">
          {image && (
            <img
              src={image[0]}
              alt={name}
              className="hover:scale-100 transition ease-in-out object-cover"
            />
          )}
          {getBadgeText() && (
            <Badge className="absolute top-0 right-0 m-2">
              {getBadgeText()}
            </Badge>
          )}
        </div>
        <div className="flex justify-start items-baseline p-1 gap-2">
          <p className="pt-3 pb-1 text-md line-through text-gray-500">
            {currency}
            {price}{" "}
          </p>
          <p className="flex pt-3 pb-1 text-lg font-semibold text-gray-700">
            {currency}
            {salePrice}
          </p>
        </div>
        <p className="text-sm font-medium uppercase p-1">{name} </p>
      </div>
    </Link>
  );
};

export default ProductsItem;
