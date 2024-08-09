import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axiosClient from '../axiosClient'; // Ajusta la ruta según tu estructura

const UserProfile = ({ navigation, route }) => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosClient.get('/usuario/listarPerfil');
                if (response.data.status === 200) {
                    setProfileData(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, [route.params?.refresh]); // Agrega `route.params?.refresh` como dependencia

    if (!profileData) {
        return <Text>Cargando...</Text>; // Muestra un mensaje mientras se cargan los datos
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logoOrigi.png')} style={styles.logo} />
                <Text style={styles.txtheader}>Perfil de empleado</Text>
            </View>
            <TouchableOpacity style={styles.iconProfile}>
                <FontAwesome name="user-circle-o" size={150} style={styles.icon} />
                <Text style={styles.nameProfile}>{profileData.nombre}</Text>
            </TouchableOpacity>
            <View style={styles.containerDataProfile}>
                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="user" size={20} style={styles.icon} />
                    <Text style={styles.datatxt}>{profileData.rol}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="grav" size={20} style={styles.icon} />
                    <Text style={styles.datatxt}>{profileData.nombre} {profileData.apellido}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="envelope-open" size={20} style={styles.icon} />
                    <Text style={[styles.datatxt, styles.datatxtemail]}>{profileData.correo}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.OptionsProfile}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UpdatePerfil')}
                >
                    <Text style={styles.buttonText}>Editar perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('')}
                >
                    <Text style={styles.buttonText}>Cerrar Sección</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    /* Estilos del header */
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
        paddingRight: 130,
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
    /* Estilos de Profile */
    iconProfile: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        marginTop: 50,
    },
    nameProfile: {
        fontWeight: '600',
        fontSize: 24,
        color: '#000',
        marginVertical: 20,
    },
    /* datos del Profile */
    containerDataProfile: {
        marginBottom: 30,
    },
    dataProfile: {
        flexDirection: 'row',
        marginLeft: 20,
        marginVertical: 10,
    },
    datatxt: {
        fontWeight: '500',
        color: '#000',
        fontSize: 18,
    },
    datatxtemail: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',

    },
    /* Opciones de Profile */
    OptionsProfile: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: 'green',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 10,
        color: 'green',
    },
});

export default UserProfile;
