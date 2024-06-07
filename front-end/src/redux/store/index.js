import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducers from "../reducers/userReducers";

const unifiedReducer = combineReducers({
  user: userReducers,
});

const store = configureStore({
  reducer: unifiedReducer,
});

export default store;
