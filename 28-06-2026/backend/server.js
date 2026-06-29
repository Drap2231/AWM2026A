require("./config/mongoose.config")
const express = require("express")
const cors = require("cors")
const app = express();


const PUERTO = 8000

const allUsuariosRoutes = require("./routes/usuario.routes")
const allRestauranteRoutes = require("./routes/restaurante.routes")

app.use(express.json())
app.use(cors())
allRestauranteRoutes(app)
allUsuariosRoutes(app)

app.listen(PUERTO, ()=>console.log("Servidor Iniciado en el puerto: ", PUERTO))
