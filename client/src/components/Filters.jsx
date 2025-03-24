import { assets } from "../assets";
import { collectionContent } from "../constant";
import { useState } from "react";

const Filters = ({ showFilter, toggleFilter, filters }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="min-w-0 sm:w-auto relative">
      {/* Filter Toggle Button */}
      <p
        className="text-black flex items-center gap-4 cursor-pointer mb-6 underline"
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        aria-expanded={isMobileFilterOpen}
      >
        {collectionContent.filterTitle}
      </p>

      {/* Filter Content */}
      <div
        className={`
          fixed sm:relative left-0 top-0 h-full sm:h-auto w-64 sm:w-auto
          bg-white sm:bg-transparent z-50 sm:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:block
          shadow-lg sm:shadow-none
          p-4 sm:p-0
        `}
      >
        {/* Close button for mobile */}
        <button
          className="sm:hidden  absolute right-4 top-2 text-black"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <img
            src={assets.cross_icon}
            className="mt-2 size-4"
            alt="Close Icon"
          />
        </button>

        {filters.map(({ title, options }) => (
          <div
            key={title}
            className="border border-gray-300 pl-5 py-4 m-5 rounded-md"
          >
            <p className="mb-3 text-sm font-medium">{title}</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {options.map((option) => (
                <p key={option} className="flex gap-2 pr-3">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={option}
                    onChange={(e) => toggleFilter(e, title.toUpperCase())}
                  />
                  {option}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for mobile */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default Filters;
