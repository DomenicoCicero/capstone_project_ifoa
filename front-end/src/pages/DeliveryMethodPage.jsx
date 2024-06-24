import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const DeliveryMethodPage = () => {
  const navigate = useNavigate();

  const deliveryMethod = method => {
    axios
      .post(`/api/delivery_method`, { delivery_method: method })
      .then(data => {
        console.log(data);
        navigate(`/${data.data.next_step}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container>
      <h1 className="my-4">Scegli se ritirare in negozio oppure spedizione a casa</h1>
      <Row>
        <Col xs={6}>
          <Card style={{ cursor: "pointer" }} onClick={() => deliveryMethod("store_pickup")}>
            <Card.Img
              variant="top"
              src="https://www.cittadelsole.it/files/content/consegna_in_negozio/20210310142847_ritiro.jpg"
            />
            <Card.Body>
              <Card.Title className="text-center">Ritiro in Negozio</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <Card style={{ cursor: "pointer" }} onClick={() => deliveryMethod("home_delivery")}>
            <Card.Img
              variant="top"
              src="https://www.colorboxcenter.it/wp-content/uploads/2020/03/consegna-a-domicilio-1.png"
            />
            <Card.Body>
              <Card.Title className="text-center">Spedizione a Casa</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryMethodPage;
