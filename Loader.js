import React, { useState, useCallback } from "react";
// import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./Component";
import { View, Button } from "react-native";

SplashScreen.preventAutoHideAsync();

export default Loader = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Reg": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  const [isReady, setIsReady] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  // --------------
  // const onFinish = () => setIsReady(true);

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={fontsLoaded}
  //       onFinish={onFinish}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View>
        <Button onPress={this._onPressButton} title="Press Me" />
      </View>
    </View>
  );
};
