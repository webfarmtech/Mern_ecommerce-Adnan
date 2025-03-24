import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number, required: false },
  totalStock: { type: Number, required: false },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  sizes: { type: Array, required: true },
  pantSizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
});
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
