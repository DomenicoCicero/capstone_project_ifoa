import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ListGroup from "react-bootstrap/ListGroup";

const AdminPage = () => {
  const [categories, setcategories] = useState([]);

  const getAllCategories = () => {
    fetch("/api/categories")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        setcategories(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="home" title="Aggiungi Prodotto">
            Tab content for Home
          </Tab>
          <Tab eventKey="profile" title="Categorie">
            <Button type="button" id="first-button" className="my-3">
              Crea Nuova Categoria
            </Button>
            <ListGroup>
              {categories.map(category => {
                return (
                  <ListGroup.Item key={category.id}>
                    <div className="d-flex justify-content-between">
                      <span>{category.name}</span>
                      <div>
                        <Button type="button" variant="warning" className="me-2">
                          Modifica
                        </Button>
                        <Button type="button" variant="danger">
                          Elimina
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Tab>
          <Tab eventKey="contact" title="Ordini">
            Tab content for Contact
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default AdminPage;
