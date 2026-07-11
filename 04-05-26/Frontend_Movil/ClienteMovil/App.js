import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Estudiantes from './pages/EstudiantePagina'; 
import DetalleEstudiante from './pages/DetalleEstudiante'
const Stack = createNativeStackNavigator()
export default function App() {

  return (
   <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Estudiantes" component={Estudiantes}
      options = {{title: "Lista de estudiantes"}}/>
      <Stack.Screen name="DetalleEstudiante" component={DetalleEstudiante}
      options = {{title: "Detalle de estudiante"}}/>
      </Stack.Navigator>
 </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
});