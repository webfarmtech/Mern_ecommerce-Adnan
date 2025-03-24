import { createContext, useEffect, useState } from "react";
// import { products } from "../assets";
import { toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [review, setReview] = useState([]);
  const [token, setToken] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select the size");
      return;
    }

    let cartData = structuredClone(cartItems);
    let product = products.find((p) => p._id === itemId);

    if (!product || !product.totalStock) {
      toast.error("Out of stock!");
      return;
    }

    console.log(product.totalStock, "Product Stock");

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Reduce stock locally
    product.totalstock -= 1;

    setCartItems(cartData);
    setProducts([...products]); // Update state to reflect stock change

    if (token) {
      try {
        const response = await axios.post(
          `${backendurl}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (let items in cartItems) {
      for (let size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            totalCount += cartItems[items][size];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (let itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue;

      for (let size in cartItems[itemId]) {
        try {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }
    return totalAmount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    let currentQuantity = cartData[itemId][size] || 0;
    let stockDifference = quantity - currentQuantity;

    const product = products.find((p) => p._id === itemId);
    if (!product) {
      toast.error("Product not found!");
      return;
    }

    // Check if the requested quantity exceeds stock
    if (quantity > product.totalStock) {
      toast.info(`Not enough items in stock!`);
      return;
    }

    console.log(currentQuantity, "currentQuantity");

    // Update state
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          `${backendurl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          // Update totalStock locally if needed
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === itemId
                ? {
                    ...product,
                    totalStock: product.totalStock - stockDifference,
                  }
                : product
            )
          );
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(backendurl + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.get(backendurl + "/api/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      toast.error(error.message);
    }
  };

  const addReview = async (productId, rating, reviews) => {
    if (token) {
      try {
        const response = await axios.post(
          backendurl + "/api/review/add",
          {
            productId, // Ensure this is correctly passed
            reviewMessage: reviews, // Correct field name
            reviewValue: rating, // Ensure correct field names
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setReview(response.data);
        }
      } catch (error) {
        console.error("Error while adding Review:", error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getReview = async (productId) => {
    if (token) {
      try {
        const response = await axios.get(
          `${backendurl}/api/review/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setReview(response.data.reviews);
          return response.data.reviews;
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      if (!token) {
        toast.error("Please login to add items to wishlist");
        return;
      }

      const response = await axios.post(
        `${backendurl}/api/wishlist/toggle`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setWishlist(response.data.wishlist);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating wishlist");
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    setToken(null);

    // Clear Google OAuth session
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
      window.google.accounts.id.revoke();
    }

    // Show success message and redirect
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Fetch wishlist on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      if (token) {
        try {
          const response = await axios.get(`${backendurl}/api/wishlist`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.success) {
            setWishlist(response.data.wishlist);
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };
    fetchWishlist();
  }, [token]);

  useEffect(() => {
    getReview();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/banner/get")
      .then((res) => setBanner(res.data.data))
      .catch((err) => console.error("Error fetching banner:", err));
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    currency,
    products,
    getProducts,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendurl,
    token,
    setToken,
    handleLogout,
    setCartItems,
    banner,
    setBanner,
    review,
    setReview,
    addReview,
    getReview,
    wishlist,
    toggleWishlist,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
