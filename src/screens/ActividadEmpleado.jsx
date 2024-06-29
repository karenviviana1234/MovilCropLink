import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import axiosClient from '../axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActividadEmpleado = ({ route, navigation }) => {
  const { id } = route.params;
  const [actividad, setActividad] = useState({});
  const [observacion, setObservacion] = useState('');

  useEffect(() => {
    const obtenerDatosActividad = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado en AsyncStorage');
        }

        const response = await axiosClient.get(`/listara/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log('Datos de actividad obtenidos:', response.data);
        setActividad(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de la actividad:', error);
        Alert.alert('Error', 'Error al obtener los datos de la actividad');
        navigation.goBack();
      }
    };

    obtenerDatosActividad();
  }, [navigation, id]);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado en AsyncStorage');
      }

      await axiosClient.put(`/EmpleadoMood/Registrar/${id}`, { observacion }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      Alert.alert('Éxito', 'Observación Registrada exitosamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      Alert.alert('Error', 'Error al registrar la observación');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Actividad: {actividad.nombre_actividad}</Text>
        <Text style={styles.label}>Observaciones:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la observación"
          value={observacion}
          onChangeText={(text) => setObservacion(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos aquí
});

export default ActividadEmpleado;
