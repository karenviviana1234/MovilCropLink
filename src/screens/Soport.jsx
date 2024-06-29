import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Soport = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logoOrigi.png')} style={styles.logo} />
                <Text style={styles.txtheader}>Soporte</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containertxt}>
                    <Image source={require('../assets/soporte.png')} style={styles.imagenSoport} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Estamos para ayudarte!</Text>
                        <Text style={styles.titleCropLink}>Bienvenido a Soporte de CropLink</Text>
                    </View>
                </View>

                <View style={styles.containerservices}>
                    <Text style={styles.titleText}>Servicios</Text>
                    <View style={styles.ServicesOptions}>
                        <TouchableOpacity
                            style={styles.buttonInfo}
                            onPress={() => navigation.navigate('ActividadesAsignadas')}
                        >
                            <FontAwesome name="paste" size={20} style={styles.icon} />
                            <Text style={styles.buttonText}>Actividades Asignadas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonInfo}
                            onPress={() => navigation.navigate('ObservacionesActividades')}
                        >
                            <FontAwesome name="snowflake-o" size={20} style={styles.icon} />
                            <Text style={styles.buttonText}>Observaciones de las Actividades</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ServicesFuntions}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('ChangePassword')}
                        >
                            <FontAwesome name="comment" size={30} style={styles.icon} />
                            <Text style={styles.buttonText}>Recuperar Contraseña</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Documentacion')}
                        >
                            <FontAwesome name="file" size={30} style={styles.icon} />
                            <Text style={styles.buttonText}>Documentación</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('qwe')}
                        >
                            <FontAwesome name="question" size={30} style={styles.icon} />
                            <Text style={styles.buttonText}>Preguntas Frecuentes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.contentAboutUs}>
                    <Text style={styles.usTitle}>Sobre Nosotros</Text>
                    <Text style={[styles.usTxt, styles.usTxtName]}>Maikol Jhovanny</Text>
                    <Text style={styles.usTxt}>lorem ipsum lorem ipsum </Text>
                    <Text style={styles.usTxt}>lorem ipsum lorem ipsum </Text>
                </View>
            </ScrollView>
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
    /* Desplazamiento  */
    scrollContainer: {
        paddingHorizontal: 20,
    },
    /* Estilos de la imagen con el texto */
    containertxt: {
        alignItems: 'center',
        paddingHorizontal: 5,
        marginTop: 30,
        position: 'relative',
    },
    imagenSoport: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    textContainer: {
        position: 'absolute',
        paddingHorizontal: 5,
        zIndex: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
    },
    titleCropLink: {
        fontSize: 38,
        fontWeight: '600',
        marginTop: 5,
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
    },
    /* Estilos de Servicios */
    containerservices: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    titleText: {
        alignItems: 'center',
        color: '#000',
        marginVertical: 20,
        fontSize: 24,
        fontWeight: '600',
    },
    ServicesOptions: {
        flexDirection: 'row',
    },
    buttonInfo: {
        width: 150,
        height: 50,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    ServicesFuntions: {
        marginVertical: 20,
    },
    button: {
        width: 180,
        height: 70,
        backgroundColor: '#ECECEC',
        paddingHorizontal: 12,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    icon: {
        marginRight: 10,
        color: 'green',
    },
    /* Estilos Sobre nosotros */
    contentAboutUs: {
        alignItems: 'center',
        marginBottom: 150,
    },
    usTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 280,
        color: '#000',
    },
    usTxtName: {
        fontWeight: '500',
        color: '#000'
    },
    usTxt: {
        fontSize: 18,
        color: '#000',
        /*       alignItems: 'center' */
    },
});

export default Soport;
