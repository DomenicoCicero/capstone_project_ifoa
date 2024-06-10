import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducers from "../reducers/userReducers";
import productsReducers from "../reducers/productsReducers";

const unifiedReducer = combineReducers({
  user: userReducers,
  products: productsReducers,
});

const store = configureStore({
  reducer: unifiedReducer,
});

export default store;
