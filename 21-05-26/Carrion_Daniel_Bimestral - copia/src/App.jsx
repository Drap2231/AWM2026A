import { useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { useTaller } from './hooks/useTaller'
import TallereForm from './paginas/TalleresForm'
import TalleresPagina from './paginas/TalleresPagina'
import Taller from './componetes/Taller'

function App() {
  const {lstTalleres, agregarTaller} = useTaller()
  return(
  <BrowserRouter>
    <Routes>
      <Route path ="/talleres" element={<TalleresPagina talleres ={lstTalleres}/>}></Route>
      <Route path='/crear' element={<TallereForm onAgregar ={agregarTaller}/>}></Route>
      <Route path='/talleres/:id' element={<Taller/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
