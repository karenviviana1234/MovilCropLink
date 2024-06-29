import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const StartCropLink = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const data = [
    {
      title: 'Nuestra Historia:',
      image: require('../assets/dashboardUno.png'),
      text: 'Crop Link surge a partir de la problemática que enfrentan muchos campesinos en sus cultivos, quienes a menudo carecen del tiempo o la disposición para estar pendientes de sus tierras. Tradicionalmente, el control de las fincas se realizaba de manera física, lo que resultaba en una organización poco eficiente y un desperdicio de papel perjudicial para el medio ambiente.',
    },
    {
      title: 'Beneficios de utilizar croplink:',
      subtitle: 'CROP LINK',
      image: require('../assets/dashboardDos.png'),
      text: ' Monitoreo en Tiempo Real: Los administradores y dueños de fincas pueden estar informados en todo momento sobre el estado de sus cultivos, permitiendo una respuesta rápida a cualquier percance o necesidad.',
    },
    {
      image: require('../assets/dashboardTres.png'),
      text: 'Optimización de la producción: Al tener un control efectivo y detallado de todas las producciones, los administradores pueden tomar decisiones informadas para optimizar el rendimiento y la eficiencia de sus cultivos.',
    },
    {
      image: require('../assets/dashboardCuatro.png'),
      text: 'Seguimiento detallado de actividades: Cada actividad realizada en los lotes es registrada y monitoreada, lo que permite un control preciso y detallado de las tareas asignadas a los empleados.',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={300}
          sliderHeight={500}
          itemHeight={700}
          onSnapToItem={(index) => setActiveSlide(index)}
          vertical
          loop
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transparent', paddingTop: 10 }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 80,
    marginTop: 80,
    marginBottom: 80,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 260,
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 30,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
    color: '#000',
    marginBottom: 60,
  },
});

export default StartCropLink;
