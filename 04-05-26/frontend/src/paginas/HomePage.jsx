import { Link } from "react-router-dom"
const HomePage = () => {
    return (
        <div>
        <div> <h1>Bienvenido</h1>
            <Link to="/nuevo">Registor de estudiante nuevo</Link>
        </div>
          <div> 
            <Link to="/estudiantes/login">Log in</Link>
        </div>
        </div>
    )
}

export default HomePage