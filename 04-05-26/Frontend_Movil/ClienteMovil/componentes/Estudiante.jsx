const Estudiante = (props) => {
    //{nombre: "XXXX" edad: 00 url:"XXXXXXXXXXXXXX" }
    const {nombre, edad, url, email, password} = props
    return(
    <div>
        <h1>{nombre}</h1>
        <h2>{edad}</h2>
        <a href={url}>Home page</a>
    </div>
    );
}
export default Estudiante;