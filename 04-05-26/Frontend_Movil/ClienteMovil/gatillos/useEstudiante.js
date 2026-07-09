import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utilidades/api";

export const useEstudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  const obtenerEstudiantes = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await api.get("/estudiantes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const datos = res.data.map((estudiante) => ({
        ...estudiante,
        id: estudiante._id || estudiante.id,
      }));

      setEstudiantes(datos);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarEstudiante = async (nuevoEstudiante) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await api.post(
        "/estudiantes",
        nuevoEstudiante,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const estudiante = {
        ...res.data,
        id: res.data._id || res.data.id,
      };

      setEstudiantes((prev) => [...prev, estudiante]);

      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const eliminarEstudiante = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");

      await api.delete(`/estudiantes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEstudiantes((prev) =>
        prev.filter((e) => e.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editarEstudiante = async (estudianteEditado) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await api.put(
        `/estudiantes/${estudianteEditado._id}`,
        estudianteEditado,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const actualizado = res.data;

      setEstudiantes((prev) =>
        prev.map((estudiante) =>
          estudiante._id === actualizado._id
            ? actualizado
            : estudiante
        )
      );

      return actualizado;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    estudiantes,
    agregarEstudiante,
    eliminarEstudiante,
    editarEstudiante,
    obtenerEstudiantes,
  };
};