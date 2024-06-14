export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PREFER_PRODUCTS = "GET_PREFER_PRODUCTS";

export const login = data => {
  return {
    type: LOGIN,
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

export const getPreferProducts = () => {
  return (dispatch, useState) => {
    fetch(`/api/prefer-product`)
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
          type: GET_PREFER_PRODUCTS,
          payload: data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
