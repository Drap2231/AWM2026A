import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_URL_BASE || "http://localhost:8000"
});

// Interceptor para adjuntar automáticamente el token JWT a todas las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
  
/*
1 crea un nuevo componente funcional detalleestudiante.jsx
2 Agregar una nueva ruta en la tabla en app.jsx /estudiante/:id/detalle
3solicitar al backend la informacion del estudiante con un get
4 redireccionamos de estudiantepage hacia detaleEstudiante usando usenavigate
*/