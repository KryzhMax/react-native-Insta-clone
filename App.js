import React, { useState, useEffect, useCallback } from "react";
import { Dimensions, View, Keyboard } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Registration from "./Screens/RegistrationScreen";
// import LogIn from "./Screens/LoginScreen";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [inputFocus, setInputFocus] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Reg": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const onChange = () => {
      const windowWidth = Dimensions.get("window").width;
      // const windowHeight = Dimensions.get("window").height;
      setScreenWidth(windowWidth);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onDismiss = () => {
    setIsShowKeyboard(false);
    setInputFocus(false);
    Keyboard.dismiss();
  };

  const onInputFocus = () => {
    setIsShowKeyboard(true);
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* ---------->>>>Registration<<<<------------- */}
      <Registration
        screenWidth={screenWidth}
        isShowKeyboard={isShowKeyboard}
        setIsShowKeyboard={setIsShowKeyboard}
        onDismiss={onDismiss}
        onInputFocus={onInputFocus}
        inputFocus={inputFocus}
      />
      {/* ---------->>>>Login<<<<------------- */}
      {/* <LogIn
        screenWidth={screenWidth}
        isShowKeyboard={isShowKeyboard}
        setIsShowKeyboard={setIsShowKeyboard}
        onDismiss={onDismiss}
        onInputFocus={onInputFocus}
        inputFocus={inputFocus}
      /> */}
    </View>
  );
}
