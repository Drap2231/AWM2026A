import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsuarioLogin = ({ onLogin, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const loguearUsuario = async () => {
    // Validar campos vacíos rápidamente en el celular
    if (!email || !password) {
      setErrorLogin("Por favor, llena todos los campos.");
      return;
    }

    const credenciales = { email, password };
    const resultado = await onLogin(credenciales);

    if (resultado.success) {
      setErrorLogin("");
      
      // En React Native guardamos el rol de forma asíncrona
      if (resultado.data?.rol) {
        await AsyncStorage.setItem("rol", resultado.data.rol);
      }
      
      // Alerta nativa de éxito
      Alert.alert("¡Bienvenido!", "Inicio de sesión correcto.");
      
      // Redireccionamos usando la navegación de React Native (React Navigation)
      navigation.replace("EstudiantesLista"); 
    } else {
      setErrorLogin(resultado.message);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
      
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@correo.com"
        value={email}
        onChangeText={(texto) => setEmail(texto)} // React Native usa onChangeText directamente
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={(texto) => setPassword(texto)}
        secureTextEntry={true} // Esto oculta los caracteres (tipo password)
        autoCapitalize="none"
      />

      {errorLogin ? <Text style={styles.error}>{errorLogin}</Text> : null}

      {/* Reemplazo táctil para el input submit de la Web */}
      <TouchableOpacity style={styles.boton} onPress={loguearUsuario}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>

      {/* Un botón extra por si quieren ir a registrarse */}
      <TouchableOpacity 
        style={styles.enlaceContenedor} 
        onPress={() => navigation.navigate("UsuarioRegistro")}
      >
        <Text style={styles.textoEnlace}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

// En React Native los estilos se manejan con StyleSheet
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  enlaceContenedor: {
    marginTop: 20,
    alignItems: "center",
  },
  textoEnlace: {
    color: "#007BFF",
    fontSize: 14,
  }
});

export default UsuarioLogin;