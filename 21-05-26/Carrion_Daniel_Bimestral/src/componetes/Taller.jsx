import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
const Taller = (prop) =>{
const {id, nombre, nivel, duracion} = props
const navegar = useNavigate() 
return(
    <div>
        <div>
            <button onClick={() => navegar("/talleres")}>Volver</button>
        </div>

        <h1>{nombre}</h1>
        <div>
        <p> <strong>Nivel:</strong> {nivel}</p>
        </div>
        <div>
        <p><strong>Duracion:</strong> {duracion} horas </p>
        </div>
    </div>
)

}
export default Taller