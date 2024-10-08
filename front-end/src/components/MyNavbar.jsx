import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuShoppingCart, LuUserCircle2 } from "react-icons/lu";
import UserDropdown from "./UserDropdown";
import CartIndicator from "./CartIndicator";

const MyNavbar = () => {
  const user = useSelector(state => {
    return state.user.user;
  });
  return (
    <Navbar expand="lg">
      <Container fluid className="mx-2">
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" className="border-0" />
        <Navbar.Brand className="text-center me-0">
          <Link to={"/"}>
            <img
              src="https://static-00.iconduck.com/assets.00/shopping-cart-emoji-256x256-uz4p7t7e.png"
              alt="logo"
              className="w-25"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="start"
        >
          <Offcanvas.Header className="border-bottom" closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">Menù</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto d-flex ">
              <Link to={"/"} className=" ms-2 nav-link">
                HOME
              </Link>
              <Link to={"/products"} className="ms-2  nav-link">
                PRODOTTI
              </Link>
              <Link to={"/about"} className=" ms-2 nav-link">
                CHI SIAMO
              </Link>
              <Link to={"/contacts"} className=" ms-2 nav-link">
                CONTATTI
              </Link>
              {user && user.role === "admin" && (
                <Link to={"/admin_page"} className=" ms-2 nav-link">
                  ADMIN
                </Link>
              )}
              {/* SOLO nel menu mobile e tablet */}
              {user && (
                <Container className="show-on-mobile px-2 mt-4">
                  <hr className="green-divider" />
                  <Link to={"/login"} className="nav-link">
                    <LuUserCircle2 className="fs-5 me-2 " />
                    ACCOUNT
                  </Link>
                  <Link to={"/cart"} className="nav-link">
                    <LuShoppingCart className="fs-5 me-2 " />
                    CARRELLO
                  </Link>
                </Container>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <div className="d-flex align-items-center me-4">
          {!user && (
            <>
              <Link to={"/login"} className="nav-link">
                <Button type="button" id="first-button">
                  Accedi
                </Button>
              </Link>
              <Link to={"/register"} className="nav-link">
                <Button type="button" className="ms-2" id="first-button">
                  Registrati
                </Button>
              </Link>
            </>
          )}
          {user && (
            <>
              <UserDropdown />
              <div className="ms-2">
                <CartIndicator />
              </div>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
