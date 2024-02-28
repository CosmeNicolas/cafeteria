import { Container, Image, Button } from "react-bootstrap";
import logoError from "../../../src/assets/error404.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <Container className="main">
        <div className="text-center d-flex align-items-center justify-content-center flex-column">
          <Image src={logoError} className="img-fluid me-4" />
          <Button as={Link} to="/" variant="success" className="my-2 py-2 ">
            Ir al Inicio
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Error;
