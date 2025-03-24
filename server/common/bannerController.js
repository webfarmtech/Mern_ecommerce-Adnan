import bannerModel from "../models/bannerModel.js";
import { v2 as cloudinary } from "cloudinary";

const addBannerImage = async (req, res) => {
  try {
    const image1 = req.files.image1 && req.files.image1[0];

    let images = [image1].filter((item) => item !== undefined);

    if (images.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images provided" });
    }

    let imageUrls = await Promise.all(
      images.map(async (item) => {
        try {
          const url = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return url.secure_url;
        } catch (uploadError) {
          console.error(`Upload error for ${item.path}:`, uploadError.message);
          return null;
        }
      })
    );

    imageUrls = imageUrls.filter((url) => url !== null);
    const bannerData = { image: imageUrls };
    console.log(bannerData);

    const bannerImages = new bannerModel(bannerData);
    console.log(bannerImages);

    await bannerImages.save();
    res.json({
      success: true,
      data: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({
      success: false,
      message: `Error adding images: ${error.message}`,
    });
  }
};

const getBannerImages = async (req, res) => {
  try {
    const images = await bannerModel.find({});
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const deleteBannerImage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }

    const image = await bannerModel.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Image Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export { addBannerImage, getBannerImages, deleteBannerImage };
