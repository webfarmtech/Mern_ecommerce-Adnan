import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";

const WishListPage = () => {
  const { wishlist, toggleWishlist, products, addToCart } =
    useContext(ShopContext);
  const [selectedSizes, setSelectedSizes] = useState({});

  const wishlistItems = products.filter((product) =>
    wishlist.includes(product._id)
  );

  const handleAddToCart = async (productId) => {
    const size = selectedSizes[productId];
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    // Add to cart first
    await addToCart(productId, size);

    // Then remove from wishlist
    await toggleWishlist(productId);

    // Clear the selected size for this product
    setSelectedSizes((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });

    toast.success("Item added to cart and removed from wishlist");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">Your wishlist is empty</p>
          <Link
            to="/collection"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product._id} className="border rounded-lg p-4">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <button
                  onClick={() => toggleWishlist(product._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
                >
                  <Heart className="text-red-500 fill-red-500" size={20} />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>

                {/* Size Selection */}
                <div className="mt-2">
                  <select
                    onChange={(e) =>
                      setSelectedSizes((prev) => ({
                        ...prev,
                        [product._id]: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded"
                    value={selectedSizes[product._id] || ""}
                  >
                    <option value="">Select Size</option>
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${product._id}`}
                    className="flex-1 text-center bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListPage;
