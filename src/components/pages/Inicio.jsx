import { Image } from "react-bootstrap";
import cafeteria from "../../assets/cafeteria-salon.jpg";
import { leerProductosAPI } from "../../helpers/queries";
import { useEffect, useState } from "react";
import CardProducto from "./producto/CardProducto";
import logoCafe from "../../assets/coffee-cups.png";
import Swal from "sweetalert2";

const Inicio = () => {
  const [productos, setProductosInicio] = useState([]);

  useEffect(() => {
    leerProductosInicio();
  }, []);

  const leerProductosInicio = async () => {
    try {
      const respuesta = await leerProductosAPI();
      if (respuesta.status === 200) {
        const productosAPIinicio = await respuesta;
        setProductosInicio(productosAPIinicio);
      }
      const productosAPIinicio = await respuesta;
      setProductosInicio(productosAPIinicio);
    } catch (error) {
      Swal.fire({
        title: "Ocurrió un error en el servidor",
        text: "Intente realizar esta acción en unos minutos",
        icon: "error",
      });
      console.log(error);
    }
  };

  return (
    <>
      <section className="main">
        <div className="w-100">
          <Image className="imagen-banner img-fluid w-100  " src={cafeteria} />
        </div>
        <h1 className="text-center mt-2 py-2">
          <i>
            <Image src={logoCafe} alt="logo-cafe" />
          </i>
          Nuestros Productos
          <i>
            <img src={logoCafe} alt="logo-cafe" />
          </i>
        </h1>
        <div className="container-fluid">
          <hr />
        </div>
        <CardProducto productos={productos} />
      </section>
    </>
  );
};

export default Inicio;
