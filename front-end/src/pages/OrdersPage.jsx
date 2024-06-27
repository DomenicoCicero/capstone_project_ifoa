import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = () => {
    axios
      .get(`/api/orders`)
      .then(data => {
        console.log(data);
        setOrders(data.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">I miei Ordini</h1>
      {orders.length === 0 && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="text-center">
            <Spinner animation="grow" variant="mainColor" />
          </div>
        </div>
      )}
      {orders.length > 0 && (
        <Row>
          <Col xs={12}>
            <Accordion defaultActiveKey="0">
              {orders.map((order, idx) => {
                return (
                  <Accordion.Item key={order.id} eventKey={idx}>
                    <Accordion.Header>{order.created_at.substring(0, 10)}</Accordion.Header>
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
                              <Col xs={6} sm={4} md={3} lg={2}>
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
  );
};

export default OrdersPage;
