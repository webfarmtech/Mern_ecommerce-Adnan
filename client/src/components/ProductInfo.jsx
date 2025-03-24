import { useContext, useMemo, useState } from "react";
import { assets } from "../assets";
import { ShopContext } from "../context/ShopContext";
import { StarRating } from ".";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Heart } from "lucide-react";

const sizeMeasurements = {
  S: "36",
  M: "38",
  L: "40",
  XL: "42",
  XXL: "44",
};

const ProductInfo = ({ productData }) => {
  const [size, setSize] = useState("");
  const { addToCart, currency, review, wishlist, toggleWishlist, token } =
    useContext(ShopContext);
  const isWishlisted = wishlist.includes(productData?._id);
  const averageReview =
    Array.isArray(review) && review.length > 0
      ? review
          .map((reviewItem) => parseFloat(reviewItem.reviews[0].reviewValue)) // Extract review values
          .filter((value) => !isNaN(value)) // Remove invalid values
          .reduce((sum, value, _, array) => sum + value / array.length, 0) // Compute the average
      : 0;

  const handleWishlistToggle = () => {
    toggleWishlist(productData?._id);
  };

  return (
    <div className="flex-1">
      <h1 className="font-medium text-2xl mt-2">{productData?.name}</h1>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-0.5">
          <StarRating rating={averageReview} />
        </div>
        <span className="text-muted-foreground">
          {averageReview.toFixed(2)}
        </span>
      </div>
      <p className="mt-5 text-3xl font-medium">
        {currency} {productData?.price}
      </p>
      <p className="mt-5 text-gray-500 md:w-4/5">{productData?.description}</p>
      <div className="flex flex-col gap-4 my-8">
        <p>Select Size</p>
        <div className="flex gap-2">
          {productData?.sizes.map((item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-300" : ""
                    }`}
                  >
                    {item}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="p-2">Size {sizeMeasurements[item] || item}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {productData?.totalStock === 0 ? (
          <Button className="cursor-not-allowed opacity-50">
            Out of Stock
          </Button>
        ) : (
          <>
            <Button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white active:bg-gray-700 text-sm py-3 px-8 w-auto"
            >
              Add to Cart
            </Button>
            {token && (
              <button
                onClick={() => handleWishlistToggle()}
                className="p-2 hover:scale-110 transition-transform"
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  className={
                    isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
                  }
                  size={24}
                />
              </button>
            )}
          </>
        )}
      </div>
      <hr className="mt-8 w-4/5 border-gray-500" />
      <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
        <p>100% Original Product</p>
        <p>Cash on delivery available on this product</p>
        <p>Easy return and Exchange Policy within 7 days</p>
      </div>
    </div>
  );
};

export default ProductInfo;
