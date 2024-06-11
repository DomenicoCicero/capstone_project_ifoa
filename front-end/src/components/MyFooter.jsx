import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LuMapPin, LuPhone, LuMail, LuFacebook, LuInstagram } from "react-icons/lu";
import { Link } from "react-router-dom";

const MyFooter = () => {
  return (
    <Container fluid className="footer bg-secondColor pt-4 pb-1 mt-5">
      <Row className="text-center text-md-start">
        <Col md={3} className="mx-auto">
          <img
            src="https://static-00.iconduck.com/assets.00/shopping-cart-emoji-256x256-uz4p7t7e.png"
            alt="logo"
            className="w-50"
          />
          <div className="text-white icon-box mt-2">
            <p>
              <LuMapPin className="styled-icon me-1" /> Via Roma..., 90020 Palermo - PA
            </p>
            <p>
              <LuPhone className="styled-icon me-2" />
              3333333333
            </p>{" "}
            <p>
              <LuMail className="styled-icon me-2" />
              ciao@gmail.com
            </p>
          </div>
          <h6 className="text-white fw-bold mt-3">Seguici sui social:</h6>
          <Link className="btn-social" to={"/"}>
            <span className="icon-circle border-white text-white me-2">
              {" "}
              <LuFacebook />
            </span>
          </Link>
          <Link to={"/"}>
            <span className="icon-circle border-white text-white">
              {" "}
              <LuInstagram />
            </span>
          </Link>
        </Col>

        <Col md={3} lg={2} className="mx-auto mt-4">
          <h5 className="text-white text-uppercase fw-bold">informazioni</h5>

          <Link to={"#"} className="footer-link">
            Chi siamo
          </Link>

          <Link to={"#"} className="footer-link">
            Contatti
          </Link>

          <Link to={"#"} className="footer-link">
            Cookie Policy
          </Link>

          <Link to={"#"} className="footer-link">
            Privacy Policy
          </Link>
        </Col>

        <Col md={3} lg={2} className="mx-auto mt-4">
          <h5 className="text-white text-uppercase fw-bold">prodotti</h5>
          <Link to={"#"} className="footer-link">
            Tutti i prodotti
          </Link>
          <Link to={"#"} className="footer-link">
            Offerte
          </Link>
          <Link to={"#"} className="footer-link">
            Più venduti
          </Link>
          <Link to={"#"} className="footer-link">
            Più richiesti
          </Link>
        </Col>
        <Col md={3} className="mx-auto mt-4">
          <h5 className="text-white text-uppercase fw-bold">servizio clienti</h5>

          <Link to={"#"} className="footer-link">
            Il mio account
          </Link>
          <Link to={"#"} className="footer-link">
            Condizioni di vendita
          </Link>
          <Link to={"#"} className="footer-link">
            Spedizioni
          </Link>
          <Link to={"#"} className="footer-link">
            Metodi di Pagamento
          </Link>
        </Col>
      </Row>

      <hr className="green-divider mb-4" />
      <Row className="align-items-center text-white">
        <Col md={7} lg={8}>
          <p className="small mx-2">© Copyright 2024. All rights reserved | Carini Farm - P. iva ……. </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MyFooter;
