import { useState } from "react";
import Estudiante from "../componentes/Estudiante";
import {listaEstudiantes}
 from "../utilidades/data";
const EstudiantePagina = () => {
    const [lstEstudiantes,setlstEstudiantes] = useState(listaEstudiantes);
    const [nuevoEstudiante, setNuevoEstudiante]=useState({
      id:Date.now(),
      nombre: "",
      edad: 0,
      url: ""
    })
    const handlerAgregarEstudiante = (e) =>{
      e.preventDefault();
       setlstEstudiantes([...lstEstudiantes, nuevoEstudiante]); 
       setNuevoEstudiante({...nuevoEstudiante, nombre:"", edad:0, url:""})
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
     <form onSubmit={handlerAgregarEstudiante}>
      <div>
        <label htmlFor="est_Nombre">Nombre: </label>
        <input type="text" name= "est_Nombre" id = "est_Nombre" value={nuevoEstudiante.nombre} onChange={(e)=> setNuevoEstudiante({...nuevoEstudiante, nombre: e.target.value}) } placeholder="Ingresa Nombre" required/>
      </div>
      <div>
        <label htmlFor="est_edad">Edad: </label>
        <input type="number" name= "est_edad" id = "est_edad" value={nuevoEstudiante.edad}  onChange={(e)=> setNuevoEstudiante({...nuevoEstudiante, edad: e.target.value})} placeholder="Ingresa Edad" required/>
      </div>
      <div>
        <label htmlFor="est_url">Url: </label>
        <input type="text" name= "est_url" id = "est_url" value={nuevoEstudiante.url}  onChange={(e)=> setNuevoEstudiante({...nuevoEstudiante, url: e.target.value})} placeholder="Ingresa url Home page" required/>
      </div>
      <div>
        <input type="submit" value="Agregar" />
      </div>
     </form>
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