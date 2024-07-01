import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiHamburgerMenu } from "react-icons/gi";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch } from "react-redux";
import { getProductsIdsPrefer } from "../redux/actions";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState({
    categorySelected: "Tutti i Prodotti",
    categoryIdSelected: null,
    n: 1,
  });

  const [totalPages, setTotalPages] = useState(null);
  const [query, setQuery] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const getProductsByCategorySelected = () => {
    fetch(`/api/products/category/${currentPage.categoryIdSelected}?page=${currentPage.n}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setProducts(data.data);
        setTotalPages(data.last_page);
        setShow(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getProducts = () => {
    fetch(`/api/products-page?page=${currentPage.n}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setProducts(data.data.data.filter(item => item.available === 1));
        setTotalPages(data.data.last_page);
        dispatch(getProductsIdsPrefer(data.preferProductIdArr));
        setShow(false);
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
        let categoriesAvailable = data.filter(item => item.available === 1);
        setCategories(categoriesAvailable);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const searchProducts = () => {
    fetch(`/api/products/search?q=${query}&page=${currentPage.n}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setProducts(data.data);
        setTotalPages(data.last_page);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategories();
    if (currentPage.categorySelected === "Tutti i Prodotti") {
      getProducts();
    } else if (currentPage.categorySelected === "Risultati Ricerca") {
      searchProducts();
    } else {
      getProductsByCategorySelected();
    }
  }, [currentPage]);

  return (
    <>
      <Container>
        {products.length === 0 && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="text-center">
              <Spinner animation="grow" variant="mainColor" />
            </div>
          </div>
        )}
        {products.length > 0 && (
          <>
            <h1 className="text-center my-4">{currentPage.categorySelected}</h1>
            <Row className="d-flex justify-content-center">
              <Col xs={10} className="offset-1">
                <Form.Group className="mb-1" controlId="formSearch">
                  <Form.Control
                    type="text"
                    placeholder="Cerca i prodotti..."
                    value={query}
                    onChange={e => {
                      setQuery(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  className="w-100"
                  id="first-button"
                  type="button"
                  onClick={() => {
                    if (query.length > 0) {
                      setCurrentPage({
                        categorySelected: "Risultati Ricerca",
                        categoryIdSelected: null,
                        n: 1,
                      });
                    } else {
                      setCurrentPage({
                        categorySelected: "Tutti i Prodotti",
                        categoryIdSelected: null,
                        n: 1,
                      });
                    }
                  }}
                >
                  Cerca
                </Button>
              </Col>
            </Row>
            <div className="my-4">
              <Button id="first-button" onClick={handleShow}>
                <GiHamburgerMenu /> Vedi le categorie
              </Button>

              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Tutte le categorie</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <ListGroup>
                    <ListGroup.Item
                      className="mb-3 bg-mainColor text-white"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentPage({
                          categorySelected: "Tutti i Prodotti",
                          categoryIdSelected: null,
                          n: 1,
                        });
                      }}
                    >
                      Tutti i Prodotti
                    </ListGroup.Item>
                    {categories.map((category, idx) => {
                      return (
                        <ListGroup.Item
                          key={idx}
                          className="mb-3 bg-mainColor text-white"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setCurrentPage({
                              categorySelected: category.name,
                              categoryIdSelected: category.id,
                              n: 1,
                            });
                          }}
                        >
                          {category.name}
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </>
        )}
        <Row>
          {products.map(product => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} className="g-2" key={product.id}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
        {products.length > 0 && (
          <Row className="mt-5">
            <Pagination className="justify-content-center custom-pagination">
              <Pagination.First
                onClick={() => {
                  setCurrentPage(prevState => ({
                    ...prevState,
                    n: 1,
                  }));
                }}
              />
              <Pagination.Prev
                onClick={() => {
                  if (currentPage.n > 1) {
                    setCurrentPage(prevState => ({
                      ...prevState,
                      n: currentPage.n - 1,
                    }));
                  }
                }}
              />

              {currentPage.n === totalPages && totalPages > 2 && (
                <Pagination.Item
                  onClick={() => {
                    setCurrentPage(prevState => ({
                      ...prevState,
                      n: currentPage.n - 2,
                    }));
                  }}
                >
                  {currentPage.n - 2}
                </Pagination.Item>
              )}
              {currentPage.n > 1 && (
                <Pagination.Item
                  onClick={() => {
                    setCurrentPage(prevState => ({
                      ...prevState,
                      n: currentPage.n - 1,
                    }));
                  }}
                >
                  {currentPage.n - 1}
                </Pagination.Item>
              )}
              <Pagination.Item active>{currentPage.n}</Pagination.Item>
              {currentPage.n !== totalPages && (
                <Pagination.Item
                  onClick={() => {
                    setCurrentPage(prevState => ({
                      ...prevState,
                      n: currentPage.n + 1,
                    }));
                  }}
                >
                  {currentPage.n + 1}
                </Pagination.Item>
              )}

              {currentPage.n === 1 && totalPages > 2 && (
                <Pagination.Item
                  onClick={() => {
                    setCurrentPage(prevState => ({
                      ...prevState,
                      n: currentPage.n + 2,
                    }));
                  }}
                >
                  {currentPage.n + 2}
                </Pagination.Item>
              )}

              <Pagination.Next
                onClick={() => {
                  if (currentPage.n !== totalPages) {
                    setCurrentPage(prevState => ({
                      ...prevState,
                      n: currentPage.n + 1,
                    }));
                  }
                }}
              />
              <Pagination.Last
                onClick={() => {
                  setCurrentPage(prevState => ({
                    ...prevState,
                    n: totalPages,
                  }));
                }}
              />
            </Pagination>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ProductsPage;
