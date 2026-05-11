import { useState } from "react";
import Estudiante from "../componentes/Estudiante";
import {listaEstudiantes} from "../utilidades/data";
 import EstudianteFormulario from "../componentes/EstudianteFormulario";
const EstudiantePagina = () => {
  //1er paso
    const [lstEstudiantes,setlstEstudiantes] = useState(listaEstudiantes);
    
    console.log("renderizando...")
    const agregarEstudiante = (nuevoEstudiante) =>{
      //Temporalmente el ID SE CONSTRUYE CON LA FECHA ACTUAL DEL SISTEMA
      const estudianteFinal = {...nuevoEstudiante,id:Date.now()}
       setlstEstudiantes(prev => [...prev, estudianteFinal]); 
        
    }

    return(
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
    <EstudianteFormulario onAgregar = {agregarEstudiante}/>
    <hr />
     {
      
     lstEstudiantes.map((estudiante)=>{
      return <Estudiante
        key= {estudiante.id}
        nombre={estudiante.nombre}
        edad= {estudiante.edad}
        url = {estudiante.url}
      />
     })
    }

    </div>
    );
}
export default EstudiantePagina