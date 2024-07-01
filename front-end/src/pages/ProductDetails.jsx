import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuStar, LuShoppingCart, LuMinus, LuPlus } from "react-icons/lu";
import { InputGroup, Form, Spinner, Alert } from "react-bootstrap";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import axios from "axios";
import { addQuantityCart, isDeletedFromPrefer } from "../redux/actions";
import Modal from "react-bootstrap/Modal";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = parseInt(params["id"]);
  const [product, setProduct] = useState(null);
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [isPrefer, setIsPrefer] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setmessageAlert] = useState("");
  const [categories, setCategories] = useState([]);
  const [alertUpdateProduct, setAlertUpdateProduct] = useState(false);
  const [alertDisableProduct, setAlertDisableProduct] = useState(false);
  const [alertAvailableProduct, setAlertAvailableProduct] = useState(false);

  const user = useSelector(state => {
    return state.user.user;
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    description: "",
    price: "",
    discounted: false,
    price_discounted: "",
    stock_quantity: "",
    ingredients: "",
    image_url: "",
    category_id: null,
  });

  const [errorsProduct, setErrorsProduct] = useState(null);

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
        console.log(product.data[0]);
        setProduct(product.data[0]);
        setIsPrefer(product.is_prefer);
        setUpdateProduct(product.data[0]);
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

  const addProductPrefer = () => {
    axios
      .post(`/api/add-prefer-product/${product.id}`)
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
      .delete(`/api/remove-prefer-product/${product.id}`)
      .then(data => {
        console.log(data);
        setIsPrefer(false);
        dispatch(isDeletedFromPrefer());
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToCart = () => {
    axios
      .post(`/api/cart-item/update`, { product_id: id, quantity: quantityProduct })
      .then(data => {
        console.log(data);
        if (data.data.message === "Prodotto aggiunto al carrello") {
          dispatch(addQuantityCart(quantityProduct));
        }
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

  const getAllCategories = () => {
    fetch("/api/categories")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setCategories(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateProduct = e => {
    e.preventDefault();
    axios
      .put(`/api/admin/update-product/${id}`, updateProduct)
      .then(data => {
        console.log(data);
        setAlertUpdateProduct(true);
        setTimeout(() => {
          setAlertUpdateProduct(false);
        }, 1000);
        handleClose();
      })
      .catch(err => {
        console.log(err);
        setErrorsProduct(err.response.data.errors);
      });
  };

  const disableProduct = () => {
    axios
      .put(`/api/admin/disable-product/${id}`)
      .then(data => {
        console.log(data);
        setAlertDisableProduct(true);
        setTimeout(() => {
          setAlertDisableProduct(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const availableProduct = () => {
    axios
      .put(`/api/admin/available-product/${id}`)
      .then(data => {
        console.log(data);
        setAlertAvailableProduct(true);
        setTimeout(() => {
          setAlertAvailableProduct(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
    getAllCategories();
  }, [alertUpdateProduct, alertDisableProduct, alertAvailableProduct]);

  return (
    <>
      <Container className="my-5">
        {!product && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="text-center">
              <Spinner animation="grow" variant="mainColor" />
            </div>
          </div>
        )}
        {showAlert && (
          <div className="text-center mt-3">
            <Alert variant="success" className="custom-alert">
              <Alert.Heading>{messageAlert}</Alert.Heading>
            </Alert>
          </div>
        )}
        {alertUpdateProduct && (
          <div className="text-center mt-3">
            <Alert variant="success" className="custom-alert">
              <Alert.Heading>Prodotto Modificato con Successo</Alert.Heading>
            </Alert>
          </div>
        )}
        {alertDisableProduct && (
          <div className="text-center mt-3">
            <Alert variant="success" className="custom-alert">
              <Alert.Heading>Prodotto Reso Non Disponibile</Alert.Heading>
            </Alert>
          </div>
        )}
        {alertAvailableProduct && (
          <div className="text-center mt-3">
            <Alert variant="success" className="custom-alert">
              <Alert.Heading>Prodotto Reso Disponibile</Alert.Heading>
            </Alert>
          </div>
        )}
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

                  <Button type="button" id="first-button" onClick={addToCart}>
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
              {user && user.role === "admin" && (
                <div>
                  <Button variant="warning" onClick={handleShow}>
                    Modifica Prodotto
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modifica Prodotto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleUpdateProduct}>
                        <Form.Group className="mb-3" controlId="formBasicNameProduct">
                          <Form.Label>Nome Prodotto</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            onChange={e => {
                              setUpdateProduct({
                                ...updateProduct,
                                name: e.target.value,
                              });
                            }}
                            value={updateProduct.name}
                          />
                          {errorsProduct && errorsProduct.name && (
                            <div className="error text-danger d-block">{errorsProduct.name}</div>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescriptionProduct">
                          <Form.Label>Descrizione</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={e => {
                              setUpdateProduct({
                                ...updateProduct,
                                description: e.target.value,
                              });
                            }}
                            value={updateProduct.description}
                          />
                          {errorsProduct && errorsProduct.description && (
                            <div className="error text-danger d-block">{errorsProduct.description}</div>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPriceProduct">
                          <Form.Label>Prezzo</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            onChange={e => {
                              setUpdateProduct({
                                ...updateProduct,
                                price: e.target.value,
                              });
                            }}
                            value={updateProduct.price}
                          />
                          {errorsProduct && errorsProduct.price && (
                            <div className="error text-danger d-block">{errorsProduct.price}</div>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDiscounted">
                          <Form.Check
                            type="checkbox"
                            label="Scontato"
                            onChange={e => {
                              setUpdateProduct({
                                ...updateProduct,
                                discounted: e.target.checked,
                              });
                            }}
                            value={updateProduct.discounted}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPriceDiscountedProduct">
                          <Form.Label>Prezzo Scontato</Form.Label>
                          <Form.Control
                            type="number"
                            onChange={e => {
                              setUpdateProduct({
                                ...updateProduct,
                                price_discounted: e.target.value,
                              });
                            }}
                            value={updateProduct.price_discounted}
                            disabled={!updateProduct.discounted}
                          />
                          {errorsProduct && errorsProduct.price_discounted && (
                            <div className="error text-danger d-block">{errorsProduct.price_discounted}</div>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicStockQuantityProduct">
                          <Form.Label>Quantità in Negozio</Form.Label>
                          <Form.Control
                            type="number"
                            onChange={e => {
                              setUpdateProduct({
                                ...updateProduct,
                                stock_quantity: e.target.value,
                              });
                            }}
                            value={updateProduct.stock_quantity}
                          />
                          {errorsProduct && errorsProduct.stock_quantity && (
                            <div className="error text-danger d-block">{errorsProduct.stock_quantity}</div>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicIngredientsProduct">
                          <Form.Label>Ingredienti</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={e => {
                              setUpdateProduct({
                                ...updateProduct,
                                ingredients: e.target.value,
                              });
                            }}
                            value={updateProduct.ingredients}
                          />
                          {errorsProduct && errorsProduct.ingredients && (
                            <div className="error text-danger d-block">{errorsProduct.ingredients}</div>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicImageUrlProduct">
                          <Form.Label>Immagine</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={e => {
                              setUpdateProduct({
                                ...updateProduct,
                                image_url: e.target.value,
                              });
                            }}
                            value={updateProduct.image_url}
                          />
                          {errorsProduct && errorsProduct.image_url && (
                            <div className="error text-danger d-block">{errorsProduct.image_url}</div>
                          )}
                        </Form.Group>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={e => {
                            setUpdateProduct({
                              ...updateProduct,
                              category_id: e.target.value,
                            });
                          }}
                          value={updateProduct.category_id || ""}
                        >
                          {errorsProduct && errorsProduct.category_id && (
                            <div className="error text-danger d-block">{errorsProduct.category_id}</div>
                          )}
                          <option value="" disabled>
                            Seleziona Categoria
                          </option>
                          {categories.map(category => {
                            return (
                              <option value={category.id} key={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <div className="d-flex justify-content-end mt-4">
                          <Button id="first-button" type="submit">
                            Aggiungi
                          </Button>
                        </div>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  {product.available === 1 && (
                    <Button variant="danger" className="ms-2" onClick={disableProduct}>
                      Disabilita
                    </Button>
                  )}
                  {product.available === 0 && (
                    <Button variant="success" className="ms-2" onClick={availableProduct}>
                      Abilita
                    </Button>
                  )}
                </div>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProductDetails;
