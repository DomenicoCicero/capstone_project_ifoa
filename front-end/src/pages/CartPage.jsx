import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [discounted, setDiscounted] = useState(null);
  const [totalDiscounted, setTotalDiscounted] = useState(null);
  const isDeleteFromcart = useSelector(state => {
    return state.cart.isDeleteFromCart;
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCart();
  }, [isDeleteFromcart]);

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center my-3">Carrello</h1>
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

              <div className="text-center mt-5">
                <Button type="button" id="first-button" className="mb-3 w-100">
                  Checkout
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPage;
