import { Link } from "react-router-dom"
import ListaCursos from "./ListaCursos"
const HomePage = () => {
    return (
        <div> <h1>Bienvenido</h1>
            <Link to="/cursos">Lista de estudiantes</Link>
        </div>

    )
}

export default HomePage