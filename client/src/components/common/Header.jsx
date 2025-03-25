import { assets } from "../../assets";
import { navMenu } from "../../constant";
import { useContext, useState } from "react";
import {
  NavMenu,
  ProfileMenu,
  MobileNav,
  CartIcon,
  WishList,
} from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const goToAdminPanel = () => {
    window.open("http://localhost:5173/login", "_blank", "noopener,noreferrer");
  };

  const { setShowSearch } = useContext(ShopContext);

  return (
    <nav className="flex items-center justify-between py-5 font-medium">
      <Link to={`/`}>
        <h2 className="text-2xl sm:text-xl font-semibold font-serif uppercase lg:text-3xl">
          ZARAA.ENT<sup> &trade;</sup>
        </h2>
      </Link>
      <NavMenu menuItems={navMenu} />
      <div className="flex items-center ml-2 gap-3">
        <div
          onClick={goToAdminPanel}
          className="text-xs bg-black text-white p-2 rounded-md hover:text-black  hover:bg-gray-300 cursor-pointer lg:text-sm"
        >
          Admin Panel
        </div>
        <img
          src={assets.search_icon}
          onClick={() => setShowSearch(true)}
          alt="Search Icon"
          className="w-[1.25rem] cursor-pointer"
        />
        <CartIcon />
        <WishList />
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu Icon"
        />
        <ProfileMenu />
      </div>
      <MobileNav
        menuItems={navMenu}
        visible={visible}
        setVisible={setVisible}
      />
    </nav>
  );
};

export default Header;
