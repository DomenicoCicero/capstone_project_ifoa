import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductsIdsPrefer } from "../redux/actions";
import { Alert, Spinner } from "react-bootstrap";

const PreferPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);

  const isDeletedFromPrefer = useSelector(state => {
    return state.products.isDeletedFromPrefer;
  });

  const getPreferProducts = () => {
    fetch(`/api/prefer-product`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        // console.log(data);
        setProducts(data.data);
        dispatch(getProductsIdsPrefer(data.preferProductIdArr));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPreferProducts();
  }, [isDeletedFromPrefer]);

  return (
    <>
      {products === null && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="text-center">
            <Spinner animation="grow" variant="mainColor" />
          </div>
        </div>
      )}
      {products !== null && (
        <Container>
          <h1 className="text-center my-4">I Miei Preferiti</h1>
          {products.length === 0 && (
            <div className="text-center mt-3">
              <Alert variant="success" className="custom-alert">
                <Alert.Heading>Nessun prodotto salvato nei preferiti</Alert.Heading>
              </Alert>
            </div>
          )}
          {products.length > 0 && (
            <Row>
              {products.map(product => {
                return (
                  <Col xs={12} sm={6} md={4} lg={3} className="g-2" key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default PreferPage;
