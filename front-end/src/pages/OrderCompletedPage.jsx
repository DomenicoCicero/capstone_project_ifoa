import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderCompletedPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 className="text-center my-3">Ordine Completato con Successo</h1>
      <Row className="justify-content-center">
        <Col xs={9}>
          <Card className="mt-4">
            <Card.Img
              variant="top"
              src="https://cdn.icon-icons.com/icons2/2774/PNG/512/order_completed_icon_176856.png"
            />
            <Card.Body>
              <Card.Title className="text-center">Ordine Completato</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="d-flex mt-4 justify-content-center">
        <Button type="button" id="first-button" onClick={() => navigate("/")}>
          Torna alla Home
        </Button>
      </div>
    </Container>
  );
};

export default OrderCompletedPage;
