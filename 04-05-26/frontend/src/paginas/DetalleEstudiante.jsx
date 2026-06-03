import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { api } from "../utilidades/api";
import { useNavigate } from "react-router-dom";
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
            <button onClick={()=> navegar(`/estudiar/${id}/editar`)}>Editar</button>
        </div>
    )
}
export default DetalleEstudiante