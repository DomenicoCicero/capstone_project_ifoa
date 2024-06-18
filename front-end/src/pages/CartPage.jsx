import axios from "axios";
import { useEffect } from "react";

const CartPage = () => {
  const getCart = () => {
    axios
      .get(`/api/cart`)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <h1>ciao</h1>
      <h2>ciao</h2>
    </>
  );
};

export default CartPage;
