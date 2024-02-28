import { useParams } from "react-router-dom";
import { obtenerProductoAPI } from "../../helpers/queries";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    verProductoInicio();
  }, []);

  const verProductoInicio = async () => {
    const respuesta = await obtenerProductoAPI(id);
    console.log(respuesta);
    if (respuesta.status === 200) {
      const datoProducto = await respuesta.json();
      setProducto(datoProducto);
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: "Intente realizar esta operacion en unos minutos",
        icon: "error",
      });
    }
  };

  return (
    <>
      <h1 className="text-center">Detalle del producto </h1>
      <div className="container-fluid">
        <hr />
      </div>
      <section className=" main mt-3 ">
        <article className="p-lg-5">
          <div className="d-flex container-fluid  justify-content-evenly align-content-center contenedor-detalle contenedor-img-detalle">
            <img
              className=" rounded-2 my-3 img-fluid img-detalle "
              src={producto.imagen}
              alt="producto-cafeteria"
            />
            <div className="ms-2">
              <h2 className="display-6 mt-2 text-md-center text-sm-center">
                {producto.nombreProducto}
              </h2>
              <hr />
              <p className="p-lg-5">{producto.descripcion_amplia}</p>
              <ul className="list-unstyled p-lg-5">
                <li>
                  <strong className="color">Categoria:</strong>{" "}
                  {producto.categoria}
                </li>
                <li>
                  <strong className="color">Precio:</strong> ${producto.precio}
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default DetalleProducto;
