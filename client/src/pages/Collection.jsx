import { SectionWrapper } from "../hoc";
import { ProductsGrid, Filters, SortAndTitle } from "../components";
import { useContext, useEffect, useState } from "react";
import { filters } from "../constant";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [sortBy, setSortBy] = useState("relevent");
  const { search, showSearch, getProducts } = useContext(ShopContext);

  useEffect(() => {
    getProducts();
  }, []);

  const toggleFilter = (e, filterType) => {
    const value = e.target.value;
    console.log(`Filter Type: ${filterType}, Value: ${value}`);
    if (filterType === "CATEGORIES") {
      setCategories((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filterType === "BRANDS") {
      setBrand((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const filterProducts = (products) => {
    // Check the brand names in products

    if (search && showSearch) {
      return products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return products.filter((product) => {
      const categoryMatch =
        categories.length === 0 || categories.includes(product.category);

      const brandMatch =
        brand.length === 0 || brand.includes(product.brand.toUpperCase()); // Ensure lowercase matching

      return categoryMatch && brandMatch;
    });
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case "low-high":
        return [...products].sort((a, b) => a.price - b.price);
      case "high-low":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ml-2">
      <Filters
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        filters={filters}
      />
      <div className="flex-1">
        <SortAndTitle sortBy={sortBy} setSortBy={setSortBy} />
        <ProductsGrid
          showContainer={false}
          filterFunction={(products) => sortProducts(filterProducts(products))}
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Collection, "collection");
