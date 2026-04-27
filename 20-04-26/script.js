/*function saludar(){
    console.log("Hola")
}
saludar()*/

/*const InsertarEstudiante = () => {
    const titulo = document.getElementById("principal")
    titulo.style.backgroundColor = "red"
}*/
agregarEstudiante = () =>  {
    const divContenedor = document.getElementById("contenedor")
    const itemEstudiante = document.createElement("p")
    itemEstudiante.innerText="ok"
    divContenedor.appendChild(itemEstudiante)
}