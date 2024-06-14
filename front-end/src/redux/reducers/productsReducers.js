import { GET_PRODUCTS, GET_PRODUCTS_IDS_PREFER_ARRAY } from "../actions";

const initialState = {
  products: [],
  productsIdPrefer: [],
};

const productsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
        productsIdPrefer: action.payload.preferProductIdArr,
      };
    case GET_PRODUCTS_IDS_PREFER_ARRAY:
      return {
        ...state,
        productsIdPrefer: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducers;
