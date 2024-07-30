import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert
} from 'react-native';
import axiosClient from '../axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ObservationModal = ({ visible, onClose, actividad, refreshData }) => {
  const [observacion, setObservacion] = useState('');

  const handleSubmit = async () => {
    if (observacion.trim() === '') {
      Alert.alert('Error', 'La observación no puede estar vacía');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado en AsyncStorage');
      }

      // Registrar observación
      const responseObservacion = await axiosClient.post(
        `/Registrar/${actividad.id_actividad}`,
        { observacion },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (responseObservacion.status === 200) {
        // Cambiar estado a "terminado"
        const responseEstado = await axiosClient.put(`/cambioestado/${actividad.id_actividad}`, { estado: 'terminado' });
        
        if (responseEstado.status === 200) {
          Alert.alert('Éxito', 'Observación registrada y actividad terminada exitosamente');
          onClose();
          refreshData(); // Refrescar los datos después de registrar la observación
        } else {
          Alert.alert('Error', 'No se pudo cambiar el estado a terminado');
        }
      } else {
        Alert.alert('Error', 'No se pudo registrar la observación');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      Alert.alert('Error', 'Error al registrar la observación');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Observación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese la observación"
            value={observacion}
            onChangeText={setObservacion}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrar Observación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  cancelButton: {
    backgroundColor: 'red'
  }
});

export default ObservationModal;
