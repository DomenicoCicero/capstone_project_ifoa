export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_IDS_PREFER_ARRAY = "GET_PRODUCTS_IDS_PREFER_ARRAY";
export const GET_PREFER_PRODUCTS = "GET_PREFER_PRODUCTS";
export const IS_DELETED_FROM_PREFER = "IS_DELETED_FROM_PREFER";

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
