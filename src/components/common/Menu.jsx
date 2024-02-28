import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();

  const logout = () => {
    //limpiar el session storage
    sessionStorage.removeItem("inicioRollingCoffee");
    //resetear el session storage
    setUsuarioLogueado("");
    //redireccionar a la pagina principal
    navegacion("/");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-bg-body-secondary navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" href="/">
            <Image
              src={logo}
              alt="logo-cafeteria"
              className="img-fluid"
              width={150}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className="nav-link" to="/" href="#home">
                Inicio
              </NavLink>
              {usuarioLogueado.length > 0 ? (
                <>
                  <NavLink className="nav-link" to="/administrador">
                    Adminsitrador
                  </NavLink>
                  <Link className="nav-link" variant="link" onClick={logout}>
                    LogOut
                  </Link>
                </>
              ) : (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
              <NavLink className="nav-link" to="error" href="#link">
                Registro
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
