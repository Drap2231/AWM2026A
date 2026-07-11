import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utilidades/api";

const EstudianteFormulario = (props) => {
  const { onAgregar, onEditar } = props;
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: "",
    edad: "",
    url: "",
  });

  const [errorNombre, setErrorNombre] = useState("");
  const [errorEdad, setErrorEdad] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  
  const navegar = useNavigate(); 
  const { id } = useParams();
  const editando = !!id;

  // Cargar los datos del estudiante si estamos editando
  useEffect(() => {
    if (editando) {
      api
        .get(`/estudiantes/${id}`)
        .then((res) => {
          setNuevoEstudiante({
            nombre: res.data.nombre || "",
            edad: res.data.edad || "",
            url: res.data.url || "",
          });
        })
        .catch((err) => console.log("Error al obtener estudiante:", err));
    }
  }, [id, editando]);

  const handlerSubmit = (e) => {
    e.preventDefault();

    // Validaciones del lado del cliente
    let validacionCorrecta = true;

    if (nuevoEstudiante.nombre.length < 8) {
      setErrorNombre("El nombre debe tener al menos 8 caracteres.");
      validacionCorrecta = false;
    } else {
      setErrorNombre("");
    }

    if (Number(nuevoEstudiante.edad) < 18) {
      setErrorEdad("Agrega bien la edad tonto (debe ser mayor o igual a 18)");
      validacionCorrecta = false;
    } else {
      setErrorEdad("");
    }

    // Si pasa las validaciones, enviamos al backend
    if (validacionCorrecta) {
      if (editando) {
        // Combinamos el ID con los datos para actualizar
        onEditar({ ...nuevoEstudiante, _id: id });
        navegar("/estudiantes");
      } else {
        onAgregar(nuevoEstudiante)
          .then(() => {
            // Limpiamos errores y formulario
            setErrorNombre("");
            setErrorEdad("");
            setErrorGeneral("");
            setNuevoEstudiante({
              nombre: "",
              edad: "",
              url: "",
            });
            // Redireccionamos directo a la lista de estudiantes
            navegar("/estudiantes");
          })
          .catch((err) => {
            setErrorGeneral(err.response?.data?.message || "Error al registrar estudiante");
          });
      }
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>{editando ? "Editar Estudiante" : "Agregar Estudiante"}</h2>
      <form onSubmit={handlerSubmit}>
        <div>
          <label htmlFor="est_Nombre">Nombre: </label>
          <input
            type="text"
            name="est_Nombre"
            id="est_Nombre"
            value={nuevoEstudiante.nombre}
            onChange={(e) =>
              setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })
            }
            placeholder="Ingresa Nombre"
            required
          />
          <div style={{ color: "red" }}>{errorNombre}</div>
        </div>
        <br />
        <div>
          <label htmlFor="est_edad">Edad: </label>
          <input
            type="number"
            name="est_edad"
            id="est_edad"
            value={nuevoEstudiante.edad}
            onChange={(e) =>
              setNuevoEstudiante({ ...nuevoEstudiante, edad: e.target.value })
            }
            placeholder="Ingresa Edad"
            required
          />
          <div style={{ color: "red" }}>{errorEdad}</div>
        </div>
        <br />
        <div>
          <label htmlFor="est_url">URL de Home Page: </label>
          <input
            type="text"
            name="est_url"
            id="est_url"
            value={nuevoEstudiante.url}
            onChange={(e) =>
              setNuevoEstudiante({ ...nuevoEstudiante, url: e.target.value })
            }
            placeholder="Ingresa url Home page"
          />
        </div>

        {errorGeneral && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorGeneral}</div>
        )}

        <br />
        <div>
          <input type="submit" value={editando ? "Actualizar" : "Agregar"} />
        </div>
      </form>
    </div>
  );
};

export default EstudianteFormulario;