//Crear una instancia personalizada de axios para conectarnos a la api para conectarnos a 
import axios from "axios"

export const api = axios.create(
    {
        baseURL: import.meta.env.VITE_URL_BASE
        
    }
);
/*
1 crea un nuevo componente funcional detalleestudiante.jsx
2 Agregar una nueva ruta en la tabla en app.jsx /estudiante/:id/detalle
3solicitar al backend la informacion del estudiante con un get
4 redireccionamos de estudiantepage hacia detaleEstudiante usando usenavigate
*/