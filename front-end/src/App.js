import "./App.css";
import "./css/main.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./pages/Register";
import axios from "axios";
import MyNavbar from "./components/MyNavbar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "./redux/actions";
import HomePage from "./pages/HomePage";
import MyFooter from "./components/MyFooter";
import ProductsPage from "./pages/ProductsPage";
import AboutUs from "./pages/AboutUs";
import Contacts from "./pages/Contacts";
import ProductDetails from "./pages/ProductDetails";
import PreferPage from "./pages/PreferPage";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import DeliveryMethodPage from "./pages/DeliveryMethodPage";
import AddressPaymentPage from "./pages/AddressPaymentPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import OrderCompletedPage from "./pages/OrderCompletedPage";
import PaymentPage from "./pages/PaymentPage";
import OrdersPage from "./pages/OrdersPage";
import GuestRoutes from "./components/GuestRoutes";
import NoAuthRoutes from "./components/NoAuthRoutes";
import AdminPage from "./pages/AdminPage";
import AdminRoutes from "./components/AdminRoutes";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user")
      .then(res => dispatch(login(res.data)))
      .catch(err => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <BrowserRouter>
        <MyNavbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<GuestRoutes />}>
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/prefer" element={<PreferPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/delivery_method_page" element={<DeliveryMethodPage />} />
              <Route path="/address_payment_page" element={<AddressPaymentPage />} />
              <Route path="/payment_method_page" element={<PaymentMethodPage />} />
              <Route path="/payment_page" element={<PaymentPage />} />
              <Route path="/completed" element={<OrderCompletedPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contacts" element={<Contacts />} />
            </Route>
            <Route element={<NoAuthRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="/admin_page" element={<AdminPage />} />
            </Route>
          </Routes>
        </div>
        <MyFooter />
      </BrowserRouter>
    )
  );
}

export default App;
