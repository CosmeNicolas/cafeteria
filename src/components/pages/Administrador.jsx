import { Container, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {leerProductosAPI } from "../../helpers/queries";
import ItemProducto from './producto/ItemProducto'
import Swal from "sweetalert2";


const Administrador = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    traerProductos();
  }, []);

  const traerProductos = async () => {
    try {
      const respuesta = await leerProductosAPI();
      console.log(respuesta)
      if(respuesta.status === 200){
      const listaProductosAPI = await respuesta
      setProductos(listaProductosAPI);
      }
      const listaProductosAPI = await respuesta
      setProductos(listaProductosAPI);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Ocurrió un error en el servidor",
        text: "Intente realizar esta acción en unos minutos",
        icon: "error",
      });
    }
  };


  

  const borrarProductoAPI = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await borrarProductoAPI(id);
          if (respuesta.status === 200) {
            const productosActualizados = await leerProductosAPI()
            setProductos(productosActualizados)
            traerProductos();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

          } else {
            console.log("Error al borrar el producto:", respuesta.status);
            // Puedes manejar otros códigos de estado aquí si es necesario
          }
        } catch (error) {
          console.log("Error en la solicitud DELETE:", error);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      <Container className="main">
        <div className="d-flex justify-content-around">
          <h1>Productos Disponibles</h1>
          <Link to="/administrador/crear">
            <Button variant="success">
              <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
          </Link>
        </div>
        <hr />
        <Table responsive striped bordered hover  >
          <thead>
            <tr>
              <th>Cod</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>URLimg</th>
              <th>Categoría</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <ItemProducto
                key={producto._id}
                producto={producto}
                setProductos={setProductos}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Administrador;
