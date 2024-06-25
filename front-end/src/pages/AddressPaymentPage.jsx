import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddressPaymentPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    phone: "",
    street: "",
    civic_number: "",
    city: "",
    postal_code: "",
  });
  const [addressEmpty, setAddressEmpty] = useState(false);

  const [errorsAddress, setErrorsAddress] = useState(null);
  const [showPage, setShowPage] = useState(false);
  const [success, setSuccess] = useState(false);

  const getAddress = () => {
    fetch(`/api/addresses`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        if (data.address !== "nessun idirizzo salvato") {
          setAddress(data.address);
        }
        setShowPage(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateAddress = e => {
    e.preventDefault();
    axios
      .post(`/api/addresses/update`, address)
      .then(response => {
        console.log(response);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        setErrorsAddress(err.response.data.errors);
      });
  };

  const changeStepShopOrder = () => {
    axios
      .post(`/api/change_step_shop_order`, { step: "payment_method_page" })
      .then(data => {
        console.log(data);
        navigate("/payment_method_page");
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Indirizzo di Spedizione</h1>
      {addressEmpty && (
        <div className="text-center mt-3">
          <Alert variant="success" className="custom-alert">
            <Alert.Heading>Inserisci un Indirizzo Valido</Alert.Heading>
          </Alert>
        </div>
      )}
      {!showPage && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="text-center">
            <Spinner animation="grow" variant="mainColor" />
          </div>
        </div>
      )}
      {showPage && (
        <>
          {success && (
            <div className="text-center mt-3">
              <Alert variant="success" className="custom-alert">
                <Alert.Heading>Indirizzo salvato con successo!</Alert.Heading>
              </Alert>
            </div>
          )}

          <Row>
            <Col>
              <Form onSubmit={updateAddress}>
                <Form.Group className="mb-3" controlId="formBasicStreet">
                  <Form.Label>Via/Piazza</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={e => {
                      setAddress({
                        ...address,
                        street: e.target.value,
                      });
                    }}
                    value={address.street}
                  />
                  {errorsAddress && <div className="error text-danger">{errorsAddress.street}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCivicNumber">
                  <Form.Label>Numero Civico</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={e => {
                      setAddress({
                        ...address,
                        civic_number: e.target.value,
                      });
                    }}
                    value={address.civic_number}
                  />
                  {errorsAddress && <div className="error text-danger">{errorsAddress.civic_number}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Numero Telefonico</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={e => {
                      setAddress({
                        ...address,
                        phone: e.target.value,
                      });
                    }}
                    value={address.phone}
                  />
                  {errorsAddress && <div className="error text-danger">{errorsAddress.phone}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>Città</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={e => {
                      setAddress({
                        ...address,
                        city: e.target.value,
                      });
                    }}
                    value={address.city}
                  />
                  {errorsAddress && <div className="error text-danger">{errorsAddress.city}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPostalCode">
                  <Form.Label>Codice Postale</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={e => {
                      setAddress({
                        ...address,
                        postal_code: e.target.value,
                      });
                    }}
                    value={address.postal_code}
                  />
                  {errorsAddress && <div className="error text-danger">{errorsAddress.postal_code}</div>}
                </Form.Group>

                <Button id="first-button" type="submit">
                  Salva
                </Button>
              </Form>
              <div className="d-flex justify-content-end">
                <Button
                  id="first-button"
                  type="submit"
                  onClick={() => {
                    if (
                      address.phone !== "" &&
                      address.street !== "" &&
                      address.civic_number !== "" &&
                      address.city !== "" &&
                      address.postal_code !== ""
                    ) {
                      changeStepShopOrder();
                    } else {
                      setAddressEmpty(true);
                      setTimeout(() => {
                        setAddressEmpty(false);
                      }, 1000);
                    }
                  }}
                >
                  Prosegui
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AddressPaymentPage;
