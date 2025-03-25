import { Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Contact,
  Product,
  Login,
  Collection,
  Cart,
  PlaceOrder,
  Order,
  Verify,
  WishListPage,
  ResetPassword,
} from "./pages";
import { ForgotPassword, Layout } from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Layout>
        <div className="px-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productsId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishList" element={<WishListPage />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Order />} />
            <Route element={<Verify />} path="/verify" />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </Layout>
    </GoogleOAuthProvider>
  );
};
export default App;
