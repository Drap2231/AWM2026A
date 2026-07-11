import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EstudiantesLista = ({ estudiantes, onEliminar, navigation, recargarLista }) => {
  const [esAdmin, setEsAdmin] = useState(false);

  // Verificar el rol del usuario al cargar la pantalla
  useEffect(() => {
    const verificarRol = async () => {
      const rol = await AsyncStorage.getItem("rol");
      setEsAdmin(rol === "admin");
    };
    verificarRol();
  }, []);

  const cerrarSesion = async () => {
    await AsyncStorage.clear();
    Alert.alert("Sesión cerrada", "Has salido de la aplicación.");
    navigation.replace("Login");
  };

  // Esta función define cómo se va a ver cada fila/tarjeta de estudiante
// 1. Asegúrate de que el contenedor principal de la tarjeta use el item.id como key
  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.tarjeta}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.edad}>Edad: {item.edad}</Text>
      {item.url ? <Text style={styles.url}>Link: {item.url}</Text> : null}
      
      <View style={styles.contenedorBotones}>
        <TouchableOpacity 
          style={styles.botonDetalle}
          onPress={() => navigation.navigate("DetalleEstudiante", { id: item.id })}
        >
          <Text style={styles.textoBoton}>Detalle</Text>
        </TouchableOpacity>

        {esAdmin && (
          <TouchableOpacity 
            style={styles.botonEliminar}
            onPress={() => onEliminar(item.id)}
          >
            <Text style={styles.textoBoton}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <View style={styles.barraSuperior}>
        <TouchableOpacity style={styles.botonSalir} onPress={cerrarSesion}>
          <Text style={styles.textoBoton}>Log Out</Text>
        </TouchableOpacity>

        {esAdmin && (
          <TouchableOpacity style={styles.botonAgregar} onPress={() => navigation.navigate("EstudianteFormulario")}>
            <Text style={styles.textoBoton}>+ Agregar</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.titulo}>Estudiantes</Text>

      {/* 2. Modifica el keyExtractor para asegurar que devuelva un String limpio */}
      <FlatList
        data={estudiantes}
        keyExtractor={(item) => String(item.id || item._id)}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={recargarLista}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
    paddingTop: 50,
  },
  barraSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  tarjeta: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  edad: {
    fontSize: 14,
    color: "#555",
    marginVertical: 2,
  },
  url: {
    fontSize: 12,
    color: "#007BFF",
  },
  contenedorBotones: {
    flexDirection: "row",
    marginTop: 10,
  },
  botonDetalle: {
    backgroundColor: "#007BFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 10,
  },
  botonEliminar: {
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  botonSalir: {
    backgroundColor: "#6c757d",
    padding: 8,
    borderRadius: 4,
  },
  botonAgregar: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 4,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default EstudiantesLista;