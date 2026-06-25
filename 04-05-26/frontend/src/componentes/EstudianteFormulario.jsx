import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utilidades/api";
const EstudianteFormulario = (props) => {
  const { onAgregar, onEditar } = props;
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: "",
    edad: "",
    url: "",
    email: "",
    password: "",
  });
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEdad, setErrorEdad] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const navegar = useNavigate(); //hook para navegar entre direccion de fronend
  const { id } = useParams();
  useEffect(() => {
    api
      .get(`/estudiantes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) =>
        setNuevoEstudiante((prev) => ({
        ...prev,
        ...res.data,
        password: "",
  }))
)
      .catch((err) => console.log(err));
  }, [id]);
  const editando = !!id;
  const handlerSubmit = (e) => {
    e.preventDefault();

    if (nuevoEstudiante.nombre.length >= 8 && nuevoEstudiante.edad >= 18) {
      if (editando) {
        onEditar(nuevoEstudiante);
        navegar(`/estudiantes`);

      } else {
        onAgregar(nuevoEstudiante)
          .then(() => {
            setErrorEmail("");
            setErrorNombre("");
            setErrorEdad("");
            setNuevoEstudiante({
              id: "",
              nombre: "",
              edad: 0,
              url: "",
              email: "",
              password: "",
            });
            navegar("/estudiantes/login");
          })
          .catch((err) => {
            setErrorEmail(err.response?.data?.message || "Error al registrar");
          });
      }
    }
    if (nuevoEstudiante.nombre.length <= 7) {
      setErrorNombre("oK");
    } else {
      setErrorNombre("");
    }
    if (nuevoEstudiante.edad < 18) {
      setErrorEdad("Agrega bien la edad tonto");
    } else {
      setErrorEdad("");
    }
  };
  return (
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
        <div>{errorNombre}</div>
      </div>
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
        <div>{errorEdad}</div>
      </div>
      <div>
        <label htmlFor="est_url">Url: </label>
        <input
          type="text"
          name="est_url"
          id="est_url"
          value={nuevoEstudiante.url}
          onChange={(e) =>
            setNuevoEstudiante({ ...nuevoEstudiante, url: e.target.value })
          }
          placeholder="Ingresa url Home page"
          required
        />
      </div>
      <div>
        <label htmlFor="txtEmail">Email: </label>
        <input
          type="email"
          id="txtEmail"
          name="email"
          value={nuevoEstudiante.email}
          onChange={(e) =>
            setNuevoEstudiante({ ...nuevoEstudiante, email: e.target.value })
          }
          placeholder="Ingresa la Email"
          required
        />
      </div>
      <div>{errorEmail}</div>
      <div>
        <label htmlFor="txtPassword">Password: </label>
        <input
          type="password"
          id="txtPassword"
          name="password"
          value={nuevoEstudiante.password}
          onChange={(e) =>
            setNuevoEstudiante({ ...nuevoEstudiante, password: e.target.value })
          }
          placeholder="Ingresa la password"
          required
        />
      </div>

      <div>
        <input type="submit" value={id ? "Actualizar" : "Agregar"} />
      </div>
    </form>
  );
};
export default EstudianteFormulario;
