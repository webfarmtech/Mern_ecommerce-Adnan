import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

const addProductReview = async (req, res) => {
  try {
    const { userId, productId, reviewValue, reviewMessage } = req.body;

    console.log(userId, "userId");
    console.log(productId, "productId");
    console.log(reviewValue, "value");
    console.log(reviewMessage, "message");

    // Check if user purchased the product
    const order = await orderModel.findOne({
      userId,
      "items._id": productId,
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase this product to review it",
      });
    }

    // Check if user already reviewed this product
    const user = await userModel.findById(userId);
    const existingReview = user.reviews.find(
      (review) => review.productId.toString() === productId
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product!",
      });
    }

    // Add review to the user's reviews array
    user.reviews.push({
      userId,
      productId,
      reviewMessage,
      reviewValue,
      createdAt: new Date(),
    });

    await user.save();

    // Fetch all reviews for the product across all users
    const usersWithReviews = await userModel.find({
      "reviews.productId": productId,
    });

    // Extract all reviews related to this product
    const productReviews = usersWithReviews.flatMap((user) =>
      user.reviews.filter((review) => review.productId.toString() === productId)
    );

    // Calculate average review rating
    const totalReviews = productReviews.length;
    const averageReview =
      totalReviews > 0
        ? productReviews.reduce((sum, review) => sum + review.reviewValue, 0) /
          totalReviews
        : 0;
    console.log(averageReview, "averageReview");

    // Update product model with average rating
    await productModel.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      reviews: productReviews,
      averageReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the review",
    });
  }
};

const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await userModel.find({ "reviews.productId": productId });

    res.json({
      success: true,
      message: "Requested Review fetched from DB",
      reviews: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export { addProductReview, getProductReview };
