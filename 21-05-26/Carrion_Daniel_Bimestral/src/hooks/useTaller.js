import { api } from "../utilidades/api"
import { useState } from "react"
import { useEffect } from "react"
export const useTaller = () =>{
const [lstTalleres, setLstTalleres] = useState([])
useEffect(()=>{
    api.get("/talleres")
    .then((res)=> setLstTalleres(res.data))
    .catch((err)=>console.log(err))
},[])
const agregarTaller = (nuevoTaller) =>{
    api.post("/talleres", nuevoTaller )
    .then((res)=>{
        setLstTalleres([...lstTalleres, res.data])
    })
    .catch((err)=>console.log(err))
}
return {lstTalleres, agregarTaller}

}