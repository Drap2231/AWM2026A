import { useState } from "react";
import {useNavigate} from "react-router-dom"
const EstudianteFormulario = (props) => {
  const { onAgregar } = props;
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: "",
    edad: 0,
    url: ""
  })
  const [errorNombre, setErrorNombre] = useState("")
  const [errorEdad, setErrorEdad] = useState("")
  const navegar = useNavigate()
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("Hola")
    if ((nuevoEstudiante.nombre.length >= 8) && (nuevoEstudiante.edad >= 18)) {

      onAgregar(nuevoEstudiante)
      console.log(nuevoEstudiante)
      setErrorNombre("")
      setErrorEdad("")
      setNuevoEstudiante({ id: "", nombre: "", edad: 0, url: "" })
      navegar("/estudiantes")
    }
    if (nuevoEstudiante.nombre.length <= 7) {
      setErrorNombre("oK")
    }
    else {
      setErrorNombre("")
    }
    if (nuevoEstudiante.edad < 18) {
      setErrorEdad("Agrega bien la edad tonto")
    }
    else {
      setErrorEdad("")
    }
  }

  return (
    <form onSubmit={handlerSubmit}>
      <div>

        <label htmlFor="est_Nombre">Nombre: </label>
        <input type="text" name="est_Nombre" id="est_Nombre" value={nuevoEstudiante.nombre} onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })} placeholder="Ingresa Nombre" required />
        <div>
          {errorNombre}
        </div>
      </div>
      <div>
        <label htmlFor="est_edad">Edad: </label>
        <input type="number" name="est_edad" id="est_edad" value={nuevoEstudiante.edad} onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, edad: e.target.value })} placeholder="Ingresa Edad" required />
        <div>
          {errorEdad}
        </div>
      </div>
      <div>
        <label htmlFor="est_url">Url: </label>
        <input type="text" name="est_url" id="est_url" value={nuevoEstudiante.url} onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, url: e.target.value })} placeholder="Ingresa url Home page" required />
      </div>
      <div>
        <input type="submit" value="Agregar" />
      </div>
    </form>

  )
}
export default EstudianteFormulario