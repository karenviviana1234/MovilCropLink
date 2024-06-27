import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
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

  const getStatusStyle = (estado) => {
    const colors = {
      activo: { backgroundColor: "#D1F4E0", color: "#12A150" },     // Verde
      inactivo: { backgroundColor: "#FDD0DF", color: "#DC3545" },   // Rojo
      proceso: { backgroundColor: "#FDEDD3", color: "#C4841D" },    // Amarillo
      terminado: { backgroundColor: "#E4D4F4", color: "#6C757D" }   // Morado
    };

    return {
      backgroundColor: colors[estado]?.backgroundColor || 'transparent',
      color: colors[estado]?.color || '#000',
      /*  backgroundColor: colors[estado]?.backgroundColor || 'transparent',
       color: colors[estado]?.color || '#000',
       paddingVertical: 2,
       paddingHorizontal: 10,
       borderRadius: 10,
       marginRight: 130, */

    };
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={require('../assets/logoprueba.png')} style={styles.logo} />
        <Text style={styles.txtheader}>Actividades Asignadas</Text>
      </View>
      <ScrollView>
        {empleado.map((empleado, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.leftText}>Actividad</Text>
              <Text style={styles.middleText}>{empleado.nombre_actividad}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Estado</Text>
              <Text style={[styles.middleTextEstado, getStatusStyle(empleado.estado)]}>{empleado.estado}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Fecha inicio</Text>
              <Text style={styles.middleText}>{formatDate(empleado.fecha_inicio)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.leftText}>Fecha fin</Text>
              <Text style={styles.middleText}>{formatDate(empleado.fecha_fin)}</Text>
            </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    paddingRight: 30,
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    marginHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 50,
    marginBottom: 10,
  },
  txtheader: {
    fontSize: 24,
    textAlign: 'center',
    color: 'green',
    fontWeight: '600',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    flex: 1,
  },
  middleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    /* paddingRight: 120, */
    paddingRight: 120,
  },
  middleTextEstado: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 150,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10, // Cambié 100 a 10 para una mejor apariencia
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-end', // Esto alinea el botón al lado derecho
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListarEmpleados;
