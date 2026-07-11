import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "./utilidades/api";

const EstudianteFormulario = ({ onAgregar, onEditar }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params || {};
  const editando = !!id;

  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: "",
    edad: "",
    url: "",
    email: "",
    password: "",
  });

  const [errorNombre, setErrorNombre] = useState("");
  const [errorEdad, setErrorEdad] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  useEffect(() => {
    if (editando) {
      cargarEstudiante();
    }
  }, []);

  const cargarEstudiante = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await api.get(`/estudiantes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNuevoEstudiante({
        ...res.data,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlerSubmit = async () => {
    let valido = true;

    if (nuevoEstudiante.nombre.length < 8) {
      setErrorNombre("El nombre debe tener al menos 8 caracteres.");
      valido = false;
    } else {
      setErrorNombre("");
    }

    if (Number(nuevoEstudiante.edad) < 18) {
      setErrorEdad("La edad debe ser mayor o igual a 18.");
      valido = false;
    } else {
      setErrorEdad("");
    }

    if (!valido) return;

    try {
      if (editando) {
        await onEditar(nuevoEstudiante);
        navigation.navigate("Estudiantes");
      } else {
        await onAgregar(nuevoEstudiante);

        setNuevoEstudiante({
          nombre: "",
          edad: "",
          url: "",
          email: "",
          password: "",
        });

        navigation.navigate("Login");
      }
    } catch (error) {
      setErrorEmail(
        error.response?.data?.message || "Error al registrar."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre"
        value={nuevoEstudiante.nombre}
        onChangeText={(text) =>
          setNuevoEstudiante({
            ...nuevoEstudiante,
            nombre: text,
          })
        }
      />

      {!!errorNombre && (
        <Text style={styles.error}>{errorNombre}</Text>
      )}

      <Text>Edad</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa la edad"
        keyboardType="numeric"
        value={String(nuevoEstudiante.edad)}
        onChangeText={(text) =>
          setNuevoEstudiante({
            ...nuevoEstudiante,
            edad: text,
          })
        }
      />

      {!!errorEdad && (
        <Text style={styles.error}>{errorEdad}</Text>
      )}

      <Text>URL</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa la URL"
        value={nuevoEstudiante.url}
        onChangeText={(text) =>
          setNuevoEstudiante({
            ...nuevoEstudiante,
            url: text,
          })
        }
      />

      {!!errorEmail && (
        <Text style={styles.error}>{errorEmail}</Text>
      )}

      <TouchableOpacity
        style={styles.boton}
        onPress={handlerSubmit}
      >
        <Text style={styles.textoBoton}>
          {editando ? "Actualizar" : "Agregar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EstudianteFormulario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});