import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducers from "../reducers/userReducers";
import productsReducers from "../reducers/productsReducers";
import cartReducers from "../reducers/cartReducers";

const unifiedReducer = combineReducers({
  user: userReducers,
  products: productsReducers,
  cart: cartReducers,
});

const store = configureStore({
  reducer: unifiedReducer,
});

export default store;
