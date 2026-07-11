import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UsuarioLogin = (props) => {
  // onLogin vendrá desde tu App.jsx mapeado a la función loginUsuario del hook
  const { onLogin } = props;
  const navegar = useNavigate();

  const [errorLogin, setErrorLogin] = useState("");

  const [usuarioLogin, setUsuarioLogin] = useState({
    email: "",
    password: "",
  });

  const loguearUsuario = async (e) => {
    e.preventDefault();

    const resultado = await onLogin(usuarioLogin);

    if (resultado.success) {
      setErrorLogin("");
      // Guardamos opcionalmente el rol por si lo necesitas para la interfaz
      if (resultado.data?.rol) {
        localStorage.setItem("rol", resultado.data.rol);
      }
      // Redireccionamos a la página principal de estudiantes
      navegar("/estudiantes");
    } else {
      setErrorLogin(resultado.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={loguearUsuario}>
        <div>
          <label htmlFor="txtEmail">Email: </label>
          <input
            type="email"
            id="txtEmail"
            name="email"
            value={usuarioLogin.email}
            onChange={(e) =>
              setUsuarioLogin({ ...usuarioLogin, email: e.target.value })
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
            value={usuarioLogin.password}
            onChange={(e) =>
              setUsuarioLogin({ ...usuarioLogin, password: e.target.value })
            }
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        
        {errorLogin && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorLogin}</div>
        )}
        
        <br />
        <div>
          <input type="submit" value="Ingresar" />
        </div>
      </form>
    </div>
  );
};

export default UsuarioLogin;