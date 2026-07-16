import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Alert 
} from "react-native";

const UsuarioRegistro = ({ onRegistro, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("visualizador"); 
  const [error, setError] = useState("");

  const registrar = async () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const resultado = await onRegistro({ email, password, rol });

    if (resultado.success) {
      Alert.alert("Éxito", "Usuario registrado correctamente.");
      navigation.navigate("Login");
    } else {
      setError(resultado.message);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Crear Cuenta de Usuario</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Selecciona el Rol:</Text>
      <View style={styles.contenedorRoles}>
        <TouchableOpacity 
          style={[styles.botonRol, rol === "visualizador" && styles.rolActivo]} 
          onPress={() => setRol("visualizador")}
        >
          <Text style={rol === "visualizador" ? styles.textoActivo : styles.textoInactivo}>Visualizador</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.botonRol, rol === "admin" && styles.rolActivo]} 
          onPress={() => setRol("admin")}
        >
          <Text style={rol === "admin" ? styles.textoActivo : styles.textoInactivo}>Admin</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.botonEnviar} onPress={registrar}>
        <Text style={styles.textoBoton}>Registrar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 25, textAlign: "center" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 },
  contenedorRoles: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  botonRol: { flex: 1, padding: 10, borderWidth: 1, borderColor: "#ccc", alignItems: "center", borderRadius: 5, marginHorizontal: 5 },
  rolActivo: { backgroundColor: "#007BFF", borderColor: "#007BFF" },
  textoActivo: { color: "#fff", fontWeight: "bold" },
  textoInactivo: { color: "#000" },
  error: { color: "red", textAlign: "center", marginBottom: 15 },
  botonEnviar: { backgroundColor: "#28a745", padding: 12, borderRadius: 5, alignItems: "center" },
  textoBoton: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});

export default UsuarioRegistro;