import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import { api } from "../utilidades/api";

const EstudianteFormulario = ({ onAgregar, onEditar, route, navigation }) => {
  // Verificamos si pasamos un ID por la ruta (para saber si estamos editando)
  const id = route.params?.id;
  const editando = !!id;

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  // Si estamos editando, traemos los datos actuales desde el backend
  useEffect(() => {
    if (editando) {
      api.get(`/estudiantes/${id}`)
        .then((res) => {
          setNombre(res.data.nombre || "");
          setEdad(String(res.data.edad) || "");
          setUrl(res.data.url || "");
        })
        .catch((err) => console.log(err));
    }
  }, [id, editando]);

  const guardar = () => {
    if (nombre.length < 8) {
      setError("El nombre debe tener mínimo 8 letras.");
      return;
    }
    if (Number(edad) < 18) {
      setError("La edad debe ser mayor o igual a 18.");
      return;
    }

    const estudianteData = { nombre, edad: Number(edad), url };

    if (editando) {
      onEditar({ ...estudianteData, id })
        .then(() => {
          Alert.alert("Éxito", "Estudiante actualizado.");
          navigation.navigate("EstudiantesLista");
        });
    } else {
      onAgregar(estudianteData)
        .then(() => {
          Alert.alert("Éxito", "Estudiante guardado.");
          navigation.navigate("EstudiantesLista");
        })
        .catch((err) => setError(err.response?.data?.message || "Error al guardar"));
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>{editando ? "Editar Estudiante" : "Nuevo Estudiante"}</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Edad:</Text>
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <Text style={styles.label}>URL Home Page:</Text>
      <TextInput
        style={styles.input}
        placeholder="https://ejemplo.com"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.boton} onPress={guardar}>
        <Text style={styles.textoBoton}>{editando ? "Actualizar" : "Guardar"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: "#fff", paddingTop: 40 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 },
  error: { color: "red", textAlign: "center", marginBottom: 15 },
  boton: { backgroundColor: "#007BFF", padding: 12, borderRadius: 5, alignItems: "center" },
  textoBoton: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});

export default EstudianteFormulario;