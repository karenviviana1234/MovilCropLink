import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen = ({ navigation }) => {
  const [userApellido, setUserApellido] = useState('');
  const [userUsuario, setUserUsuario] = useState('');
  const [userCorreo, setUsuarioCorreo] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    /* Implement logic for user registration */
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <TextInput
        placeholder="Ingrese sus nombres"
        value={userApellido}
        onChangeText={setUserApellido}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Ingrese sus apellidos"
        value={userUsuario}
        onChangeText={setUserUsuario}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Ingrese su correo"
        value={userCorreo}
        onChangeText={setUsuarioCorreo}
        style={styles.input}
        placeholderTextColor="#666"
        textContentType="emailAddress"
      />

      <View style={styles.passwordContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Ingrese su contraseña"
            value={setUserpassword}
            onChangeText={setUserpassword}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#666"
          />
        </View>
        {/* Ícono de "toggle eye" */}
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.roleLabel}>Rol</Text>
      <View style={styles.roleContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={setRole}
            style={styles.rolePicker}
            mode="dropdown"
            placeholder="Seleccionar"
          >
            <Picker.Item style={styles.picker} label="Administrador" value="administrador" />
            <Picker.Item label="Usuario" value="usuario" />
          </Picker>
          {/* <Icon name="chevron-down" size={20} color="#666" style={styles.icon} /> */}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
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
    borderColor: '#57BF4F',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    width: '100%',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  roleLabel: { 
    marginRight: 'auto',
    fontSize: 18,
    color: '#000',
  },
  pickerContainer: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#57BF4F',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  rolePicker: {
    flex: 1,
    color: '#666',
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    marginLeft: 'auto',
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

export default RegisterScreen;
