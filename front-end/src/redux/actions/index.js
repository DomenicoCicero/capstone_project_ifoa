export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_PRODUCTS = "GET_PRODUCTS";

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
