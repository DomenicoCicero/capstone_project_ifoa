import { useEffect, useState } from "react";
import { Alert, Button, Container, Row } from "react-bootstrap";
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

  useEffect(() => {
    getAllCategories();
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
                  return <option value={category.id}>{category.name}</option>;
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
            Tab content for Contact
          </Tab>
          <Tab eventKey="orders-pending" title="Ordini In Sospeso">
            Tab content for Contact
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default AdminPage;
