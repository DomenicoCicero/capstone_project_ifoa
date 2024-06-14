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
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/prefer" element={<PreferPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <MyFooter />
      </BrowserRouter>
    )
  );
}

export default App;
