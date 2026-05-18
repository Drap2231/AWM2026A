//Crear una instancia personalizada de axios para conectarnos a la api para conectarnos a 
import axios from "axios"

export const api = axios.create(
    {
        baseURL: import.meta.env.VITE_URL_BASE
        
    }
);
