import { Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  crearProductoAPI,
  editarProductoAPI,
  obtenerProductoAPI,
} from "../../../helpers/queries";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NuevoProducto = ({ editar, titulo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const { id } = useParams();
  const navegacion = useNavigate();

  /* Usamos el useEffect en el momento del montaje
   para leer solo el producto a editar desde
   la funcion de helpers queries, obtenerProductoAPI */
  useEffect(() => {
    //solo si estoy editando
    if (editar) {
      cargarDatosFormulario();
    }
  }, []);

  /* funcion cargar dato formulario */
  const cargarDatosFormulario = async () => {
    const respuesta = await obtenerProductoAPI(id);
    if (respuesta.status === 200) {
      const setProductoBuscado = await respuesta.json();
      console.log(setProductoBuscado);
      /* setear los datos del producto buscado-setValue */
      setValue("nombreProducto", setProductoBuscado.nombreProducto);
      setValue("imagen", setProductoBuscado.imagen);
      setValue("descripcion_breve", setProductoBuscado.descripcion_breve);
      setValue("descripcion_amplia", setProductoBuscado.descripcion_amplia);
      setValue("precio", setProductoBuscado.precio);
      setValue("categoria", setProductoBuscado.categoria);
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: "Intente realizar esta accion en unos minutos",
        icon: "error",
      });
    }
  };

  /* VAlidar Producto */
  const productoValidado = async (producto) => {
    try {
      if (editar) {
        //agregar la logica para editar el producto con la api
        const respuesta = await editarProductoAPI(id, producto);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Producto Editado",
            text: `El producto: ${producto.nombreProducto} fue editado correctamente`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: "Intente modifiacr este producto en unos minutos",
            icon: "error",
          });
        }
        //redireccionar
        navegacion("/administrador");
      } else {
        //Esta es la logica cuando quiero crear un producto
        const respuesta = await crearProductoAPI(producto);
        if (respuesta.status === 201) {
          //mensaje para el usuario
          Swal.fire({
            title: "Producto creado",
            text: `El producto: ${producto.nombreProducto} fue creado correctamente`,
            icon: "success",
          });
          reset();
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: "Intente crear este producto en unos minutos",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="main p-2">
        <h1>{titulo}</h1>
        <hr />
        {/* manejo de formulario */}
        <Form
          className="p-3 my-2 formulario"
          onSubmit={handleSubmit(productoValidado)}
        >
          {/*Producto  */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Producto*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              name="producto"
              {...register("nombreProducto", {
                required: "El nombre del producto es obligatorio",
                minLength: {
                  value: 2,
                  message: "Debe ingresar como minimo dos caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "Debe ingresar como maximo 50 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombreProducto?.message}
            </Form.Text>
          </Form.Group>
          {/* Precio */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Precio**</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: $100"
              name="precio"
              {...register("precio", {
                required: "Debe ingresar un monto",
                min: {
                  value: 50,
                  message: "Debe ingresar un valor entre 50 y 99999",
                },
                max: {
                  value: 99999,
                  message: "No debe superar el monto de 99999",
                },
                minLength: {
                  value: 2,
                  message: "El monto debe tener como minimo 2 caracteres",
                },
                maxLength: {
                  value: 5,
                  message: "Supera la cantidad de 5 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.precio?.message}
            </Form.Text>
          </Form.Group>
          {/* Imagen url */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Imagen URL</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              placeholder="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400"
              {...register("imagen", {
                required: "Debe ingresar una URL de imagen en formato png",
                pattern: {
                  value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/, // Asegura que la URL termine en ".jpg", ".jpeg", ".png" o ".gif"
                  message:
                    "La URL debe ser una imagen en formato JPG,jpeg ,PNG o GIF",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.imagen?.message}
            </Form.Text>
          </Form.Group>
          {/* Categoria */}
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Producto*</Form.Label>
            <Form.Select
              {...register("categoria", {
                required: "Debe seleccionar una categoria",
              })}
            >
              <option value="">Seleccione una Opción</option>
              <option value="infusiones">Infusiones</option>
              <option value="batidos">Batidos</option>
              <option value="cafeComun">Café Común</option>
              <option value="cafeEspecialidad">Café de especialidad</option>
              <option value="materiaPrima">Materia prima</option>
              <option value="panaderiaDulce">Panaderia Dulce</option>
              <option value="panaderiasalado">Panaderia Salado</option>
              <option value="bocadillos">Bocadillos</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.categoria?.message}
            </Form.Text>
          </Form.Group>
          {/* Descripción */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Descripción breve*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Un producto con un toque personal, asi , como en casa"
              name="descripcion_breve"
              {...register("descripcion_breve", {
                required: "Debe ingresar una descripcion",
                minLength: {
                  value: 3,
                  message: "La descripcion debe tener como minimo 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "La descripcion supera los caracteres validos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.descripcion_breve?.message}
            </Form.Text>
          </Form.Group>
          {/* Descripción Amplia*/}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Descripción Amplia*</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Ej: Espresso robusto con notas intensas de cacao y toques de avellana. Aromas potentes y cuerpo pleno, equilibrado con una sutil acidez. Ideal para quienes buscan una experiencia audaz y rica en cada sorbo."
              name="descripcion_amplia"
              {...register("descripcion_amplia", {
                required: "Debe ingresar una descripcion",
                minLength: {
                  value: 3,
                  message:
                    "La descripcion debe tener como minimo 50 caracteres",
                },
                maxLength: {
                  value: 260,
                  message: "La descripcion no debe superar los 250 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.descripcion_amplia?.message}
            </Form.Text>
          </Form.Group>
          <div className="text-center">
            <Button className="mb-2 py-2" variant="success" type="submit">
              Guardar <FontAwesomeIcon icon={faMugHot} />
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default NuevoProducto;
