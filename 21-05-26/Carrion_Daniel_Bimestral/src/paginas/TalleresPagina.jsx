import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import Taller from "../componetes/Taller"
const TalleresPagina = (props) => {
    const {talleres} = props
    const navegar = useNavigate()
    const {id} = useParams
    return(
        <div>
            <h1>Talleres de programacion</h1>
            <button onClick={()=>navegar("/crear")}>Crear Taller</button>
            <hr />
            {
                Talleres.map ( (talleres)=>{
                    return(
                        <div key={talleres.id}>
                            <Taller 
                                nombre = {talleres.nombre}
                                nivel = {talleres.duracion}
                            
                            />
                            <button onClick={()=>navegar(`/taller/${id}`)}>Ver Detalles</button>
                        </div>
                    )
                })

                
            }
        </div>
    )
}
export default TalleresPagina