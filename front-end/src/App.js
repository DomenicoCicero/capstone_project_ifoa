import "./App.css";
import "./css/main.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
