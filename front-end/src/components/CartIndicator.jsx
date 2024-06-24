import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getQuantityCart, isDeletedFromCart } from "../redux/actions";

const CartIndicator = () => {
  const dispatch = useDispatch();

  const cartQuantity = useSelector(state => {
    return state.cart.cartQuantity;
  });

  const isDeleteFromCart = useSelector(state => {
    return state.cart.isDeleteFromCart;
  });

  useEffect(() => {
    dispatch(getQuantityCart());
  }, [cartQuantity, isDeleteFromCart]);

  return (
    <div className="position-relative ">
      <Link to={"/cart"} className="nav-link">
        <LuShoppingCart className="fs-4 position-relative" />
        <span className="bg-mainColor cart-number">{cartQuantity}</span>
      </Link>
    </div>
  );
};

export default CartIndicator;
