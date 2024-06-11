import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { LuUser2, LuLock, LuMail, LuKeyRound } from "react-icons/lu";
import { InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { login } from "../redux/actions";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState(null);

  const submitRegister = e => {
    e.preventDefault();
    axios
      .get(`/sanctum/csrf-cookie`)
      .then(() => {
        return axios.post(`/register`, formData);
      })
      .then(() => axios.get("/api/user"))
      .then(res => {
        dispatch(login(res.data));
        setUserName(res.data.name);
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 1300);
      })
      .catch(err => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      <Container>
        {showAlert && (
          <div className="d-flex justify-content-center align-items-start mt-2" style={{ height: "100vh" }}>
            <div className="text-center">
              <Alert variant="success">
                <Alert.Heading>Benvenuto, {userName}!</Alert.Heading>
                <p>Registrazione avvenuta con successo!</p>
                <p>Accesso effettuato!</p>
              </Alert>
            </div>
          </div>
        )}
        {!showAlert && (
          <Row className="vh-100 justify-content-center">
            <Col sm={12} md={8} lg={6} className="my-auto">
              <Form className="form-login-signup p-4" onSubmit={submitRegister}>
                <h2 className="fw-bold mb-4 text-center">Registrati</h2>
                <Form.Group className="mb-2" controlId="formGroupFirstName">
                  <Form.Label className="label-of-forms">Nome e Cognome</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <LuUser2 />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      className="form-control"
                      name="name"
                      required
                      onChange={e => {
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        });
                      }}
                      value={formData.name}
                    />
                  </InputGroup>
                  {errors && errors.name && <div className="error text-danger d-block">{errors.name}</div>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupEmail">
                  <Form.Label className="label-of-forms">Indirizzo E-mail</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <LuMail />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      onChange={e => {
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        });
                      }}
                      value={formData.email}
                    />
                  </InputGroup>
                  {errors && errors.email && <div className="error text-danger">{errors.email}</div>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupPassword">
                  <Form.Label className="label-of-forms">Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <LuLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      onChange={e => {
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        });
                      }}
                      value={formData.password}
                    />
                  </InputGroup>
                  {errors && errors.password && <div className="error text-danger">{errors.password}</div>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formGroupConfirmPassword">
                  <Form.Label className="label-of-forms">Conferma Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <LuKeyRound />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      className="form-control"
                      name="password_confirmation"
                      required
                      onChange={e => {
                        setFormData({
                          ...formData,
                          password_confirmation: e.target.value,
                        });
                      }}
                      value={formData.password_confirmation}
                    />
                  </InputGroup>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" id="first-button" className="my-4 " size="lg">
                    Registrati
                  </Button>
                </div>
                <p className="h6 small text-center">
                  Hai già un account?
                  <Link to={"/login"} className="link-mainColor text-decoration-none fw-bold ms-1">
                    Accedi.
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Register;
