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
<<<<<<< HEAD
  const{estudiantes, onEliminar} = props;
=======
  const { estudiantes, onEliminar } = props;
>>>>>>> 22cd8f4c2eb5ed65209f27021c43be70f5cbcd45

  console.log("renderizando...")

  const navegar = useNavigate()

  return (
    <div>
      {/* <Estudiante 
      nombre={"Daniel Carrion"} 
      edad= {23} 
      url = {"https://www.google.com"}
      />
        <Estudiante 
      nombre={"Anaela Pozo"} 
      edad= {21} 
      url = {"https://www.google.com"}
      />
       <Estudiante 
      nombre={"XD"} 
      edad= {50} 
      url = {"https://www.google.com"}
      />
     */}
      <h1>Estudiantes</h1>
<<<<<<< HEAD
      <button onClick={() => navegar("/nuevo")}>+</button>
=======
      <button onClick={()=>navegar("/nuevo")}>+</button>
>>>>>>> 22cd8f4c2eb5ed65209f27021c43be70f5cbcd45
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
<<<<<<< HEAD
          <button onClick={()=> onEliminar(estudiante.id)} >eliminar</button>
=======
          <button onClick={()=> onEliminar(estudiante.id)}>eliminar</button>
>>>>>>> 22cd8f4c2eb5ed65209f27021c43be70f5cbcd45
          </div>)
        })
      }

    </div>
  );
}
export default EstudiantePagina