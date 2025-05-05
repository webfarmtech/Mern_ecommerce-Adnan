import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "./Title";

import ProductsItem from "./ProductsItem";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productCopy.slice(0, 5));
    } else {
      console.log("Products array is empty:", products);
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text2={`RELATED PRODUCTS`} showBorder />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {related.map((item, index) => (
          <ProductsItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            salePrice={item.salePrice}
            image={item.images}
          />
        ))}
      </div>
    </div>
  );
};
export default RelatedProduct;
