import { useState } from 'react';
import useCurso from './hook/useCurso';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ListaCursos from './Paginas/ListaCursos';
import CrearCurso from './Componentes/CrearCurso';
import HomePage from './Paginas/HomePage';

function App() {
  const {cursos, agregarCurso} = useCurso()
  return(
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/cursos" element={<ListaCursos  cursos = {cursos}  />}></Route>
      <Route path="/crear" element={<CrearCurso onAgregar = {agregarCurso}/>}></Route>
      <Route path="/" element={<HomePage/>}></Route>
      
    </Routes>
    </BrowserRouter>
    </div>
  )


}

export default App
