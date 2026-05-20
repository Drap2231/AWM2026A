import EstudianteFormulario from "./componentes/EstudianteFormulario";
import EstudiantePagina from "./paginas/EstudiantePagina";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./paginas/HomePage";
import { useEstudiante } from "./gatillos/useEstudiante";
import DetalleEstudiante from "./paginas/DetalleEstudiante";
function App(){
  const {estudiantes, agregarEstudiante} = useEstudiante()
  return(
    //es jsx(solo lo que esta dentro del return)
    //<div>
    //  <EstudiantePagina/>
    //</div>
    <BrowserRouter>
    <Routes>
      <Route path="/estudiantes" element={<EstudiantePagina  estudiantes = {estudiantes}  />}></Route>
      <Route path="/nuevo" element={<EstudianteFormulario onAgregar = {agregarEstudiante}/>}></Route>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/estudiantes/:id/detalle" element={<DetalleEstudiante/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
