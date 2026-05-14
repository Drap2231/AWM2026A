import { useEffect, useState } from "react";
import Estudiante from "../componentes/Estudiante";
//import {listaEstudiantes} from "../utilidades/data";
import EstudianteFormulario from "../componentes/EstudianteFormulario";
import axios from 'axios';
const EstudiantePagina = () => {
  //1er paso
  const [lstEstudiantes, setlstEstudiantes] = useState([]);
  //1.Peticion http usando axios 
  /*2.manejo de una promesa : Puede encontarse tres operacioneas(Pendiente,Exitoso,Fallido) es se maneja con un objeto promesa se usa 
  then(se coloca una fncion 1 y esta se encarga si exite una respuesta exitosa) y 
  catch (Funcion dos que se encarga de las respuesta fallida ) - otro con el stop y el await 
  */
  //3. Majeo de side-effects(es aquello que modifica un estado externo y que nop forme paret del calculo  del componente) utilizando un hook useEffect
  //Componente funcional Puro: Es determinista (Para una misma entra la salida sera la misma), No modifica un estado o variable externa 
  useEffect(() => {
    axios.get("http://172.31.45.20:8000/estudiantes")// Todo lo que se ejecuta en el axios.peticiones son operaciones asicronas
      .then((res) => {
        console.log(res);
        setlstEstudiantes(res.data)

      })
      .catch((err) => console.log(err))
  }, [])


  console.log("renderizando...")

  const agregarEstudiante = (nuevoEstudiante) => {
    //Temporalmente el ID SE CONSTRUYE CON LA FECHA ACTUAL DEL SISTEMA
    const estudianteFinal = { ...nuevoEstudiante, id: Date.now() }
    //setlstEstudiantes(prev => [...prev, estudianteFinal]); 
    axios.post("http://172.31.45.20:8000/estudiantes", estudianteFinal)// Todo lo que se ejecuta en el axios.peticiones son operaciones asicronas
      .then((res) => {
        setlstEstudiantes([...lstEstudiantes, res.data])

      })
      .catch((err) => console.log(err))
  }

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
      //Comentado porque se puso el formulario en otra pagina
      {/*<EstudianteFormulario onAgregar={agregarEstudiante} />*/}
      <hr />
      {

        lstEstudiantes.map((estudiante) => {
          return <Estudiante
            key={estudiante.id}
            nombre={estudiante.nombre}
            edad={estudiante.edad}
            url={estudiante.url}
          />
        })
      }

    </div>
  );
}
export default EstudiantePagina