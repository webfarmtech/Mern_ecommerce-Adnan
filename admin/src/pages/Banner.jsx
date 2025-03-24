import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { backendurl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const Banner = ({ token }) => {
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState("");

  const [loading, setLoading] = useState(true);
  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
    }
  };

  const addBanner = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      image && formData.append("image1", image);
      const response = await axios.post(
        backendurl + "/api/banner/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Banner Added Successfully");
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault(); // Stops form submission

    console.log("Deleting banner with ID:", id); // Debugging

    if (!id) {
      toast.error("Error: No ID found!");
      return;
    }

    try {
      const response = await axios.delete(
        `${backendurl}/api/banner/delete/${id}`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Banner Deleted Successfully");
        setBanner((prevBanners) =>
          prevBanners.filter((banner) => banner._id !== id)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Error deleting banner");
    }
  };

  useEffect(() => {
    axios
      .get(backendurl + "/api/banner/get")
      .then((res) => setBanner(res.data.data))
      .catch((err) => console.error("Error fetching banner:", err));
  }, []);

  useEffect(() => {
    // Simulate an image loading delay (you can replace this with actual data fetching)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <form>
      <div>
        <p className="flex justify-center items-center mb-2">Upload</p>
        <div className="flex justify-center items-center gap-4 mt-5">
          <label htmlFor="image">
            {loading ? (
              <div className="w-[500px] h-[200px] bg-gray-300 animate-pulse rounded-lg" />
            ) : (
              <img
                className="w-[500px] h-[200px] object-contain"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Area"
              />
            )}
            <input
              onChange={(e) => handleFileChange(e, setImage)}
              type="file"
              id="image"
              hidden
            />
          </label>
        </div>
        <div className="text-right mb-3">
          {loading ? (
            <button className="w-28 h-12 mt-4 bg-gray-300 animate-pulse rounded-lg" />
          ) : (
            <button
              onClick={addBanner}
              type="submit"
              className="w-28 py-3 mt-4 bg-black text-white hover:rounded-lg"
            >
              Upload here...
            </button>
          )}
        </div>

        {loading ? (
          <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-lg mt-5" />
        ) : banner && banner.length > 0 ? (
          banner.map((img) => (
            <div key={img._id} className="relative">
              <img
                key={img._id}
                src={img?.image}
                alt={img.title}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <div className="text-right mb-3">
                {loading ? (
                  <div className="w-28 h-12 bg-gray-300 animate-pulse rounded-lg" />
                ) : (
                  <button
                    onClick={addBanner}
                    type="submit"
                    className="w-28 py-3 mt-4 bg-black text-white hover:rounded-lg"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : null}
      </div>
    </form>
  );
};

export default Banner;
