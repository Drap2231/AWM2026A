import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <div> 
                <h1>Bienvenido</h1>
                <Link to="/nuevo">Registro de estudiante nuevo</Link>
            </div>
            <div> 
                <Link to="/estudiantes/login">Log in</Link>
            </div>
            {/* Agregamos el link al nuevo registro */}
            <div> 
                <Link to="/usuarios/registro">Crear una cuenta (Usuario)</Link>
            </div>
        </div>
    );
};

export default HomePage;