import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../Component";

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState(null);
  const { place, latitude, longitude } = route.params;

  useEffect(() => {
    if (route.params) {
      setLocation(route.params);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            title="I was here :)"
            coordinate={{
              latitude,
              longitude,
            }}
            description={place}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
