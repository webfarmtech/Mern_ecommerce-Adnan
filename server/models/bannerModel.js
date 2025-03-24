import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: { type: [String], required: true },
  },
  { minimize: false, timestamps: true }
);

const bannerModel =
  mongoose.models.banner || mongoose.model("banner", bannerSchema);

export default bannerModel;
