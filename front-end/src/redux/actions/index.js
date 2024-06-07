export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = data => {
  return {
    type: LOGIN,
    payload: data,
  };
};
