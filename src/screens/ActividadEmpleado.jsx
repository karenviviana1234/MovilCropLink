import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axiosClient from '../axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActividadEmpleado = ({ route, navigation }) => {
    const [actividad, setActividad] = useState({});
    const [observacion, setObservacion] = useState('');

    useEffect(() => {
        const ObtenerDatosActividad = async () => {
            try {
                // Aquí debes obtener el token de AsyncStorage
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado en AsyncStorage');
                }

                // Llamar a la API para obtener los datos de la actividad
                const response = await axiosClient.get(`/actividad/${id}`, {
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

        ObtenerDatosActividad();
    }, [navigation]);

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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
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
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
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

export default ActividadEmpleado;
