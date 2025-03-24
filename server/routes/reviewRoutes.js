import express from "express";
import {
  addProductReview,
  getProductReview,
} from "../controllers/reviewController.js";
import authUser from "../middlewares/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authUser, addProductReview);
reviewRouter.get("/:productId", getProductReview);

export default reviewRouter;
