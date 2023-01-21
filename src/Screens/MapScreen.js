import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { styles } from "../Component";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // let location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // ------------------------отправлять на сервер локацию через JSON.stringify(location)

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    //   text = JSON.stringify(location);
    text = location;
  }

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
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            description="Hello"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
