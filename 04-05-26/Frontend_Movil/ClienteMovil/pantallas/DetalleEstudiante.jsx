import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utilidades/api";

const DetalleEstudiante = ({ route, navigation }) => {
  // Obtenemos el id enviado por la navegación
  const { id } = route.params;
  
  const [estudiante, setEstudiante] = useState({});
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    // 1. Verificar si el rol actual es admin para habilitar el botón de editar
    const verificarRol = async () => {
      const rol = await AsyncStorage.getItem("rol");
      setEsAdmin(rol === "admin");
    };

    // 2. Traer la información específica de este estudiante
    api
      .get(`/estudiantes/${id}`)
      .then((res) => setEstudiante(res.data))
      .catch((err) => {
        console.log("Error al cargar detalle:", err);
        Alert.alert("Error", "No se pudieron cargar los datos del estudiante.");
      });

    verificarRol();
  }, [id]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloHeader}>Ficha del Estudiante</Text>
      
      <View style={styles.cajaDetalle}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.valor}>{estudiante.nombre || "Cargando..."}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.valor}>{estudiante.edad ? `${estudiante.edad} años` : "Cargando..."}</Text>

        <Text style={styles.label}>Página Web:</Text>
        <Text style={[styles.valor, estudiante.url ? styles.link : null]}>
          {estudiante.url || "No asignada"}
        </Text>
      </View>

      <View style={styles.contenedorAcciones}>
        {/* El botón de ir a editar solo aparece si eres Administrador */}
        {esAdmin ? (
          <TouchableOpacity 
            style={styles.botonEditar}
            onPress={() => navigation.navigate("EstudianteFormulario", { id: estudiante._id || estudiante.id })}
          >
            <Text style={styles.textoBoton}>Editar Datos</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.textoAviso}>* Modo Lectura: No tienes permisos para editar.</Text>
        )}

        <TouchableOpacity 
          style={styles.botonVolver}
          onPress={() => navigation.navigate("EstudiantesLista")}
        >
          <Text style={styles.textoBotonVolver}>Volver a la Lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  tituloHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  cajaDetalle: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginTop: 10,
  },
  valor: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },
  link: {
    color: "#007BFF",
  },
  contenedorAcciones: {
    marginTop: 10,
  },
  botonEditar: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  botonVolver: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6c757d",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  textoBotonVolver: {
    color: "#6c757d",
    fontWeight: "bold",
    fontSize: 16,
  },
  textoAviso: {
    color: "orange",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
  },
});

export default DetalleEstudiante;