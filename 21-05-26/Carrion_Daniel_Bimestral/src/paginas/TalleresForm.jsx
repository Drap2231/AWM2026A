import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const TallereForm = (props) =>{
    const {onAgregar} = props
    const {nuevoTaller, setNuevoTaller} = useState(
        {
            id : 0,
            nombre : "",
            nivel : "",
            duracion : 0
        }
    )
    const navegar = useNavigate()
    const handlerSubmit = (e) =>{
        onAgregar(nuevoTaller)
        setNuevoTaller( {
            id : 0,
            nombre : "",
            nivel : "",
            duracion : 0
        })
        navegar("/talleres")

    }
    return(
        <div>
            <div><button onClick={() =>navegar("/talleres")}></button></div>
            <h1>Creae nuevo Taller</h1>
            <form onSubmit={onAgregar}>
                <div>
                    <label htmlFor="tall_Id">Id: </label>
                    <input type="number" name="tall_I" id="tall_I" value={nuevoTaller.id} onChange={(e)=>setNuevoTaller({...nuevoTaller, id: e.target.value})} placeholder="Ingrese el id" required />
                </div>
                <div>
                    <label htmlFor="tall_Nombre">Nombre: </label>
                    <input type="number" name="tall_Nombre" id="tall_Nombre" value={nuevoTaller.nombre} onChange={(e)=>setNuevoTaller({...nuevoTaller, nombre: e.target.value})} placeholder="ej: HOoks en REACT" required />
                </div>
                <div>
                    <label htmlFor="tall_nivel">Nombre: </label>
                    <select name="tall_nivel" id="tall_nivel" value={nuevoTaller.nivel} onChange={(e)=>setNuevoTaller({...nuevoTaller, nivel: e.target.value})}  required >
                        <option value="Basico">Basico</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="tall_duracion">duracion: </label>
                    <input type="number" name="tall_duracion" id="tall_duracion" value={nuevoTaller.duracion} onChange={(e)=>setNuevoTaller({...nuevoTaller, duracion: e.target.value})} placeholder="Ingrese la duracion " required />
                </div>
                <div>
                    <input type="submit" value="Agregar" />
                </div>
            </form>
        </div>
    )

}
export default TallereForm