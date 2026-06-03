import EstudianteFormulario from "./componentes/EstudianteFormulario";
import EstudiantePagina from "./paginas/EstudiantePagina";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./paginas/HomePage";
import { useEstudiante } from "./gatillos/useEstudiante";
import DetalleEstudiante from "./paginas/DetalleEstudiante";
function App(){
<<<<<<< HEAD
  const {estudiantes, agregarEstudiante, eliminarEstudiante} = useEstudiante()
=======
  const {estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante} = useEstudiante()
>>>>>>> 22cd8f4c2eb5ed65209f27021c43be70f5cbcd45
  return(
    //es jsx(solo lo que esta dentro del return)
    //<div>
    //  <EstudiantePagina/>
    //</div>
    <BrowserRouter>
    <Routes>
<<<<<<< HEAD
      <Route path="/estudiantes" element={<EstudiantePagina  estudiantes = {estudiantes}  onEliminar = {eliminarEstudiante}/>}></Route>
      <Route path="/nuevo" element={<EstudianteFormulario onAgregar = {agregarEstudiante}/>}></Route>
=======
      <Route path="/estudiantes" element={<EstudiantePagina  estudiantes = {estudiantes} onEliminar={eliminarEstudiante} />}></Route>
      <Route path="/nuevo" element={<EstudianteFormulario onAgregar = {agregarEstudiante} />}></Route>
>>>>>>> 22cd8f4c2eb5ed65209f27021c43be70f5cbcd45
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/estudiantes/:id/detalle" element={<DetalleEstudiante/>}></Route>
      <Route path="/estudiar/:id/editar" element={<EstudianteFormulario onEditar={editarEstudiante}/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
