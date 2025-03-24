import { v2 as cloudinary } from "cloudinary";
import upload from "../middlewares/multer.js";
import productModel from "../models/productModel.js";
// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      brand,
      bestseller,
      sizes,
      pantSizes,
      salePrice,
      totalStock,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    let images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

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
    const productData = {
      name,
      description,
      price: Number(price),
      salePrice: Number(salePrice),
      totalStock: Number(totalStock),
      category,
      brand,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      pantSizes: JSON.parse(pantSizes),
      images: imageUrls,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({
      success: false,
      message: `Error adding product: ${error.message}`,
    });
  }
};

const editProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const {
      name,
      description,
      category,
      price,
      brand,
      bestseller,
      sizes,
      pantSizes,
      salePrice,
      totalStock,
    } = req.body;

    // First find the product
    let product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Handle Image Updates (if new images are provided)
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    let newImages = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );

    let uploadedImages = product.images; // Keep existing images by default

    if (newImages.length > 0) {
      // Delete existing images from Cloudinary
      if (product.images && product.images.length > 0) {
        for (const imageUrl of product.images) {
          try {
            const publicId = imageUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (deleteError) {
            console.error("Error deleting image from Cloudinary:", deleteError);
          }
        }
      }

      // Upload new images
      let imageUrls = await Promise.all(
        newImages.map(async (image) => {
          try {
            const result = await cloudinary.uploader.upload(image.path, {
              resource_type: "image",
            });
            return result.secure_url;
          } catch (uploadError) {
            console.error(
              `Image upload failed for ${image.path}:`,
              uploadError.message
            );
            return null;
          }
        })
      );

      uploadedImages = imageUrls.filter((url) => url !== null);
    }

    // Update all product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? Number(price) : product.price;
    product.salePrice =
      salePrice !== undefined ? Number(salePrice) : product.salePrice;
    product.totalStock =
      totalStock !== undefined ? Number(totalStock) : product.totalStock;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.bestseller =
      bestseller === "true"
        ? true
        : bestseller === "false"
        ? false
        : product.bestseller;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.pantSizes = pantSizes ? JSON.parse(pantSizes) : product.pantSizes;
    product.images =
      uploadedImages.length > 0 ? uploadedImages : product.images;
    product.updatedAt = Date.now();

    // Save the updated product
    const updatedProduct = await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      message: `Error updating product: ${error.message}`,
    });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed Successfully" });
  } catch (error) {
    console.error("Error listing Removing:", error.message);
    res.status(500).json({
      success: false,
      message: `Error Removing products: ${error.message}`,
    });
  }
};

// List Product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.json({ success: true, products });
  } catch (error) {
    console.error("Error listing products:", error.message);
    res.status(500).json({
      success: false,
      message: `Error listing products: ${error.message}`,
    });
  }
};

// const listProduct = async (req, res) => {
//     const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not provided

//     try {
//         const products = await productModel
//             .find({})
//             .limit(limit * 1) // Convert limit to a number
//             .skip((page - 1) * limit)
//             .exec();

//         // Get total documents in the collection for pagination
//         const count = await productModel.countDocuments();

//         res.json({
//             success: true,
//             products,
//             totalPages: Math.ceil(count / limit),
//             currentPage: page,
//         });
//     } catch (error) {
//         console.error("Error listing products:", error.message);
//         res.status(500).json({ success: false, message: `Error listing products: ${error.message}` });
//     }
// };

// Single Product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({
      success: true,
      message: "Requested product fetched from DB",
      product: product,
    });
  } catch (error) {
    console.error("Error fetching selected product:", error.message);
    res.status(500).json({
      success: false,
      message: `Error fetching selected product: ${error.message}`,
    });
  }
};

export { addProduct, editProduct, removeProduct, listProduct, singleProduct };
