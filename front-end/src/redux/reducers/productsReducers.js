import { GET_PRODUCTS, GET_PRODUCTS_IDS_PREFER_ARRAY, IS_DELETED_FROM_PREFER } from "../actions";

const initialState = {
  products: [],
  productsIdPrefer: [],
  isDeletedFromPrefer: false,
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
    case IS_DELETED_FROM_PREFER:
      return {
        ...state,
        isDeletedFromPrefer: !state.isDeletedFromPrefer,
      };
    default:
      return state;
  }
};

export default productsReducers;
