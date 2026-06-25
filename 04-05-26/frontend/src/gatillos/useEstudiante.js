import { useEffect, useState } from "react";
import { api } from "../utilidades/api";

export const useEstudiante = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Primero incia sesion");
    }
    api
      .get("/estudiantes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Respuesta estudiantes:", res.data);

        const datos = res.data.map((estudiante) => ({
          ...estudiante,
          id: estudiante._id || estudiante.id,
        }));

        setEstudiantes(datos);
      })
      .catch((err) => console.log(err));
  }, []);

  const agregarEstudiante = (nuevoEstudiante) => {
    return api.post("/estudiantes", nuevoEstudiante).then((res) => {
      const estudiante = {
        ...res.data,
        id: res.data._id || res.data.id,
      };

      setEstudiantes((prev) => [...prev, estudiante]);

      return res;
    });
  };

  const eliminarEstudiante = (id) => {
    api
      .delete(`/estudiantes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setEstudiantes((prev) => prev.filter((e) => e.id !== id));
      })
      .catch((err) => console.log(err));
  };

const editarEstudiante = (estudianteEditado) => {
  api
    .put(
      `/estudiantes/${estudianteEditado._id}`,
      estudianteEditado,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {

      const actualizado = res.data;

      setEstudiantes((prev) =>
        prev.map((estudiante) =>
          estudiante._id === actualizado._id
            ? actualizado
            : estudiante
        )
      );
    })
    .catch((err) => console.log(err));
};
  const loginEstudiante = (credenciales) => {
    return api
      .post("/estudiantes/login", credenciales)
      .then((res) => {
        console.log("Respuesta login:", res.data);
        console.log("Token:", res.data.token);

        localStorage.setItem("token", res.data.token);

        return {
          success: true,
          data: res.data,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response?.data?.message || "Login Failed",
        };
      });
  };

  return {
    estudiantes,
    agregarEstudiante,
    eliminarEstudiante,
    editarEstudiante,
    loginEstudiante,
  };
};
