import { useEffect, useState } from "react";
import { Accordion, Alert, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const AdminPage = () => {
  const [categories, setcategories] = useState([]);
  const [showNewCategory, setShowNewcategory] = useState(false);
  const [showUpdateCategory, setShowUpdatecategory] = useState(false);

  const handleCloseNewCategory = () => setShowNewcategory(false);
  const handleShowNewcategory = () => setShowNewcategory(true);

  const handleCloseUpdateCategory = () => setShowUpdatecategory(false);
  const handleShowUpdatecategory = (id, name) => {
    setUpdateCategory({
      id: id,
      name: name,
    });
    setShowUpdatecategory(true);
  };

  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const [updateCategory, setUpdateCategory] = useState({
    id: "",
    name: "",
  });

  const [alertNewcategory, setAlertNewCategory] = useState(false);
  const [alertUpdatecategory, setAlertUpdateCategory] = useState(false);
  const [alertDisablecategory, setAlertDisableCategory] = useState(false);
  const [alertAvailablecategory, setAlertAvailableCategory] = useState(false);
  const [alertNewProduct, setAlertNewProduct] = useState(false);
  const [alertStatusOrder, setAlertStatusOrder] = useState(false);
  const [load, setLoad] = useState(true);
  const [errorsProduct, setErrorsProduct] = useState(null);

  const [newProduct, setnewProduct] = useState({
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

  const [ordersPending, setOrdersPending] = useState(null);
  const [ordersCompleted, setOrdersCompleted] = useState(null);

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
        setcategories(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addNewCategory = e => {
    e.preventDefault();
    axios
      .post(`/api/admin/created-category`, newCategory)
      .then(data => {
        console.log(data);
        handleCloseNewCategory();
        setAlertNewCategory(true);
        setTimeout(() => {
          setAlertNewCategory(false);
        }, 1000);
        setLoad(!load);
        setNewCategory({
          name: "",
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateCategory = e => {
    e.preventDefault();
    axios
      .put(`/api/admin/update-category/${updateCategory.id}`, updateCategory)
      .then(data => {
        console.log(data);
        handleCloseUpdateCategory();
        setAlertUpdateCategory(true);
        setTimeout(() => {
          setAlertUpdateCategory(false);
        }, 1000);
        setLoad(!load);
        setUpdateCategory({
          id: "",
          name: "",
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const disableCategory = id => {
    axios
      .put(`/api/admin/disable-category/${id}`)
      .then(data => {
        console.log(data);
        setAlertDisableCategory(true);
        setTimeout(() => {
          setAlertDisableCategory(false);
        }, 1000);
        setLoad(!load);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const availableCategory = id => {
    axios
      .put(`/api/admin/available-category/${id}`)
      .then(data => {
        console.log(data);
        setAlertAvailableCategory(true);
        setTimeout(() => {
          setAlertAvailableCategory(false);
        }, 1000);
        setLoad(!load);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createdNewProduct = e => {
    e.preventDefault();
    axios
      .post(`/api/admin/created-product`, newProduct)
      .then(data => {
        console.log(data);
        setAlertNewProduct(true);
        setTimeout(() => {
          setAlertNewProduct(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        setErrorsProduct(err.response.data.errors);
      });
  };

  const getShopOrderPending = () => {
    axios
      .get(`/api/admin/shop_order_pending`)
      .then(data => {
        console.log(data);
        setOrdersPending(data.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getShopOrderCompleted = () => {
    axios
      .get(`/api/admin/shop_order_completed`)
      .then(data => {
        console.log(data);
        setOrdersCompleted(data.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editOrderStatusDelivered = id => {
    axios
      .put(`/api/admin/shop_order_status_delivered/${id}`)
      .then(data => {
        console.log(data);
        setAlertStatusOrder(true);
        setTimeout(() => {
          setAlertStatusOrder(false);
        }, 1000);
        setLoad(!load);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editOrderStatusReadyInStore = id => {
    axios
      .put(`/api/admin/shop_order_status_ready_in_store/${id}`)
      .then(data => {
        console.log(data);
        setAlertStatusOrder(true);
        setTimeout(() => {
          setAlertStatusOrder(false);
        }, 1000);
        setLoad(!load);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editOrderStatusCompleted = id => {
    axios
      .put(`/api/admin/shop_order_status_completed/${id}`)
      .then(data => {
        console.log(data);
        setAlertStatusOrder(true);
        setTimeout(() => {
          setAlertStatusOrder(false);
        }, 1000);
        setLoad(!load);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategories();
    getShopOrderPending();
    getShopOrderCompleted();
  }, [load]);

  return (
    <Container className="mt-4">
      <Row>
        <Tabs defaultActiveKey="orders-pending" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="product" title="Aggiungi Prodotto">
            <h3 className="text-center my-2">Aggiungi Prodotto</h3>
            {alertNewProduct && (
              <div className="text-center mt-3">
                <Alert variant="success" className="custom-alert">
                  <Alert.Heading>Prodotto Creato con successo</Alert.Heading>
                </Alert>
              </div>
            )}
            <Form onSubmit={createdNewProduct}>
              <Form.Group className="mb-3" controlId="formBasicNameProduct">
                <Form.Label>Nome Prodotto</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={e => {
                    setnewProduct({
                      ...newProduct,
                      name: e.target.value,
                    });
                  }}
                  value={newProduct.name}
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
                    setnewProduct({
                      ...newProduct,
                      description: e.target.value,
                    });
                  }}
                  value={newProduct.description}
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
                    setnewProduct({
                      ...newProduct,
                      price: e.target.value,
                    });
                  }}
                  value={newProduct.price}
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
                    setnewProduct({
                      ...newProduct,
                      discounted: e.target.checked,
                    });
                  }}
                  value={newProduct.discounted}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPriceDiscountedProduct">
                <Form.Label>Prezzo Scontato</Form.Label>
                <Form.Control
                  type="number"
                  onChange={e => {
                    setnewProduct({
                      ...newProduct,
                      price_discounted: e.target.value,
                    });
                  }}
                  value={newProduct.price_discounted}
                  disabled={!newProduct.discounted}
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
                    setnewProduct({
                      ...newProduct,
                      stock_quantity: e.target.value,
                    });
                  }}
                  value={newProduct.stock_quantity}
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
                    setnewProduct({
                      ...newProduct,
                      ingredients: e.target.value,
                    });
                  }}
                  value={newProduct.ingredients}
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
                    setnewProduct({
                      ...newProduct,
                      image_url: e.target.value,
                    });
                  }}
                  value={newProduct.image_url}
                />
                {errorsProduct && errorsProduct.image_url && (
                  <div className="error text-danger d-block">{errorsProduct.image_url}</div>
                )}
              </Form.Group>
              <Form.Select
                aria-label="Default select example"
                onChange={e => {
                  setnewProduct({
                    ...newProduct,
                    category_id: e.target.value,
                  });
                }}
                value={newProduct.category_id || ""}
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
          </Tab>
          <Tab eventKey="categories" title="Categorie">
            {alertNewcategory && (
              <div className="text-center mt-3">
                <Alert variant="success" className="custom-alert">
                  <Alert.Heading>Categoria Creata con successo</Alert.Heading>
                </Alert>
              </div>
            )}
            {alertUpdatecategory && (
              <div className="text-center mt-3">
                <Alert variant="success" className="custom-alert">
                  <Alert.Heading>Categoria Modificata con successo</Alert.Heading>
                </Alert>
              </div>
            )}
            {alertDisablecategory && (
              <div className="text-center mt-3">
                <Alert variant="success" className="custom-alert">
                  <Alert.Heading>Categoria Disabilitata con successo</Alert.Heading>
                </Alert>
              </div>
            )}
            {alertAvailablecategory && (
              <div className="text-center mt-3">
                <Alert variant="success" className="custom-alert">
                  <Alert.Heading>Categoria Abilitata con successo</Alert.Heading>
                </Alert>
              </div>
            )}
            <Button type="button" id="first-button" className="my-3" onClick={handleShowNewcategory}>
              Crea Nuova Categoria
            </Button>

            <Modal show={showNewCategory} onHide={handleCloseNewCategory}>
              <Modal.Header closeButton>
                <Modal.Title>Crea Nuova Categoria</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={addNewCategory}>
                  <Form.Group className="mb-3" controlId="formBasicNameCategory">
                    <Form.Label>Nome Categoria</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={e => {
                        setNewCategory({
                          ...newCategory,
                          name: e.target.value,
                        });
                      }}
                      value={newCategory.name}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button id="first-button" type="submit">
                      Crea
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>

            <ListGroup>
              {categories.map(category => {
                return (
                  <ListGroup.Item key={category.id}>
                    <div className="d-flex justify-content-between">
                      <span>{category.name}</span>
                      <div>
                        <Button
                          type="button"
                          variant="warning"
                          className="me-2"
                          onClick={() => handleShowUpdatecategory(category.id, category.name)}
                        >
                          Modifica
                        </Button>
                        {category.available === 1 && (
                          <Button type="button" variant="danger" onClick={() => disableCategory(category.id)}>
                            Disabilita
                          </Button>
                        )}
                        {category.available === 0 && (
                          <Button type="button" variant="success" onClick={() => availableCategory(category.id)}>
                            Abilita
                          </Button>
                        )}
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
              <Modal show={showUpdateCategory} onHide={handleCloseUpdateCategory}>
                <Modal.Header closeButton>
                  <Modal.Title>Modifica Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleUpdateCategory}>
                    <Form.Group className="mb-3" controlId="formBasicNameCategory">
                      <Form.Label>Nome Categoria</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={e => {
                          setUpdateCategory({
                            ...updateCategory,
                            name: e.target.value,
                          });
                        }}
                        value={updateCategory.name}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                      <Button id="first-button" type="submit">
                        Modifica
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
            </ListGroup>
          </Tab>
          <Tab eventKey="orders-completed" title="Ordini Completati">
            <Container>
              <h1 className="text-center my-4">Ordini Completati</h1>
              {!ordersCompleted && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                  <div className="text-center">
                    <Spinner animation="grow" variant="mainColor" />
                  </div>
                </div>
              )}
              {ordersCompleted && ordersCompleted.length === 0 && (
                <div className="text-center mt-3">
                  <Alert variant="success" className="custom-alert">
                    <Alert.Heading>Nessun Ordine</Alert.Heading>
                  </Alert>
                </div>
              )}
              {alertStatusOrder && (
                <div className="text-center mt-3">
                  <Alert variant="success" className="custom-alert">
                    <Alert.Heading>Stato Ordine Modificato Con Successo</Alert.Heading>
                  </Alert>
                </div>
              )}
              {ordersCompleted && ordersCompleted.length > 0 && (
                <Row>
                  <Col xs={12}>
                    <Accordion defaultActiveKey="0">
                      {ordersCompleted.map((order, idx) => {
                        return (
                          <Accordion.Item key={order.id} eventKey={idx}>
                            <Accordion.Header>
                              {order.created_at.substring(0, 10)} - {order.user.name}
                            </Accordion.Header>
                            <Accordion.Body>
                              <p>
                                <span className="fw-bold">Prezzo Totale: </span>
                                {order.total_price}&euro;
                              </p>
                              <p>
                                <span className="fw-bold">Sconto: </span>
                                {order.discounted}&euro;
                              </p>
                              <p>
                                <span className="fw-bold">Prezzo Totale Scontato: </span>
                                {order.total_price_discounted}&euro;
                              </p>
                              <p>
                                <span className="fw-bold">Metodo Ritiro Merce: </span>
                                {order.delivery_method === "home_delivery" ? "Spedizione a casa" : "Ritiro in Negozio"}
                              </p>
                              <p>
                                <span className="fw-bold">Metodo Pagamento: </span>
                                {order.payment_method === "card"
                                  ? "Con Carta"
                                  : order.delivery_method === "home_delivery"
                                  ? "Pagamento alla consegna"
                                  : "Pagamento in Negozio"}
                              </p>
                              <p>
                                <span className="fw-bold">Stato Ordine: </span>
                                {order.status === "pending"
                                  ? "In Elaborazione"
                                  : order.status === "delivered"
                                  ? "Spedito"
                                  : order.status === "ready_in_store"
                                  ? "Pronto in Negozio"
                                  : order.status === "completed"
                                  ? "Completato"
                                  : "Cancellato"}
                              </p>
                              <p>
                                <span className="fw-bold">Prodotti: </span>
                              </p>
                              <Container>
                                <Row>
                                  {order.order_items.map(item => {
                                    return (
                                      <Col xs={6} sm={4} md={3} lg={2} key={item.id}>
                                        <Card>
                                          <Card.Img variant="top" src={item.product.image_url} />
                                          <Card.Body>
                                            <Card.Title>
                                              {item.product.name.length > 15
                                                ? item.product.name.substring(0, 12) + "..."
                                                : item.product.name}
                                            </Card.Title>
                                            <Card.Text>quantity: {item.quantity}</Card.Text>
                                            <Card.Text>
                                              {item.product.discounted === 1 && (
                                                <span className="">
                                                  <span className="text-center fw-bold  ms-3 ms-auto">
                                                    {item.product.price_discounted * item.quantity}&euro;
                                                  </span>
                                                </span>
                                              )}
                                              {item.product.discounted === 0 && (
                                                <span className="text-center fw-bold ms-3 ms-auto">
                                                  {item.product.price * item.quantity}&euro;
                                                </span>
                                              )}
                                            </Card.Text>
                                          </Card.Body>
                                        </Card>
                                      </Col>
                                    );
                                  })}
                                </Row>
                              </Container>
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion>
                  </Col>
                </Row>
              )}
            </Container>
          </Tab>
          <Tab eventKey="orders-pending" title="Ordini In Sospeso">
            <Container>
              <h1 className="text-center my-4">Ordini In Sospeso</h1>
              {!ordersPending && (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                  <div className="text-center">
                    <Spinner animation="grow" variant="mainColor" />
                  </div>
                </div>
              )}
              {ordersPending && ordersPending.length === 0 && (
                <div className="text-center mt-3">
                  <Alert variant="success" className="custom-alert">
                    <Alert.Heading>Nessun Ordine</Alert.Heading>
                  </Alert>
                </div>
              )}
              {alertStatusOrder && (
                <div className="text-center mt-3">
                  <Alert variant="success" className="custom-alert">
                    <Alert.Heading>Stato Ordine Modificato Con Successo</Alert.Heading>
                  </Alert>
                </div>
              )}
              {ordersPending && ordersPending.length > 0 && (
                <Row>
                  <Col xs={12}>
                    <Accordion defaultActiveKey="0">
                      {ordersPending.map((order, idx) => {
                        return (
                          <Accordion.Item key={order.id} eventKey={idx}>
                            <Accordion.Header>
                              {order.created_at.substring(0, 10)} - {order.user.name}
                            </Accordion.Header>
                            <Accordion.Body>
                              <p>
                                <span className="fw-bold">Prezzo Totale: </span>
                                {order.total_price}&euro;
                              </p>
                              <p>
                                <span className="fw-bold">Sconto: </span>
                                {order.discounted}&euro;
                              </p>
                              <p>
                                <span className="fw-bold">Prezzo Totale Scontato: </span>
                                {order.total_price_discounted}&euro;
                              </p>
                              <p>
                                <span className="fw-bold">Metodo Ritiro Merce: </span>
                                {order.delivery_method === "home_delivery" ? "Spedizione a casa" : "Ritiro in Negozio"}
                              </p>
                              <p>
                                <span className="fw-bold">Metodo Pagamento: </span>
                                {order.payment_method === "card"
                                  ? "Con Carta"
                                  : order.delivery_method === "home_delivery"
                                  ? "Pagamento alla consegna"
                                  : "Pagamento in Negozio"}
                              </p>
                              <p>
                                <span className="fw-bold">Stato Ordine: </span>
                                {order.status === "pending"
                                  ? "In Elaborazione"
                                  : order.status === "delivered"
                                  ? "Spedito"
                                  : order.status === "ready_in_store"
                                  ? "Pronto in Negozio"
                                  : order.status === "completed"
                                  ? "Completato"
                                  : "Cancellato"}
                              </p>
                              <p>
                                <span className="fw-bold">Prodotti: </span>
                              </p>
                              <Container>
                                <Row>
                                  {order.order_items.map(item => {
                                    return (
                                      <Col xs={6} sm={4} md={3} lg={2} key={item.id}>
                                        <Card>
                                          <Card.Img variant="top" src={item.product.image_url} />
                                          <Card.Body>
                                            <Card.Title>
                                              {item.product.name.length > 15
                                                ? item.product.name.substring(0, 12) + "..."
                                                : item.product.name}
                                            </Card.Title>
                                            <Card.Text>quantity: {item.quantity}</Card.Text>
                                            <Card.Text>
                                              {item.product.discounted === 1 && (
                                                <span className="">
                                                  <span className="text-center fw-bold  ms-3 ms-auto">
                                                    {item.product.price_discounted * item.quantity}&euro;
                                                  </span>
                                                </span>
                                              )}
                                              {item.product.discounted === 0 && (
                                                <span className="text-center fw-bold ms-3 ms-auto">
                                                  {item.product.price * item.quantity}&euro;
                                                </span>
                                              )}
                                            </Card.Text>
                                          </Card.Body>
                                        </Card>
                                      </Col>
                                    );
                                  })}
                                </Row>
                              </Container>
                              <Container className="mt-4">
                                <Row>
                                  <Col>
                                    <div>
                                      {order.delivery_method === "home_delivery" && order.status === "pending" && (
                                        <Button
                                          variant="warning"
                                          className="text-white me-2"
                                          onClick={() => editOrderStatusDelivered(order.id)}
                                        >
                                          Spedito
                                        </Button>
                                      )}
                                      {order.delivery_method === "store_pickup" && order.status === "pending" && (
                                        <Button
                                          variant="warning"
                                          className="text-white me-2"
                                          onClick={() => editOrderStatusReadyInStore(order.id)}
                                        >
                                          Pronto In Negozio
                                        </Button>
                                      )}
                                      <Button
                                        variant="success"
                                        className="text-white"
                                        onClick={() => editOrderStatusCompleted(order.id)}
                                      >
                                        Completato
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>
                              </Container>
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion>
                  </Col>
                </Row>
              )}
            </Container>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default AdminPage;
