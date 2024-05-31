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
import { IP } from './IP';
import NetInfo from '@react-native-community/netinfo';

const ip = IP;

const LoginUser = () => {
  const navigation = useNavigation();
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
      console.log('Tipo de conexion', state.type);
      console.log('Is connected?', state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'Sin conexion',
          'Por favor, verifica tu conexion a internet.',
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const Validacion = async () => {
    const connectionInfo = await NetInfo.fetch();
    if (!connectionInfo.isConnected) {
      Alert.alert('Sin conexion', 'Por favor, verifica tu conexion a internet');
      return;
    }

    try {
      const baseURL = `http://${ip}:3000/validacion`;
      console.log('Enviando datos a:', baseURL, formData); // Depuración
      const response = await axios.post(baseURL, formData);
      console.log('Respuesta del servidor:', response.status, response.data); // Depuración

      if (response.data.token && response.data.usuario) {
        const { token, usuario } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
      } else {
        throw new Error('Respuesta vacía o inválida');
      }

      const storedUser = await AsyncStorage.getItem('usuario');
      const parsedUser = JSON.parse(storedUser);
      const userStatus = parsedUser.estado;
      const userRol = parsedUser.rol;
      console.log('Estado del usuario:', userStatus); // Depuración
      console.log('Rol del usuario:', userRol); // Depuración

      const tokenAsync = await AsyncStorage.getItem('token');
      console.log('Token almacenado:', tokenAsync); // Depuración

      navigation.navigate('Listar');
      Alert.alert('Bienvenido Empleado');
    } catch (error) {
      console.error('Error:', error); // Depuración
      Alert.alert('Error', 'Ocurrió un error inesperado.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>INICIAR SESIÓN</Text>
        <Image source={require('../assets/logoOrigi.png')} style={styles.logo} />

        <TextInput
          placeholder="Ingrese su Correo"
          style={styles.input}
          placeholderTextColor="#666"
          value={formData.correo}
          onChangeText={(text) => handleInputChange('correo', text)}
        />

        <View style={styles.passwordContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Ingrese su Contraseña"
              placeholderTextColor="#666"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {/* Ícono de "toggle eye" */}
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={toggleSecureEntry}>
            <Text style={{color: '#006000'}}>
              {secureTextEntry ? 'Mostrar' : 'Ocultar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
        >
          <Text style={styles.forgotPasswordText}>¿OLVIDASTE LA CONTRASEÑA?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={Validacion}>
          <Text style={styles.buttonText}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    color: '#000',
  },
  logo: {
    width: 300,
    height: 250,
    marginTop: 80,
    marginBottom: 100,
  },
  input: {
    width: '100%',
    height: 40,
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
    height: 40,
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
    marginTop: 30,
    color: '#000',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default LoginUser;
