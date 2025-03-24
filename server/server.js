import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/mongodb.js";
import cloudinaryConnect from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bannerRouter from "./routes/bannerRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import wishListRouter from "./routes/wishListRoute.js";
import authRouter from "./routes/OAuthRoute.js";
dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

// Cloudinary Connection
cloudinaryConnect()
  .then(() => {
    console.log("Connected to Cloudinary Successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to Cloudinary:", error);
  });

// Middlewares
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/review", reviewRouter);
app.use("/api/wishlist", wishListRouter);
app.use("/api/google", authRouter);

app.listen(port, () => console.log(`The server running on PORT ${port}`));
