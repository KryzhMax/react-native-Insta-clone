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
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "./Component";

const background = require("./assets/img/background.jpeg");
const initState = {
  name: "",
  email: "",
  password: "",
};

export default function App() {
  const [state, setState] = useState(initState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Reg": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const onChange = () => {
      const windowWidth = Dimensions.get("window").width;
      console.log("width", windowWidth);
    };
    Dimensions.addEventListener("change", onChange);
    // const windowHeight = Dimensions.get("window").height;
    return () => {
      Dimensions.removeEventListener("change", onChange);
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

  // const [isReady, setIsReady] = useState(false);

  // const formHandler = (val) => {
  //   for (let key in state) {
  //     setState((prevState) => ({ ...prevState, [key]: val }));
  //   }
  // };

  const onLogin = () => {
    Alert.alert(
      "Credentials",
      `${state.name} + ${state.email} + ${state.password}`
    );
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initState);
  };

  const onDismiss = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // setState(initState);
  };

  return (
    // <Loader />
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <ImageBackground source={background} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 100,
              }}
            >
              <TextInput
                placeholder="Username"
                value={state.name}
                onChangeText={
                  (val) =>
                    setState((prevState) => ({ ...prevState, name: val }))
                  // formHandler(val)
                }
                onFocus={() => setIsShowKeyboard(true)}
                style={styles.input}
                textAlign={"center"}
              />
              <TextInput
                placeholder="Email"
                value={state.email}
                // onChangeText={(val) => formHandler(val)}
                onChangeText={(val) =>
                  setState((prevState) => ({ ...prevState, email: val }))
                }
                onFocus={() => setIsShowKeyboard(true)}
                style={styles.input}
                textAlign={"center"}
              />
              <TextInput
                placeholder="Password"
                value={state.password}
                secureTextEntry={true}
                // onChangeText={(val) => formHandler(val)}
                onChangeText={(val) =>
                  setState((prevState) => ({ ...prevState, password: val }))
                }
                onFocus={() => setIsShowKeyboard(true)}
                style={styles.input}
                textAlign={"center"}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onLogin}
              >
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}
