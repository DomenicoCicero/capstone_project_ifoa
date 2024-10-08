import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";
import { isDeletedFromCart } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [discounted, setDiscounted] = useState(null);
  const [totalDiscounted, setTotalDiscounted] = useState(null);
  const [existShopOrder, setExistShopOrder] = useState(null);
  const isDeleteFromcart = useSelector(state => {
    return state.cart.isDeleteFromCart;
  });
  const updateQuantityCartItem = useSelector(state => {
    return state.cart.updateQuantityCartItem;
  });

  const getCart = () => {
    axios
      .get(`/api/cart`)
      .then(data => {
        console.log(data);
        setCartItems(data.data.data);
        setTotalPrice(data.data.total_price);
        setDiscounted(data.data.discounted);
        setTotalDiscounted(data.data.total_discounted);
        setExistShopOrder(data.data.exist_shop_order);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkout = () => {
    axios
      .post(`/api/checkout`, {
        cart_items: cartItems,
        total_price: totalPrice,
        discounted: discounted,
        total_price_discounted: totalDiscounted,
      })
      .then(data => {
        console.log(data);
        dispatch(isDeletedFromCart());
        navigate(`/${data.data.next_step}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const regainShopOrder = () => {
    axios
      .get(`/api/regain_shop_order`)
      .then(data => {
        console.log(data);
        navigate(`/${data.data.next_step}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCart();
  }, [isDeleteFromcart, updateQuantityCartItem]);

  return (
    <>
      {!cartItems && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="text-center">
            <Spinner animation="grow" variant="mainColor" />
          </div>
        </div>
      )}
      {cartItems && (
        <Container className="my-5">
          <h1 className="text-center my-3">Carrello</h1>
          {cartItems && cartItems.length === 0 && (
            <div className="text-center mt-3">
              <Alert variant="success" className="custom-alert">
                <Alert.Heading>Nessun prodotto nel carrello</Alert.Heading>
              </Alert>
            </div>
          )}
          {cartItems && cartItems.length > 0 && (
            <Row>
              <Col md={12} lg={8}>
                {cartItems.map(cartItem => {
                  return (
                    <div key={cartItem.product.id} className="mb-3">
                      <CartItem product={cartItem.product} quantity={cartItem.quantity} />
                    </div>
                  );
                })}
              </Col>

              <Col lg={3} className="offset-lg-1">
                <div className="tables mb-4">
                  <Table responsive className="table-borderless">
                    <thead>
                      <tr className="total-table-head text-center ">
                        <th colSpan="2">Riepilogo dell'ordine</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="total-data">
                        <td className="fw-semibold">Subtotale</td>
                        <td>{totalPrice}&euro;</td>
                      </tr>
                      <tr className="total-data border-bottom">
                        <td className="fw-semibold">Sconto</td>
                        <td> {discounted}&euro;</td>
                      </tr>
                    </tbody>

                    <tfoot className="total-price border-bottom">
                      <tr className="total-data ">
                        <td>Totale</td>
                        <td>{totalDiscounted}&euro;</td>
                      </tr>
                    </tfoot>
                  </Table>

                  <div className="text-center mt-2">
                    <Button type="button" id="first-button" className="mb-3 w-100" onClick={checkout}>
                      Checkout
                    </Button>
                  </div>
                  {existShopOrder && (
                    <div className="text-center mt-2">
                      <Button type="button" id="first-button" className="mb-3 w-100" onClick={regainShopOrder}>
                        Riprendi Ordine
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default CartPage;
