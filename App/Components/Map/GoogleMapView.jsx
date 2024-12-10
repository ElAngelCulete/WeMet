import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "../../Context/UserLocationContext";
import markerData from "../../Data/map";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

// Función para calcular la distancia entre dos puntos utilizando la fórmula de Haversine
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Resultado en kilómetros
  return distance;
};

export default function GoogleMapView() {
  const mapRef = useRef(null);
  const [mapRegion, setmapRegion] = useState({
    latitude: -34.603722,
    longitude: -58.381592,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);  // Estado para el marcador seleccionado
  const [distance, setDistance] = useState(null);  // Estado para la distancia

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0521,
      });
    }
  }, [location]);

  const onMarkerSelected = (marker) => {
    setSelectedMarker(marker);
    // Calcular la distancia al marcador seleccionado
    const dist = haversine(
      location.coords.latitude,
      location.coords.longitude,
      marker.latitude,
      marker.longitude
    );
    setDistance(dist.toFixed(2));  // Redondear la distancia a 2 decimales
  };

  const onMapPress = () => {
    setSelectedMarker(null);  // Si se toca en el mapa, deselecciona el marcador
    setDistance(null);  // Limpiar la distancia
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        showsUserLocation={true}
        region={mapRegion}
        onPress={onMapPress}  // Se ejecuta cuando se toca fuera de un marcador
      >
        {markerData.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => onMarkerSelected(marker)}  // Llama a la función cuando se selecciona el marcador
          />
        ))}
      </MapView>

      {/* Mostrar información sobre el marcador seleccionado */}
      {selectedMarker && (
        <View style={styles.infoBox}>
          <Text style={styles.title}>{selectedMarker.name || "Estacionamiento"}</Text>
          <View style={styles.openingHours}>
            <MaterialIcons name="access-time" size={16} color="#909090" />
            <Text style={styles.openingText}>{selectedMarker.apertura} -</Text>
            <Text style={styles.closingText}>{selectedMarker.cierre}</Text>
          </View>
          
          <View style={styles.spaces}>
            <View style={styles.spaceContainer}>
              <FontAwesome name="motorcycle" size={16} color="#9ecaff" />
              <Text style={styles.spaceText}>
                {selectedMarker.ocupadasMotos}/{selectedMarker.maxPlazasMotos}
              </Text>
              <Text style={styles.priceText}>${selectedMarker.precioHoraMotos}h</Text>
            </View>
            <View style={styles.spaceContainer}>
              <FontAwesome name="car" size={16} color="#9ecaff" />
              <Text style={styles.spaceText}>
                {selectedMarker.ocupadasAutos}/{selectedMarker.maxPlazasAutos}
              </Text>
              <Text style={styles.priceText}>${selectedMarker.precioHoraAutos}h</Text>
            </View>
          </View>

          {distance && (
            <View style={styles.distance}>
              <MaterialIcons name="location-on" size={16} color="#9ecaff" />
              <Text style={styles.distanceText}>{distance} KM</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.9,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  infoBox: {
    position: "absolute",
    bottom: 62,
    left: 20,
    right: 20,
    backgroundColor: "#1b1d2e",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  openingHours: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  openingText: {
    color: "#909090",
    fontSize: 14,
    marginLeft: 4,
  },
  closingText: {
    color: "red",
    fontSize: 14,
    marginLeft: 4,
  },
  spaces: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  spaceContainer: {
    backgroundColor: "#2b2d42",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "48%",
  },
  spaceText: {
    color: "#9ecaff",
    fontSize: 14,
    marginLeft: 4,
  },
  priceText: {
    color: "#909090",
    fontSize: 14,
    marginLeft: 8,
  },
  distance: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  distanceText: {
    color: "#9ecaff",
    fontSize: 16,
    marginLeft: 4,
  },
});

