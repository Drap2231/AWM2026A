import { useEffect, useState } from "react";
import { api } from "../utilidades/api";

export const useEstudiante = () => {
    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        api.get("/estudiantes")
            .then((res) => {

                const datos = res.data.map(estudiante => ({
                    ...estudiante,
                    id: estudiante._id || estudiante.id
                }));

                setEstudiantes(datos);
            })
            .catch((err) => console.log(err));
    }, []);

    const agregarEstudiante = (nuevoEstudiante) => {
        api.post("/estudiantes", nuevoEstudiante)
            .then((res) => {

                const estudiante = {
                    ...res.data,
                    id: res.data._id || res.data.id
                };

                setEstudiantes(prev => [...prev, estudiante]);
            })
            .catch((err) => console.log(err));
    };

    const eliminarEstudiante = (id) => {
        api.delete(`/estudiantes/${id}`)
            .then(() => {
                setEstudiantes(prev =>
                    prev.filter(e => e.id !== id)
                );
            })
            .catch((err) => console.log(err));
    };

    const editarEstudiante = (estudianteEditado) => {
        api.put(`/estudiantes/${estudianteEditado._id||estudianteEditado.id}`, estudianteEditado)
            .then((res) => {

                const actualizado = {
                    ...res.data,
                    id: res.data._id || res.data.id
                };

                setEstudiantes(prev =>
                    prev.map(estudiante =>
                        estudiante.id === actualizado.id
                            ? actualizado
                            : estudiante
                    )
                );
            })
            .catch((err) => console.log(err));
    };

    return {
        estudiantes,
        agregarEstudiante,
        eliminarEstudiante,
        editarEstudiante
    };
};