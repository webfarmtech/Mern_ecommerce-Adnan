import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title, ProductsItem, SubTitle } from "../components";

const ProductsGrid = ({ title, subtitle, filterFunction }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useContext(ShopContext);
  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = filterFunction(products);
      setFilteredProducts(filtered);
    }
  }, [products, filterFunction]);

  return (
    <div className="my-10">
      {title && (
        <div className="text-center text-black py-8 text-3xl">
          <Title text2={title.split("  ")} />
          <SubTitle subtitle={subtitle} />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        {filteredProducts.map((item) => {
          return (
            <ProductsItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.images}
              totalStock={item.totalStock}
              salePrice={item.salePrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsGrid;
