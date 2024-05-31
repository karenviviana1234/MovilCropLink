import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
/*  */
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import LoginUser from './src/screens/LoginUser';
import RegisterUser from './src/screens/RegisterUser';
import RecoverPasswordCE from './src/screens/RecoverPasswordCE';
import RecoverPasswordC from './src/screens/RecoverPasswordC';
import ChangePassword from './src/screens/ChangePassword';
import UserTable from './src/screens/UserTable';
import Listar from './src/screens/Listar';

const Stack = createStackNavigator();

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
          name="registro"
          component={RegisterUser}
          options={{ header: () => <Header title="Registro de usuario" /> }} // Agrega el encabezado al registro
        />
        <Stack.Screen
          name="RecoverPasswordCE"
          component={RecoverPasswordCE}
          options={{ header: () => <Header title="Recuperar Contraseña" /> }} // Agrega el encabezado a la recuperación de contraseña
        />
        <Stack.Screen
          name="RecoverPasswordC"
          component={RecoverPasswordC}
          options={{ header: () => <Header title="Confirmar Contraseña" /> }} // Agrega el encabezado a la confirmación de contraseña
        />
          <Stack.Screen
          name="Listar"
          component={Listar}
          options={{ header: () => <Header title="Listar" /> }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ header: () => <Header title="Cambiar Contraseña" /> }} // Agrega el encabezado al cambio de contraseña
        />
        <Stack.Screen
        name="UserTable"
        component={UserTable}
        options={{
          header: () => <Header title="Tabla Usuarios" />,
          drawer: () => <Sidebar />, // **Añade la opción `drawer` con el componente `Sidebar`**
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
