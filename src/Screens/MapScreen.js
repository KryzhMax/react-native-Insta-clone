// import React from "react";
// import { StyleSheet, Text, Dimensions, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";

// export default function MapScreen() {
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.mapStyle}
//         region={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         mapType="standard"
//         minZoomLevel={15}
//         onMapReady={() => console.log("Map is ready")}
//         onRegionChange={() => console.log("Region change")}
//       >
//         <Marker
//           title="I am here"
//           coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
//           description="Hello"
//         />
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   mapStyle: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      let location = await Location.getLastKnownPositionAsync({});
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
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Home;
