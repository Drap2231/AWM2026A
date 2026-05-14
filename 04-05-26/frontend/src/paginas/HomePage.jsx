import { Link } from "react-router-dom"
const HomePage = () => {
    return (
        <div> <h1>Bienvenido</h1>
            <Link to="/estudiantes">Lista de estudiantes</Link>
        </div>

    )
}

export default HomePage