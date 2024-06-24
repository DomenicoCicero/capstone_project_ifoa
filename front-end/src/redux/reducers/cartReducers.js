import {
  ADD_QUANTITY_CART,
  GET_QUANTITY_CART,
  IS_DELETED_FROM_CART,
  UPDATE_QUANTITY_CART_ITEM,
  updateQuantityCartItem,
} from "../actions";

const initialState = {
  cartQuantity: 0,
  isDeleteFromCart: false,
  updateQuantityCartItem: false,
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
    case UPDATE_QUANTITY_CART_ITEM:
      return {
        ...state,
        updateQuantityCartItem: !state.updateQuantityCartItem,
      };
    default:
      return state;
  }
};

export default cartReducers;
