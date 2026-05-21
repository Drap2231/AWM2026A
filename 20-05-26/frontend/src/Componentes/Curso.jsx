const Curso = (props) => {
    const {nombre, nivel, duracion} = props
    return (
        <div>
            <h1>{nombre}</h1>
            <h2>{nivel}</h2>
            <h3>{duracion}</h3>
        </div>
    )
}
export default Curso