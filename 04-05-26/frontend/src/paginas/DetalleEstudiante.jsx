import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { api } from "../utilidades/api";
<<<<<<< HEAD
import { useEstudiante } from "../gatillos/useEstudiante";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 22cd8f4c2eb5ed65209f27021c43be70f5cbcd45
//Se lo visita a traves del path /estudiante/:id/detalle
const DetalleEstudiante = () => {
    const [estudiante, setEstudiante] = useState({});
    const { id } = useParams();//Se le llam igual que en el path
    const navegar = useNavigate();
    useEffect( () => {
        api.get(`/estudiantes/${id}`)   
        .then((res=> setEstudiante(res.data)))
        .catch(err => console.log(err))
    }    
        ,[])
    return(
        <div>
            <h2>{estudiante.nombre}</h2>
            <h4>Edad: {estudiante.edad}</h4>
            {estudiante.url?<a href="{estudiante.url}">Home Page</a> : <span>Mal</span> }
<<<<<<< HEAD
            <br />
            <button>Editar</button>
=======
            <button onClick={()=> navegar(`/estudiar/${id}/editar`)}>Editar</button>
>>>>>>> 22cd8f4c2eb5ed65209f27021c43be70f5cbcd45
        </div>
    )
}
export default DetalleEstudiante