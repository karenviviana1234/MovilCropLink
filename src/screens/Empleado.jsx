import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import axiosClient from '../axiosClient';
import ObservationModal from './ObservationModal';

const Empleado = ({ navigation }) => {
  const [empleado, setEmpleado] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const ObtenerDatos = async () => {
    try {
      const response = await axiosClient.get('/Listar');
      console.log('Datos obtenidos:', response.data);
      const activeData = response.data.filter(item => item.estado !== 'inactivo');
      setEmpleado(activeData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      Alert.alert('Error', 'Error al obtener los datos');
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

  const openModal = (actividad) => {
    setSelectedActividad(actividad);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedActividad(null);
    setModalVisible(false);
  };

  const handleIniciar = async (actividad) => {
    try {
      const responseEstado = await axiosClient.put(`/cambioestado/${actividad.id_actividad}`);
      if (responseEstado.status === 200) {
        const updatedEmpleado = empleado.map(emp =>
          emp.id_actividad === actividad.id_actividad
            ? { ...emp, estado: 'proceso' }
            : emp
        );
        setEmpleado(updatedEmpleado);
      } else {
        Alert.alert('Error', 'No se pudo cambiar el estado de la actividad');
      }
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      Alert.alert('Error', 'Error al cambiar el estado de la actividad');
    }
  };

  const handleObservationSubmit = async (observacion, actividad) => {
    try {
      // Registrar observación
      const responseObservacion = await axiosClient.post(
        `/Registrar/${actividad.id_actividad}`,
        { observacion }
      );

      if (responseObservacion.status === 200) {
        // Cambiar estado a "terminado"
        const responseEstado = await axiosClient.put(`/cambioestado/${actividad.id_actividad}`, { estado: 'terminado' });

        if (responseEstado.status === 200) {
          Alert.alert('Éxito', 'Observación registrada y actividad terminada exitosamente');
          closeModal();
          ObtenerDatos(); // Refrescar los datos después de registrar la observación
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

            {empleado.estado !== 'terminado' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (empleado.estado === 'proceso') {
                    openModal(empleado);
                  } else {
                    handleIniciar(empleado);
                  }
                }}
              >
                <Text style={styles.buttonText}>{empleado.estado === 'proceso' ? 'Enviar Observación' : 'Iniciar'}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {selectedActividad && (
        <ObservationModal
          visible={isModalVisible}
          onClose={closeModal}
          actividad={selectedActividad}
          onSubmit={handleObservationSubmit}
        />
      )}
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
    fontWeight: '700',
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
    color: '#000',
  },
  middleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    color: '#000',
    paddingRight: 120,
  },
  middleTextEstado: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  greenStatus: {
    backgroundColor: '#E5F6DF',
    color: 'green',
  },
  redStatus: {
    backgroundColor: '#F9D6D5',
    color: 'red',
  },
  greyStatus: {
    backgroundColor: 'lightgrey',
    color: 'grey',
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

export default Empleado;
