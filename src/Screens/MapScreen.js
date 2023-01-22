import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../Component";

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (route.params) {
      setLocation(route.params);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            title="I am here"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            description="Hello"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
