//import { useEffect, useState } from "react";
import Estudiante from "../componentes/Estudiante";
//import {listaEstudiantes} from "../utilidades/data";
import EstudianteFormulario from "../componentes/EstudianteFormulario";
//import axios from 'axios';
//import {api} from "../utilidades/api"
import { useEstudiante } from "../gatillos/useEstudiante";
import { useNavigate } from "react-router-dom";
const EstudiantePagina = (props) => {
  //1er paso
  //const [estudiantes, setEstudiantes] = useState([]);
  //1.Peticion http usando axios 
  /*2.manejo de una promesa : Puede encontarse tres operacioneas(Pendiente,Exitoso,Fallido) es se maneja con un objeto promesa se usa 
  then(se coloca una fncion 1 y esta se encarga si exite una respuesta exitosa) y 
  catch (Funcion dos que se encarga de las respuesta fallida ) - otro con el stop y el await 
  */
  //3. Majeo de side-effects(es aquello que modifica un estado externo y que nop forme paret del calculo  del componente) utilizando un hook useEffect
  //Componente funcional Puro: Es determinista (Para una misma entra la salida sera la misma), No modifica un estado o variable externa 
  /*useEffect(() => {
    api.get("/estudiantes")// Todo lo que se ejecuta en el axios.peticiones son operaciones asicronas
      .then((res) => {
        console.log(res);
        setEstudiantes(res.data)

      })
      .catch((err)=>console.log(err))
  }, [])*/

  const { estudiantes, onEliminar } = props;


  console.log("renderizando...")

  const navegar = useNavigate()
      const cerrarSesion = () => {
    localStorage.clear(); // Esto borra tanto el 'token' como el 'rol' de un solo golpe
    navegar("/estudiantes/login");
};
  return (
    <div>
     <button onClick={()=>cerrarSesion()}>log out</button>
    <br />
      <h1>Estudiantes</h1>

      <button onClick={()=>navegar("/nuevo")}>+</button>

      {/*<EstudianteFormulario onAgregar={agregarEstudiante} />*/}
      <hr />
      {

        estudiantes.map((estudiante) => {
          return (<div key={estudiante.id}>
            
           <Estudiante
            
            nombre={estudiante.nombre}
            edad={estudiante.edad}
            url={estudiante.url}
            
          />
          <button onClick={()=> navegar(`/estudiantes/${estudiante.id}/detalle`)}>Detalle</button>

          <button onClick={()=> onEliminar(estudiante.id)}>eliminar</button>

          </div>)
        })
      }

    </div>
  );
}
export default EstudiantePagina