import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UsuarioRegistro = (props) => {
  // onRegistro vendrá desde tu App.jsx mapeado a la función registrarUsuario del hook
  const { onRegistro } = props;
  const navegar = useNavigate();

  const [errorRegistro, setErrorRegistro] = useState("");
  const [nuevoUsuario, setNuevoUsuario] = useState({
    email: "",
    password: "",
    rol: "visualizador", // Rol por defecto
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const resultado = await onRegistro(nuevoUsuario);

    if (resultado.success) {
      setErrorRegistro("");
      alert("¡Usuario registrado con éxito!");
      navegar("/estudiantes/login"); // Redirecciona al login para que estrene su cuenta
    } else {
      setErrorRegistro(resultado.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Registrar Nuevo Usuario</h2>
      <form onSubmit={handlerSubmit}>
        <div>
          <label htmlFor="txtEmail">Email: </label>
          <input
            type="email"
            id="txtEmail"
            name="email"
            value={nuevoUsuario.email}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
            }
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="txtPassword">Contraseña: </label>
          <input
            type="password"
            id="txtPassword"
            name="password"
            value={nuevoUsuario.password}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
            }
            placeholder="Mínimo 6 caracteres"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="cmbRol">Rol asignado: </label>
          <select
            id="cmbRol"
            name="rol"
            value={nuevoUsuario.rol}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
            }
            required
          >
            <option value="visualizador">Visualizador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {errorRegistro && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorRegistro}</div>
        )}

        <br />
        <div>
          <input type="submit" value="Registrarse" />
        </div>
      </form>
    </div>
  );
};

export default UsuarioRegistro;