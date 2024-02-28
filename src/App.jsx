import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./components/common/Menu";
import Inicio from "./components/pages/Inicio";
import Footer from "./components/common/Footer";
/* import Administrador from "./components/pages/Administrador"; */
import Error from "./components/pages/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* import NuevoProducto from "./components/pages/producto/NuevoProducto"; */
import DetalleProducto from "./components/pages/DetalleProducto";
import Login from "./components/pages/Login";
import RutasProtegidas from "./components/Routes/RutasProtegidas";
import RutasAdmin from "./components/Routes/RutasAdmin";
import { useState } from "react";

function App() {

  const usuario = JSON.parse(sessionStorage.getItem(
    "inicioRollingCoffee")) || '' ;
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario)


  return (
    <BrowserRouter>
      <Menu usuarioLogueado={usuarioLogueado}  setUsuarioLogueado={setUsuarioLogueado} />
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route
          exact
          path="/administrador/*"
          element={
            <RutasProtegidas>
              <RutasAdmin></RutasAdmin>
            </RutasProtegidas>
          }
        />
  
        <Route
          exact
          path="/administrador/detalle/:id"
          element={<DetalleProducto />}
        />
        <Route exact path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
