import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

const CartIndicator = () => {
  return (
    <div className="position-relative ">
      <Link to={"/cart"} className="nav-link">
        <LuShoppingCart className="fs-4 position-relative" />
        <span className="bg-mainColor cart-number">0</span>
      </Link>
    </div>
  );
};

export default CartIndicator;
