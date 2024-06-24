import { Card, Col, Container, Row } from "react-bootstrap";

const PaymentMethodPage = () => {
  return (
    <Container>
      <h3 className="text-center my-4">Scegli se pagare con carta oppure alla consegna o in negozio</h3>
      <Row>
        <Col xs={6}>
          <Card
            style={{ cursor: "pointer" }}
            className="h-100"
            // onClick={() => deliveryMethod("store_pickup")}
          >
            <Card.Img
              variant="top"
              src="https://www.smallpay.it/wp-content/uploads/2019/12/Debit_Credit_Card_Mockup_Another_Preview-1.png"
            />
            <Card.Body>
              <Card.Title className="text-center">Pagamento con Carta</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <Card
            style={{ cursor: "pointer" }}
            // onClick={() => deliveryMethod("home_delivery")}
          >
            <Card.Img variant="top" src="https://www.analistgroup.com/images/spedizione/contrassegno.png" />
            <Card.Body>
              <Card.Title className="text-center">Pagamento alla consegna oppure in negozio</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentMethodPage;
