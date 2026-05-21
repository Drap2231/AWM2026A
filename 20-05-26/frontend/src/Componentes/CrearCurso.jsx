import { useState } from "react";
import {useNavigate} from "react-router-dom";
const CrearCurso = (props) => {
    const {onAgregar} = props
    const[nuevoCurso,setNuevoCurso]= useState({
        nombre : "",
        nivel : "",
        duracion : 0
})
    const [errorNombre, setErrorNombre] = useState("")
    const [errorDuracion, setErrorDuracion] = useState("")
    const navegar = useNavigate()
    const handlerSubmit = (e) => {
        e.preventDefault();
        if((nuevoCurso.nombre.length >= 5) && (10 >= nuevoCurso.duracion <= 100 )){
            onAgregar(nuevoCurso)
            setErrorNombre("")
            setErrorDuracion("")
            setNuevoCurso({nombre : "", nivel : "", duracion : 0})
            navegar("/cursos")
        }
        else{
            setErrorNombre("Pusiste mal el nombre debe contener 5 letras minimos")
            setErrorDuracion("La duracion debe ser entre 10 y 100 horas")
        }
        if(nuevoCurso.nombre.length <= 4){
            setErrorNombre("Pusiste mal el nombre debe contener 5 letras minimos")
        }
        if(10 < nuevoCurso.duracion > 100){
            setErrorDuracion("La duracion debe ser entre 10 y 100 horas")
        }
    } 
    return(
        <div>
            <h1>Formulario de creacion de curso</h1>
            <form onSubmit={handlerSubmit}>
                <div>
                <label htmlFor="cur_Nombre"><strong>Nombre: </strong></label>
                <input type="text" name="cur_Nombre" id="cur_Nombre" value={nuevoCurso.nombre} onChange={(e)=>setNuevoCurso({...nuevoCurso, nombre: e.target.value})} placeholder="Ingrese el nombre del curso" required />
                {errorNombre}
                </div>
                <div>
                <label htmlFor="cur_Nivel"><strong>Nivel:</strong></label>
                <select name="cur_Nivel" id="cur_Nivel" value={nuevoCurso.nivel} onChange={(e)=>setNuevoCurso({...nuevoCurso, nivel: e.target.value})} placeholder = "Escoge el nivle del curso" required >
                    <option value="Basico">Basico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>
                </div>
                <div>
                <label htmlFor="cur_Nombre"><strong>Duracion: </strong></label>
                <input type="number" name="cur_Duracion" id="cur_Duracion" value={nuevoCurso.duracion} onChange={(e)=>setNuevoCurso({...nuevoCurso, duracion: e.target.value})} placeholder="Ingrese la duracion del curso" required />
                {errorDuracion}
                </div>
                <div>
                    <input type="submit" value="Agregar" />
                </div>
            </form>
        </div>
    )
}
export default CrearCurso