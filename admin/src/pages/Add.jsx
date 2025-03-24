import React, { useState } from "react";
import { assets } from "../assets/assets";
import { backendurl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const Add = ({ token, editProduct = null, onCancel }) => {
  const [name, setName] = useState(editProduct?.name || "");
  const [description, setDescription] = useState(
    editProduct?.description || ""
  );
  const [price, setPrice] = useState(editProduct?.price || "");
  const [salePrice, setSalePrice] = useState(editProduct?.salePrice || "");
  const [totalStock, setTotalStock] = useState(editProduct?.totalStock || "");
  const [category, setCategory] = useState(editProduct?.category || "");
  const [brand, setBrand] = useState(editProduct?.brand || "");
  const [sizes, setSize] = useState(editProduct?.sizes || []);
  const [pantSize, setPantSize] = useState(editProduct?.pantSize || []);
  const [bestSeller, setBestSeller] = useState(
    editProduct?.bestseller || false
  );
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("salePrice", salePrice);
      formData.append("totalStock", totalStock);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("pantSize", JSON.stringify(pantSize));
      formData.append("bestseller", bestSeller);

      const url = editProduct
        ? `${backendurl}/api/product/update/${editProduct._id}`
        : `${backendurl}/api/product/add`;

      const response = await axios.post(url, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(
          editProduct
            ? "Product Updated Successfully"
            : "Product Added Successfully"
        );
        if (onCancel) {
          onCancel(); // Return to list view after edit
        } else {
          // Reset form if adding new product
          setName("");
          setDescription("");
          setPrice("");
          setSalePrice("");
          setTotalStock("");
          setCategory("");
          setBrand("");
          setSize([]);
          setPantSize([]);
          setBestSeller(false);
          setImage1(null);
          setImage2(null);
          setImage3(null);
          setImage4(null);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving product");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload</p>
        <div className="flex gap-2">
          {/* Image 1 Upload */}
          <label htmlFor="image1">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt="Upload Area"
            />
            <input
              onChange={(e) => handleFileChange(e, setImage1)}
              type="file"
              id="image1"
              hidden
            />
          </label>

          {/* Image 2 Upload */}
          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt="Upload Area"
            />
            <input
              onChange={(e) => handleFileChange(e, setImage2)}
              type="file"
              id="image2"
              hidden
            />
          </label>

          {/* Image 3 Upload */}
          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt="Upload Area"
            />
            <input
              onChange={(e) => handleFileChange(e, setImage3)}
              type="file"
              id="image3"
              hidden
            />
          </label>

          {/* Image 4 Upload */}
          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt="Upload Area"
            />
            <input
              onChange={(e) => handleFileChange(e, setImage4)}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>

        {/* Product Name Input */}
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter product name"
            required
            className="w-full max-w-[500px] px-3 py-2"
          />
        </div>

        {/* Product Description Input */}
        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Write content here"
            required
            className="w-full max-w-[500px] px-3 py-2"
          />
        </div>

        {/* Product Category and Brands */}
        <div className="flex flex-col lg:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="Shirt">Shirts</option>
              <option value="T-Shirt">T-Shirts</option>
              <option value="Pants">Pants</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Inner">Inner</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Brands</p>
            <select
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2"
            >
              <option value="">Select Brand</option>
              <option value="zara">ZARA</option>
              <option value="rarerabbit">RARE RABBIT</option>
              <option value="Logoff">LOGOFF</option>
              <option value="tommyhilfiger">TOMMY HILFIGER</option>
              <option value="armaniexchange">ARMANI EXCHANGE</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="0"
              required
            />
          </div>
          <div>
            <p className="mb-2">Sale Price</p>
            <input
              onChange={(e) => setSalePrice(e.target.value)}
              value={salePrice}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="0"
              required
            />
          </div>
          <div>
            <p className="mb-2">Total Stock</p>
            <input
              onChange={(e) => setTotalStock(e.target.value)}
              value={totalStock}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="0"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2">Shirt Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSize((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200 "
                } px-3 py-2 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2">Pant Sizes</p>
        <div className="flex gap-3">
          {["28", "30", "32", "34", "36", "38", "40"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSize((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200 "
                } px-3 py-2 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          id="bestseller"
          type="checkbox"
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <div className="flex gap-4">
        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
          {editProduct ? "Update" : "Add"}
        </button>
        {editProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="w-28 py-3 mt-4 bg-gray-500 text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default Add;
