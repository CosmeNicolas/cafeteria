import { Navigate } from "react-router-dom";

const RutasProtegidas = ({children}) => {
  //aregga la logica para el adminis
  const admin = JSON.parse(sessionStorage.getItem(
    "inicioRollingCoffee")) || null ;
    //quiero saber si es el admin
    if(!admin){
        // si no es el admin redireccionar al login 
        return <Navigate to='/login' />
    }else{
        //si soy admin
        return children
    }
  }

export default RutasProtegidas