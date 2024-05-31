import { View, Text, ScrollView, Image, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from 'expo-secure-store'


const VentasScreen = ({ navigation }) => {

    const[unidadesSamsung, setUnidadesSamsung] = useState('0')
    const[unidadesHuawei, setUnidadesHuawei] = useState('0')
    const[unidadesMotorola, setUnidadesMotorola] = useState('0')

    const Total = async () => {

    try {

        let totalUnidades = parseInt(unidadesSamsung) + parseInt(unidadesHuawei) + parseInt(unidadesMotorola);  
        // Almacenar el total de unidades
        await SecureStore.setItemAsync("totalUnidades", totalUnidades.toString());

        let valorTotalSamsung = parseInt(unidadesSamsung) *  600000;
        let valorTotalHuawei = parseInt(unidadesHuawei) *  400000;
        let valorTotalMotorola = parseInt(unidadesMotorola) *  500000;
    
        // Aplicar descuento si la cantidad es mayor a diez
        if (unidadesSamsung >  10) { 
            valorTotalSamsung = valorTotalSamsung *  0.95 
        }
        if (unidadesHuawei >  10) { 
            valorTotalHuawei = valorTotalHuawei *  0.95
        }
        if (unidadesMotorola >  10) { 
            valorTotalMotorola = valorTotalMotorola *  0.95 
        }
        // Sumar los valores totales
        let valorTotal = valorTotalSamsung + valorTotalHuawei + valorTotalMotorola;

        // Almacenar el valor total con descuento
        await SecureStore.setItemAsync("valorTotal", valorTotal.toString());
            

            /*  */
        if(unidadesSamsung != '0' || unidadesHuawei != '0' || unidadesMotorola != '0'){
            if(unidadesSamsung > 10){
                let multiSam = parseInt(unidadesSamsung) * 600000
                let descuentoSamsung = parseInt(unidadesSamsung) * 600000 * 5 / 100
                let totalSamsung = parseInt(multiSam) - parseInt(descuentoSamsung)

                await SecureStore.setItemAsync("totalSamsung", totalSamsung.toString())
                await SecureStore.setItemAsync("descuentoSamsung", descuentoSamsung.toString())
                await SecureStore.setItemAsync("multiSam", multiSam.toString())
            }else{
                let totalSamsung = parseInt(unidadesSamsung) * 600000
                await SecureStore.setItemAsync("totalSamsung", totalSamsung.toString())
                await SecureStore.setItemAsync("descuentoSamsung", '0');
            }

            if(unidadesHuawei > 10){
                let multiHuawei = parseInt(unidadesHuawei) * 400000
                let descuentoHuawei = parseInt(unidadesHuawei) * 400000 * 5 / 100
                let totalHuawei = parseInt(multiHuawei) - parseInt(descuentoHuawei)

                await SecureStore.setItemAsync("totalHuawei", totalHuawei.toString())
                await SecureStore.setItemAsync("descuentoHuawei", descuentoHuawei.toString())
                await SecureStore.setItemAsync("multiHuawei", multiHuawei.toString())
            }else{
                let totalHuawei = parseInt(unidadesHuawei) * 400000
                await SecureStore.setItemAsync("totalHuawei", totalHuawei.toString())
                await SecureStore.setItemAsync("descuentoHuawei", '0');
            }

            if(unidadesMotorola > 10){
                let multiMoto = parseInt(unidadesMotorola) * 500000
                let descuentoMotorola = parseInt(unidadesMotorola) * 500000 * 5 / 100
                let totalMotorola = parseInt(multiMoto) - parseInt(descuentoMotorola)

                await SecureStore.setItemAsync("totalMotorola", totalMotorola.toString())
                await SecureStore.setItemAsync("descuentoMotorola", descuentoMotorola.toString())
                await SecureStore.setItemAsync("multiMoto", multiMoto.toString())        
            }else{
                let totalMotorola = parseInt(unidadesMotorola) * 500000;
                await SecureStore.setItemAsync("totalMotorola", totalMotorola.toString())
                await SecureStore.setItemAsync("descuentoMotorola", '0');
            }
            /*  */
            if(unidadesSamsung > unidadesHuawei && unidadesSamsung > unidadesMotorola){
                await SecureStore.setItemAsync("masVendido", "samsung")
            }else if(unidadesHuawei > unidadesSamsung && unidadesHuawei > unidadesMotorola){
                await SecureStore.setItemAsync("masVendido", "huawei")
            }else{
                await SecureStore.setItemAsync("masVendido", "motorola")
            }
                
            if(unidadesSamsung == unidadesHuawei && unidadesSamsung > unidadesMotorola){
                await SecureStore.setItemAsync("masVendido", "Samsung y Huawei")
            }else if(unidadesSamsung == unidadesMotorola && unidadesSamsung > unidadesHuawei){
                await SecureStore.setItemAsync("masVendido","Samsung y Motorola")
            }else if(unidadesHuawei == unidadesMotorola && unidadesHuawei > unidadesSamsung){
                await SecureStore.setItemAsync("masVendido", "Huawei y Motorola")
            }else if(unidadesSamsung == unidadesHuawei && unidadesSamsung == unidadesMotorola){
                await SecureStore.setItemAsync("masVendido", "Igual de unidades vendidas")
            }

            await SecureStore.setItemAsync('unidadesSamsung', unidadesSamsung.toString())
            await SecureStore.setItemAsync('unidadesHuawei', unidadesHuawei.toString())
            await SecureStore.setItemAsync('unidadesMotorola', unidadesMotorola.toString())
                    
            alert('Venta realizada con exito')
            navigation.navigate('Factura')
        }else{
            alert('No hay ventas por realizar, llene algun campo')
        }
    }

    catch (error) {
        alert('Error de venta' + error)
    }

}

return (
    <View style={styles.container} >
        <ScrollView>
            <Text style={styles.title}>Bienvenido: </Text>
            <View style={styles.containerImage}>
                <Text style={styles.title2}> Samsung </Text>
                <Image style={styles.image} source={require('../assets/samsung.png')} />
                <Text style={styles.title2}> Precio: $600.000 </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Ingrese la cantidad'
                    keyboardType='numeric'
                    value={unidadesSamsung.toString()}
                    onChangeText={texto => {
                        const contar = texto ? parseInt(texto, 10) : 0
                        setUnidadesSamsung(contar)}}
                />
            </View>
            <View style={styles.containerImage}>
                <Text style={styles.title2}> Huawei </Text>
                <Image style={styles.image} source={require('../assets/huawei.png')} />
                <Text style={styles.title2}> Precio: $400.000 </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Ingrese la cantidad'
                    keyboardType='numeric'
                    value={unidadesHuawei.toString()}
                    onChangeText={texto => {
                        const contar = texto ? parseInt(texto, 10 ) : 0
                        setUnidadesHuawei(contar)}}
                />
            </View>
            <View style={styles.containerImage}>
                <Text style={styles.title2}> Motorola </Text>
                <Image style={styles.image} source={require('../assets/motorola.png')} />
                <Text style={styles.title2}> Precio: $500.000 </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='cantidad telefonos'
                    keyboardType='numeric'
                    value={unidadesMotorola.toString()}
                    onChangeText={texto => {
                        const contar = texto ? parseInt(texto, 10) : 0
                        setUnidadesMotorola(contar)}}
                />
            </View>
    
            <Pressable style={styles.button1}  onPress={Total}>
          <Text style={styles.textoButton}>Realizar Compra</Text>
         </Pressable>

            
            <Pressable style={styles.button1}  onPress={()=> navigation.navigate('Login')}>
          <Text style={styles.textoButton}>Cerrar Sesión</Text>
         </Pressable>
         
        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        justifyContent: 'center',
        alignContent:"center",
        backgroundColor:"#FFC16C"
    },
    title: {
        fontSize: 30,
        textAlign:"center"
    },
    title2: {
        fontSize: 20,
        textAlign:"center"
    },
    image: {
        width: 130,
        height: 200,
        flex: 1,
        justifyContent: 'center'
    },
    containerImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
button1: {
borderRadius:   20,
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical:  10,
  width: "40%",
  marginTop: 15,
  marginBottom: 20,
  backgroundColor: '#E19D41',
  alignSelf: 'center', // Centra el botón horizontalmente
},
    textoButton:{
      color: "white",
      fontSize:19
    },
    input: {
        height: 35,
        width:150,
        marginBottom: 10,
        borderWidth: 3,
        padding:10
    }
})
export default VentasScreen;
