import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axiosClient from '../axiosClient'; // Ajusta la ruta según tu estructura
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProfile = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosClient.get('/usuario/listarPerfil');
                if (response.data.status === 200) {
                    setUserData(response.data.data);
                    setName(response.data.data.nombre);
                    setSurname(response.data.data.apellido);
                    setEmail(response.data.data.correo);
                } else {
                    Alert.alert("Error", response.data.message);
                }
            } catch (error) {
                Alert.alert("Error", "Error fetching profile data: " + error.message);
            }
        };

        fetchProfileData();
    }, []);

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "No token found");
                return;
            }

            const identificacion = userData.identificacion; // Asegúrate de obtener la identificación del usuario

            const response = await axiosClient.put(`/usuario/actualizarPerfil/${identificacion}`, {
                nombres: name,
                apellidos: surname,
                correo: email
            }, {
                headers: {
                    'token': token
                }
            });

            if (response.data.status === 200) {
                Alert.alert("Success", response.data.message);
                navigation.navigate('Perfil', { refresh: true }); // Agrega el parámetro de `refresh`
            } else {
                Alert.alert("Error", response.data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Error updating profile: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logoOrigi.png')} style={styles.logo} />
                <Text style={styles.txtheader}>Perfil de empleado</Text>
            </View>
            <TouchableOpacity style={styles.iconProfile}>
                <FontAwesome name="user-circle-o" size={150} style={styles.icon} />
                <Text style={styles.nameProfile}>{userData ? userData.nombre : 'Cargando...'}</Text>
            </TouchableOpacity>
            <View style={styles.containerDataProfile}>
                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="user" size={25} style={styles.icon} />
                    <TextInput
                        style={[styles.datatxt, styles.input]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nombre"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="user" size={25} style={styles.icon} />
                    <TextInput
                        style={[styles.datatxt, styles.input]}
                        value={surname}
                        onChangeText={setSurname}
                        placeholder="Apellido"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.dataProfile}>
                    <FontAwesome name="envelope-open" size={20} style={styles.icon} />
                    <TextInput
                        style={[styles.datatxt, styles.input]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.OptionsProfile}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSave}
                >
                    <Text style={styles.buttonText}>Guardar</Text>
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
        alignItems: 'center',
        /* backgroundColor: '#BA6161' */
    },
    datatxt: {
        fontWeight: '500',
        color: '#000',
        fontSize: 18,
    },
    input: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#006000',
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#000',
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
        alignItems: 'center',
        marginRight: 10,
        color: 'green',

    },
});

export default UpdateProfile;
