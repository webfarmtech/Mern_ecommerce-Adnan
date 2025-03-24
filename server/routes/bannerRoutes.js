import express from "express";
import {
  addBannerImage,
  getBannerImages,
  deleteBannerImage,
} from "../common/bannerController.js";
import adminAuth from "../middlewares/adminAuth.js";
import upload from "../middlewares/multer.js";

const bannerRouter = express.Router();

bannerRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminAuth,
  addBannerImage
);

bannerRouter.get("/get", getBannerImages);
bannerRouter.delete("/delete/:id", adminAuth, deleteBannerImage);

export default bannerRouter;
