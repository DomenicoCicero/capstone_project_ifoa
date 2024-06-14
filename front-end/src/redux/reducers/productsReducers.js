import { GET_PREFER_PRODUCTS, GET_PRODUCTS } from "../actions";

const initialState = {
  products: [],
  preferProducts: [],
};

const productsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PREFER_PRODUCTS:
      return {
        ...state,
        preferProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducers;
