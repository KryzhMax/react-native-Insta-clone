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
  //   Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// import DropShadow from "react-native-drop-shadow";
import { styles } from "../Component";
// import Button from "../utils/Button";
import { registrationInputs } from "./variables";

const background = require("../assets/img/background.jpeg");
const initState = {
  email: "",
  password: "",
};

export default function LogIn() {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
  const [shadowRadius, setShadowRadius] = useState(4);
  const [shadowOpacity, setShadowOpacity] = useState(0.25);

  const [state, setState] = useState(initState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [inputFocus, setInputFocus] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Reg": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const onChange = () => {
      const windowWidth = Dimensions.get("window").width;
      // const windowHeight = Dimensions.get("window").height;
      setScreenWidth(windowWidth);
      // console.log("width", windowWidth);
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

  // const [isReady, setIsReady] = useState(false);

  const onLogin = () => {
    Alert.alert("Credentials", `${state.email} + ${state.password}`);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initState);
  };

  const onDismiss = () => {
    setIsShowKeyboard(false);
    setInputFocus(false);
    Keyboard.dismiss();
    // setState(initState);
  };

  const onInputFocus = () => {
    setIsShowKeyboard(true);
    styles.shadowProp;
  };

  return (
    // <Registration
    //   dimensions={screenWidth}
    //   isShowKeyboard={isShowKeyboard}
    //   setIsShowKeyboard={setIsShowKeyboard}
    //   onDismiss={onDismiss}
    // />

    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <ImageBackground source={background} style={styles.image}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -90 : 0,
                width: screenWidth,
              }}
            >
              <View style={styles.box}>
                <View style={styles.formHeaderContainer}>
                  <Text style={styles.formHeaderText}>Log in</Text>
                </View>
                {registrationInputs
                  .slice(1, 3)
                  .map(({ type, name, placeholderTextColor, placeholder }) => (
                    <TextInput
                      key={type}
                      placeholder={placeholder}
                      placeholderTextColor={placeholderTextColor}
                      value={state[name]}
                      secureTextEntry={type === "password" ? true : false}
                      onChangeText={
                        (val) =>
                          setState((prevState) => ({
                            ...prevState,
                            [name]: val,
                          }))
                        // formHandler(val)
                      }
                      onFocus={onInputFocus}
                      // onFocus={() => setIsShowKeyboard(true)}
                      style={[
                        styles.input,
                        {
                          shadowOffset: {
                            width: shadowOffsetWidth,
                            height: shadowOffsetHeight,
                          },
                          shadowOpacity,
                          shadowRadius,
                        },
                      ]}
                    />
                  ))}
                {/* <TextInput
                  placeholder="Email"
                  value={state.email}
                  // onChangeText={(val) => formHandler(val)}
                  onChangeText={(val) =>
                    setState((prevState) => ({ ...prevState, email: val }))
                  }
                  onFocus={onInputFocus}
                  // onFocus={() => setIsShowKeyboard(true)}
                  style={
                    inputFocus
                      ? [styles.input, styles.shadowProp]
                      : styles.input
                  }
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
                  onFocus={onInputFocus}
                  // onFocus={() => setIsShowKeyboard(true)}
                  style={
                    inputFocus
                      ? [styles.input, styles.shadowProp]
                      : styles.input
                  }
                  textAlign={"center"}
                /> */}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onLogin}
              >
                <Text style={styles.btnText}>Log in</Text>
              </TouchableOpacity>
              <Text style={styles.signInText}>
                Don't have an account? Sign Up
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}
