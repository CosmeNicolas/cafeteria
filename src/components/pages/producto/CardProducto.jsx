import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardProducto = ({ productos }) => {
  return (
    <>
      <Container>
        <Row>
          {productos.map((producto) => (
            <Col key={producto.id} lg={3} md={6}>
              <Card className="my-3 mx-1">
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  className="img-fluid img-card-inicio p-2"
                />
                <Card.Body>
                  <Card.Title className="title">
                    {producto.nombreProducto}
                  </Card.Title>
                  <Card.Text>{producto.descripcion_breve}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Link
                    className="btn btn-success title"
                    variant="success"
                    to={`administrador/detalle/${producto.id}`}
                  >
                    Ver Producto
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CardProducto;
