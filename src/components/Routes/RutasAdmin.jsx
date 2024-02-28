import { Route, Routes} from "react-router-dom"
import Administrador from '../pages/Administrador'
import NuevoProducto from '../pages/producto/NuevoProducto'

const RutasAdmin = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Administrador />} />
        <Route
          exact
          path="/crear"
          element={<NuevoProducto editar={false} titulo="Nuevo Producto" />}
        />
        <Route
          exact
          path="/editar/:id"
          element={<NuevoProducto editar={true} titulo="Editar Producto" />}
        />
      </Routes>
    </>
  );
};

export default RutasAdmin