// Header.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoOrigi.png')} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Alinea el logo y el título horizontalmente
    alignItems: 'center', // Centra los elementos verticalmente
    backgroundColor: '#008000', // Fondo verde para combinar con el emblema
    height: 80, // Altura adecuada para el encabezado
    paddingHorizontal: 10, // Espaciado horizontal
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para contraste
    marginLeft: 10, // Espaciado entre el logo y el título
  },
  logo: {
    width: 70, // Ajusta según el tamaño del emblema
    height: 50, // Ajusta según el tamaño del emblema
    borderRadius: 10, // Redondea las esquinas si es necesario
  },
});

export default Header;
