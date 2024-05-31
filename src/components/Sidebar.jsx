import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Sidebar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuSlideAnimation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    const toValue = menuVisible ? 0 : 1;
    // Animación para mostrar u ocultar el menú
    Animated.timing(menuSlideAnimation, {
      toValue,
      duration: 500, // Duración de la animación en milisegundos
      easing: Easing.bezier(0.4, 0, 0.2, 1), // Curva de interpolación para una animación más suave
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    setMenuVisible(false);
    // Animación para ocultar el menú al cerrarlo
    Animated.timing(menuSlideAnimation, {
      toValue: 0,
      duration: 500, // Duración de la animación en milisegundos
      easing: Easing.bezier(0.4, 0, 0.2, 1), // Curva de interpolación para una animación más suave
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutsideMenu = () => {
    if (menuVisible) {
      closeMenu();
    }
  };

  const menuTranslateX = menuSlideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0], // Cambia según el ancho del menú
  });

  return (
    <TouchableWithoutFeedback onPress={handlePressOutsideMenu}>
      <View style={styles.container}>
        {!menuVisible && (
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <FontAwesome name="bars" size={25} color="#000000" />
          </TouchableOpacity>
        )}

        <Animated.View style={[styles.menuContent, { transform: [{ translateX: menuTranslateX }] }]}>
          <Image
            source={require('../assets/LogoCompras.jpg')}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="user" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="area-chart" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Finca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="leaf" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Lote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="file-text" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Actividad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="weixin" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Recursos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="user" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Reportes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="gear" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="slideshare" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Sobre Nosotros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="comment-o" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Entypo name="log-out" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.menuText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Fondo blanco para cubrir toda la pantalla
  },
  menuButton: {
    zIndex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  menuContent: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#B1B1B1',
    width: 150, // Ancho del menú
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default Sidebar;
