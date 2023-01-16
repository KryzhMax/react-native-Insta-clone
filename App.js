import React, { useState, useEffect, useCallback } from "react";
import {
  Dimensions,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import DropShadow from "react-native-drop-shadow";
import Registration from "./Screens/RegistrationScreen";
import LogIn from "./Screens/LoginScreen";
import { styles } from "./Component";
import Button from "./utils/Button";

const background = require("./assets/img/background.jpeg");
const initState = {
  name: "",
  email: "",
  password: "",
};

export default function App() {
  // const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  // const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
  // const [shadowRadius, setShadowRadius] = useState(4);
  // const [shadowOpacity, setShadowOpacity] = useState(0.25);

  // const [state, setState] = useState(initState);
  // const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [screenWidth, setScreenWidth] = useState(
  //   Dimensions.get("window").width
  // );
  // const [inputFocus, setInputFocus] = useState(false);

  // const [fontsLoaded] = useFonts({
  //   "Roboto-Reg": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  //   "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  // });

  // useEffect(() => {
  //   const onChange = () => {
  //     const windowWidth = Dimensions.get("window").width;
  //     // const windowHeight = Dimensions.get("window").height;
  //     setScreenWidth(windowWidth);
  //     // console.log("width", windowWidth);
  //   };
  //   const subscription = Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  // // const [isReady, setIsReady] = useState(false);

  // const onRegister = () => {
  //   Alert.alert(
  //     "Credentials",
  //     `${state.name} + ${state.email} + ${state.password}`
  //   );
  //   setIsShowKeyboard(false);
  //   Keyboard.dismiss();
  //   console.log(state);
  //   setState(initState);
  // };

  // const onDismiss = () => {
  //   setIsShowKeyboard(false);
  //   setInputFocus(false);
  //   Keyboard.dismiss();
  //   // setState(initState);
  // };

  // const onInputFocus = () => {
  //   setIsShowKeyboard(true);
  //   styles.shadowProp;
  // };

  return (
    // ---------->>>>Registration<<<<-------------
    <Registration />

    // ---------->>>>Registration<<<<-------------
    // <LogIn />
  );
}
