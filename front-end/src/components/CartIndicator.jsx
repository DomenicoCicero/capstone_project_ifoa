import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getQuantityCart } from "../redux/actions";

const CartIndicator = () => {
  const dispatch = useDispatch();

  const cartQuantity = useSelector(state => {
    return state.cart.cartQuantity;
  });

  useEffect(() => {
    dispatch(getQuantityCart());
  }, [cartQuantity]);

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
