import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { login } from "../redux/actions";
import { Spinner } from "react-bootstrap";

const AccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => {
    return state.user.user;
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profile_imgData, setProfile_imgData] = useState({
    profile_img: "",
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState(null);
  const [errorsAddress, setErrorsAddress] = useState(null);
  const [showPage, setShowPage] = useState(false);

  const [address, setAddress] = useState({
    phone: "",
    street: "",
    civic_number: "",
    city: "",
    postal_code: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateProfileImg = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_img", profileImage);

    axios
      .post(`/api/update_profile_img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
        console.log(response);
        handleClose();
        axios.get("/api/user").then(res => {
          dispatch(login(res.data));
        });
      })
      .catch(error => {
        console.error("Error updating profile image", error);
        setErrors(error);
      });
  };

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
      })
      .catch(err => {
        console.log(err);
        setErrorsAddress(err.response.data.errors);
      });
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      {user && (
        <Container>
          <h1 className="text-center my-4">Dati Personali</h1>
          {!showPage && (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
              <div className="text-center">
                <Spinner animation="grow" variant="mainColor" />
              </div>
            </div>
          )}
          {showPage && (
            <>
              <Row>
                <Col xs={12} md={4} className="mb-4">
                  <div>
                    <div className="d-flex justify-content-center mt-3">
                      {!user.profile_img && (
                        <div className="profile-container-page">
                          <img
                            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgsaRe2zqH_BBicvUorUseeTaE4kxPL2FmOQ&s`}
                            alt=""
                            className="profile-container-page"
                          />
                        </div>
                      )}
                      {user.profile_img && (
                        <div className="profile-container-page">
                          <img src={`/storage/${user.profile_img}`} alt="" className="profile-image-page" />
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button
                        type="button"
                        id="first-button"
                        className="d-flex align-items-center"
                        onClick={handleShow}
                      >
                        <span>Edit </span>
                        <FaRegEdit className="ms-2" />
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Carica un'immagine profilo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form onSubmit={updateProfileImg}>
                            <Form.Group className="mb-3" controlId="profile_img">
                              <Form.Control
                                type="file"
                                name="profile_img"
                                onChange={e => {
                                  setProfile_imgData({
                                    ...profile_imgData,
                                    profile_img: e.target.value,
                                  });
                                  setProfileImage(e.target.files[0]);
                                }}
                              />
                              {errors && <div className="error text-danger">{errors.response.data.message}</div>}
                            </Form.Group>
                            <div className="d-flex">
                              <Button id="first-button" type="submit" className="ms-auto">
                                Carica
                              </Button>
                            </div>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={8} className="text-center">
                  <h3>Indirizzo</h3>
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
                </Col>
              </Row>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default AccountPage;
