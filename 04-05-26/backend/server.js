const express = require("express")
const app = express()
const puerto = 8000
/* res = es un objeto que contiene los metodos para responder a un la solicitud del cliente
_ para cuando no ocupamos alguno
Debe existir un cierre en el ciclo solicitud respuesta
*/
app.get("/", (req,  res)=> {
    console.log ("ejecutando endpoint")
    res.send ("HOLA MUNDO XDXD")
})
app.get("/estudiantes", (req,  res)=> {
    res.json ({"mensaje":"endpoint para obtener lista de estudiantes"})
} )
 app.get ("/estudiantes/:id/detalle",(req,  res)=> {
    const {id} = req.params
    res.json ({"mensaje":`endpoint para obtener estudiante con id ${id}`})
} )
app.delete("/estudiantes", (req,  res)=> {
    res.json ({"mensaje":"endpoint para obtener para eliminar"})
} )
app.listen (puerto, ()=>console.log("El servidor esta escuchando en el puerto:", puerto))
