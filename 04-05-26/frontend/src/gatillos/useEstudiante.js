import { useEffect, useState } from "react";
import { api } from "../utilidades/api";

export const useEstudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  // 1. Obtener todos los estudiantes
  useEffect(() => {
    api
      .get("/estudiantes")
      .then((res) => {
        const datos = res.data.map((estudiante) => ({
          ...estudiante,
          id: estudiante._id || estudiante.id,
        }));
        setEstudiantes(datos);
      })
      .catch((err) => console.log("Error al cargar estudiantes:", err));
  }, []);

  // 2. Crear un estudiante (Solo datos del estudiante: nombre, edad, url)
  const agregarEstudiante = (nuevoEstudiante) => {
    // Mandamos solo lo que pide el modelo de Estudiante
    const { nombre, edad, url } = nuevoEstudiante;
    return api.post("/estudiantes", { nombre, edad, url }).then((res) => {
      const estudiante = {
        ...res.data,
        id: res.data._id || res.data.id,
      };
      setEstudiantes((prev) => [...prev, estudiante]);
      return res;
    });
  };

  // 3. Eliminar estudiante
  const eliminarEstudiante = (id) => {
    api
      .delete(`/estudiantes/${id}`)
      .then(() => {
        setEstudiantes((prev) => prev.filter((e) => e.id !== id));
      })
      .catch((err) => console.log("Error al eliminar:", err));
  };

  // 4. Editar estudiante
  const editarEstudiante = (estudianteEditado) => {
    const id = estudianteEditado._id || estudianteEditado.id;
    api
      .put(`/estudiantes/${id}`, estudianteEditado)
      .then((res) => {
        const actualizado = res.data;
        setEstudiantes((prev) =>
          prev.map((estudiante) =>
            (estudiante._id === actualizado._id || estudiante.id === actualizado._id)
              ? { ...actualizado, id: actualizado._id }
              : estudiante
          )
        );
      })
      .catch((err) => console.log("Error al editar:", err));
  };

  // 5. Autenticación de Usuarios (Sincronizado con POST /usuarios/login)
  const loginUsuario = (credenciales) => {
    return api
      .post("/usuarios/login", credenciales)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        return {
          success: true,
          data: res.data, // Contiene email, rol, token
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.data?.message || "Credenciales incorrectas",
        };
      });
  };

  // 6. Registro de nuevos Usuarios (Sincronizado con POST /usuarios)
  const registrarUsuario = (nuevoUsuario) => {
    return api
      .post("/usuarios", nuevoUsuario)
      .then((res) => {
        return {
          success: true,
          data: res.data,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.data?.message || "Error al registrar usuario",
        };
      });
  };

  return {
    estudiantes,
    agregarEstudiante,
    eliminarEstudiante,
    editarEstudiante,
    loginUsuario,
    registrarUsuario,
  };
};