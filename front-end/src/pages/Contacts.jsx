import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

import { LuMapPin, LuPhone, LuMail, LuFacebook, LuInstagram } from "react-icons/lu";

const Contacts = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row className="my-5 justify-content-center">
          <Col sm={12} md={10} lg={5} className="mb-2 mb-lg-4 py-4">
            <h3 className="fw-bold">
              Hai domande o hai bisogno di maggiori informazioni sui nostri servizi?
              <br />
              Non esitare a contattarci.
            </h3>
            <div className="icon-box mt-4">
              <p className="text-myGrey"> DOVE TROVARCI</p>
              <p>
                <LuMapPin strokeWidth={1} fill="#f48f02" className="styled-icon text-white" />
                Via Roma..., 90020 Palermo - PA
              </p>
              <p className="mt-4 text-myGrey">CONTATTACI</p>
              <p>
                <LuPhone strokeWidth={0} fill="#f48f02" className="styled-icon me-1 text-white" />
                3333333333
              </p>
              <p>
                <LuMail strokeWidth={1} fill="#f48f02" className="styled-icon me-1 text-white" />
                ciao@gmail.com
              </p>
              <p className="mt-4 text-myGrey">SEGUICI SUI SOCIAL</p>
              <Link type="button" id="first-button" className="icon-circle me-2">
                <LuFacebook />
              </Link>
              <Link type="button" id="first-button" className="icon-circle">
                <LuInstagram />
              </Link>
            </div>
          </Col>

          <Col sm={12} md={10} lg={6} className="offset-lg-1 mb-4 py-4">
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="">
                  <Form.Label className="label-of-forms">Nome</Form.Label>
                  <Form.Control type="text" placeholder="Nome" />
                </Form.Group>

                <Form.Group as={Col} controlId="">
                  <Form.Label className="label-of-forms">Cognome</Form.Label>
                  <Form.Control type="text" placeholder="Cognome" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="">
                  <Form.Label className="label-of-forms">Email</Form.Label>
                  <Form.Control type="email" placeholder="La tua mail" />
                </Form.Group>

                <Form.Group as={Col} controlId="">
                  <Form.Label className="label-of-forms">Numero di Telefono</Form.Label>
                  <Form.Control type="tel" placeholder="Numero di telefono" />
                </Form.Group>
              </Row>
              <Form.Group className="mb-4" controlId="">
                <Form.Label className="label-of-forms">Messaggio</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Scrivi quì il tuo messaggio" />
              </Form.Group>

              <Button type="submit" id="first-button" className="px-4">
                Invia Messaggio
              </Button>
            </Form>
          </Col>
        </Row>
        <div className="d-flex justify-content-start mt-5">
          <Button type="button" id="first-button" onClick={() => navigate("/")}>
            Torna alla HomePage
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Contacts;
