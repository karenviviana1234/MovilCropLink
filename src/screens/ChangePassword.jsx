import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axiosClient from '../axiosClient';

const ChangePassword = ({ navigation }) => {
    const [correo, setCorreo] = useState('');

    const handleCorreoSubmit = async () => {
        // Validate correo
        if (!correo) {
            return alert('El campo de correo electrónico es obligatorio');
        }

        try {
            const response = await axiosClient.post('/Recu', { correo });
            console.log('Correo submitted successfully:', response.data);
            alert('Se envió el correo para la recuperación de contraseña');
            navigateToLoginUser();
        } catch (error) {
            console.error('Correo submission failed:', error);
            alert('Error al enviar el correo');
        }
    };

    const navigateToLoginUser = () => {
        navigation.navigate('Inicio');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ingrese su correo electrónico.</Text>
            <TextInput
                placeholder="Ingrese su correo electrónico"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
                placeholderTextColor="#666"
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleCorreoSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
        textAlign: 'center',
        marginTop: 150,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#57BF4F',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#000',
    },
    button: {
        backgroundColor: '#00CC00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
        width: 180,
        height: 60,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ChangePassword;