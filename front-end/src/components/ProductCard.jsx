import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isDeletedFromPrefer } from "../redux/actions";
import { Alert } from "react-bootstrap";

const ProductCard = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const preferProductIds = useSelector(state => {
    return state.products.productsIdPrefer;
  });

  const user = useSelector(state => {
    return state.user.user;
  });

  const [isPrefer, setIsPrefer] = useState(null);

  const checkIsPrefer = () => {
    const isPrefer = preferProductIds.some(item => item === props.product.id);
    setIsPrefer(isPrefer);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setmessageAlert] = useState("");

  const addProductPrefer = () => {
    axios
      .post(`/api/add-prefer-product/${props.product.id}`)
      .then(data => {
        console.log(data);
        setIsPrefer(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const removeProductPrefer = () => {
    axios
      .delete(`/api/remove-prefer-product/${props.product.id}`)
      .then(data => {
        console.log(data);
        dispatch(isDeletedFromPrefer());
        setTimeout(() => {
          setIsPrefer(false);
        }, 600);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToCart = () => {
    axios
      .post(`/api/cart-item/update`, { product_id: props.product.id, quantity: 1 })
      .then(data => {
        console.log(data);
        setmessageAlert(data.data.message);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user) {
      checkIsPrefer();
    }
  }, [user]);

  return (
    <>
      <Card className="h-100">
        <Card.Img variant="top" src={props.product.image_url} className="cursor-pointer card-border" />
        {props.product.discounted === 1 && (
          <div className="badge-on-sale bg-thirdColor px-3">
            <span className="badge-text">In offerta!</span>
          </div>
        )}
        {showAlert && (
          <div className="text-center mt-3">
            <Alert variant="success" className="custom-alert">
              <Alert.Heading>{messageAlert}</Alert.Heading>
            </Alert>
          </div>
        )}
        {!showAlert && (
          <Card.Body>
            <Card.Title className="fw-bold">
              {props.product.name.length > 15 ? props.product.name.substring(0, 12) + "..." : props.product.name}
            </Card.Title>
            <Card.Text>
              <span className="text-secondary">{props.product.category.name}</span>
            </Card.Text>

            <Card.Text className="fw-normal">
              {props.product.description.length > 68
                ? props.product.description.substring(0, 65) + "..."
                : props.product.description}
            </Card.Text>
            <Card.Text className="d-flex mb-4">
              {isPrefer !== null && (
                <>
                  {isPrefer === false && (
                    <span>
                      <IoMdHeartEmpty className="fs-4" style={{ cursor: "pointer" }} onClick={addProductPrefer} />
                    </span>
                  )}
                  {isPrefer && (
                    <span>
                      <IoMdHeart className="fs-4" style={{ cursor: "pointer" }} onClick={removeProductPrefer} />
                    </span>
                  )}
                </>
              )}

              {props.product.discounted === 1 && (
                <span className="ms-auto">
                  <span className="fw-semibold text-muted text-decoration-line-through">
                    {props.product.price}&euro;
                  </span>
                  <span className="text-center fw-bold  ms-3">{props.product.price_discounted}&euro;</span>
                </span>
              )}
              {props.product.discounted === 0 && (
                <span className="text-center fw-bold ms-3 ms-auto">{props.product.price}&euro;</span>
              )}
            </Card.Text>
            <div className="mb-2 d-flex">
              <Button
                type="button"
                variant="outline-dark"
                className="secondary-button col-9"
                onClick={() => navigate(`/products/${props.product.id}`)}
              >
                Vedi dettagli
              </Button>
              <Button type="button" variant="mainColor" id="first-button" className="ms-auto" onClick={addToCart}>
                <LuShoppingCart className="fs-5" />
              </Button>
            </div>
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default ProductCard;
