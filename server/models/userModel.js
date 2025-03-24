import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { required: true, type: String, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        reviewMessage: { type: String, required: true },
        reviewValue: { type: Number, required: true }, // Rating 1-5
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
