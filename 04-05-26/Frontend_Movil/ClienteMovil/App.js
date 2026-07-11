import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tu hook adaptado para mobile
import { useEstudiante } from './gatillos/useEstudiante';

// Importa todas las vistas que acabamos de portar
import UsuarioLogin from './pantallas/UsuarioLogin';
import UsuarioRegistro from './pantallas/UsuarioRegistro';
import EstudiantesLista from './pantallas/EstudiantesLista';
import EstudianteFormulario from './pantallas/EstudianteFormulario';
import DetalleEstudiante from './pantallas/DetalleEstudiante';

const Stack = createNativeStackNavigator();

export default function App() {
  const { 
    estudiantes, 
    agregarEstudiante, 
    eliminarEstudiante, 
    editarEstudiante, 
    loginUsuario, 
    registrarUsuario,
    recargarLista 
  } = useEstudiante();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        
        {/* 1. Login */}
        <Stack.Screen name="Login">
          {(props) => <UsuarioLogin {...props} onLogin={loginUsuario} />}
        </Stack.Screen>

        {/* 2. Registro de Usuario */}
        <Stack.Screen name="UsuarioRegistro">
          {(props) => <UsuarioRegistro {...props} onRegistration={registrarUsuario} />}
        </Stack.Screen>

        {/* 3. Lista de Estudiantes */}
        <Stack.Screen name="EstudiantesLista">
          {(props) => (
            <EstudiantesLista 
              {...props} 
              estudiantes={estudiantes} 
              onEliminar={eliminarEstudiante}
              recargarLista={recargarLista}
            />
          )}
        </Stack.Screen>

        {/* 4. Formulario (Crea y Edita) */}
        <Stack.Screen name="EstudianteFormulario">
          {(props) => (
            <EstudianteFormulario 
              {...props} 
              onAgregar={agregarEstudiante} 
              onEditar={editarEstudiante} 
            />
          )}
        </Stack.Screen>

        {/* 5. Detalle del Estudiante */}
        <Stack.Screen name="DetalleEstudiante" component={DetalleEstudiante} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}