import EstudianteFormulario from "./componentes/EstudianteFormulario";
import EstudiantePagina from "./paginas/EstudiantePagina";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./paginas/HomePage";
function App(){
  return(
    //es jsx(solo lo que esta dentro del return)
    //<div>
    //  <EstudiantePagina/>
    //</div>
    <BrowserRouter>
    <Routes>
      <Route path="/estudiantes" element={<EstudiantePagina/>}></Route>
      <Route path="/nuevo" element={<EstudianteFormulario/>}></Route>
      <Route path="/home" element={<HomePage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
