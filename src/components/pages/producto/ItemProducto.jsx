import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { leerProductosAPI, borrarProductoAPI } from "../../../helpers/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";



const ItemProducto = ({ producto, setProductos }) => {
  /* Funcion Borrar Producto */
  const borrarProducto = async() => {
    Swal.fire({
      title: "¿Estas seguro de eliminar el producto?",
      text: "No puedes revertir este proceso posteriormente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarProductoAPI(producto.id);
        if (respuesta.status === 200) {
          //actualizar la tabla
          const productosActualizados = await leerProductosAPI();
          setProductos(productosActualizados);

          Swal.fire({
            title: "Producto eliminado",
            text: `El producto "${producto.nombreProducto}" fue eliminado correctamente`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El producto "${producto.nombreProducto}" no fue eliminado, intente realizar esta operación en unos minutos`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <tr key={producto.id}>
        <td>{producto.id}</td>
        <td>{producto.nombreProducto}</td>
        <td>${producto.precio}</td>
        <td>
          <img
            className="img-fluid h-100 img-admin-producto"
            src={producto.imagen}
            alt=""
          />
        </td>
        <td>{producto.categoria}</td>
        <td className="d-flex py-5  justify-content-center">
          <Link
            variant="warning"
            className="me-1 btn btn-warning"
            to={`/administrador/editar/${producto.id}`}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
          <Button onClick={borrarProducto} variant="danger">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </td>
      </tr>
    </>
  );
};

export default ItemProducto;
