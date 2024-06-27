import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const UserTable = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logoprueba.png')} style={styles.logo} />
                {/* <Text style={styles.txtheader}>Actividades Asignadas</Text> */}
            </View>
            <View style={styles.containertxt}>
                <Text style={styles.title}>Aplicación diseñada para agricultores</Text>
                <Text style={styles.titleCropLink}>CROP LINK</Text>
                <Text style={styles.infoText}>Una plataforma innovadora y accesible que transforma la gestión de cultivos y fincas. Pensada para optimizar la productividad y la rentabilidad de los usuarios, esta herramienta es tu aliado en la toma de decisiones informadas para el éxito de tus cultivos.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B48E86',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        /* marginBottom: 20,
        paddingRight: 30,
        borderBottomColor: 'green',
        borderBottomWidth: 2, */
        marginHorizontal: 20,
    },
    logo: {
        width: 80,
        height: 50,
        marginBottom: 10,
    },
/*     txtheader: {
        fontSize: 24,
        textAlign: 'center',
        color: 'green',
        fontWeight: '600',
    }, */
    containertxt: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#B48E86',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 260,
        marginBottom: 1,
        color: '#fff',
        textAlign: 'center',
        textShadowColor: '#rgba(0, 0, 0, 0.1)', // Add text shadow
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    titleCropLink: {
        fontSize: 60,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 1,
        color: '#fff',
        textAlign: 'center',
        textShadowColor: '#rgba(0, 0, 0, 0.1)', // Add text shadow
        textShadowOffset: { width: 1, height: 1 },
    },
    infoText: {
        fontSize: 20,
        lineHeight: 22,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 50,
    },
});

export default UserTable;
