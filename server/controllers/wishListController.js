import userModel from "../models/userModel.js";

// Toggle wishlist item
export const toggleWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if product is already in wishlist
    const isWishlisted = user.wishlist.includes(productId);

    // Update wishlist atomically
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      isWishlisted
        ? { $pull: { wishlist: productId } } // Remove if exists
        : { $addToSet: { wishlist: productId } }, // Add if not exists
      { new: true } // Return updated document
    );

    res.json({
      success: true,
      message: isWishlisted,
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating wishlist",
    });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await userModel
      .findById(userId, "wishlist") // Only fetch wishlist field
      .populate("wishlist", "name price images category totalStock");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist",
    });
  }
};
