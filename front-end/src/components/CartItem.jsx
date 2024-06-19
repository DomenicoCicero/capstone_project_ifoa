import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { LuMinus, LuPlus, LuX } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isDeletedFromCart } from "../redux/actions";

const CartItem = props => {
  const dispatch = useDispatch();
  const [quantityProduct, setQuantityProduct] = useState(props.quantity);

  const handleDecrement = () => {
    if (quantityProduct > 1) {
      setQuantityProduct(quantityProduct - 1);
    }
  };

  const handleIncrement = () => {
    if (quantityProduct < props.product.stock_quantity) {
      setQuantityProduct(quantityProduct + 1);
    }
  };

  const deleteProductFromCart = () => {
    axios
      .delete(`/api/cart-item/delete/${props.product.id}`)
      .then(data => {
        console.log(data);
        dispatch(isDeletedFromCart());
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={3} sm={3}>
            <div className="">
              <img src={props.product.image_url} alt="" className="w-100" />
            </div>
          </Col>
          <Col xs={5} sm={5}>
            <div className="d-flex flex-column align-items-center">
              <h4>
                {props.product.name.length < 16 ? props.product.name : props.product.name.substring(0, 14) + "..."}
              </h4>
              <InputGroup className="w-auto input-group-sm justify-content-center align-items-center">
                <Button id="grey-button" data-type="minus" onClick={() => handleDecrement()}>
                  <LuMinus />
                </Button>
                <Form.Control
                  type="text"
                  max="10"
                  className=" quantity-field text-center"
                  value={quantityProduct}
                  onChange={e => {}}
                ></Form.Control>

                <Button id="grey-button" data-type="plus" onClick={() => handleIncrement()}>
                  <LuPlus />
                </Button>
              </InputGroup>
            </div>
          </Col>
          <Col xs={2} sm={2} className="d-flex flex-column align-items-center justify-content-center">
            {props.product.discounted === 1 && (
              <div className="d-flex flex-column align-items-center">
                <span className="fw-semibold text-muted text-decoration-line-through">
                  {(props.product.price * quantityProduct).toFixed(2)}&euro;
                </span>
                <span className="text-center fw-bold">
                  {(props.product.price_discounted * quantityProduct).toFixed(2)}&euro;
                </span>
              </div>
            )}
            {props.product.discounted === 0 && (
              <span className="text-center fw-bold ms-3">
                {(props.product.price * quantityProduct).toFixed(2)}&euro;
              </span>
            )}
          </Col>
          <Col xs={2} sm={2} className="d-flex flex-column align-items-center justify-content-center">
            <Button type="button" variant="outline-danger" className="btn-sm" onClick={deleteProductFromCart}>
              <LuX />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartItem;
