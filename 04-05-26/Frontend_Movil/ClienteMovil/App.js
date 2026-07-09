import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Estudiantes from './pages/EstudiantePagina'; 

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <Estudiantes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
});