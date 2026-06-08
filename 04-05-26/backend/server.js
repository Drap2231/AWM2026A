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
/* Carpeta config
El proposito pricipal del mongus.config.js es para establecer la cadena de conexion(lugar donde se encuentra, credenciales, puerto) con el mongosdb
 - sincronizar los modelos que tengo creado en la aplicacion seb crea automaticamente las tablas dentro de la  base
 -Solo crear la cadena y realizar opercaiones dentro de de la palicaicon sin aleterar la baase
 
*/
/* Carpeta routes
Tambien se crea una carpeta routes en donde se crea un archivo por cada entidad dentro de la aplicacion en donde se asocian los endpoints asociados a la entidad 
*/
/* Carpeta controllers
aqui se implemnta la logiaa de rquerimiento y respuesta que antes se encontraba en el server.js
 */
/* Carpeta modelo
se definen la entidades que se mapean aprtir de la base de datos en donde se encuentra los atributos y tipos de atributos del mismo
 */
/* Carpeta services
se encarga de las validaciones de los campos
 */
/* Carpeta middlewear
 */
/* 
para exportar se hace: module.exports = contenidoAExportar
para importar se hace: const express = require("express")
*/
/*
    Mongo db guarda la informacion en un documento json un grupo de documento se los conoce como colecciones mongodb conpass no es el servidor
 */