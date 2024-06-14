import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductsIdsPrefer } from "../redux/actions";

const PreferPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const preferProductIds = useSelector(state => {
    return state.products.productsIdPrefer;
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

  //gestire loop infinito causato dall'aggiornamento della pagina dopo aver eliminato un prodotto dai preferiti
  // alert quando non ci sono prodotti nei preferiti
  // spinner

  //   useEffect(() => {
  //     getPreferProducts();
  //   }, [preferProductIds]);

  return (
    <>
      <Container>
        <h1 className="text-center my-4">I Miei Preferiti</h1>
        <Row>
          {products.map(product => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} className="g-2" key={product.id}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default PreferPage;
