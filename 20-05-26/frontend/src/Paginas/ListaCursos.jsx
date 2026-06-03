import Curso from "../Componentes/Curso";
import {useNavigate} from "react-router-dom";
import CrearCurso from "../Componentes/CrearCurso";
const ListaCursos = (props) => {
    const {cursos} = props;
    const navegar = useNavigate()
    return(
        <div>
        <h1>Cursos</h1>
        <hr />
        {
            cursos.map((curso)=>{
                return (
                    <div key={curso.id}>
                        <Curso
                            nombre = {curso.nombre}
                            nivel = {curso.nivel}
                            duracion = {curso.duracion}
                        />
                        <button>Eliminar</button>
                    </div>
                )
            })
        }
        <button onClick={()=> navegar("/crear")} >Formulario Crear Curso</button>
        </div>
    )

}
export default ListaCursos