import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../helpers/queries";
import Swal from "sweetalert2";


const Login = ({usuarioLogueado , setUsuarioLogueado}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacionInicio = useNavigate();

  const onSubmit = (usuario) => {
     if (login(usuario) === true) {
      //usuario logueado
      Swal.fire({
        title: "Usuario logueado",
        text: `EL usuario ${usuario.email} fue logueado correctamente`,
        icon: "success",
      });
      //almacenar el ususario logueado en el state
      setUsuarioLogueado(usuario.email)
      //redireccionar a la pagina de administrador
      navegacionInicio("/administrador");
    } else {
      //el ususario no se logueo
      Swal.fire({
        title: "Ocurrio un error en el Login",
        text: "El email o password son incorrecots",
        icon: "error",
      });
    }
  };

  return (
    <Container className="fondo-login " fluid>
      <h1 className=" title text-success text-decoration-underline text-center mt-5 ">
        SingUp
      </h1>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Card className="container-login d-flex flex-column align-content-center justify-content-center">
          <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
            {/* userName */}

            {/* email */}
            <Form.Group className="mb-3 text-light" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="py-2"
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "El email es obligatorio",
                  minLength: {
                    value: 4,
                    message: "El email debe contener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 250,
                    message:
                      "El email debe contener como máximo 250 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message:
                      "Ingrese una dirección de correo electrónico válida",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            {/* password */}
            <Form.Group
              className="mb-3 text-light"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="py-2"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "El password es obligatorio",
                  minLength: {
                    value: 8,
                    message: "el minimo es de 8 caracteres",
                  },
                  maxLength: {
                    value: 12,
                    message: "el maximo es de 15 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "El password debe contener al menos una letra mayúscula, una letra minúscula y un número",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            {/* formText */}
            <div className="d-flex flex-column">
              <Form.Text className=" text-light  ">
                Don't Have an Account
                <Link to="/" className="text-light ms-2">
                  Create Account
                </Link>
              </Form.Text>

              <Button
                /* onClick={handleSubmit} */ className="my-2 ms-2"
                variant="success"
                type="submit"
              >
                Login
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
