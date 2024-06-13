import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LuStar, LuShoppingCart, LuMinus, LuPlus } from "react-icons/lu";
import { InputGroup, Form } from "react-bootstrap";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = parseInt(params["id"]);
  const [product, setProduct] = useState(null);
  const [quantityProduct, setQuantityProduct] = useState(1);

  const getProduct = () => {
    fetch(`/api/products/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore");
        }
      })
      .then(product => {
        console.log(product[0]);
        setProduct(product[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleIncrement = () => {
    if (quantityProduct < product.stock_quantity) {
      setQuantityProduct(quantityProduct + 1);
    }
  };

  const handleDecrement = () => {
    if (quantityProduct > 1) {
      setQuantityProduct(quantityProduct - 1);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Container className="my-5">
        {product && (
          <Row>
            <Col xs={12} sm={6}>
              <img src={product.image_url} alt={product.name} className="w-100 object-fit-cover rounded" />
            </Col>
            <Col xs={12} sm={6}>
              <div className="product-info-box pb-4">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <div className="d-flex justify-content-between">
                  <span>
                    <IoMdHeartEmpty className="fs-4" />
                  </span>
                  {/* <span>
            <IoMdHeart className="fs-4" />
          </span> */}
                  <span className="rating-stars align-baseline">
                    <LuStar />
                    <LuStar />
                    <LuStar />
                    <LuStar />
                    <LuStar />
                  </span>
                </div>
                <div className="price-wrapper mt-3">
                  {product.discounted === 1 && (
                    <span className="ms-auto">
                      <span className="fw-semibold text-muted text-decoration-line-through">{product.price}&euro;</span>
                      <span className="text-center fw-bold  ms-3">{product.price_discounted}&euro;</span>
                    </span>
                  )}
                  {product.discounted === 0 && (
                    <span className="text-center fw-bold ms-3 ms-auto">{product.price}&euro;</span>
                  )}
                </div>
                <div className="mt-4 d-flex justify-content-between">
                  <InputGroup className="w-auto justify-content-start align-items-center">
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

                  <Button type="button" id="first-button">
                    Aggiungi al Carrello <LuShoppingCart className="fs-5 ms-1" />
                  </Button>
                </div>
              </div>

              <div className="product-data mt-4">
                <p>
                  <span className="fw-bold">Categoria: </span>
                  {product.category.name}
                </p>
                <p>
                  <span className="fw-bold">Quantità in negozio: </span>
                  {product.stock_quantity}
                </p>
                <p>
                  <span className="fw-bold">Ingredienti: </span>
                  {product.ingredients}
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProductDetails;
