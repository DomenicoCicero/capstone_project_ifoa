import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import { LuUser2, LuLock } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { login } from "../redux/actions";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const submitLogin = e => {
    e.preventDefault();
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/login", formData))
      .then(() => axios.get("/api/user"))
      .then(response => {
        console.log(response.data);
        dispatch(login(response.data));
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
                <Alert.Heading>Login avvenuto con successo!</Alert.Heading>
              </Alert>
            </div>
          </div>
        )}
        {!showAlert && (
          <Row className="mt-5 justify-content-center">
            <Col sm={12} md={8} lg={6} className="mt-4 mb-4 my-auto">
              <Form className="p-4 form-login-signup" onSubmit={submitLogin}>
                <h2 className="fw-bold mb-4 text-center">Accedi</h2>
                <Form.Group className="mb-2" controlId="formGroupEmail">
                  <Form.Label className="label-of-forms">Indirizzo E-mail</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <LuUser2 />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      required
                      className="form-control"
                      name="email"
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
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label className="label-of-forms">Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <LuLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      required
                      className="form-control"
                      name="password"
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
                <div className="d-grid">
                  <Button type="submit" id="first-button" className=" my-4 " size="lg">
                    Accedi
                  </Button>
                </div>

                <p className="h6 small text-center">
                  Non hai ancora creato il tuo profilo?
                  <Link to={"/register"} className="link-mainColor text-decoration-none fw-bold ms-1">
                    Registrati.
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

export default Login;
