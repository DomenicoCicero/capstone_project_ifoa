import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiHamburgerMenu } from "react-icons/gi";
import ListGroup from "react-bootstrap/ListGroup";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //   const [categorySelected, setCategorySelected] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  // per filtrare le categorie chiamare api senza pagination e fare setProducts
  //   const getProducts = () => {
  //     fetch(`/api/products-page?page=${currentPage}`)
  //       .then(response => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           throw new Error("errore nel reperimento dei dati");
  //         }
  //       })
  //       .then(data => {
  //         console.log(data);
  //         const filteredProducts =
  //           categorySelected !== "" ? data.data.filter(item => item.category.name === categorySelected) : data.data;
  //         setProducts(filteredProducts);
  //         setTotalPages(data.last_page);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

  const getProducts = () => {
    fetch(`/api/products-page?page=${currentPage}`)
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

  useEffect(() => {
    getProducts();
    getAllCategories();
  }, [currentPage]);

  return (
    <>
      <Container>
        <h1 className="text-center my-4">Tutti i prodotti</h1>
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
                {categories.map((category, idx) => {
                  return (
                    <ListGroup.Item
                      key={idx}
                      className="mb-3 bg-mainColor text-white"
                      style={{ cursor: "pointer" }}
                      //   onClick={() => setCategorySelected(category.name)}
                    >
                      {category.name}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        {products.length === 0 && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="text-center">
              <Spinner animation="grow" variant="mainColor" />
            </div>
          </div>
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
                  setCurrentPage(1);
                }}
              />
              <Pagination.Prev
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              />

              {currentPage === totalPages && (
                <Pagination.Item
                  onClick={() => {
                    setCurrentPage(currentPage - 2);
                  }}
                >
                  {currentPage - 2}
                </Pagination.Item>
              )}
              {currentPage > 1 && (
                <Pagination.Item
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  {currentPage - 1}
                </Pagination.Item>
              )}
              <Pagination.Item active>{currentPage}</Pagination.Item>
              {currentPage !== totalPages && (
                <Pagination.Item
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  {currentPage + 1}
                </Pagination.Item>
              )}

              {currentPage === 1 && (
                <Pagination.Item
                  onClick={() => {
                    setCurrentPage(currentPage + 2);
                  }}
                >
                  {currentPage + 2}
                </Pagination.Item>
              )}

              <Pagination.Next
                onClick={() => {
                  if (currentPage !== totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              />
              <Pagination.Last
                onClick={() => {
                  setCurrentPage(totalPages);
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
