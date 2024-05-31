import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangePassword = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = async () => {
        // Validate passwords
        if (!newPassword || !confirmPassword) {
            return alert('Todos los campos son obligatorios');
        }

        if (newPassword !== confirmPassword) {
            return alert('Las contraseñas no coinciden');
        }

        // Si las contraseñas coinciden y no hay campos vacíos, muestra el mensaje de éxito
        alert('Se actualizó con éxito la contraseña');
        
        // Después de mostrar el mensaje de éxito, navega a la otra vista
        navigateToLoginUser();
    };

    const navigateToLoginUser = () => {
        navigation.navigate('Inicio');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cambiar Contraseña</Text>
            <Text style={styles.infoText}>Su contraseña ha sido cambiada. Por favor ingrese la contraseña nueva y confírmela para ingresar al aplicativo.</Text>
            <TextInput
                placeholder="Nueva contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                placeholderTextColor="#666"
                secureTextEntry={true}
            />
            <TextInput
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                placeholderTextColor="#666"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                <Text style={styles.buttonText}>Cambiar Contraseña</Text>
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
        marginTop: 25,
        marginBottom: 100,
        color: '#000',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#57BF4F',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#000',
    },
    infoText: {
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'justify',
        color: '#666',
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#00CC00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 150,
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
