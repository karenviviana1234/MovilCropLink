import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserTable = ({ navigation }) => {
/*     const [userPasssword, setUserPasssword] = useState('');

    const navigateToChangePassword = () => {
        navigation.navigate('ChangePassword');
    } */


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <Text style={styles.infoText}>Por favor ingrese el código de verificación enviado a su correo electrónico.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 100,
        color: '#000',
        textAlign: 'center',
        textShadowColor: '#rgba(0, 0, 0, 0.1)', // Add text shadow
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    infoText: {
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'justify',
        color: '#666',
        marginBottom: 50,
    },  
});

export default UserTable;
