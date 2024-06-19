import { ADD_QUANTITY_CART, GET_QUANTITY_CART, IS_DELETED_FROM_CART } from "../actions";

const initialState = {
  cartQuantity: 0,
  isDeleteFromCart: false,
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUANTITY_CART:
      return {
        ...state,
        cartQuantity: action.payload,
      };
    case ADD_QUANTITY_CART:
      return {
        ...state,
        cartQuantity: state.cartQuantity + action.payload,
      };
    case IS_DELETED_FROM_CART:
      return {
        ...state,
        isDeleteFromCart: !state.isDeleteFromCart,
      };
    default:
      return state;
  }
};

export default cartReducers;
