import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Header from './src/components/Header';
import LoginUser from './src/screens/LoginUser';
import RecoverPasswordC from './src/screens/RecoverPasswordC';
import ChangePassword from './src/screens/ChangePassword';
import StartCropLink from './src/screens/StartCropLink';
import ListarEmpleados from './src/screens/ListarEmpleados';
import ActividadEmpleado from './src/screens/ActividadEmpleado';
import Soport from './src/screens/Soport';
import UserProfile from './src/screens/UserProfile';
import UpdateProfile from './src/screens/UpdateProfile';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      shifting={true}
      activeColor={colors.primary}
      inactiveColor={colors.text}
      barStyle={{ backgroundColor: colors.background }}
    >
      <Tab.Screen
        name="Inicio"
        component={StartCropLink}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={25} color={color} />
          ),
          tabBarColor: '#694fad',
        }}
      />
      <Tab.Screen
        name="ListarEmpleados"
        component={ListarEmpleados}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="file-text" size={20} color={color} />
          ),
          tabBarLabel: 'Actividades Asignadas',
          tabBarColor: '#40c340',
        }}
      />
      <Tab.Screen
        name="Soporte"
        component={Soport}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="legal" size={25} color={color} />
          ),
          tabBarLabel: 'Soporte',
          tabBarColor: '#40c340',
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={25} color={color} />
          ),
          tabBarLabel: 'Perfil',
          tabBarColor: '#40c340',
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen
          name="Inicio"
          component={LoginUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ header: () => <Header title="Recuperación de contraseña" /> }}
        />
        <Stack.Screen
          name="RecoverPasswordC"
          component={RecoverPasswordC}
          options={{ header: () => <Header title="Recuperación de contraseña" /> }}
        />
        <Stack.Screen
          name="Main"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ActividadEmpleado"
          component={ActividadEmpleado}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePerfil"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
