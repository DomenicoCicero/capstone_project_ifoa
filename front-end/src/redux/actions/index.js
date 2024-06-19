export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_IDS_PREFER_ARRAY = "GET_PRODUCTS_IDS_PREFER_ARRAY";
export const GET_PREFER_PRODUCTS = "GET_PREFER_PRODUCTS";
export const IS_DELETED_FROM_PREFER = "IS_DELETED_FROM_PREFER";
export const IS_DELETED_FROM_CART = "IS_DELETED_FROM_CART";
export const GET_QUANTITY_CART = "GET_QUANTITY_CART";
export const ADD_QUANTITY_CART = "ADD_QUANTITY_CART";

export const login = data => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const getProductsIdsPrefer = data => {
  return {
    type: GET_PRODUCTS_IDS_PREFER_ARRAY,
    payload: data,
  };
};

export const isDeletedFromPrefer = data => {
  return {
    type: IS_DELETED_FROM_PREFER,
  };
};

export const isDeletedFromCart = data => {
  return {
    type: IS_DELETED_FROM_CART,
  };
};

export const addQuantityCart = data => {
  return {
    type: ADD_QUANTITY_CART,
    payload: data,
  };
};

export const getProducts = () => {
  return (dispatch, useState) => {
    fetch(`/api/products`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        dispatch({
          type: GET_PRODUCTS,
          payload: data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getQuantityCart = () => {
  return (dispatch, useState) => {
    fetch(`/api/cart-quantity`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        dispatch({
          type: GET_QUANTITY_CART,
          payload: data.quantity,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
