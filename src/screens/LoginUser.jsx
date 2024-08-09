import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { IP } from './IP'; // Asegúrate de que esto esté correcto

const ip = IP;

const LoginUser = () => {
  const navigation = useNavigation();

  const ChangePassword = () => {
    navigation.navigate('ChangePassword');
  }

  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert('Sin conexión', 'Por favor, verifica tu conexión a internet.');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const Validacion = async () => {
    const connectionInfo = await NetInfo.fetch();
    if (!connectionInfo.isConnected) {
      Alert.alert('Sin conexión', 'Por favor, verifica tu conexión a internet.');
      return;
    }

    if (!formData.correo || !formData.password) {
      Alert.alert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const baseURL = `http://${ip}:3000/validacion`;
      console.log('Enviando datos a:', baseURL, formData);
      const response = await axios.post(baseURL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Respuesta del servidor:', response.status, response.data);

      if (response.data.token && response.data.user.length > 0) {
        const { token, user } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('usuario', JSON.stringify(user[0]));

        const userStatus = user[0].estado;
        const userRol = user[0].rol;

        // Navega al TabNavigator
        navigation.navigate('Main');
        Alert.alert('Bienvenido Empleado');
      } else {
        throw new Error('Respuesta vacía o inválida');
      }
    } catch (error) {
      console.error('Error: ', error.message);
      if (error.response) {
        console.error('Datos de error del servidor:', error.response.data);
        Alert.alert('Error', `Error del servidor: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      } else {
        Alert.alert('Error', `Error inesperado: ${error.message}`);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>INICIAR SESIÓN</Text>
        <Image source={require('../assets/logoOrigi.png')} style={styles.logo} />

        <TextInput
          placeholder="Ingrese su Correo Electronico"
          style={styles.input}
          placeholderTextColor="#666"
          value={formData.correo}
          onChangeText={(text) => handleInputChange('correo', text)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Ingrese su Contraseña"
            placeholderTextColor="#666"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={toggleSecureEntry}
          >
            <Text style={{color: '#006000'}}>
              {secureTextEntry ? 'Mostrar' : 'Ocultar'}
            </Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.button} onPress={Validacion}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    color: '#000',
  },
  logo: {
    width: 300,
    height: 250,
    marginTop: 50,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#006000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
  },
  inputPassword: {
    height: 50,
    borderWidth: 1,
    borderColor: '#006000',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    width: '100%',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  button: {
    backgroundColor: '#006000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 15,
    width: 180,
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  
  forgotPasswordText: {
    marginBottom: 50,
    color: '#000',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'left',
  },
    
});

export default LoginUser;
