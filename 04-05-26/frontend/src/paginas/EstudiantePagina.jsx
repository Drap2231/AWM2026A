import Estudiante from "../componentes/Estudiante";
const EstudiantePagina = () => {
    return(
    <div>
      <Estudiante 
      nombre={"Daniel Carrion"} 
      edad= {23} 
      url = {"https://www.google.com"}
      />
        <Estudiante 
      nombre={"Anaela Pozo"} 
      edad= {21} 
      url = {"https://www.google.com"}
      />
       <Estudiante 
      nombre={"XD"} 
      edad= {50} 
      url = {"https://www.google.com"}
      />
    </div>
    );
}
export default EstudiantePagina