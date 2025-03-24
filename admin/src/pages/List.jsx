import React, { useState, useEffect } from "react";
import { backendurl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Add from "./Add";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const limit = 10;

  const fetchList = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendurl}/api/product/list`, {
        params: { page, limit },
      });
      setList(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching products");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(currentPage);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing product");
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    fetchList(currentPage); // Refresh list after edit
  };

  useEffect(() => {
    fetchList(currentPage);
  }, [currentPage]);

  if (editingProduct) {
    return (
      <Add
        token={token}
        editProduct={editingProduct}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <>
      <p className="mb-2 font-bold text-lg">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Actions</b>
        </div>

        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center gap-2 py-2 px-3 border text-sm animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 hidden md:block"></div>
              <div className="h-4 bg-gray-300 rounded w-6 hidden md:block"></div>
            </div>
          ))
        ) : list.length > 0 ? (
          list.map((product) => (
            <div
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] content-center md:grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center gap-2 py-2 px-3 border text-sm"
              key={product._id}
            >
              {product.images && (
                <img
                  className="w-12 h-12 object-cover rounded border"
                  src={product.images[0]}
                  alt={product.name}
                />
              )}
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p className="block">{`₹${product.price}`}</p>
              <div className="flex justify-end md:justify-center gap-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-black hover:text-blue-500"
                >
                  <Pencil />
                </button>
                <button
                  onClick={() => removeProduct(product._id)}
                  className="text-black hover:text-red-700 text-lg"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No Products Found</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </>
  );
};

export default List;
