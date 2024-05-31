import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

const Factura = ({navigation}) => {

  const [storedTotalSamsung, setStoredTotalSamsung] = useState('0')
  const [storedTotalHuawei, setStoredTotalHuawei] = useState('0')
  const [storedTotalMotorola, setStoredTotalMotorola] = useState('0')
  /* Descuento */
  const [storedDescuentoSamsung, setStoredDescuentoSamsung] = useState('0')
  const [storedDescuentoMotorola, setStoredDescuentoMotorola] = useState('0')
  const [storedDescuentoHuawey, setStoredDescuentoHuawei] = useState('0')
  /* Total Unidades */
  const [storedTotalUnidades, setStoredTotalUnidades] = useState('0')
  /* Valor total sin descuento */
  const [storedValorTotal, setStoredValorTotal] = useState('0')

  const [storedUniSamsung, setStoredUniSamsung] = useState('0')
  const [storedUniHuawei, setStoredUniHuawei] = useState('0')
  const [storedUniMotorola, setStoredUniMotorola] = useState('0')
  const [storedMasVendido, setStoredMasVnedido] = useState('0')


  useEffect(() => {
    guardarFactura();
  }, []);

  const guardarFactura = async () => {
    try {
    /* Total de la venta */
      const storedTotalSamsung = await SecureStore.getItemAsync('totalSamsung')
      const storedTotalHuawei = await SecureStore.getItemAsync('totalHuawei')
      const storedTotalMotorola = await SecureStore.getItemAsync('totalMotorola')
      /* Descuento */
      const storedDescuentoSamsung = await SecureStore.getItemAsync('descuentoSamsung')
      const storedDescuentoHuawei = await SecureStore.getItemAsync('descuentoHuawei')
      const storedDescuentoMotorola = await SecureStore.getItemAsync('descuentoMotorola')
      /* Total Unidades */
      const storedTotalUnidades = await SecureStore.getItemAsync('totalUnidades')
      /* Total Precio con o sin descuento */
      const storedValorTotal = await SecureStore.getItemAsync('valorTotal')
      /* Unidad escojida */
      const storedUniSamsung = await SecureStore.getItemAsync('unidadesSamsung')
      const storedUniHuawei = await SecureStore.getItemAsync('unidadesHuawei')
      const storedUniMotorola = await SecureStore.getItemAsync('unidadesMotorola')
      const storedMasVendido = await SecureStore.getItemAsync('masVendido')

      if(storedTotalSamsung !== null && storedTotalHuawei !== null && storedTotalMotorola !== null && storedUniSamsung !== null && storedUniHuawei !== null && storedUniMotorola !== null){
        
        /* Descuento */
        setStoredDescuentoSamsung(storedDescuentoSamsung)
        setStoredDescuentoMotorola(storedDescuentoMotorola)
        setStoredDescuentoHuawei(storedDescuentoHuawei)
        /* Total cantidad */
        setStoredTotalSamsung(storedTotalSamsung)
        setStoredTotalHuawei(storedTotalHuawei)
        setStoredTotalMotorola(storedTotalMotorola)
        /* Total Unidades */
        setStoredTotalUnidades(storedTotalUnidades)
        /* Total precio sin descuento */
        setStoredValorTotal(storedValorTotal)

        setStoredUniSamsung(storedUniSamsung)
        setStoredUniHuawei(storedUniHuawei)
        setStoredUniMotorola(storedUniMotorola)

        setStoredMasVnedido(storedMasVendido)
      }
  } catch (error) {
    alert('Error de factura'+ error)
  }

}

return (
  <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Cantidad teléfonos vendidos de la marca Samsung: {storedUniSamsung}</Text>
      <Text style={styles.sectionSubtitle}>Precio por unidad: 600.000</Text>
      <Text style={styles.sectionTitle}>Descuento del 5%: {storedDescuentoSamsung}</Text>
      <Text style={styles.sectionSubtitle}>Total: {storedTotalSamsung}</Text>
    </View>
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Cantidad teléfonos vendidos de la marca Huawei: {storedUniHuawei}</Text>
      <Text style={styles.sectionSubtitle}>Precio por unidad: 400.000</Text>
      <Text style={styles.sectionTitle}>Descuento del 5%: {storedDescuentoHuawey}</Text>
      <Text style={styles.sectionSubtitle}>Total: {storedTotalHuawei}</Text>
    </View>
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Cantidad teléfonos vendidos de la marca Motorola: {storedUniMotorola}</Text>
      <Text style={styles.sectionSubtitle}>Precio por unidad: 500.000</Text>
      <Text style={styles.sectionTitle}>Descuento del 5%: {storedDescuentoMotorola}</Text>
      <Text style={styles.sectionSubtitle}>Total: {storedTotalMotorola}</Text>
    </View>
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Teléfono más vendido: {storedMasVendido}</Text>
      <Text style={styles.sectionTitle}>Total de ventas: {storedTotalUnidades}</Text>
      <Text style={styles.sectionTitle}>Valor total de todos los celulares: {storedValorTotal}</Text>
    </View>
 {/*    <Pressable style={styles.generateButton} onPress={guardarFactura}>
      <Text style={styles.buttonText}>Generar factura</Text>
      </Pressable> */}
      <Pressable style={styles.generateButton}  onPress={()=> navigation.navigate('Ventas')}>
          <Text style={styles.buttonText}>Volver</Text>
         </Pressable>
         
  </ScrollView>
);
}
const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal:   20,
    paddingBottom:   20,
    paddingTop: 30,
    backgroundColor: "#FFC16C",
  },
  sectionContainer: {
    marginTop:   20, // Aumenta el margen superior para dar más espacio entre las secciones
    paddingHorizontal:   10,
    paddingVertical:   30, // Añade padding vertical para dar más espacio interno
    backgroundColor: '#F1CC99',
    borderRadius:   10,
    shadowColor: '#000',
    shadowOffset: { width:   0, height:   2 },
    shadowOpacity:   0.25,
    shadowRadius:   3.84,
    elevation:   5,
  },
  sectionTitle: {
    fontSize:   20,
    fontWeight: 'bold',
    marginBottom:   5,
  },
  sectionSubtitle: {
    fontSize:   18,
    color: '#333',
  },
  generateButton: {
    borderRadius:   20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:   10,
    width:   150,
    paddingHorizontal:   17,
    marginLeft:   110,
    marginTop:   25,
    backgroundColor: '#E19D41',
  },
  buttonText: {
    color: 'white',
    fontSize:   19,
  },
});
export default Factura