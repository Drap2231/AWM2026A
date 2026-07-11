import { BrowserRouter, Routes, Route } from "react-router-dom";
import EstudianteFormulario from "./componentes/EstudianteFormulario";
import EstudiantePagina from "./paginas/EstudiantePagina";
import HomePage from "./paginas/HomePage";
import DetalleEstudiante from "./paginas/DetalleEstudiante";
import UsuarioLogin from "./paginas/UsuarioLogin";
import UsuarioRegistro from "./componentes/UsuarioRegistro"; 
import RutaProtegida from "./componentes/RutaProtegida";
import { useEstudiante } from "./gatillos/useEstudiante";

function App() {

  const {
    estudiantes,
    agregarEstudiante,
    eliminarEstudiante,
    editarEstudiante,
    loginUsuario,
    registrarUsuario, 
  } = useEstudiante();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/estudiantes"
          element={
            <RutaProtegida>
              <EstudiantePagina
                estudiantes={estudiantes}
                onEliminar={eliminarEstudiante}
              />
            </RutaProtegida>
          }
        />

<Route
  path="/nuevo"
  element={
    <RutaProtegida>
      <EstudianteFormulario onAgregar={agregarEstudiante} />
    </RutaProtegida>
  }
/>

        <Route path="/" element={<HomePage />} />

        <Route
          path="/estudiantes/:id/detalle"
          element={<DetalleEstudiante />}
        />

        <Route
          path="/estudiar/:id/editar"
          element={
            <RutaProtegida>
              <EstudianteFormulario onEditar={editarEstudiante} />
            </RutaProtegida>
          }
        />

        <Route
          path="/estudiantes/login"
          element={<UsuarioLogin onLogin={loginUsuario} />}
        />

        <Route
          path="/usuarios/registro"
          element={<UsuarioRegistro onRegistro={registrarUsuario} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;