import { Link } from "react-router-dom";
import { assets } from "../assets";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { profileMenuText } from "../constant";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Separator } from "./ui/separator";
import { googleLogout } from "@react-oauth/google";

const ProfileMenu = () => {
  const { token, setToken, navigate, cartItems, getProducts, review } =
    useContext(ShopContext);

  useEffect(() => {
    getProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("email"); // Remove email (stored during login)
    setToken(null); // Clear token from state
    toast.success("Logged out successfully!");
    navigate("/login"); // Redirect user after logout
  };

  // const handleGoogleLogout = async () => {
  //   try {
  //     // First handle Google logout if email exists
  //     const email = localStorage.getItem("email");
  //     if (email) {
  //       // Revoke Google access
  //       await new Promise((resolve) => {
  //         if (window.google?.accounts) {
  //           window.google.accounts.id.revoke(email, resolve);
  //           window.google.accounts.id.disableAutoSelect();
  //         }
  //         resolve();
  //       });
  //     }

  //     // Clear all auth data
  //     googleLogout();
  //     localStorage.clear(); // Clear all localStorage
  //     setToken(null);
  //     cartItems({});

  //     toast.success("Logged out successfully!");
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     toast.error("Error during logout");
  //   }
  // };

  return (
    <div className="group relative">
      {token ? (
        <img
          onClick={() => navigate("/login")}
          src={assets.profile_icon}
          className="w-[1.25rem]"
          alt="Profile Icon"
        />
      ) : (
        <img
          onClick={() => navigate("/login")}
          src={assets.profile_icon}
          className="w-[1.25rem]"
          alt="Profile Icon"
        />
      )}

      {token && (
        <div className="hidden z-[1000] group-hover:block absolute dropdown-menu right-0 pt-4">
          <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg">
            {profileMenuText.map((profile) => {
              return (
                <Link key={profile.id} to={profile.path}>
                  <p className="cursor-pointer hover:text-black">
                    {profile.title}
                    <Separator />
                  </p>
                </Link>
              );
            })}
            <Link
              onClick={() => {
                setToken("");
                handleLogout();
                cartItems({});
              }}
              to="/login"
            >
              <p className="cursor-pointer hover:text-black">Logout</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
