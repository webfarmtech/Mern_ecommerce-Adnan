import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const addToCart = async (req, res) => {
  try {
    const { itemId, userId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = (await userData.cartData) || {};
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    const product = await productModel.findById(itemId);
    product.totalStock -= 1;
    await product.save();
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateUserCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Fetch user data
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.json({ success: false, message: "Cart item not found" });
    }

    // Fetch product data
    const product = await productModel.findById(itemId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let currentQuantity = cartData[itemId][size] || 0;
    let stockDifference = quantity - currentQuantity;

    // If increasing quantity, check available stock
    if (stockDifference > 0 && product.totalStock < stockDifference) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough stock available!" });
    }

    // Update stock based on quantity change
    product.totalStock -= stockDifference; // Reduce stock if increased, restock if decreased

    // If quantity is 0, remove the item from the cart
    if (quantity === 0) {
      delete cartData[itemId][size];

      // If no sizes left for the product, remove the product from the cart
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    // Save updates
    await product.save();
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);

    let cartData = userData.cartData;
    if (!cartData && !Object.keys(cartData).length === 0) {
      res.json({ success: false, message: "Cart is empty" });
    }

    res.json({ success: true, cartData: cartData, success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateUserCart, getUserCart };
