import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import axiosClient from '../axiosClient';


const ListarEmpleados = ({ navigation }) => {
  const [empleado, setEmpleado] = useState([]);
  const [formData, setFormData] = useState({ observacion: '' });

  const ObtenerDatos = async () => {
    try {
      const response = await axiosClient.get('/Listar');
      console.log('Datos obtenidos:', response.data);
      setEmpleado(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      Alert.alert('Error', 'Error al obtener los datos');
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

  const handleSubmit = async (id_actividad) => {
    try {
      await axiosClient.put(`/EmpleadoMood/Registrar/${id_actividad}`, formData);
      Alert.alert('Éxito', 'Observación Registrada exitosamente');
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      Alert.alert('Error', 'Error al registrar la observación');
    }
  };

  const Desactivar = async (id_actividad) => {
    try {
      await axiosClient.put(`/cambioestado/${id_actividad}`);
      ObtenerDatos(); // Refrescar los datos después de desactivar
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      Alert.alert('Error', 'Error al cambiar el estado');
    }
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = (`0${d.getDate()}`).slice(-2);
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Lista</Text>
      <ScrollView>
        {empleado.map((empleado, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>Actividad: {empleado.nombre_actividad}</Text>
            <Text style={styles.text}>Fecha inicio: {formatDate(empleado.fecha_inicio)}</Text>
            <Text style={styles.text}>Fecha fin: {formatDate(empleado.fecha_fin)}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ActiviadEmpleado', { id: empleado.id_actividad })}
            >
              <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListarEmpleados;
