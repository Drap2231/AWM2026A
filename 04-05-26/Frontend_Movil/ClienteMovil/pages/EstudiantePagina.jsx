import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';

const Estudiantes = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    // 10.0.2.2 si usas emulador de Android Studio, o la IP de tu PC si usas expo/celular real
    axios.get('http://192.168.100.245:8000/estudiantes')
      .then(response => {
        setLista(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log('Error al conectar con el backend: ' + error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de estudiantes:</Text>
      
      <ScrollView style={styles.scroll}>
        {
          lista.map((estudiante, i) => {
            return (
              <View key={i} style={styles.tarjetaEstudiante}>
                <Text style={styles.nombreText}> {estudiante.nombre}</Text>
                <Text style={styles.edadText}> Edad: {estudiante.edad} años</Text>
              </View>
            );
          })
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  scroll: {
    width: '100%',
    paddingHorizontal: 20,
  },
  tarjetaEstudiante: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // Sombra para Android
  },
  nombreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  edadText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  }
});

export default Estudiantes;