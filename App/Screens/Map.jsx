import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Components/Map/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleMapView from '../Components/Map/GoogleMapView';

export default function Map() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
            <GoogleMapView />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que SafeAreaView ocupe toda la pantalla
  },
  mapContainer: {
    flex: 1, // Hace que el View ocupe toda la pantalla disponible
    justifyContent: 'flex-start', // Ajuste de alineación si es necesario
    alignItems: 'center', // Centra los elementos horizontalmente si es necesario
  },
});
