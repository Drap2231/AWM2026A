import { useEffect, useState } from "react";
import { api } from "../utilidades/api"; // Asegúrate de ajustar la ruta de importación
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useEstudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  // 1. Obtener todos los estudiantes
  const cargarEstudiantes = () => {
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
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  // 2. Crear un estudiante
  const agregarEstudiante = (nuevoEstudiante) => {
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
    return api
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
        return res;
      });
  };

  // 5. Autenticación de Usuarios (AsyncStorage)
  const loginUsuario = async (credenciales) => {
    try {
      const res = await api.post("/usuarios/login", credenciales);
      
      // Guardamos de forma asíncrona en el dispositivo
      await AsyncStorage.setItem("token", res.data.token);
      if (res.data.rol) {
        await AsyncStorage.setItem("rol", res.data.rol);
      }

      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Credenciales incorrectas",
      };
    }
  };

  // 6. Registro de nuevos Usuarios
  const registrarUsuario = (nuevoUsuario) => {
    return api
      .post("/usuarios", nuevoUsuario)
      .then((res) => ({ success: true, data: res.data }))
      .catch((err) => ({
        success: false,
        message: err.response?.data?.message || "Error al registrar usuario",
      }));
  };

  return {
    estudiantes,
    agregarEstudiante,
    eliminarEstudiante,
    editarEstudiante,
    loginUsuario,
    registrarUsuario,
    recargarLista: cargarEstudiantes // Te servirá para hacer pull-to-refresh en el celular
  };
};