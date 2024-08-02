import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import axiosClient from '../axiosClient';


const RecoverPasswordC = () => {
    const [correo, setCorreo] = useState('');
    const navigation = useNavigation();
    const { t } = useTranslation();

    const handleRecuperar = async () => {
        if (!correo.trim()) {
            alert(t('emailRequired')); // Mostrar un mensaje de alerta si el campo está vacío
            return;
        }

        try {
            const response = await axiosClient.post('/Recu', { email: correo });
            console.log('Correo enviado exitosamente:', response.data);
            alert(t('emailSentSuccess')); // Usar una traducción para el mensaje de alerta
            navigation.navigate('Login'); // Redirigir después del envío exitoso
        } catch (error) {
            console.error('Envío de correo fallido:', error);
            alert(t('Mailfailure')); // Mostrar un mensaje de error
        }
    };

    return (
        <View style={estilos.container}>
            <Text style={estilos.title}>{t('passwordRecovery')}</Text>
            <Text style={estilos.description}>
                {t('recoveryDescription')}
            </Text>
            <TextInput
                style={estilos.input}
                placeholder={t('emailPlaceholder')}
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
            />
            <TouchableOpacity style={estilos.sendButton} onPress={handleRecuperar}>
                <Text style={estilos.sendButtonText}>{t('sendButtonText')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    sendButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default RecoverPasswordC;
