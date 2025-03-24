import { NavLink } from "react-router-dom";
import { assets } from "../assets";

const MobileNav = ({ menuItems, visible, setVisible }) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 bg-white w-80 shadow-lg transition-transform ease-in-out duration-300 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-100"
      }`}
    >
      <div className="flex flex-col text-gray-600">
        {/* Close Button */}
        <div
          onClick={() => setVisible(false)}
          className="flex items-center gap-4 p-4 cursor-pointer"
        >
          <img
            className="h-5 rotate-100 transform transition-transform  duration-300"
            src={assets.dropdown_icon}
            alt="Dropdown Icon"
          />
        </div>

        {/* Menu Items */}
        {menuItems.map((menu) => (
          <NavLink
            key={menu.id}
            to={menu.path}
            onClick={() => setVisible(false)}
            className="py-6 pl-5 border hover:bg-gray-200 transition-all"
          >
            {menu.link}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
