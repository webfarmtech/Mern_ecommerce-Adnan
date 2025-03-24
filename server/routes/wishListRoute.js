import express from "express";
import {
  toggleWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";
import authUser from "../middlewares/auth.js";

const wishListrouter = express.Router();

wishListrouter.post("/toggle", authUser, toggleWishlist);
wishListrouter.get("/", authUser, getWishlist);

export default wishListrouter;
