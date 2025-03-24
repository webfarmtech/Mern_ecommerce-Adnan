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
} from "./pages";
import { Layout } from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="67793310868-39eqoijbjrjkeuus5809rer7gol0ej3i.apps.googleusercontent.com">
      <div className="p-1">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </Layout>
      </div>
    </GoogleOAuthProvider>
  );
};
export default App;
