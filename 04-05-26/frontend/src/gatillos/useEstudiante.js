//Vamos a crear un hook (use) que maneje un crud y el estado de la lista de estudiantes junto a la API
import { useEffect, useState } from "react";
import {api} from "../utilidades/api"
export const useEstudiante = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    useEffect(() => {
    api.get("/estudiantes")// Todo lo que se ejecuta en el axios.peticiones son operaciones asicronas
      .then((res) => {
        setEstudiantes(res.data)
      })
      .catch((err)=>console.log(err))
    }, [])
     const agregarEstudiante = (nuevoEstudiante) => {

    api.post("/estudiantes", nuevoEstudiante)// Todo lo que se ejecuta en el axios.peticiones son operaciones asicronas
      .then((res) => {
        setEstudiantes(prev=>([...prev, res.data]))
      })
      .catch((err) => console.log(err))
  }
    return{estudiantes, agregarEstudiante}
  const eliminarEstudiante = () => {
    api.delete(`/estudiantes/${id}`)
    
  } 
}