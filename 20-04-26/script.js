/*function saludar(){
    console.log("Hola")
}
saludar()*/

/*const InsertarEstudiante = () => {
    const titulo = document.getElementById("principal")
    titulo.style.backgroundColor = "red"
}*/
/*var estudiante = {id :1, nombre, nombre:"ok ok"}*/
const lstEstudiantes = [{id:1, nombre: "Anaela"},{id: 2,nombre:"Daniel"}]

/*lstEstudiantes.forEach(estudiante => {
    console.log(estudiante);
});*/


const renderizarListaEstudiantes = (event) =>  {
    const divContenedor = document.getElementById("contenedor");
    divContenedor.innerText = ""
    lstEstudiantes.forEach((estudiante) => {
        const itemEstudiante = document.createElement("p");
        itemEstudiante.innerText= estudiante.nombre;
        divContenedor.appendChild(itemEstudiante);
    });
}
const insertarEstudiante = () => {
    event.preventDefault()
    const nombreIngresado = document.getElementById("txtnombre").value
    lstEstudiantes.push({id: O, nombre : nombreIngresado})
    renderizarListaEstudiantes()
}